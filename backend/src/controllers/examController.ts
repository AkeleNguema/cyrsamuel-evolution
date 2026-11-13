import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { EXAM_QUESTIONS } from '../data/examQuestions';
import { generateCertificatePDF } from '../services/pdfService';
import crypto from 'crypto';

const prisma = new PrismaClient();

// Récupération des questions pour le frontend (sécurisée : sans les index des bonnes réponses)
export const getExamQuestions = async (_req: Request, res: Response) => {
  try {
    const sanitizedQuestions = EXAM_QUESTIONS.map((q) => ({
      id: q.id,
      category: q.category,
      question: q.question,
      options: q.options
    }));

    res.json({
      total: sanitizedQuestions.length,
      timeLimitPerQuestion: 15, // 15 secondes par question
      passingScorePercent: 80, // 80 % requis
      questions: sanitizedQuestions
    });
  } catch (error) {
    console.error('Erreur getExamQuestions :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des questions d\'examen.' });
  }
};

// Soumission et évaluation 100 % serveur de l'examen
export const submitExam = async (req: Request, res: Response) => {
  try {
    const { userId, answers } = req.body;

    if (!userId) {
      res.status(400).json({ error: 'L\'identifiant du joueur (userId) est requis.' });
      return;
    }

    if (!answers || typeof answers !== 'object') {
      res.status(400).json({ error: 'Les réponses transmises sont invalides ou incomplètes.' });
      return;
    }

    // 1. Vérification de l'éligibilité du joueur en base de données
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { progress: true, certificates: true }
    });

    if (!user) {
      res.status(404).json({ error: 'Joueur introuvable.' });
      return;
    }

    if (!user.progress?.isBossUnlocked && (user.progress?.currentLevel ?? 1) < 7) {
      res.status(403).json({
        error: 'Accès refusé : vous devez valider les 7 étapes de Sougoudzap-ville avant de défier le Boss final.'
      });
      return;
    }

    // 2. Calcul du score et évaluation des réponses côté serveur
    let correctCount = 0;
    const totalQuestions = EXAM_QUESTIONS.length;
    const corrections: Array<{
      questionId: number;
      question: string;
      category: string;
      userAnswer: number | null;
      correctAnswer: number;
      isCorrect: boolean;
      explanation: string;
    }> = [];

    EXAM_QUESTIONS.forEach((q) => {
      const userAnswerIndex = answers[q.id] !== undefined ? Number(answers[q.id]) : null;
      const isCorrect = userAnswerIndex === q.correctIndex;

      if (isCorrect) {
        correctCount++;
      }

      corrections.push({
        questionId: q.id,
        question: q.question,
        category: q.category,
        userAnswer: userAnswerIndex,
        correctAnswer: q.correctIndex,
        isCorrect,
        explanation: q.explanation
      });
    });

    const scorePercentage = Math.round((correctCount / totalQuestions) * 100);
    const passed = scorePercentage >= 80; // Seuil strict de 80 %

    // 3. Traitement selon le verdict
    if (!passed) {
      // Échec : aucun certificat généré, retour pédagogique
      res.json({
        passed: false,
        score: correctCount,
        totalQuestions,
        scorePercentage,
        verdict: 'OBJECTION DU JUGE GOOGLE BOT ! Score insuffisant.',
        message: `Vous avez obtenu ${scorePercentage}% (${correctCount}/${totalQuestions}). Un minimum de 80% (20 bonnes réponses) est requis pour obtenir le diplôme officiel.`,
        corrections: corrections.filter((c) => !c.isCorrect) // Renvoie les explications des erreurs pour orienter le joueur
      });
      return;
    }

    // 4. Succès : génération et enregistrement du certificat en base
    const verifyToken = crypto.randomUUID();
    const issuedAt = new Date();

    const pdfDownloadUrl = await generateCertificatePDF({
      avatarName: user.avatarName,
      verifyToken,
      score: correctCount,
      totalQuestions,
      scorePercentage,
      issuedAt
    });

    // Enregistrement Prisma
    const newCertificate = await prisma.certificate.create({
      data: {
        userId: user.id,
        pdfUrl: pdfDownloadUrl,
        verifyToken,
        issuedAt
      }
    });

    res.json({
      passed: true,
      score: correctCount,
      totalQuestions,
      scorePercentage,
      verdict: 'VERDICT : MAÎTRISE ACCORDÉE AVEC LES FÉLICITATIONS DU HAUT TRIBUNAL ! 🎉',
      message: `Félicitations ${user.avatarName} ! Vous êtes désormais officiellement reconnu(e) en tant que Tech Lead certifié(e).`,
      certificate: newCertificate,
      downloadUrl: pdfDownloadUrl,
      verifyToken
    });
  } catch (error) {
    console.error('Erreur submitExam :', error);
    res.status(500).json({ error: 'Erreur interne lors de la validation de l\'examen.' });
  }
};
