import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  Layers, 
  Palette, 
  Server, 
  Code2, 
  ShieldAlert, 
  Zap, 
  Briefcase, 
  Gamepad2, 
  Lightbulb, 
  Check, 
  RotateCcw,
  Loader2
} from 'lucide-react';

export interface LessonCard {
  title: string;
  concept: string;
  summary: string;
  proTip: string;
}

export interface LevelModule {
  level: number;
  title: string;
  theme: string;
  avatarRole: string;
  sticker: string;
  icon: typeof Layers;
  storyIntro: string;
  lessons: LessonCard[];
  quiz: {
    situation: string;
    question: string;
    options: {
      id: string;
      text: string;
      isCorrect: boolean;
      feedback: string;
    }[];
  };
}

const LEVEL_MODULES: Record<number, LevelModule> = {
  1: {
    level: 1,
    title: 'La Maternité de Sougoudzap-ville',
    theme: 'Conception & Architecture',
    avatarRole: 'Bébé Dev',
    sticker: '🍼',
    icon: Layers,
    storyIntro: 'Le bébé pousse son premier cri dans le dispensaire de Sougoudzap-ville. Il pleure s\'il ne sait pas ce qu\'il veut coder dans sa vie !',
    lessons: [
      {
        title: 'Le PRD (Product Requirements Document)',
        concept: 'Le "Pourquoi" & le "Quoi"',
        summary: 'Le cahier de dessin qui formalise les besoins des utilisateurs et les fonctionnalités indispensables (Must-have).',
        proTip: 'Ne jamais commencer à coder sans PRD validé, sinon vous construirez un château de sable que personne ne visite !'
      },
      {
        title: 'Le TRD (Technical Requirements Document)',
        concept: 'Le "Comment" technique',
        summary: 'La boîte à outils : choix de la stack, des technologies, et des règles de solidité du système.',
        proTip: 'Le TRD justifie vos choix : pourquoi PostgreSQL plutôt que MongoDB, pourquoi Vite plutôt que Webpack.'
      },
      {
        title: 'L\'Appflow (Parcours Utilisateur)',
        concept: 'Le plan du labyrinthe',
        summary: 'Schéma visuel de tous les chemins que prend l\'utilisateur, du premier clic jusqu\'à la fin de sa visite.',
        proTip: 'Un bon Appflow élimine les impasses où l\'utilisateur se retrouve bloqué sans porte de sortie.'
      },
      {
        title: 'Le Schéma Relationnel (Database)',
        concept: 'La boîte de briques Lego',
        summary: 'Modélisation des tables et de leurs liaisons pour que chaque information soit bien rangée à sa place.',
        proTip: 'Bien relier les tables (clés étrangères) dès le départ évite que les données ne se perdent dans le salon !'
      }
    ],
    quiz: {
      situation: 'Le chef du village veut valider le lancement du projet WebDev Evolution.',
      question: 'Lequel de ces éléments relève strictement du PRD (besoin fonctionnel Must-have) et NON d\'un choix de stack technique ?',
      options: [
        {
          id: 'a',
          text: 'Déployer une base PostgreSQL gérée par Prisma ORM sur Supabase',
          isCorrect: false,
          feedback: '❌ Oups ! C\'est un choix technique d\'outillage (TRD). Choisis une autre réponse.'
        },
        {
          id: 'b',
          text: 'Permettre au joueur d\'enregistrer son prénom et de suivre sa progression en temps réel sur la carte',
          isCorrect: true,
          feedback: '🎉 BINGO ! C\'est un besoin fonctionnel fondamental pour l\'utilisateur (Must-have).'
        },
        {
          id: 'c',
          text: 'Configurer un serveur Nginx avec compression gzip et reverse proxy',
          isCorrect: false,
          feedback: '❌ Non, c\'est de l\'administration de serveur (TRD). Réessaie.'
        },
        {
          id: 'd',
          text: 'Installer Tailwind CSS v4 avec le compilateur Oxide',
          isCorrect: false,
          feedback: '❌ Non, c\'est une bibliothèque de style frontend. Réessaie.'
        }
      ]
    }
  },
  2: {
    level: 2,
    title: 'Le Bac à Sable',
    theme: 'Design & UX (Expérience Utilisateur)',
    avatarRole: 'Enfant Dev',
    sticker: '🏖️',
    icon: Palette,
    storyIntro: 'Pas le droit de manger les crayons de couleur ni d\'empiler 4 boutons d\'action au même endroit !',
    lessons: [
      {
        title: 'Design Mobile-first',
        concept: 'Pensé d\'abord pour les petites mains',
        summary: 'Dessiner d\'abord l\'interface pour les écrans de smartphone faciles à toucher avec un pouce.',
        proTip: 'Si le jeu est simple et joli sur mobile, il sera fantastique sur grand écran !'
      },
      {
        title: 'Le CTA Unique (Call to Action)',
        concept: 'Un seul gros bouton magique',
        summary: 'Chaque écran doit guider les yeux vers le bouton principal évident, sans hésitation.',
        proTip: 'Quand il y a trop de boutons qui clignotent, on ne sait plus où appuyer. Vive la simplicité !'
      },
      {
        title: 'Éléments de Réassurance',
        concept: 'Mettre des petites roulettes',
        summary: 'Petites animations douces, sabliers souriants et messages gentils pour rassurer les joueurs.',
        proTip: 'Un bouton qui ne réagit pas tout de suite fait croire que la console de jeu est bloquée.'
      },
      {
        title: 'Empty States & Pagination',
        concept: 'Quand le coffre à jouets est vide',
        summary: 'Ne jamais laisser un écran tout blanc : expliquer gentiment pourquoi et proposer une autre activité.',
        proTip: 'Un bel écran vide encourage à chercher autre chose avec le sourire.'
      }
    ],
    quiz: {
      situation: 'Une page est encombrée de boutons partout et devient blanche quand il n\'y a aucun résultat.',
      question: 'Quelle est la règle d\'or pour rendre cette interface joyeuse et claire ?',
      options: [
        {
          id: 'a',
          text: 'Mettre 4 boutons de couleurs vives au même endroit et écrire "Erreur 0"',
          isCorrect: false,
          feedback: '❌ Aïe ! Trop de bruit visuel, l\'utilisateur est perdu.'
        },
        {
          id: 'b',
          text: 'Garder un seul bouton principal bien visible et concevoir un Empty State chaleureux avec une action de rebond',
          isCorrect: true,
          feedback: '🎉 Bravo champion ! L\'interface redevient limpide, aérée et accueillante.'
        },
        {
          id: 'c',
          text: 'Supprimer tous les boutons et forcer l\'utilisateur à recommencer',
          isCorrect: false,
          feedback: '❌ Mauvaise idée : le joueur va quitter la cour de récréation !'
        }
      ]
    }
  },
  3: {
    level: 3,
    title: 'Les Fondations de la Cabane',
    theme: 'Infrastructure & Cabane',
    avatarRole: 'Enfant Dev',
    sticker: '⛺',
    icon: Server,
    storyIntro: 'Le premier serveur monté dans un placard avec des câbles partout. On construit une forteresse solide !',
    lessons: [
      {
        title: 'Noms de domaine & DNS',
        concept: 'L\'adresse de la maison',
        summary: 'L\'enregistrement DNS A relie le nom joli (ex: cyrsamuel.com) à l\'adresse IP secrète du serveur.',
        proTip: 'C\'est comme le panneau avec le nom de la cabane sur la porte d\'entrée.'
      },
      {
        title: 'Le Reverse Proxy (Nginx)',
        concept: 'Le gardien du fort',
        summary: 'Il accueille les visiteurs gentils, distribue les badges SSL sécurisés et filtre les intrus.',
        proTip: 'Ne laissez jamais votre serveur Node.js sans ce gardien protecteur devant lui.'
      },
      {
        title: 'Sémantique des Codes HTTP',
        concept: 'Le langage des feux tricolores',
        summary: '200 = Tout va bien, 301 = C\'est par là, 404 = Oups introuvable, 500 = Petit bobo serveur.',
        proTip: 'Répondre 200 quand la page est vide, c\'est comme dire "oui" en hochant la tête pour dire "non".'
      },
      {
        title: 'Sécurité des Clés API',
        concept: 'La cachette secrète du trésor',
        summary: 'Les clés secrètes doivent être rangées dans un fichier .env fermé à clé côté serveur.',
        proTip: 'Si vous laissez votre clé dans le code React, n\'importe qui peut l\'attraper dans son panier !'
      }
    ],
    quiz: {
      situation: 'Votre serveur reçoit des demandes pour un jouet qui n\'existe pas et vous devez cacher votre clé API secrète.',
      question: 'Quelle est la bonne méthode pour protéger la cabane ?',
      options: [
        {
          id: 'a',
          text: 'Mettre la clé dans le HTML et renvoyer le code 200 en disant "Rien ici"',
          isCorrect: false,
          feedback: '❌ Attention ! Tout le monde peut voir votre clé secrète.'
        },
        {
          id: 'b',
          text: 'Ranger la clé dans les variables .env secrètes du serveur et renvoyer le code HTTP 404 Not Found',
          isCorrect: true,
          feedback: '🎉 Superbe ! Votre trésor est bien gardé et vous parlez le vrai langage du web.'
        },
        {
          id: 'c',
          text: 'Masquer la clé avec du CSS display:none et renvoyer le code 500',
          isCorrect: false,
          feedback: '❌ Non, le code 500 fait croire que la machine a cassé un rouage.'
        }
      ]
    }
  },
  4: {
    level: 4,
    title: 'Le Code de Bonne Conduite',
    theme: 'Politesse & Implémentation',
    avatarRole: 'Ado Dev',
    sticker: '🎨',
    icon: Code2,
    storyIntro: 'Apprendre à dire bonjour, s\'il vous plaît, et coder avec le cœur pour que tout le monde puisse jouer ensemble !',
    lessons: [
      {
        title: 'HTML Sémantique',
        concept: 'Des étiquettes bien rangées',
        summary: 'Utiliser <header>, <nav>, <main>, <article>, <section>, <footer> pour que les ordinateurs comprennent la structure.',
        proTip: 'C\'est comme ranger ses feutres par couleur dans la bonne trousse d\'écolier.'
      },
      {
        title: 'Accessibilité A11y (Pour tous)',
        concept: 'Personne n\'est laissé de côté',
        summary: 'Des contrastes nets pour bien lire, des descriptions sur les images et une navigation au clavier.',
        proTip: 'Tous les enfants, même ceux qui voient moins bien, ont le droit de s\'amuser sur votre site.'
      },
      {
        title: 'UX Copywriting Bienveillant',
        concept: 'Parler avec gentillesse',
        summary: 'Expliquer les erreurs sans faire peur et indiquer tout de suite comment continuer la partie.',
        proTip: 'Ne dites jamais "Vous avez fait une bêtise". Dites : "Oups, essayons avec une autre réponse !"'
      },
      {
        title: 'Double Validation Front & Back',
        concept: 'Vérifier deux fois comme pour traverser',
        summary: 'Le frontend guide les pas, mais le backend reste le maître d\'école qui valide le cahier.',
        proTip: 'Ne faites jamais confiance aveuglément à ce qui arrive d\'Internet.'
      }
    ],
    quiz: {
      situation: 'Une petite erreur survient lors d\'un chargement dans votre application.',
      question: 'Comment afficher cette situation avec politesse et bienveillance ?',
      options: [
        {
          id: 'a',
          text: 'Afficher le message barbare : "FATAL ERROR NULLPOINTER IN LINE 88 CRASH"',
          isCorrect: false,
          feedback: '❌ Trop effrayant ! Le joueur a l\'impression d\'avoir cassé le jeu.'
        },
        {
          id: 'b',
          text: 'Afficher un message doux ("Oups, impossible de charger les données pour l\'instant") avec un bouton "Réessayer"',
          isCorrect: true,
          feedback: '🎉 Bravo ! C\'est exactement l\'esprit de politesse et de réassurance de Sougoudzap.'
        },
        {
          id: 'c',
          text: 'Ne rien dire et laisser l\'écran tout noir',
          isCorrect: false,
          feedback: '❌ Le silence complet est angoissant pour les joueurs.'
        }
      ]
    }
  },
  5: {
    level: 5,
    title: 'L\'Adolescence Rebelle',
    theme: 'Sécurité & Boucliers Magiques',
    avatarRole: 'Ado Dev',
    sticker: '🛡️',
    icon: ShieldAlert,
    storyIntro: 'On met un cadenas sur son journal intime et des boucliers magiques contre les farceurs du web !',
    lessons: [
      {
        title: 'Chiffrement SSL/HTTPS',
        concept: 'La lettre cachetée à la cire',
        summary: 'Tous les messages entre le joueur et le serveur sont chiffrés pour que personne ne lise en cachette.',
        proTip: 'Sans HTTPS, les mots de passe voyagent à découvert comme une carte postale lisible par tous.'
      },
      {
        title: 'En-têtes Helmet',
        concept: 'Le casque de vélo protecteur',
        summary: 'Un petit middleware qui protège la tête de votre application contre les chocs et les pièges.',
        proTip: 'Un simple app.use(helmet()) et votre serveur est protégé des pièges de cadres invisibles.'
      },
      {
        title: 'Rate Limiting & Anti-DDoS',
        concept: 'La file d\'attente du toboggan',
        summary: 'Chacun son tour ! Empêche les robots farceurs de pousser tout le monde en envoyant trop de demandes.',
        proTip: 'Limiter le nombre de demandes par minute protège le serveur contre la fatigue.'
      },
      {
        title: 'Authentification 2FA',
        concept: 'La double clé secrète',
        summary: 'Un mot de passe dans la tête + un petit code magique sur le téléphone pour ouvrir le coffre.',
        proTip: 'Même si un copain devine votre mot de passe, il ne peut pas entrer sans la deuxième clé.'
      }
    ],
    quiz: {
      situation: 'Des robots farceurs essaient de submerger le toboggan en envoyant 10 000 requêtes en une seconde !',
      question: 'Quel bouclier magique activez-vous pour calmer le jeu sans gêner les vrais copains ?',
      options: [
        {
          id: 'a',
          text: 'Fermer le parc de jeux pendant tout le week-end',
          isCorrect: false,
          feedback: '❌ Trop triste, plus personne ne peut jouer !'
        },
        {
          id: 'b',
          text: 'Activer le Rate Limiter (file d\'attente équitable) et les boucliers Helmet pour filtrer les robots',
          isCorrect: true,
          feedback: '🎉 Super réflexe ! Les robots sont stoppés net et les vrais enfants continuent de s\'amuser.'
        },
        {
          id: 'c',
          text: 'Éteindre l\'écran et faire semblant de dormir',
          isCorrect: false,
          feedback: '❌ Ça ne résoudra pas l\'attaque des robots !'
        }
      ]
    }
  },
  6: {
    level: 6,
    title: 'L\'Entraînement Sportif',
    theme: 'Course & Vitesse Légère',
    avatarRole: 'Adulte Dev',
    sticker: '🏃',
    icon: Zap,
    storyIntro: 'On s\'échauffe, on court à toute vitesse ! On allège son sac à dos pour séduire les copains robots !',
    lessons: [
      {
        title: 'Core Web Vitals',
        concept: 'Le chronomètre olympique',
        summary: 'Mesure la vitesse d\'apparition du grand dessin (LCP) et la réactivité au premier toucher de doigt.',
        proTip: 'Les sites les plus rapides et légers montent tout en haut du classement sur Google.'
      },
      {
        title: 'Images Modernes WebP',
        concept: 'Remplacer les gros cailloux par des plumes',
        summary: 'WebP rend les images super légères sans perdre aucune de leurs jolies couleurs chatoyantes.',
        proTip: 'Un sac à dos trois fois plus léger permet de courir deux fois plus vite sur le web.'
      },
      {
        title: 'Plan de Site Sitemap.xml',
        concept: 'La carte au trésor pour les robots',
        summary: 'Un petit plan qui montre à Google toutes les belles pièces de votre cabane à visiter.',
        proTip: 'Fournir un plan propre évite que les moteurs de recherche ne se perdent dans les couloirs.'
      },
      {
        title: 'Le Fichier robots.txt',
        concept: 'Les panneaux "Bienvenue" ou "Privé"',
        summary: 'Indique gentiment aux explorateurs où ils ont le droit de se promener.',
        proTip: 'Ne mettez jamais "Interdit à tous" si vous voulez que les gens viennent voir votre spectacle !'
      }
    ],
    quiz: {
      situation: 'Votre site met 8 secondes à s\'ouvrir à cause de dessins trop lourds et les robots ne peuvent pas entrer.',
      question: 'Quelles deux bonnes actions vont faire briller votre temps de chargement ?',
      options: [
        {
          id: 'a',
          text: 'Convertir les images en format WebP léger et inviter les robots avec un plan sitemap propre',
          isCorrect: true,
          feedback: '🎉 Champion de la course ! Votre page s\'ouvre comme l\'éclair en moins d\'une seconde.'
        },
        {
          id: 'b',
          text: 'Supprimer tous les dessins et bloquer la porte avec "Disallow: /"',
          isCorrect: false,
          feedback: '❌ Dommage, votre parc devient tout triste et invisible.'
        },
        {
          id: 'c',
          text: 'Peindre son écran en vert fluo',
          isCorrect: false,
          feedback: '❌ Ça ne changera rien à la vitesse du réseau !'
        }
      ]
    }
  },
  7: {
    level: 7,
    title: 'Le Costume Cravate',
    theme: 'Le Grand Diplôme & La Fête',
    avatarRole: 'Tech Lead',
    sticker: '🎓',
    icon: Briefcase,
    storyIntro: 'On enfile son plus beau costume pour la grande cérémonie ! On respecte les secrets de chacun comme un grand.',
    lessons: [
      {
        title: 'Conformité RGPD',
        concept: 'Le respect du secret des copains',
        summary: 'Ne jamais partager les secrets ou informations privées de quelqu\'un sans son autorisation préalable.',
        proTip: 'La confiance des utilisateurs est le trésor le plus précieux d\'un bon Tech Lead.'
      },
      {
        title: 'Bannière Cookies Bloquante',
        concept: 'Demander la permission poliment',
        summary: 'Bloquer les traceurs tiers jusqu\'à ce que l\'utilisateur clique joyeusement "D\'accord !".',
        proTip: 'Un vrai gentilhomme du web ne colle pas d\'étiquettes dans le dos des gens sans leur accord.'
      },
      {
        title: 'Sauvegardes (Backups)',
        concept: 'Le double des clés dans la boîte',
        summary: 'Garder une copie chiffrée de secours dans une autre armoire pour parer à toute maladresse.',
        proTip: 'Une sauvegarde bien rangée permet de réparer le château de Lego en un clin d\'œil s\'il tombe.'
      },
      {
        title: 'Monitoring & Santé',
        concept: 'Prendre soin de son château',
        summary: 'Une route /api/health qui veille sur le serveur jour et nuit avec le sourire.',
        proTip: 'Un Tech Lead veille sur son équipe et ses machines pour que tout fonctionne dans la joie.'
      }
    ],
    quiz: {
      situation: 'Vous préparez le grand lancement de votre application avec un outil de statistiques.',
      question: 'Que devez-vous faire pour respecter les règles de politesse RGPD ?',
      options: [
        {
          id: 'a',
          text: 'Allumer tous les traceurs en cachette sans rien dire',
          isCorrect: false,
          feedback: '❌ C\'est interdit par les règles de la république du web !'
        },
        {
          id: 'b',
          text: 'Bloquer les traceurs par défaut et ne les activer qu\'après le "Oui" joyeux et explicite du joueur',
          isCorrect: true,
          feedback: '🎉 Félicitations Maître ! Vous êtes prêt pour la Haute Cour et le grand examen final !'
        },
        {
          id: 'c',
          text: 'Donner les clés du serveur au premier passant dans la rue',
          isCorrect: false,
          feedback: '❌ Oups ! C\'est très dangereux pour les données privées.'
        }
      ]
    }
  }
};

interface LevelChallengeModalProps {
  level: number;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => Promise<void> | void;
  isLevelingUp?: boolean;
}

export default function LevelChallengeModal({
  level,
  isOpen,
  onClose,
  onSuccess,
  isLevelingUp = false
}: LevelChallengeModalProps) {
  const moduleData = LEVEL_MODULES[level] || LEVEL_MODULES[1];
  const [activeTab, setActiveTab] = useState<'learn' | 'quiz'>('learn');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState<string>('');
  const [learnedCards, setLearnedCards] = useState<Set<number>>(new Set());
  const [submitting, setSubmitting] = useState<boolean>(false);

  React.useEffect(() => {
    if (isOpen) {
      setActiveTab('learn');
      setSelectedOption(null);
      setStatus('idle');
      setFeedback('');
      setLearnedCards(new Set());
      setSubmitting(false);
    }
  }, [isOpen, level]);

  const toggleLearned = (idx: number) => {
    const next = new Set(learnedCards);
    if (next.has(idx)) {
      next.delete(idx);
    } else {
      next.add(idx);
    }
    setLearnedCards(next);
  };

  const handleSelectOption = (optionId: string) => {
    setSelectedOption(optionId);
    setStatus('idle');
    setFeedback('');
  };

  const handleValidateQuiz = async () => {
    if (!selectedOption || submitting) return;

    const opt = moduleData.quiz.options.find((o) => o.id === selectedOption);
    if (!opt) return;

    if (opt.isCorrect) {
      setStatus('success');
      setFeedback(opt.feedback);
      setSubmitting(true);
      try {
        // Déclenche immédiatement le Level Up vers le serveur
        await onSuccess();
      } catch (e: any) {
        setStatus('error');
        setFeedback(e?.message || 'Erreur lors de la validation du niveau. Réessaie !');
        setSubmitting(false);
      }
    } else {
      setStatus('error');
      setFeedback(opt.feedback);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-sky-950/70 backdrop-blur-sm select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl border-4 border-amber-300 overflow-hidden text-slate-800 flex flex-col max-h-[92vh]"
        >
          {/* Header Joyeux façon Livre de Contes */}
          <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 p-5 sm:p-6 text-white shrink-0 flex items-center justify-between border-b-4 border-orange-500">
            <div className="flex items-center gap-3.5">
              <div className="h-14 w-14 rounded-3xl bg-white/30 backdrop-blur-md flex items-center justify-center text-3xl shadow-inner border-2 border-white">
                {moduleData.sticker}
              </div>
              <div>
                <span className="text-[11px] font-black tracking-widest uppercase text-amber-100 flex items-center gap-1">
                  <Sparkles className="h-3.5 w-3.5" /> Étape {moduleData.level} • {moduleData.avatarRole}
                </span>
                <h3 className="text-xl sm:text-2xl font-black leading-tight drop-shadow-sm">{moduleData.title}</h3>
                <p className="text-xs text-amber-50 font-bold">{moduleData.theme}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              disabled={submitting || isLevelingUp}
              className="p-2 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-black transition-all disabled:opacity-30"
            >
              <X className="h-6 w-6 stroke-[3]" />
            </button>
          </div>

          {/* Onglets colorés : Briques du Savoir vs Petit Jeu */}
          <div className="flex border-b-2 border-amber-200 bg-amber-50/70 px-6 pt-3 shrink-0 gap-3">
            <button
              type="button"
              onClick={() => setActiveTab('learn')}
              className={`pb-3 text-xs sm:text-sm font-black flex items-center gap-2 border-b-4 transition-all ${
                activeTab === 'learn'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <BookOpen className="h-4 w-4" />
              <span>1. Les Briques du Savoir ({learnedCards.size}/{moduleData.lessons.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('quiz')}
              className={`pb-3 text-xs sm:text-sm font-black flex items-center gap-2 border-b-4 transition-all ${
                activeTab === 'quiz'
                  ? 'border-pink-500 text-pink-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Gamepad2 className="h-4 w-4" />
              <span>2. Le Quiz de Validation</span>
            </button>
          </div>

          {/* Corps de la modale avec défilement fluide */}
          <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4">
            {/* --- ONGLET 1 : CAPSULES D'APPRENTISSAGE --- */}
            {activeTab === 'learn' && (
              <div className="space-y-4">
                {/* Histoire de l'étape */}
                <div className="p-4 rounded-3xl bg-amber-50 border-2 border-amber-200 text-xs sm:text-sm text-amber-950 leading-relaxed flex items-start gap-3">
                  <span className="text-2xl mt-0.5">🧸</span>
                  <div>
                    <span className="font-black text-amber-900 block mb-0.5">La Petite Histoire :</span>
                    <p className="font-medium text-amber-800">{moduleData.storyIntro}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 px-1 font-bold">
                  <span>Touchez chaque brique pour l'explorer et l'apprendre :</span>
                  <span className="text-orange-600">{learnedCards.size} / {moduleData.lessons.length} apprises ⭐</span>
                </div>

                {/* Les 4 cartes de notions interactives en pastels */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {moduleData.lessons.map((lesson, idx) => {
                    const isLearned = learnedCards.has(idx);
                    return (
                      <div
                        key={lesson.title}
                        onClick={() => toggleLearned(idx)}
                        className={`p-4 rounded-3xl border-3 transition-all cursor-pointer text-left relative flex flex-col justify-between ${
                          isLearned
                            ? 'bg-emerald-50/90 border-emerald-300 ring-2 ring-emerald-400/20 shadow-md'
                            : 'bg-white hover:bg-amber-50/50 border-amber-200 shadow-sm hover:scale-[1.01]'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <div>
                            <span className="text-[10px] font-black uppercase text-orange-600 tracking-wider">
                              {lesson.concept}
                            </span>
                            <h4 className="text-sm font-black text-slate-800 leading-snug">
                              {lesson.title}
                            </h4>
                          </div>

                          <div className={`h-6 w-6 rounded-full flex items-center justify-center shrink-0 text-xs font-black ${
                            isLearned 
                              ? 'bg-emerald-500 text-white' 
                              : 'border-2 border-amber-300 text-amber-600 bg-amber-100'
                          }`}>
                            {isLearned ? <Check className="h-3.5 w-3.5 stroke-[4]" /> : idx + 1}
                          </div>
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed font-medium mt-1">
                          {lesson.summary}
                        </p>

                        <div className="mt-3 pt-2.5 border-t border-amber-100 flex items-start gap-1.5 text-[11px] text-amber-800 bg-amber-100/60 p-2.5 rounded-2xl">
                          <Lightbulb className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                          <p><strong className="font-black text-amber-900">Conseil Tech Lead :</strong> {lesson.proTip}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Bouton d'invitation direct vers le Quiz */}
                {learnedCards.size === moduleData.lessons.length && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-3.5 rounded-2xl bg-emerald-100 border-2 border-emerald-300 text-emerald-900 text-xs font-black flex items-center justify-center gap-2"
                  >
                    <span>⭐ Super ! Tu as exploré toutes les notions. Clique sur le bouton rose ci-dessous pour passer au Quiz et débloquer le Niveau {level + 1} !</span>
                  </motion.div>
                )}

                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={() => setActiveTab('quiz')}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 hover:from-amber-500 hover:to-rose-500 text-white font-black text-sm shadow-xl shadow-orange-500/25 border-b-4 border-orange-600 transition-all flex items-center justify-center gap-2 mx-auto"
                  >
                    <span>J'ai tout lu ! Passer au Quiz pour débloquer le Niveau suivant 🚀</span>
                    <ArrowRight className="h-4 w-4 stroke-[3]" />
                  </button>
                </div>
              </div>
            )}

            {/* --- ONGLET 2 : LE PETIT DÉFI / QUIZ --- */}
            {activeTab === 'quiz' && (
              <div className="space-y-4">
                <div className="p-4 rounded-3xl bg-sky-50 border-2 border-sky-200 text-xs sm:text-sm text-sky-950 leading-relaxed flex items-start gap-3">
                  <span className="text-2xl mt-0.5">🎮</span>
                  <div>
                    <span className="font-black text-sky-900 block mb-0.5">La Question du Niveau :</span>
                    <p className="font-medium text-sky-800">{moduleData.quiz.situation}</p>
                  </div>
                </div>

                <h4 className="text-sm sm:text-base font-black text-slate-800 leading-snug">
                  {moduleData.quiz.question}
                </h4>

                {/* Les options */}
                <div className="space-y-2.5">
                  {moduleData.quiz.options.map((option) => {
                    const isSelected = selectedOption === option.id;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => handleSelectOption(option.id)}
                        disabled={submitting}
                        className={`w-full text-left p-4 rounded-2xl border-3 text-xs sm:text-sm font-bold transition-all flex items-start gap-3.5 ${
                          isSelected
                            ? 'bg-amber-100/90 border-amber-400 text-amber-950 shadow-md ring-2 ring-amber-300/40'
                            : 'bg-white hover:bg-amber-50/50 border-amber-200 text-slate-700'
                        }`}
                      >
                        <span className={`h-6 w-6 rounded-full border-2 text-xs font-black flex items-center justify-center shrink-0 mt-0.5 ${
                          isSelected 
                            ? 'bg-amber-500 border-amber-500 text-white shadow-sm' 
                            : 'border-amber-300 text-amber-600 bg-amber-50'
                        }`}>
                          {option.id.toUpperCase()}
                        </span>
                        <span className="flex-1 leading-snug">{option.text}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Feedback d'évaluation */}
                {status !== 'idle' && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-2xl border-3 text-xs sm:text-sm flex items-start gap-3 ${
                      status === 'success'
                        ? 'bg-emerald-100 border-emerald-400 text-emerald-950 font-black shadow-lg shadow-emerald-500/20'
                        : 'bg-rose-100 border-rose-300 text-rose-950 font-medium'
                    }`}
                  >
                    {status === 'success' ? (
                      <span className="text-3xl animate-bounce">🎉</span>
                    ) : (
                      <span className="text-2xl">💡</span>
                    )}
                    <div className="flex-1 leading-relaxed">
                      <p className="font-bold text-sm">{feedback}</p>
                      {status === 'success' && (
                        <div className="mt-2 text-emerald-800 font-black text-xs flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin text-emerald-600" />
                          <span>
                            {level >= 7 
                              ? "Validation en cours... Ouverture de la Salle d'audience du Boss ! 👑" 
                              : `Validation en cours... passage au Niveau ${level + 1} !`}
                          </span>
                        </div>
                      )}
                      {status === 'error' && (
                        <p className="text-rose-700 font-bold text-xs mt-1.5 flex items-center gap-1.5">
                          <RotateCcw className="h-3.5 w-3.5" />
                          Clique sur une autre option ci-dessus et revalide !
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </div>

          {/* Footer d'action gourmand */}
          <div className="p-4 sm:p-5 bg-amber-50/80 border-t-2 border-amber-200 flex items-center justify-between gap-3 shrink-0">
            {activeTab === 'learn' ? (
              <>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold text-slate-500 hover:text-slate-700"
                >
                  Fermer
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('quiz')}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 hover:from-amber-500 hover:to-rose-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-orange-500/25 border-b-4 border-orange-600 transition-all flex items-center gap-2"
                >
                  <span>Passer au Quiz du Niveau ! 🎮</span>
                  <ArrowRight className="h-4 w-4 stroke-[3]" />
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setActiveTab('learn')}
                  disabled={submitting}
                  className="px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-800 disabled:opacity-40"
                >
                  ← Relire les briques
                </button>

                <button
                  type="button"
                  onClick={handleValidateQuiz}
                  disabled={!selectedOption || submitting}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-400 hover:from-emerald-500 hover:to-sky-500 text-slate-900 font-black text-xs sm:text-sm shadow-lg shadow-emerald-500/20 border-b-4 border-emerald-600 disabled:opacity-50 transition-all flex items-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin text-slate-900" />
                      <span>Validation en cours... 🍼</span>
                    </>
                  ) : (
                    <>
                      <span>Valider ma réponse ⭐</span>
                      <Sparkles className="h-4 w-4" />
                    </>
                  )}
                </button>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
