"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.levelUpPlayer = exports.getPlayer = exports.createPlayer = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createPlayer = async (req, res) => {
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
    }
    catch (error) {
        console.error("Erreur création joueur :", error);
        res.status(500).json({ error: "Erreur interne du serveur lors de la création du joueur." });
    }
};
exports.createPlayer = createPlayer;
const getPlayer = async (req, res) => {
    try {
        const id = req.params.id;
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
    }
    catch (error) {
        console.error("Erreur récupération joueur :", error);
        res.status(500).json({ error: "Erreur serveur lors de la récupération du joueur." });
    }
};
exports.getPlayer = getPlayer;
const levelUpPlayer = async (req, res) => {
    try {
        const id = req.params.id;
        const { expectedCurrentLevel } = req.body ?? {};
        if (!id) {
            res.status(400).json({ error: "L'identifiant du joueur est manquant dans l'URL." });
            return;
        }
        // Transaction Prisma pour garantir l'atomicité et l'autorité serveur
        const result = await prisma.$transaction(async (tx) => {
            const user = await tx.user.findUnique({
                where: { id },
                include: { progress: true }
            });
            if (!user) {
                throw new Error("PLAYER_NOT_FOUND");
            }
            const currentProgress = user.progress;
            if (!currentProgress) {
                throw new Error("PROGRESS_NOT_FOUND");
            }
            // Règle 1 : Ne peut pas progresser au-delà du niveau 7 (Boss)
            if (currentProgress.currentLevel >= 7) {
                throw new Error("MAX_LEVEL_REACHED");
            }
            // Règle 2 : Ne peut pas sauter un niveau ou rejouer un niveau déjà validé
            if (typeof expectedCurrentLevel === 'number' && expectedCurrentLevel !== currentProgress.currentLevel) {
                throw new Error("LEVEL_DESYNCHRONIZATION");
            }
            const newLevel = currentProgress.currentLevel + 1;
            const isBossUnlocked = newLevel === 7;
            const updatedProgress = await tx.progress.update({
                where: { userId: id },
                data: {
                    currentLevel: newLevel,
                    isBossUnlocked,
                    lastPlayedAt: new Date()
                }
            });
            const updatedUser = await tx.user.findUnique({
                where: { id },
                include: {
                    progress: true,
                    certificates: true
                }
            });
            return {
                newLevel,
                isBossUnlocked,
                player: updatedUser,
                progress: updatedProgress
            };
        });
        res.json({
            message: result.isBossUnlocked
                ? "Félicitations ! Niveau 7 atteint : la Salle d'audience du Boss CyrSamuel est débloquée !"
                : `Niveau ${result.newLevel} validé avec succès ! 🎉`,
            newLevel: result.newLevel,
            isBossUnlocked: result.isBossUnlocked,
            player: result.player,
            progress: result.progress
        });
    }
    catch (error) {
        if (error?.message === "PLAYER_NOT_FOUND") {
            res.status(404).json({ error: "Joueur introuvable." });
            return;
        }
        if (error?.message === "PROGRESS_NOT_FOUND") {
            res.status(404).json({ error: "Progression introuvable pour ce joueur." });
            return;
        }
        if (error?.message === "MAX_LEVEL_REACHED") {
            res.status(400).json({ error: "Le niveau maximum (Niveau 7) est déjà atteint. L'épreuve du Boss final vous attend !" });
            return;
        }
        if (error?.message === "LEVEL_DESYNCHRONIZATION") {
            res.status(409).json({ error: "Conflit de progression : tentative de saut de niveau ou validation répétée détectée." });
            return;
        }
        console.error("Erreur level up :", error);
        res.status(500).json({ error: "Erreur interne lors de la mise à jour du niveau." });
    }
};
exports.levelUpPlayer = levelUpPlayer;
