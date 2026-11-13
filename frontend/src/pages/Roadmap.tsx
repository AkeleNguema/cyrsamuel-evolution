import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  Lock, 
  ChevronRight, 
  ShieldCheck, 
  Baby,
  Palette,
  Server,
  Code2,
  ShieldAlert,
  Zap,
  Briefcase,
  Loader2,
  Swords,
  BookOpen,
  Gamepad2,
  Sun,
  Cloud,
  LogOut
} from 'lucide-react';
import { Player, levelUpPlayer, getPlayer } from '../services/api';
import LevelChallengeModal from '../components/LevelChallengeModal';

interface LocationState {
  player?: Player;
}

export interface RoadmapProps {
  onLevelUp?: () => void;
}

interface StepDefinition {
  level: number;
  title: string;
  theme: string;
  district: string;
  description: string;
  concepts: string[];
  actionDesc: string;
  avatarRole: string;
  avatarIcon: string;
  sticker: string;
  icon: typeof Baby;
  bubbleColor: string;
}

const CITY_STEPS: StepDefinition[] = [
  {
    level: 1,
    title: 'La Maternité de Sougoudzap-ville',
    theme: 'Conception & Idées',
    district: 'Le Berceau des Idées',
    description: 'Premier cri dans le terminal ! Le bébé apprend à gazouiller son tout premier code.',
    concepts: ['PRD', 'TRD', 'Appflow', 'Backend Schema'],
    actionDesc: 'Trier les besoins fonctionnels et relier les tables de données.',
    avatarRole: 'Bébé Dev',
    avatarIcon: '👶',
    sticker: '🍼',
    icon: Baby,
    bubbleColor: 'from-amber-400 to-yellow-400'
  },
  {
    level: 2,
    title: 'Le Bac à Sable',
    theme: 'Design & UX Coloré',
    district: 'Parc des Crayons',
    description: 'On dessine de jolies interfaces sans manger les feutres ni faire de gribouillis !',
    concepts: ['Mobile-first', 'CTA Unique', 'Réassurance', 'Empty States & Pagination'],
    actionDesc: 'Nettoyer la maquette et concevoir un message vide rassurant.',
    avatarRole: 'Enfant Dev',
    avatarIcon: '🧒',
    sticker: '🏖️',
    icon: Palette,
    bubbleColor: 'from-orange-400 to-amber-500'
  },
  {
    level: 3,
    title: 'Les Fondations de la Cabane',
    theme: 'Infrastructure & Cabane',
    district: 'L\'Atelier des Blocs',
    description: 'On empile les serveurs comme des briques Lego et on protège nos trésors secrets.',
    concepts: ['Noms de domaine', 'Hébergement', 'Reverse Proxy', 'Codes HTTP & API'],
    actionDesc: 'Assigner les bons codes HTTP et ranger la clé API dans la cachette secrète.',
    avatarRole: 'Enfant Dev',
    avatarIcon: '🧒',
    sticker: '⛺',
    icon: Server,
    bubbleColor: 'from-emerald-400 to-teal-500'
  },
  {
    level: 4,
    title: 'Le Code de Bonne Conduite',
    theme: 'Politesse & Implémentation',
    district: 'L\'Avenue du Partage',
    description: 'Apprendre à dire s\'il vous plaît, merci, et parler gentiment aux utilisateurs.',
    concepts: ['HTML Sémantique', 'A11y (Pour tous)', 'UX Copywriting', 'Double Sécurité'],
    actionDesc: 'Remplacer les gros mots système (500) par un message doux d\'entraide.',
    avatarRole: 'Ado Dev',
    avatarIcon: '🧑‍🎓',
    sticker: '🎨',
    icon: Code2,
    bubbleColor: 'from-purple-400 to-indigo-500'
  },
  {
    level: 5,
    title: 'L\'Adolescence Rebelle',
    theme: 'Sécurité & Boucliers',
    district: 'La Cabane Fortifiée',
    description: 'On met un cadenas sur le journal intime et des boucliers contre les coquins du web !',
    concepts: ['SSL/HTTPS', 'En-têtes Helmet', 'Anti-DDoS / Rate Limiter', '2FA'],
    actionDesc: 'Activer le Rate Limiter et le Captcha pour calmer les robots trop agités.',
    avatarRole: 'Ado Dev',
    avatarIcon: '🧑‍🎓',
    sticker: '🛡️',
    icon: ShieldAlert,
    bubbleColor: 'from-pink-400 to-rose-500'
  },
  {
    level: 6,
    title: 'L\'Entraînement Sportif',
    theme: 'Vitesse & Course au Soleil',
    district: 'La Cour de Récréation',
    description: 'On court à toute vitesse ! Des images toutes légères pour séduire les copains robots.',
    concepts: ['Core Web Vitals', 'Optimisation WebP', 'SEO Technique', 'Sitemap & Robots.txt'],
    actionDesc: 'Transformer les gros cailloux PNG en plumes WebP et inviter les robots.',
    avatarRole: 'Adulte Dev',
    avatarIcon: '🧑‍💻',
    sticker: '🏃',
    icon: Zap,
    bubbleColor: 'from-cyan-400 to-blue-500'
  },
  {
    level: 7,
    title: 'Le Costume Cravate',
    theme: 'Le Grand Diplôme',
    district: 'La Fête de Fin d\'Année',
    description: 'Prêt pour le grand saut ! On respecte la vie privée de chacun comme un vrai chef.',
    concepts: ['RGPD & Consentement', 'Cookies bloquants', 'Analytics propre', 'Sauvegardes'],
    actionDesc: 'Demander poliment la permission avant d\'allumer les traceurs de cookies.',
    avatarRole: 'Tech Lead',
    avatarIcon: '👔',
    sticker: '🎓',
    icon: Briefcase,
    bubbleColor: 'from-amber-400 via-yellow-400 to-amber-500'
  }
];

export default function Roadmap({ onLevelUp }: RoadmapProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | null;

  const [player, setPlayer] = useState<Player | null>(state?.player || null);
  const [loadingInitial, setLoadingInitial] = useState<boolean>(!state?.player);
  const [isLevelingUp, setIsLevelingUp] = useState<boolean>(false);
  const [isChallengeOpen, setIsChallengeOpen] = useState<boolean>(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Résilience F5 : rechargement automatique
  useEffect(() => {
    if (!player) {
      const storedId = localStorage.getItem('webdev_player_id');
      if (storedId) {
        getPlayer(storedId)
          .then((data) => {
            setPlayer(data.player);
          })
          .catch((err) => {
            console.error('Impossible de recharger le profil joueur :', err);
            localStorage.removeItem('webdev_player_id');
          })
          .finally(() => {
            setLoadingInitial(false);
          });
      } else {
        setLoadingInitial(false);
      }
    }
  }, [player]);

  if (!loadingInitial && !player) {
    return <Navigate to="/" replace />;
  }

  if (loadingInitial || !player) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-sky-100 text-slate-700">
        <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <span className="text-5xl">🍼</span>
        </motion.div>
        <p className="font-black text-xl text-sky-800 mt-4">Ouverture du grand parc de jeux...</p>
      </div>
    );
  }

  const currentLevel = Math.min(Math.max(player.progress?.currentLevel ?? 1, 1), 7);
  const isBossUnlocked = player.progress?.isBossUnlocked || currentLevel >= 7;
  const progressPercent = Math.round(((currentLevel - 1) / (CITY_STEPS.length - 1)) * 100);
  const currentStep = CITY_STEPS.find((s) => s.level === currentLevel) || CITY_STEPS[0];

  const handleLevelUp = async () => {
    if (isLevelingUp || currentLevel >= 7 || isBossUnlocked) {
      if (currentLevel >= 7 || isBossUnlocked) {
        setNotification({
          message: "👑 Niveau 7 déjà validé ! La Salle d'audience du Boss vous attend !",
          type: 'success'
        });
      }
      return;
    }

    setIsLevelingUp(true);
    setNotification(null);

    try {
      const result = await levelUpPlayer(player.id, currentLevel);
      setPlayer(result.player);
      setNotification({
        message: result.message,
        type: 'success'
      });

      if (onLevelUp) {
        onLevelUp();
      }
    } catch (error: any) {
      console.warn('Erreur level up, tentative de resynchronisation :', error);
      try {
        const fresh = await getPlayer(player.id);
        if (fresh?.player) {
          setPlayer(fresh.player);
        }
      } catch (syncErr) {
        console.error('Erreur resynchronisation :', syncErr);
      }

      setNotification({
        message: error.message || 'Oups, réessayons ensemble !',
        type: 'error'
      });
    } finally {
      setIsLevelingUp(false);
    }
  };

  const handleChallengeSuccess = async () => {
    if (currentLevel >= 7 || isBossUnlocked) {
      setIsChallengeOpen(false);
      setNotification({
        message: "👑 Bravo ! Toutes les étapes sont franchies ! La Salle d'audience vous attend !",
        type: 'success'
      });
      return;
    }
    await handleLevelUp();
    setIsChallengeOpen(false);
  };

  const handleResetPlayer = () => {
    localStorage.removeItem('webdev_player_id');
    navigate('/', { replace: true });
  };

  const handleEnterBossRoom = () => {
    navigate('/boss', { state: { player } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 via-amber-50 to-emerald-100 text-slate-800 pb-40 relative overflow-hidden select-none">
      {/* Éléments décoratifs Jardin d'enfants (Nuages, Soleil) */}
      <div className="absolute top-4 left-6 text-white/80 pointer-events-none hidden md:block">
        <Cloud className="h-24 w-24 fill-white drop-shadow-sm" />
      </div>
      <div className="absolute top-16 right-10 text-white/70 pointer-events-none hidden md:block">
        <Cloud className="h-20 w-20 fill-white drop-shadow-sm" />
      </div>
      <div className="absolute top-36 right-1/4 text-amber-300 pointer-events-none animate-spin-slow opacity-60">
        <Sun className="h-28 w-28" />
      </div>

      {/* Toast Notification Joyeuse */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-md"
          >
            <div
              className={`flex items-start gap-3 p-4 rounded-3xl shadow-2xl border-4 text-sm font-black backdrop-blur-md ${
                notification.type === 'success'
                  ? 'bg-emerald-400 text-white border-emerald-300 shadow-emerald-500/30'
                  : 'bg-rose-400 text-white border-rose-300 shadow-rose-500/30'
              }`}
            >
              <span className="text-2xl mt-0.5">🎉</span>
              <div className="flex-1">
                <p>{notification.message}</p>
              </div>
              <button
                type="button"
                onClick={() => setNotification(null)}
                className="text-white/80 hover:text-white font-black text-base ml-2"
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* En-tête / Header Gourmand & Joyeux */}
      <header className="sticky top-0 z-30 border-b-4 border-amber-200/80 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 sm:px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <motion.div 
              whileHover={{ rotate: [0, -10, 10, 0] }}
              className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-tr from-amber-400 via-orange-400 to-pink-400 text-white shadow-lg shadow-orange-500/20 text-3xl border-2 border-white"
            >
              {currentStep.sticker}
            </motion.div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-800">
                  Le Parc de Sougoudzap
                </h1>
                <span className="inline-flex items-center gap-1 rounded-full bg-pink-100 px-3 py-0.5 text-xs font-black text-pink-700 border border-pink-300">
                  🎈 Parcours d'Éveil
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 font-bold">
                Bébé Dev : <span className="text-sky-600">{player.avatarName}</span>
                <span className="mx-2 text-slate-300">•</span>
                Évolution : <span className="text-amber-600 underline decoration-wavy decoration-amber-300">{currentStep.avatarRole}</span>
              </p>
            </div>
          </div>

          {/* Barre de progression ludique et bouton déconnexion */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex flex-col gap-1.5 w-full sm:w-60 bg-amber-50/70 p-2.5 rounded-2xl border-2 border-amber-200">
              <div className="flex justify-between text-xs font-black text-slate-700">
                <span>🌟 Étape {currentLevel} sur 7</span>
                <span className="text-orange-600">{progressPercent}%</span>
              </div>
              <div className="h-3.5 w-full overflow-hidden rounded-full bg-white border-2 border-amber-300 p-0.5">
                <motion.div 
                  className="h-full rounded-full bg-gradient-to-r from-amber-400 via-orange-400 to-emerald-400 shadow-inner"
                  initial={false}
                  animate={{ width: `${Math.max(progressPercent, 12)}%` }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleResetPlayer}
              className="shrink-0 px-3 py-2.5 rounded-2xl bg-white hover:bg-rose-50 text-slate-600 hover:text-rose-600 border-2 border-slate-200 hover:border-rose-300 text-xs font-black flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
              title="Quitter la partie et changer d'avatar"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Déconnexion</span>
            </button>
          </div>
        </div>
      </header>

      {/* Contenu principal : Circuit de marelle / Chemin des 7 étapes */}
      <main className="max-w-3xl mx-auto px-4 pt-8 sm:px-6 relative z-10">
        <div className="relative">
          {/* Le Sentier de Marelle (Ligne centrale multicolore) */}
          <div 
            className="absolute left-7 sm:left-1/2 top-10 bottom-10 -translate-x-1/2 w-3 bg-amber-200/80 rounded-full border-2 border-dashed border-amber-400"
            aria-hidden="true"
          >
            <motion.div 
              className="w-full bg-gradient-to-b from-amber-400 via-orange-400 via-pink-400 to-emerald-400 rounded-full"
              initial={false}
              animate={{ height: `${((currentLevel - 1) / (CITY_STEPS.length - 1)) * 100}%` }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            />
          </div>

          {/* Les 7 Étapes Joyeuses */}
          <div className="space-y-12 sm:space-y-16">
            {CITY_STEPS.map((step, index) => {
              const isPassed = step.level < currentLevel;
              const isCurrent = step.level === currentLevel;
              const isLocked = step.level > currentLevel;
              const isBoss = step.level === 7;
              const isEven = index % 2 === 0;

              return (
                <div 
                  key={step.level}
                  className={`relative flex items-center ${
                    isEven ? 'sm:flex-row' : 'sm:flex-row-reverse'
                  } flex-row gap-4 sm:gap-10`}
                >
                  {/* Nœud Central / Pastille de marelle dodue */}
                  <div className="absolute left-7 sm:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                    {isPassed ? (
                      <motion.div 
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="h-14 w-14 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-400 text-white flex items-center justify-center shadow-xl shadow-emerald-500/30 ring-4 ring-white border-4 border-emerald-300 text-2xl"
                      >
                        <Check className="h-7 w-7 stroke-[4]" />
                      </motion.div>
                    ) : isCurrent ? (
                      <div className="relative flex items-center justify-center">
                        <motion.span 
                          animate={{ scale: [1, 1.4, 1], opacity: [0.7, 0, 0.7] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="absolute h-20 w-20 rounded-full bg-amber-400/30"
                        />
                        <motion.div 
                          layoutId="active-avatar-node"
                          whileHover={{ scale: 1.1 }}
                          className={`relative h-16 w-16 rounded-full bg-gradient-to-br ${step.bubbleColor} text-white flex items-center justify-center shadow-2xl shadow-orange-500/40 ring-4 ring-white border-4 border-amber-200 text-3xl`}
                        >
                          {isBoss ? '👑' : step.sticker}
                        </motion.div>
                      </div>
                    ) : (
                      <div className="h-12 w-12 rounded-full bg-slate-200/90 text-slate-400 flex items-center justify-center ring-4 ring-white border-2 border-slate-300 text-xl">
                        <Lock className="h-5 w-5" />
                      </div>
                    )}
                  </div>

                  {/* Carte d'Étape façon Boîte de Jouet / Cahier illustré */}
                  <div className={`ml-16 sm:ml-0 sm:w-[calc(50%-3.5rem)] w-full ${isEven ? 'sm:text-right' : 'sm:text-left'}`}>
                    <motion.div 
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.08 }}
                      onClick={() => isCurrent && setIsChallengeOpen(true)}
                      className={`relative p-5 sm:p-6 rounded-[2.2rem] transition-all duration-300 border-4 ${
                        isCurrent 
                          ? 'bg-white border-amber-400 shadow-2xl shadow-amber-500/20 ring-4 ring-amber-200/50 cursor-pointer hover:scale-[1.02]' 
                          : isPassed 
                            ? 'bg-white/95 border-emerald-300 shadow-md hover:shadow-lg' 
                            : 'bg-white/60 border-dashed border-slate-300 opacity-60'
                      }`}
                    >
                      {/* Pointeur Avatar mignon et sautillant sur le niveau actuel */}
                      {isCurrent && (
                        <motion.div 
                          layoutId="active-avatar-badge"
                          animate={{ y: [-3, 3, -3] }}
                          transition={{ repeat: Infinity, duration: 1.8 }}
                          className="absolute -top-4 left-4 sm:left-auto sm:right-4 inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white text-xs font-black shadow-lg shadow-pink-500/30 border-2 border-white"
                        >
                          <span>{step.avatarIcon} {player.avatarName} ({step.avatarRole})</span>
                        </motion.div>
                      )}

                      {/* Header de la carte */}
                      <div className={`flex items-center gap-2 mb-2 flex-wrap ${isEven ? 'sm:justify-end' : 'sm:justify-start'}`}>
                        <span className={`text-xs font-black px-3 py-1 rounded-full ${
                          isCurrent 
                            ? 'bg-amber-100 text-amber-800 border border-amber-300' 
                            : isPassed 
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                              : 'bg-slate-200 text-slate-600'
                        }`}>
                          Niveau {step.level}
                        </span>

                        <span className="text-xs font-bold text-slate-500">
                          {step.district}
                        </span>

                        {isPassed && (
                          <span className="inline-flex items-center gap-1 text-xs font-black text-emerald-600">
                            <ShieldCheck className="h-4 w-4" /> Réussi !
                          </span>
                        )}
                        {isCurrent && (
                          <span className="inline-flex items-center gap-1 text-xs font-black text-orange-600">
                            <span className="h-2 w-2 rounded-full bg-orange-500 animate-ping" />
                            À toi de jouer !
                          </span>
                        )}
                        {isLocked && (
                          <span className="inline-flex items-center gap-1 text-xs text-slate-400 font-bold">
                            <Lock className="h-3.5 w-3.5" /> Bientôt
                          </span>
                        )}
                      </div>

                      {/* Titre et Thème ludique */}
                      <h3 className={`text-lg sm:text-xl font-black tracking-tight ${
                        isCurrent ? 'text-amber-950' : isPassed ? 'text-slate-800' : 'text-slate-500'
                      }`}>
                        {step.title}
                      </h3>
                      
                      <div className={`inline-block text-xs font-black px-2.5 py-0.5 rounded-lg mt-1 mb-2 ${
                        isCurrent ? 'bg-orange-100 text-orange-800' : 'text-slate-500 bg-slate-100'
                      }`}>
                        Objectif : {step.theme}
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                        {step.description}
                      </p>

                      {/* Notions évaluées sous forme de pastilles bonbons */}
                      <div className={`mt-3 flex flex-wrap gap-1.5 ${isEven ? 'sm:justify-end' : 'sm:justify-start'}`}>
                        {step.concepts.map((concept) => (
                          <span 
                            key={concept}
                            className={`text-[11px] font-bold px-2.5 py-1 rounded-xl ${
                              isCurrent
                                ? 'bg-amber-100/80 text-amber-900 border border-amber-300'
                                : isPassed
                                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                  : 'bg-slate-100 text-slate-400'
                            }`}
                          >
                            {concept}
                          </span>
                        ))}
                      </div>

                      {/* Épreuve requise pour valider */}
                      <div className={`mt-3 pt-3 border-t-2 border-dashed border-slate-200/80 text-xs text-slate-500 ${isEven ? 'sm:text-right' : 'sm:text-left'}`}>
                        <span className="font-extrabold text-slate-700">Le Défi : </span>
                        {step.actionDesc}
                      </div>

                      {/* Bouton d'invitation au jeu si niveau actif */}
                      {isCurrent && (
                        <div className={`mt-3 pt-2.5 border-t border-amber-200 flex items-center gap-2 text-xs font-black text-orange-600 ${isEven ? 'sm:justify-end' : 'sm:justify-start'}`}>
                          <Gamepad2 className="h-4 w-4 text-amber-600 animate-bounce" />
                          <span>🎯 Clique ici pour ouvrir la boîte de jeu !</span>
                        </div>
                      )}
                    </motion.div>
                  </div>

                  {/* Espacement symétrique */}
                  <div className="hidden sm:block sm:w-[calc(50%-3.5rem)]" aria-hidden="true" />
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Barre d'action ergonomique fixée en bas façon boîte à bonbons */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 border-t-4 border-amber-300 bg-white/95 backdrop-blur-md p-4 sm:p-5 shadow-2xl">
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-xs text-amber-700 font-black uppercase tracking-wider">
              {isBossUnlocked ? "🏆 Épreuve Finale Débloquée" : `Étape ${currentLevel} • ${currentStep.avatarRole}`}
            </p>
            <p className="text-sm sm:text-base font-black text-slate-800">
              {isBossUnlocked 
                ? "👑 La Salle d'audience des Grands vous attend !" 
                : `${currentStep.sticker} ${currentStep.title}`}
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {isBossUnlocked ? (
              <motion.button
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleEnterBossRoom}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-black text-sm sm:text-base text-white bg-gradient-to-r from-amber-400 via-rose-500 to-indigo-600 hover:from-amber-500 hover:to-indigo-700 shadow-xl shadow-rose-500/25 border-b-4 border-rose-700 transition-all"
              >
                <Swords className="h-5 w-5" />
                <span>👑 Entrer dans la Salle d'audience (Grand Test)</span>
              </motion.button>
            ) : (
              <motion.button
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsChallengeOpen(true)}
                disabled={isLevelingUp}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-black text-sm sm:text-base text-white bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 hover:from-amber-500 hover:to-rose-500 shadow-xl shadow-orange-500/25 border-b-4 border-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLevelingUp ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>On grandit vers le niveau suivant... 🍼</span>
                  </>
                ) : (
                  <>
                    <BookOpen className="h-5 w-5" />
                    <span>🎈 Découvrir les Notions & Jouer le Défi</span>
                    <ChevronRight className="h-5 w-5 stroke-[4]" />
                  </>
                )}
              </motion.button>
            )}
          </div>
        </div>
      </footer>

      {/* Modale d'Apprentissage & Mini-Défi interactif par niveau */}
      <LevelChallengeModal
        level={currentLevel}
        isOpen={isChallengeOpen}
        onClose={() => setIsChallengeOpen(false)}
        onSuccess={handleChallengeSuccess}
      />
    </div>
  );
}
