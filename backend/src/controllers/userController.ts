import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createPlayer = async (req: Request, res: Response) => {
  try {
    const { avatarName } = req.body;

    if (!avatarName || !avatarName.trim()) {
      res.status(400).json({ error: "Le nom de l'avatar est requis pour entrer à Sougoudzap-ville." });
      return;
    }

    // Création du User ET de sa ligne de Progress associée (Niveau 1)
    const newPlayer = await prisma.user.create({
      data: {
        avatarName: avatarName.trim(),
        progress: {
          create: {
            currentLevel: 1,
            isBossUnlocked: false
          }
        }
      },
      include: {
        progress: true,
        certificates: true
      }
    });

    res.status(201).json({ 
      message: "Nouveau Bébé Dev enregistré avec succès !", 
      player: newPlayer 
    });
  } catch (error) {
    console.error("Erreur création joueur :", error);
    res.status(500).json({ error: "Erreur interne du serveur lors de la création du joueur." });
  }
};

export const getPlayer = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    if (!id) {
      res.status(400).json({ error: "L'identifiant du joueur est requis." });
      return;
    }

    const player = await prisma.user.findUnique({
      where: { id },
      include: {
        progress: true,
        certificates: true
      }
    });

    if (!player) {
      res.status(404).json({ error: "Joueur introuvable à Sougoudzap-ville." });
      return;
    }

    res.json({ player });
  } catch (error) {
    console.error("Erreur récupération joueur :", error);
    res.status(500).json({ error: "Erreur serveur lors de la récupération du joueur." });
  }
};

export const levelUpPlayer = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const { expectedCurrentLevel } = req.body ?? {};

    if (!id) {
      res.status(400).json({ error: "L'identifiant du joueur est manquant dans l'URL." });
      return;
    }

    // 1. Recherche du joueur et de sa progression
    const user = await prisma.user.findUnique({
      where: { id },
      include: { progress: true }
    });

    if (!user) {
      res.status(404).json({ error: "Joueur introuvable." });
      return;
    }

    const currentProgress = user.progress;
    if (!currentProgress) {
      res.status(404).json({ error: "Progression introuvable pour ce joueur." });
      return;
    }

    // Règle 1 : Ne peut pas progresser au-delà du niveau 7 (Boss)
    if (currentProgress.currentLevel >= 7) {
      res.status(400).json({ error: "Le niveau maximum (Niveau 7) est déjà atteint. L'épreuve du Boss final vous attend !" });
      return;
    }

    // Règle 2 : Ne peut pas sauter un niveau ou rejouer un niveau déjà validé
    if (typeof expectedCurrentLevel === 'number' && expectedCurrentLevel !== currentProgress.currentLevel) {
      res.status(409).json({ error: "Conflit de progression : tentative de saut de niveau ou validation répétée détectée." });
      return;
    }

    const newLevel = currentProgress.currentLevel + 1;
    const isBossUnlocked = newLevel >= 7;

    // 2. Mise à jour de la table Progress
    const updatedProgress = await prisma.progress.update({
      where: { userId: id },
      data: {
        currentLevel: newLevel,
        isBossUnlocked,
        lastPlayedAt: new Date()
      }
    });

    // 3. Récupération des données complètes du joueur à jour
    const updatedUser = await prisma.user.findUnique({
      where: { id },
      include: {
        progress: true,
        certificates: true
      }
    });

    res.json({
      message: isBossUnlocked 
        ? "Félicitations ! Niveau 7 atteint : la Salle d'audience du Boss CyrSamuel est débloquée !" 
        : `Niveau ${newLevel} validé avec succès ! 🎉`,
      newLevel,
      isBossUnlocked,
      player: updatedUser,
      progress: updatedProgress
    });
  } catch (error: any) {
    console.error("Erreur level up :", error);
    res.status(500).json({ error: "Erreur interne lors de la mise à jour du niveau." });
  }
};
