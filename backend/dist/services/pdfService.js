"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCertificateFilePath = exports.generateCertificatePDF = void 0;
const pdfkit_1 = __importDefault(require("pdfkit"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const CERTIFICATES_DIR = path_1.default.resolve(__dirname, '../../public/certificates');
// Assure que le dossier de stockage des certificats existe
if (!fs_1.default.existsSync(CERTIFICATES_DIR)) {
    fs_1.default.mkdirSync(CERTIFICATES_DIR, { recursive: true });
}
const generateCertificatePDF = async (data) => {
    return new Promise((resolve, reject) => {
        try {
            const fileName = `certificate_${data.verifyToken}.pdf`;
            const filePath = path_1.default.join(CERTIFICATES_DIR, fileName);
            // Format paysage A4 (841.89 x 595.28 points)
            const doc = new pdfkit_1.default({
                layout: 'landscape',
                size: 'A4',
                margin: 40,
                info: {
                    Title: `Certificat de Maîtrise Web - ${data.avatarName}`,
                    Author: 'Plateforme WebDev Evolution',
                    Subject: 'Examen Final de la Salle d\'audience de Sougoudzap-ville'
                }
            });
            const writeStream = fs_1.default.createWriteStream(filePath);
            doc.pipe(writeStream);
            const pageWidth = doc.page.width;
            const pageHeight = doc.page.height;
            // 1. Fond et Cadre Ornemental Professionnel
            doc.rect(20, 20, pageWidth - 40, pageHeight - 40)
                .lineWidth(4)
                .strokeColor('#1e3a8a') // Bleu royal profond
                .stroke();
            doc.rect(28, 28, pageWidth - 56, pageHeight - 56)
                .lineWidth(1.5)
                .strokeColor('#d97706') // Bordure dorée
                .stroke();
            // 2. En-tête officiel
            doc.font('Helvetica-Bold')
                .fontSize(13)
                .fillColor('#1e40af')
                .text('RÉPUBLIQUE DE SOUGOUDZAP-VILLE', 0, 55, { align: 'center', characterSpacing: 2 });
            doc.font('Helvetica')
                .fontSize(10)
                .fillColor('#64748b')
                .text('TRIBUNAL DU WEB & HAUTE COUR D\'ARCHITECTURE LOGICIELLE', 0, 75, { align: 'center', characterSpacing: 1.5 });
            // 3. Titre du diplôme
            doc.moveDown(1.5);
            doc.font('Helvetica-Bold')
                .fontSize(28)
                .fillColor('#0f172a')
                .text('CERTIFICAT DE MAÎTRISE WEB', { align: 'center' });
            // Ligne dorée décorative
            const lineY = doc.y + 5;
            doc.moveTo(pageWidth / 2 - 120, lineY)
                .lineTo(pageWidth / 2 + 120, lineY)
                .lineWidth(2)
                .strokeColor('#d97706')
                .stroke();
            // 4. Attribution
            doc.y = lineY + 15;
            doc.font('Helvetica-Oblique')
                .fontSize(12)
                .fillColor('#475569')
                .text('Le Haut Tribunal de Sougoudzap atteste officiellement que l\'initié(e)', { align: 'center' });
            // Nom du joueur en grand et mis en valeur
            doc.moveDown(0.6);
            doc.font('Helvetica-Bold')
                .fontSize(32)
                .fillColor('#1d4ed8')
                .text(data.avatarName.toUpperCase(), { align: 'center', characterSpacing: 1 });
            // 5. Texte de validation et mention
            doc.moveDown(0.6);
            doc.font('Helvetica')
                .fontSize(12)
                .fillColor('#334155')
                .text('a triomphé des 7 Épreuves du parcours initiatique WebDev Evolution et a brillamment\n' +
                'soutenu son projet lors de l\'épreuve ultime chronométrée de la Salle d\'audience.', { align: 'center', lineGap: 4 });
            doc.moveDown(0.8);
            doc.font('Helvetica-Bold')
                .fontSize(13)
                .fillColor('#059669')
                .text(`Verdict du Juge Google Bot : SUCCÈS OFFICIEL AVEC ${data.scorePercentage}% DE RÉUSSITE (${data.score}/${data.totalQuestions} questions)`, { align: 'center' });
            // 6. Bas de page : Signatures, Sceau et Token de vérification
            const bottomY = pageHeight - 125;
            // Bloc Date et Token (Gauche)
            const formattedDate = data.issuedAt.toLocaleDateString('fr-FR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            });
            doc.font('Helvetica-Bold')
                .fontSize(9)
                .fillColor('#475569')
                .text('DÉLIVRÉ LE :', 60, bottomY);
            doc.font('Helvetica')
                .fontSize(9)
                .text(formattedDate, 60, bottomY + 14);
            doc.font('Helvetica-Bold')
                .fontSize(8)
                .fillColor('#64748b')
                .text('IDENTIFIANT UNIQUE DE VÉRIFICATION :', 60, bottomY + 32);
            doc.font('Courier')
                .fontSize(8)
                .fillColor('#0f172a')
                .text(data.verifyToken, 60, bottomY + 44);
            // Sceau Central
            doc.circle(pageWidth / 2, bottomY + 25, 30)
                .lineWidth(1.5)
                .strokeColor('#d97706')
                .stroke();
            doc.font('Helvetica-Bold')
                .fontSize(8)
                .fillColor('#b45309')
                .text('SCEAU OFFICIEL\nCERTIFIÉ', pageWidth / 2 - 28, bottomY + 18, { width: 56, align: 'center' });
            // Bloc Signature Tech Lead (Droite)
            doc.font('Helvetica-Bold')
                .fontSize(10)
                .fillColor('#1e3a8a')
                .text('L\'Architecte & Tech Lead', pageWidth - 250, bottomY, { width: 190, align: 'right' });
            doc.font('Helvetica-Oblique')
                .fontSize(13)
                .fillColor('#3b82f6')
                .text('Ingrid — Tech Lead', pageWidth - 250, bottomY + 16, { width: 190, align: 'right' });
            doc.font('Helvetica')
                .fontSize(8)
                .fillColor('#94a3b8')
                .text('WebDev Evolution Academy', pageWidth - 250, bottomY + 36, { width: 190, align: 'right' });
            doc.end();
            writeStream.on('finish', () => {
                resolve(`/api/certificates/${data.verifyToken}/download`);
            });
            writeStream.on('error', (err) => {
                reject(err);
            });
        }
        catch (error) {
            reject(error);
        }
    });
};
exports.generateCertificatePDF = generateCertificatePDF;
const getCertificateFilePath = (token) => {
    return path_1.default.join(CERTIFICATES_DIR, `certificate_${token}.pdf`);
};
exports.getCertificateFilePath = getCertificateFilePath;
