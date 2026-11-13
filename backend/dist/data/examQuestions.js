"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EXAM_QUESTIONS = void 0;
exports.EXAM_QUESTIONS = [
    {
        id: 1,
        category: 'Conception (Niveau 1)',
        question: 'Que formalise principalement le PRD (Product Requirements Document) ?',
        options: [
            'Le code CSS des maquettes',
            'La vision produit, les besoins utilisateurs et les fonctionnalités Must-have',
            'Le schéma des index de la base PostgreSQL',
            'Le script de déploiement Docker'
        ],
        correctIndex: 1,
        explanation: 'Le PRD définit le "Quoi" et le "Pourquoi" : la vision fonctionnelle et les attentes utilisateurs indispensables.'
    },
    {
        id: 2,
        category: 'Conception (Niveau 1)',
        question: 'Quel est l\'objectif central du TRD (Technical Requirements Document) ?',
        options: [
            'Négocier le tarif du nom de domaine',
            'Établir la charte éditoriale et publicitaire',
            'Définir l\'architecture technique, la stack, la scalabilité et les contraintes système',
            'Rédiger les mentions légales RGPD'
        ],
        correctIndex: 2,
        explanation: 'Le TRD traduit les besoins fonctionnels en spécifications d\'architecture, de sécurité et de choix de stack.'
    },
    {
        id: 3,
        category: 'Conception (Niveau 1)',
        question: 'À quoi sert l\'Appflow avant de débuter l\'écriture du code ?',
        options: [
            'À cartographier le parcours complet et les embranchements de l\'utilisateur dans l\'application',
            'À mesurer le temps de réponse du processeur',
            'À générer automatiquement les composants React',
            'À compresser les images du projet'
        ],
        correctIndex: 0,
        explanation: 'L\'Appflow visualise tous les parcours, écrans et interactions pour éviter les impasses d\'expérience utilisateur.'
    },
    {
        id: 4,
        category: 'Conception (Niveau 1)',
        question: 'Pourquoi modéliser le schéma relationnel de la base de données (ex: Prisma) en amont ?',
        options: [
            'Pour remplacer le serveur Express',
            'Pour éviter les doublons, garantir l\'intégrité référentielle et anticiper les requêtes clés',
            'Pour éliminer le besoin d\'un backend',
            'Pour réduire la taille du fichier HTML'
        ],
        correctIndex: 1,
        explanation: 'Un schéma relationnel rigoureux garantit la consistance des données et évite des migrations destructives futures.'
    },
    {
        id: 5,
        category: 'Design & UX (Niveau 2)',
        question: 'Quelle est la règle d\'or du design "Mobile-first" ?',
        options: [
            'Refuser les utilisateurs sur ordinateur de bureau',
            'Concevoir d\'abord pour les contraintes et petits écrans mobiles avant d\'enrichir pour grand écran',
            'Mettre tout le texte en gras',
            'Désactiver le JavaScript sur mobile'
        ],
        correctIndex: 1,
        explanation: 'Le Mobile-first oblige à prioriser l\'essentiel sur écran restreint, puis à enrichir progressivement via les media queries.'
    },
    {
        id: 6,
        category: 'Design & UX (Niveau 2)',
        question: 'Pourquoi privilégier un CTA (Call to Action) unique et évident par section ?',
        options: [
            'Pour empêcher l\'utilisateur de quitter la page',
            'Pour éliminer la surcharge cognitive et guider clairement l\'action prioritaire',
            'Parce que le HTML n\'autorise qu\'une seule balise button',
            'Pour accélérer la vitesse de la carte réseau'
        ],
        correctIndex: 1,
        explanation: 'Multiplier les boutons concurrents crée la paralysie du choix. Un bon design met en avant une action principale.'
    },
    {
        id: 7,
        category: 'Design & UX (Niveau 2)',
        question: 'Quel élément renforce la réassurance immédiate de l\'utilisateur lors d\'une action clé ?',
        options: [
            'Une popup publicitaire clignotante',
            'Un message de confirmation clair, des badges de sécurité et des retours d\'état explicites',
            'Un rechargement complet et silencieux de la page',
            'La disparition immédiate du formulaire'
        ],
        correctIndex: 1,
        explanation: 'La réassurance passe par le feedback immédiat, les micro-copies bienveillantes et la transparence des états.'
    },
    {
        id: 8,
        category: 'Design & UX (Niveau 2)',
        question: 'Quelle est la meilleure pratique pour gérer un "Empty State" (ex: recherche sans résultat) ?',
        options: [
            'Afficher un écran blanc sans texte',
            'Déclencher une erreur HTTP 500',
            'Expliquer l\'absence de données avec bienveillance et proposer une action de rebond ou un conseil',
            'Déconnecter automatiquement le joueur'
        ],
        correctIndex: 2,
        explanation: 'Un empty state soigné transforme un moment de vide en opportunité d\'orientation pour l\'utilisateur.'
    },
    {
        id: 9,
        category: 'Infrastructure (Niveau 3)',
        question: 'Quel enregistrement DNS fait pointer un nom de domaine vers une adresse IPv4 de serveur ?',
        options: [
            'Enregistrement MX',
            'Enregistrement TXT',
            'Enregistrement A',
            'Enregistrement CNAME'
        ],
        correctIndex: 2,
        explanation: 'L\'enregistrement A (Address) relie un nom d\'hôte à son adresse IPv4 publique.'
    },
    {
        id: 10,
        category: 'Infrastructure (Niveau 3)',
        question: 'Quel rôle essentiel joue un Reverse Proxy (comme Nginx) devant une application Node.js ?',
        options: [
            'Remplacer la base de données',
            'Terminaison SSL, répartition de charge (load balancing), compression et masquage du port interne Node',
            'Compiler le code TypeScript en direct',
            'Envoyer des notifications push sur mobile'
        ],
        correctIndex: 1,
        explanation: 'Nginx protège l\'application Node.js en gérant le SSL, les en-têtes et le routage public sans exposer le runtime Node.'
    },
    {
        id: 11,
        category: 'Infrastructure (Niveau 3)',
        question: 'Quel code d\'état HTTP signale que la ressource demandée n\'existe pas sur le serveur ?',
        options: [
            '200 OK',
            '301 Moved Permanently',
            '404 Not Found',
            '500 Internal Server Error'
        ],
        correctIndex: 2,
        explanation: '404 indique l\'absence de ressource demandée côté client, tandis que 500 désigne une défaillance serveur.'
    },
    {
        id: 12,
        category: 'Infrastructure (Niveau 3)',
        question: 'Où doit impérativement résider une clé API secrète (ex: Stripe, Supabase Service Role) ?',
        options: [
            'Dans le code frontend React visible dans le bundle JS',
            'Dans une variable d\'environnement (.env) côté backend, jamais envoyée au navigateur',
            'Dans une balise méta du document HTML',
            'Dans le localStorage du visiteur'
        ],
        correctIndex: 1,
        explanation: 'Toute clé secrète présente dans le frontend peut être interceptée par n\'importe quel visiteur via l\'inspecteur de code.'
    },
    {
        id: 13,
        category: 'Implémentation (Niveau 4)',
        question: 'Pourquoi privilégier le HTML sémantique (header, nav, main, article) plutôt que des div ?',
        options: [
            'Pour améliorer l\'accessibilité (lecteurs d\'écran), le SEO et la maintenabilité du code',
            'Parce que les div sont obsolètes depuis 1999',
            'Pour réduire le coût de l\'hébergement',
            'Pour forcer le texte à s\'afficher en bleu'
        ],
        correctIndex: 0,
        explanation: 'Les balises sémantiques donnent du sens à la structure du document pour les technologies d\'assistance et les robots d\'indexation.'
    },
    {
        id: 14,
        category: 'Implémentation (Niveau 4)',
        question: 'Quelle exigence d\'accessibilité (A11y) s\'impose pour les images informatives ?',
        options: [
            'Avoir obligatoirement une extension .gif',
            'Posséder un attribut alt textuel précis décrivant le contenu de l\'image',
            'Faire au moins 4000 pixels de large',
            'Être encadrée d\'une bordure rouge'
        ],
        correctIndex: 1,
        explanation: 'L\'attribut alt permet aux personnes malvoyantes utilisant un lecteur d\'écran de comprendre le contenu de l\'image.'
    },
    {
        id: 15,
        category: 'Implémentation (Niveau 4)',
        question: 'Comment doit être formulé un message d\'erreur orienté utilisateur (UX Copywriting) ?',
        options: [
            'NullPointerException at line 248 in auth.controller.ts',
            'Clair, sans jargon technique agressif, expliquant la cause et l\'action concrète pour résoudre le problème',
            'ERREUR FATALE : VOTRE COMPTE EST DÉTRUIT',
            'Uniquement un code d\'erreur en hexadécimal'
        ],
        correctIndex: 1,
        explanation: 'Une erreur ne doit jamais humilier ou paniquer l\'utilisateur : elle doit l\'orienter avec clarté vers la solution.'
    },
    {
        id: 16,
        category: 'Implémentation (Niveau 4)',
        question: 'Pourquoi la validation de formulaire côté frontend ne dispense-t-elle jamais de la validation backend ?',
        options: [
            'Parce que le backend s\'ennuie sans validation',
            'Car le frontend peut être court-circuité par n\'importe quelle requête directe (curl, Postman)',
            'Pour ralentir volontairement les robots',
            'Parce que JavaScript ne gère pas les nombres entiers'
        ],
        correctIndex: 1,
        explanation: 'Le frontend est la première ligne pour le confort utilisateur, mais seul le backend fait foi pour la sécurité et la persistance.'
    },
    {
        id: 17,
        category: 'Sécurité (Niveau 5)',
        question: 'Que garantit le protocole HTTPS / TLS par rapport au HTTP classique ?',
        options: [
            'Le chiffrement des échanges en transit et l\'authentification du serveur',
            'L\'assurance qu\'il n\'y aura aucun bug dans le code',
            'Le blocage automatique de tous les spams par email',
            'La gratuité à vie des bases de données'
        ],
        correctIndex: 0,
        explanation: 'HTTPS chiffre le canal de communication pour empêcher l\'écoute clandestine et les attaques de l\'homme du milieu (MitM).'
    },
    {
        id: 18,
        category: 'Sécurité (Niveau 5)',
        question: 'Quel en-tête HTTP géré par Helmet protège contre le Clickjacking en interdisant l\'inclusion dans un iframe non autorisé ?',
        options: [
            'X-Frame-Options (ou Content-Security-Policy frame-ancestors)',
            'Access-Control-Allow-Origin',
            'Accept-Encoding',
            'Cache-Control'
        ],
        correctIndex: 0,
        explanation: 'X-Frame-Options empêche des sites malveillants d\'encapsuler votre page dans un iframe invisible pour piéger les clics.'
    },
    {
        id: 19,
        category: 'Sécurité (Niveau 5)',
        question: 'Quel est le rôle principal d\'un middleware de Rate Limiting sur les routes d\'API sensibles ?',
        options: [
            'Calculer la moyenne des notes des utilisateurs',
            'Limiter le nombre de requêtes par IP dans une fenêtre de temps donnée pour bloquer le brute-force et le déni de service',
            'Rendre les requêtes deux fois plus rapides',
            'Changer automatiquement les mots de passe'
        ],
        correctIndex: 1,
        explanation: 'Le Rate Limiting protège l\'API contre le pilonnage automatisé, le scraping abusif et les attaques par force brute.'
    },
    {
        id: 20,
        category: 'Sécurité (Niveau 5)',
        question: 'Dans une authentification à deux facteurs (2FA), quel principe est appliqué ?',
        options: [
            'Saisir deux fois le même mot de passe',
            'Combiner ce que l\'on sait (mot de passe) et ce que l\'on possède (jeton TOTP / smartphone)',
            'Créer deux comptes distincts pour chaque utilisateur',
            'Avoir deux adresses emails différentes'
        ],
        correctIndex: 1,
        explanation: 'La 2FA associe au moins deux facteurs distincts pour garantir que la compromission du mot de passe ne suffit pas à pirater le compte.'
    },
    {
        id: 21,
        category: 'Performance & SEO (Niveau 6)',
        question: 'Que mesure l\'indicateur Core Web Vitals nommé LCP (Largest Contentful Paint) ?',
        options: [
            'Le nombre total de lignes de CSS chargées',
            'Le temps nécessaire pour afficher le plus grand élément de contenu visible dans la zone d\'affichage initiale',
            'Le nombre de clics nécessaires pour acheter un article',
            'La mémoire vive utilisée par la base de données'
        ],
        correctIndex: 1,
        explanation: 'Le LCP évalue la vitesse de chargement perçue en mesurant l\'apparition du bloc principal visible.'
    },
    {
        id: 22,
        category: 'Performance & SEO (Niveau 6)',
        question: 'Quel est le bénéfice principal du format d\'image WebP moderne par rapport au PNG/JPEG traditionnel ?',
        options: [
            'Une compression supérieure réduisant drastiquement le poids à qualité visuelle équivalente',
            'L\'obligation d\'utiliser un écran spécial',
            'L\'absence totale de pixels',
            'L\'impossibilité pour Google d\'indexer l\'image'
        ],
        correctIndex: 0,
        explanation: 'WebP offre des gains de poids de 25% à 35% par rapport aux formats anciens, améliorant considérablement le temps de chargement.'
    },
    {
        id: 23,
        category: 'Performance & SEO (Niveau 6)',
        question: 'Quel fichier placé à la racine du site indique la liste ordonnée des URLs à explorer par les moteurs de recherche ?',
        options: [
            'package.json',
            '.gitignore',
            'sitemap.xml',
            'tsconfig.json'
        ],
        correctIndex: 2,
        explanation: 'Le fichier sitemap.xml sert de plan de site standardisé guidant les moteurs de recherche pour une indexation exhaustive.'
    },
    {
        id: 24,
        category: 'Légal & Déploiement (Niveau 7)',
        question: 'Selon la réglementation RGPD, quand est-il légal de déposer des cookies de mesure d\'audience ou de ciblage ?',
        options: [
            'Dès la première seconde de visite sans attendre',
            'Uniquement après avoir recueilli le consentement libre, éclairé et explicite de l\'utilisateur via une bannière bloquante',
            'Seulement la nuit entre 22h et 6h',
            'Uniquement si le site est en français'
        ],
        correctIndex: 1,
        explanation: 'Le RGPD interdit le déclenchement préalable de traceurs non essentiels sans accord explicite préalable de l\'internaute.'
    },
    {
        id: 25,
        category: 'Légal & Déploiement (Niveau 7)',
        question: 'Quelle politique de sauvegarde (Backup) est indispensable pour la résilience d\'une base de production ?',
        options: [
            'Aucune sauvegarde si la base est chez un hébergeur cloud',
            'Sauvegardes automatisées, chiffrées, déportées sur un site distant, et testées régulièrement en restauration',
            'Un simple copier-coller annuel sur une clé USB',
            'Sauvegarder uniquement la liste des noms des tables'
        ],
        correctIndex: 1,
        explanation: 'Une sauvegarde non testée en restauration n\'est pas une sauvegarde. La règle de résilience exige automatisation et déportation sécurisée.'
    }
];
