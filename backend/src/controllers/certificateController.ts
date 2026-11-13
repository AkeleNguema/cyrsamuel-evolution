import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import { getCertificateFilePath, generateCertificatePDF } from '../services/pdfService';

const prisma = new PrismaClient();

// Téléchargement du fichier PDF physique
export const downloadCertificate = async (req: Request, res: Response) => {
  try {
    const token = req.params.token as string;

    if (!token) {
      res.status(400).json({ error: 'Jeton de certificat requis.' });
      return;
    }

    const certificate = await prisma.certificate.findUnique({
      where: { verifyToken: token },
      include: { user: true }
    });

    if (!certificate) {
      res.status(404).json({ error: 'Certificat introuvable.' });
      return;
    }

    const filePath = getCertificateFilePath(token);

    // Si le fichier physique a été nettoyé mais que le certificat existe en base, on le régénère
    if (!fs.existsSync(filePath)) {
      await generateCertificatePDF({
        avatarName: certificate.user.avatarName,
        verifyToken: certificate.verifyToken,
        score: 25,
        totalQuestions: 25,
        scorePercentage: 100,
        issuedAt: certificate.issuedAt
      });
    }

    const safeAvatarName = certificate.user.avatarName.replace(/[^a-zA-Z0-9_-]/g, '_');
    const downloadFileName = `Certificat_WebDev_Evolution_${safeAvatarName}.pdf`;

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${downloadFileName}"`);

    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } catch (error) {
    console.error('Erreur downloadCertificate :', error);
    res.status(500).json({ error: 'Erreur lors du téléchargement du certificat.' });
  }
};

// Route publique de vérification de certificat
export const verifyCertificate = async (req: Request, res: Response) => {
  try {
    const token = req.params.token as string;

    if (!token) {
      res.status(400).json({ error: 'Jeton de vérification manquant.' });
      return;
    }

    const certificate = await prisma.certificate.findUnique({
      where: { verifyToken: token },
      include: {
        user: {
          select: {
            id: true,
            avatarName: true,
            createdAt: true
          }
        }
      }
    });

    if (!certificate) {
      res.status(404).json({
        isValid: false,
        error: 'Certificat invalide ou introuvable dans le registre de Sougoudzap-ville.'
      });
      return;
    }

    res.json({
      isValid: true,
      title: 'Certificat de Maîtrise Web — WebDev Evolution',
      recipient: certificate.user.avatarName,
      issuedAt: certificate.issuedAt,
      verifyToken: certificate.verifyToken,
      status: 'Authentique & Validé par le Haut Tribunal'
    });
  } catch (error) {
    console.error('Erreur verifyCertificate :', error);
    res.status(500).json({ error: 'Erreur lors de la vérification du certificat.' });
  }
};

