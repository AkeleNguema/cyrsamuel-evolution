import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import path from 'path';
import { PrismaClient } from '@prisma/client';

// Import des routes
import userRoutes from './routes/userRoutes';
import examRoutes from './routes/examRoutes';
import certificateRoutes from './routes/certificateRoutes';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(cors());
app.use(express.json());

// Dossier public statique (certificats)
app.use('/public', express.static(path.resolve(__dirname, '../public')));

// Route de test (Healthcheck + DB)
app.get('/api/health', async (_req, res) => {
  try {
    const usersCount = await prisma.user.count();
    const certificatesCount = await prisma.certificate.count();
    res.json({ 
      status: '🚀 Opérationnel', 
      message: 'Bienvenue à la Haute Cour de Sougoudzap-ville !',
      joueursInscrits: usersCount,
      certificatsDelivres: certificatesCount
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'Erreur', message: 'Impossible de contacter la base de données.' });
  }
});

// Activation des routes d'API
app.use('/api/users', userRoutes);
app.use('/api/exam', examRoutes);
app.use('/api/certificates', certificateRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Serveur Backend démarré sur http://localhost:${PORT}`);
});
