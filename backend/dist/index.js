"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const client_1 = require("@prisma/client");
// Import des routes
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const examRoutes_1 = __importDefault(require("./routes/examRoutes"));
const certificateRoutes_1 = __importDefault(require("./routes/certificateRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
const PORT = process.env.PORT || 5000;
// Middlewares
app.use((0, helmet_1.default)({
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Dossier public statique (certificats)
app.use('/public', express_1.default.static(path_1.default.resolve(__dirname, '../public')));
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ status: 'Erreur', message: 'Impossible de contacter la base de données.' });
    }
});
// Activation des routes d'API
app.use('/api/users', userRoutes_1.default);
app.use('/api/exam', examRoutes_1.default);
app.use('/api/certificates', certificateRoutes_1.default);
app.listen(PORT, () => {
    console.log(`🚀 Serveur Backend démarré sur http://localhost:${PORT}`);
});
