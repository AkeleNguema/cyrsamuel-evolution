# 👶 CyrSamuel Evolution (WebDev Evolution • Sougoudzap-ville) 🎓

[![React 19](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Node.js & Express](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)](https://nodejs.org/)
[![Prisma ORM](https://img.shields.io/badge/Prisma-PostgreSQL-2D3748?logo=prisma)](https://www.prisma.io/)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC)

> **Une aventure web ludo-pédagogique et immersive : grandis de Bébé Dev à Super Tech Lead à travers les 7 quartiers de Sougoudzap-ville, défie le grand Juge Google Bot et décroche ton diplôme certifié !**

---

## 📖 Sommaire

- [✨ Présentation du Projet](#-présentation-du-projet)
- [🗺️ L'Aventure des 7 Niveaux d'Évolution](#️-laventure-des-7-niveaux-dévolution)
- [⚖️ Le Boss Final : La Haute Cour de Sougoudzap-ville](#️-le-boss-final--la-haute-cour-de-sougoudzap-ville)
- [📜 Certification & Registre d'Authenticité](#-certification--registre-dauthenticité)
- [🏗️ Architecture Technique & Stack](#️-architecture-technique--stack)
- [📂 Structure du Projet](#-structure-du-projet)
- [🚀 Guide d'Installation & Démarrage](#-guide-dinstallation--démarrage)
  - [Prérequis](#prérequis)
  - [1. Configuration du Backend](#1-configuration-du-backend)
  - [2. Configuration du Frontend](#2-configuration-du-frontend)
- [📡 API Endpoints](#-api-endpoints)
- [🛡️ Sécurité & Bonnes Pratiques](#️-sécurité--bonnes-pratiques)
- [🎨 Auteur & Crédits](#-auteur--crédits)

---

## ✨ Présentation du Projet

**CyrSamuel Evolution** est une application web fullstack interactive conçue pour vulgariser et enseigner les fondamentaux du développement web moderne, de l'ingénierie logicielle et du pilotage de projet technique.

À travers une narration engageante et visuellement soignée (univers coloré, métaphores enfantines devenant professionnelles, animations fluides), chaque joueur crée son avatar et progresse à travers les étapes clés de la vie d'un projet web : de la conception initiale jusqu'à la gouvernance RGPD et la sécurité en production.

---

## 🗺️ L'Aventure des 7 Niveaux d'Évolution

| Niveau | Rôle | Nom du Quartier | Thématique clé | Concepts abordés |
| :---: | :---: | :--- | :--- | :--- |
| **1** | 👶 Bébé Dev | **La Maternité** | Conception & Idées | PRD, TRD, Appflow, Backend Schema |
| **2** | 🧒 Enfant Dev | **Le Bac à Sable** | Design & UX Coloré | Mobile-first, CTA Unique, Réassurance, Empty States |
| **3** | 🧒 Enfant Dev | **La Cabane** | Infrastructure & Serveurs | Domaines, Hébergement, Reverse Proxy, Codes HTTP |
| **4** | 🧑‍🎓 Ado Dev | **Avenue du Partage** | Politesse & Implémentation | HTML Sémantique, A11y, UX Copywriting, Double Sécurité |
| **5** | 🧑‍🎓 Ado Dev | **Cabane Fortifiée** | Sécurité & Boucliers | SSL/HTTPS, Headers Helmet, Anti-DDoS, Rate Limiter, 2FA |
| **6** | 🧑‍💻 Adulte Dev | **Cour de Récréation** | Performance & Vitesse | Core Web Vitals, WebP, SEO Technique, Robots.txt & Sitemap |
| **7** | 👔 Tech Lead | **Fête de Fin d'Année** | Gouvernance & Production | RGPD, Consentement cookies, Analytics, Sauvegardes |

Chaque niveau comprend :
- 📚 **Fiches de révision illustrées** avec concepts clés et *Pro-Tips* d'experts.
- 🎯 **Mise en situation pratique / Quiz** pour tester sa compréhension avant le passage au niveau supérieur.
- 🔄 **Persistance et sauvegarde dynamique** de la progression du joueur.

---

## ⚖️ Le Boss Final : La Haute Cour de Sougoudzap-ville

Une fois les 7 niveaux validés, le joueur déverrouille l'accès à la **Salle d'audience du Grand Boss** :
- 🤖 **Face-à-face avec le Juge Google Bot** dans un tribunal interactif sonorisé avec effets de marteau de justice.
- ⏱️ **Examen sous haute tension** : 25 questions professionnelles réelles chronométrées (15 secondes par question).
- 🔒 **Contrôle d'intégrité 100 % serveur** : calcul du score et vérification d'éligibilité infalsifiables.
- 🎯 **Seuil d'excellence** : 80 % de bonnes réponses minimum requis pour obtenir le titre officiel.

---

## 📜 Certification & Registre d'Authenticité

En cas de succès à l'examen final :
1. **Génération instantanée d'un certificat PDF A4 Paysage** via `pdfkit` avec sceau doré, métadonnées du joueur, date et signature du Haut Tribunal.
2. **Attribution d'un jeton cryptographique UUID unique** (`verifyToken`).
3. **Page de vérification publique en direct** (`/verify/:token`) permettant à un recruteur ou tiers de vérifier en temps réel l'authenticité et la validité du diplôme.

---

## 🏗️ Architecture Technique & Stack

### Frontend
- **Framework** : [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Outillage** : [Vite 8](https://vitejs.dev/)
- **Styles & Design** : [Tailwind CSS v4](https://tailwindcss.com/) avec `@tailwindcss/vite`
- **Animations & Micro-interactions** : [Framer Motion](https://www.framer.com/motion/)
- **Iconographie** : [Lucide React](https://lucide.dev/)
- **Routage** : [React Router DOM v7](https://reactrouter.com/)

### Backend
- **Serveur** : [Node.js](https://nodejs.org/) & [Express 4](https://expressjs.com/) (TypeScript via `tsx`)
- **Base de données** : PostgreSQL (hébergé sur Supabase)
- **ORM** : [Prisma ORM 5](https://www.prisma.io/)
- **Génération PDF** : [PDFKit](https://pdfkit.org/)
- **Sécurité** : [Helmet](https://helmetjs.github.io/) (gestion des en-têtes CSP/CORP) & [CORS](https://expressjs.com/en/resources/middleware/cors.html)

---

## 📂 Structure du Projet

```text
cyrsamuel-evolution/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma         # Modèles User, Progress et Certificate
│   ├── public/certificates/      # Dossier des PDF générés
│   ├── src/
│   │   ├── controllers/          # Logique métier (user, exam, certificate)
│   │   ├── data/                 # Base de questions de l'examen final
│   │   ├── routes/               # Routes Express d'API
│   │   ├── services/             # Générateur PDF vectoriel
│   │   └── index.ts              # Point d'entrée du serveur Express
│   ├── .env                      # Variables d'environnement (PORT, DATABASE_URL)
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/           # Composants réutilisables (LevelChallengeModal...)
│   │   ├── pages/                # Écrans (Home, Roadmap, BossAudience, CertificateVerify)
│   │   ├── services/             # Client HTTP API (Fetch)
│   │   ├── App.tsx               # Routage principal
│   │   ├── main.tsx
│   │   └── index.css             # Directives Tailwind v4
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
└── README.md
```

---

## 🚀 Guide d'Installation & Démarrage

### Prérequis
- [Node.js](https://nodejs.org/) (version 18 ou supérieure recommandée)
- [npm](https://www.npmjs.com/) ou [pnpm](https://pnpm.io/)
- Une base de données PostgreSQL accessible (locale ou Supabase)

---

### 1. Configuration du Backend

```bash
# 1. Se positionner dans le dossier backend
cd backend

# 2. Installer les dépendances
npm install

# 3. Configurer le fichier .env
# Créez ou éditez le fichier backend/.env :
PORT=5000
DATABASE_URL="postgresql://user:password@host:5432/dbname?schema=public"
DIRECT_URL="postgresql://user:password@host:5432/dbname?schema=public"

# 4. Générer le client Prisma et synchroniser la base
npx prisma generate
npx prisma db push

# 5. Démarrer le serveur backend en mode développement
npm run dev
```

> Le backend est accessible sur : `http://localhost:5000`  
> Healthcheck : `http://localhost:5000/api/health`

---

### 2. Configuration du Frontend

Ouvrez un second terminal :

```bash
# 1. Se positionner dans le dossier frontend
cd frontend

# 2. Installer les dépendances
npm install

# 3. Lancer le serveur de développement Vite
npm run dev
```

> L'application frontend est accessible sur : `http://localhost:5173`

---

## 📡 API Endpoints

### Joueurs & Progression (`/api/users`)
- `POST /api/users/register` : Enregistrement d'un nouvel avatar (initialise le niveau 1).
- `GET /api/users/:id` : Récupère les données d'un joueur, son niveau et ses certificats.
- `PUT /api/users/:id/level-up` : Incrémente le niveau d'un joueur ou débloque le Boss final.

### Examen & Boss (`/api/exam`)
- `GET /api/exam/questions` : Récupère la liste des 25 questions aseptisées (sans les réponses correctes).
- `POST /api/exam/submit` : Évalue les réponses côté serveur, calcule le score et génère le certificat si le score est $\ge 80\%$.

### Certificats & Vérification (`/api/certificates`)
- `GET /api/certificates/:token/download` : Téléchargement direct du fichier PDF officiel.
- `GET /api/certificates/verify/:token` : Consultation publique des métadonnées du diplôme (nom, score, date, validité).

---

## 🛡️ Sécurité & Bonnes Pratiques

- **Validation Serveur Strict** : Les réponses du quiz final ne sont jamais exposées au client avant soumission.
- **En-têtes sécurisés avec Helmet** : Configuration fine des règles `Cross-Origin-Resource-Policy` pour autoriser le partage des ressources statiques et certificats.
- **Résilience F5 / Session** : Sauvegarde locale de l'ID joueur dans le `localStorage` pour reprise transparente en cas de rafraîchissement.
- **Modèle relationnel avec suppression en cascade** : Gestion propre du cycle de vie des utilisateurs, progressions et parchemins dans PostgreSQL via Prisma.

---

## 🎨 Auteur & Crédits

- **Projet** : CyrSamuel Evolution (WebDev Evolution)
- **Ville imaginaire** : *Sougoudzap-ville*
- Conçu avec passion, pédagogie et exigence technique pour propulser les futurs Tech Leads ! 🚀
