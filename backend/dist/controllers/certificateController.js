"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyCertificate = exports.downloadCertificate = void 0;
const client_1 = require("@prisma/client");
const fs_1 = __importDefault(require("fs"));
const pdfService_1 = require("../services/pdfService");
const prisma = new client_1.PrismaClient();
// Téléchargement du fichier PDF physique
const downloadCertificate = async (req, res) => {
    try {
        const token = req.params.token;
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
        const filePath = (0, pdfService_1.getCertificateFilePath)(token);
        // Si le fichier physique a été nettoyé mais que le certificat existe en base, on le régénère
        if (!fs_1.default.existsSync(filePath)) {
            await (0, pdfService_1.generateCertificatePDF)({
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
        const fileStream = fs_1.default.createReadStream(filePath);
        fileStream.pipe(res);
    }
    catch (error) {
        console.error('Erreur downloadCertificate :', error);
        res.status(500).json({ error: 'Erreur lors du téléchargement du certificat.' });
    }
};
exports.downloadCertificate = downloadCertificate;
// Route publique de vérification de certificat
const verifyCertificate = async (req, res) => {
    try {
        const token = req.params.token;
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
    }
    catch (error) {
        console.error('Erreur verifyCertificate :', error);
        res.status(500).json({ error: 'Erreur lors de la vérification du certificat.' });
    }
};
exports.verifyCertificate = verifyCertificate;
