# Journal des Modifications Techniques (Changelog)
## Projet : WebDev Evolution — De Sougoudzap-ville à la Haute Cour

**Date :** Novembre 2026  
**Tech Lead & Architecte :** Ingrid  
**Stack Technique :** React 19, Tailwind CSS v4, Vite 8, Framer Motion, Node.js, Express, PostgreSQL, Prisma ORM, Supabase, PDFKit.

---

## 1. Résolution de l'incident initial sur Tailwind CSS v4

### Problème diagnostiqué (Root Cause)
- La couche CSS `@layer components,utilities;` était entièrement vide (bundle CSS à 4.19 kB sans aucune classe utilitaire).
- **Cause :** Sous Windows x64, le module natif Rust/NAPI `@tailwindcss/oxide-win32-x64-msvc` n'était pas installé dans `node_modules`. Tailwind CSS v4 basculait silencieusement sur le runtime WebAssembly (WASI) qui ne gère pas les chemins avec lettres de lecteur (`C:\...`), scannant 0 fichiers et produisant 0 utilitaires.

### Actions correctives
- Installation de la dépendance native : `npm install -D @tailwindcss/oxide-win32-x64-msvc`.
- Inversion de l'ordre des plugins dans `vite.config.ts` : placement de `tailwindcss()` avant `react()` pour analyser les modules avant la transformation JSX.
- **Résultat :** Scanner opérationnel (279+ candidats détectés), feuille de style générée à 50.73 kB contenant tous les utilitaires.

---

## 2. Phase 1 — Roadmap Interactive de Sougoudzap-ville

### Fichiers modifiés / créés
- `frontend/src/pages/Roadmap.tsx` : Refonte complète du composant.
- `frontend/src/pages/Home.tsx` : Persistance locale de l'ID du joueur dans `localStorage`.

### Implémentations techniques
- **Structure des 7 Étapes (PRD) :**
  1. *La Maternité de Sougoudzap-ville* — **Conception** (PRD, TRD, Appflow, Backend Schema).
  2. *Le Bac à Sable* — **Design & UX** (Mobile-first, CTA unique, Réassurance, Empty states).
  3. *Les Fondations de la Cabane* — **Infrastructure** (Noms de domaine, Hébergement, Reverse Proxy, Codes HTTP).
  4. *Le Code de Bonne Conduite* — **Implémentation** (HTML Sémantique, A11y, UX Copywriting, Validation).
  5. *L'Adolescence Rebelle* — **Sécurité** (SSL/HTTPS, En-têtes Helmet, Anti-DDoS, Rate Limiter, 2FA).
  6. *L'Entraînement Sportif* — **Performance & SEO** (Core Web Vitals, Optimisation WebP, SEO Technique).
  7. *Le Costume Cravate* — **Légal & Déploiement** (RGPD, Cookies bloquants, Analytics, Backups).
- **Évolution visuelle de l'Avatar :**
  - Niveau 1 : `👶 Bébé Dev`
  - Niveaux 2-3 : `🧒 Enfant Dev`
  - Niveaux 4-5 : `🧑‍🎓 Ado Dev`
  - Niveau 6 : `🧑‍💻 Adulte Dev`
  - Niveau 7 : `👔 Tech Lead`
- **Animations Framer Motion :**
  - `layoutId="active-avatar-node"` et `layoutId="active-avatar-badge"` pour un déplacement fluide d'étape en étape.
  - Remplissage progressif animé du chemin connecteur vertical (`transition: { duration: 0.8 }`).
  - Toast de notification animé avec feedback contextuel.
- **Résilience :**
  - Récupération de l'état joueur via `useLocation().state?.player`.
  - En cas de rafraîchissement (`F5`), interrogation automatique de l'API `GET /api/users/:id` via `webdev_player_id`.

---

## 3. Phase 2 — Mécanique de Progression & Level Up Sécurisée

### Fichiers modifiés / créés
- `backend/src/controllers/userController.ts`
- `backend/src/routes/userRoutes.ts`
- `frontend/src/services/api.ts`

### Implémentations techniques
- **Transaction Prisma `$transaction` :**
  Garantit l'atomicité et l'autorité serveur sur la progression.
- **Règles métier anti-triche :**
  - Rejet de saut de niveau ou de désynchronisation (`409 Conflict`).
  - Blocage au-delà du niveau 7 (`400 Bad Request`).
  - Déblocage automatique de `isBossUnlocked: true` lors de la validation du niveau 7.
- **Endpoints ajoutés :**
  - `GET /api/users/:id` : Récupération du profil, de la progression et des certificats.
  - `PUT /api/users/:id/level-up` : Validation du niveau supérieur.

---

## 4. Phase 3 — Boss Final & Salle d'Audience (Le Jugement Dernier)

### Fichiers créés
- `backend/src/data/examQuestions.ts`
- `backend/src/controllers/examController.ts`
- `backend/src/routes/examRoutes.ts`
- `frontend/src/pages/BossAudience.tsx`

### Implémentations techniques
- **Banque de 25 questions QCM :**
  Couvre les 25 concepts fondamentaux du parcours, avec 4 options par question et justifications pédagogiques.
- **Chronomètre strict de 15 secondes :**
  Gestion via `setInterval` avec barre de temps SVG animée et passage automatique à la question suivante à 0s.
- **Évaluation 100 % Côté Serveur :**
  - Le frontend reçoit les questions **sans la clé de correction** (`correctIndex` filtré).
  - Le calcul du score est exclusivement effectué par le backend (`POST /api/exam/submit`).
  - **Seuil d'admission : 80 %** (au moins 20/25).
  - Si score < 80 % : verdict d'échec du Juge Google Bot, aucun certificat créé, renvoi pédagogique des explications sur les erreurs.
  - Si score $\ge$ 80 % : admission officielle et déclenchement de la certification.

---

## 5. Phase 4 — Certification PDF & Salle d'Audience

### Fichiers créés
- `backend/src/services/pdfService.ts`
- `backend/src/controllers/certificateController.ts`
- `backend/src/routes/certificateRoutes.ts`
- `frontend/src/pages/CertificateVerify.tsx`

### Implémentations techniques
- **Service de génération PDF (PDFKit) :**
  - Format officiel A4 Paysage (`landscape`).
  - Cadre ornemental bleu royal et or.
  - Intégration du nom de l'élève en typographie mise en valeur.
  - Mentions officielles de réussite, score obtenu face au Juge Google Bot.
  - Sceau officiel certifié de Sougoudzap-ville.
  - Signature de l'Architecte & Tech Lead Ingrid.
  - Jeton de vérification UUID unique (`verifyToken`).
- **Persistance Prisma :**
  - Modèle `Certificate` : `userId`, `pdfUrl`, `verifyToken`, `issuedAt`.
- **Téléchargement direct :**
  - `GET /api/certificates/:token/download` en flux binaire avec en-têtes `Content-Disposition: attachment`.
- **Vérification publique :**
  - `GET /api/certificates/verify/:token` et page React `/verify/:token` permettant aux recruteurs de valider l'authenticité d'un diplôme.

---

## 6. Récapitulatif des Tests et Validation

| Module | Outil de test | Résultat |
| :--- | :--- | :---: |
| **Backend TypeScript** | `npm run build` (`tsc`) | **Succès (0 erreur)** |
| **Frontend TypeScript & Vite** | `npm run build` (`tsc -b && vite build`) | **Succès (0 erreur, 717ms)** |
| **Base de Données Supabase** | Script d'intégration de bout en bout | **Succès (Niveau 1 $\rightarrow$ 7, Boss, PDF)** |
| **Serveur Backend Actif** | Endpoint `/api/exam/questions` sur port 5000 | **200 OK (25 questions, 15s, 80%)** |

