import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Bot, 
  Users, 
  Timer, 
  AlertTriangle, 
  Trophy, 
  Download, 
  RotateCcw, 
  ArrowLeft, 
  ExternalLink, 
  Volume2, 
  VolumeX, 
  Gavel, 
  Briefcase, 
  Flame, 
  CheckCircle2, 
  XCircle, 
  Clock,
  LogOut
} from 'lucide-react';
import { 
  Player, 
  ExamQuestion, 
  ExamResultResponse, 
  getExamQuestions, 
  submitExam, 
  getCertificateDownloadUrl,
  getPlayer 
} from '../services/api';

interface LocationState {
  player?: Player;
}

export default function BossAudience() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | null;
  const [player, setPlayer] = useState<Player | null>(state?.player || null);
  const [loadingPlayer, setLoadingPlayer] = useState<boolean>(!state?.player);

  // Résilience F5 : rechargement automatique depuis localStorage
  useEffect(() => {
    if (!player) {
      const storedId = localStorage.getItem('webdev_player_id');
      if (storedId) {
        getPlayer(storedId)
          .then((data) => {
            setPlayer(data.player);
          })
          .catch((err) => {
            console.error('Impossible de charger le joueur :', err);
            localStorage.removeItem('webdev_player_id');
          })
          .finally(() => {
            setLoadingPlayer(false);
          });
      } else {
        setLoadingPlayer(false);
      }
    }
  }, [player]);

  // États du jeu
  const [phase, setPhase] = useState<'intro' | 'exam' | 'submitting' | 'result'>('intro');
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<{ [questionId: number]: number }>({});
  const [timeLeft, setTimeLeft] = useState<number>(15);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [examResult, setExamResult] = useState<ExamResultResponse | null>(null);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Synthétiseur audio Web Audio API (100% natif sans fichier externe)
  const getAudioContext = () => {
    if (!audioCtxRef.current && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current?.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  const playGavelSound = () => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(160, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(35, ctx.currentTime + 0.25);
      gain.gain.setValueAtTime(0.7, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch {}
  };

  const playTickSound = () => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(750, ctx.currentTime);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch {}
  };

  const playVictorySound = () => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.25, ctx.currentTime + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + idx * 0.12 + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.12);
        osc.stop(ctx.currentTime + idx * 0.12 + 0.4);
      });
    } catch {}
  };

  // Chargement des questions au montage
  useEffect(() => {
    getExamQuestions()
      .then((data) => {
        setQuestions(data.questions);
      })
      .catch((err) => {
        console.error('Erreur chargement questions :', err);
        setErrorMessage('Impossible de charger les questions du Tribunal.');
      });
  }, []);

  // Gestion du chronomètre de 15 secondes
  useEffect(() => {
    if (phase !== 'exam' || questions.length === 0) return;

    setTimeLeft(15);

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 5 && prev > 1) {
          playTickSound();
        }
        if (prev <= 1) {
          // Temps écoulé pour cette question : passage automatique à la suivante
          handleAnswer(-1); // -1 représente une absence de réponse
          return 15;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, phase, questions]);

  const handleStartExam = () => {
    if (questions.length === 0) {
      setErrorMessage("Les questions d'examen sont en cours de chargement...");
      return;
    }
    playGavelSound();
    setAnswers({});
    setCurrentIndex(0);
    setPhase('exam');
  };

  const handleAnswer = (selectedOptionIndex: number) => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    const currentQuestion = questions[currentIndex];
    const newAnswers = {
      ...answers,
      [currentQuestion.id]: selectedOptionIndex
    };
    setAnswers(newAnswers);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Toutes les questions ont été répondues : soumission au serveur
      finishExam(newAnswers);
    }
  };

  const finishExam = async (finalAnswers: { [questionId: number]: number }) => {
    if (!player) return;
    setPhase('submitting');
    try {
      const result = await submitExam(player.id, finalAnswers);
      setExamResult(result);
      if (result.passed) {
        playVictorySound();
      } else {
        playGavelSound();
      }
      setPhase('result');
    } catch (err: any) {
      console.error('Erreur soumission examen :', err);
      setErrorMessage(err.message || 'Erreur lors du verdict du jury.');
      setPhase('intro');
    }
  };

  const handleDownloadCertificate = () => {
    if (!player || !examResult?.verifyToken) return;
    setIsDownloading(true);
    const downloadUrl = getCertificateDownloadUrl(examResult.verifyToken);

    // Déclenchement du téléchargement réel du PDF
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', `Certificat_WebDev_Evolution_${player.avatarName}.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setIsDownloading(false);
    }, 1500);
  };

  const handleLogout = () => {
    localStorage.removeItem('webdev_player_id');
    navigate('/', { replace: true });
  };

  const currentQ = questions[currentIndex];

  if (!loadingPlayer && !player) {
    return <Navigate to="/" replace />;
  }

  if (loadingPlayer || !player) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center">
        <p className="text-amber-400 font-bold text-lg animate-pulse">Ouverture de la Haute Cour...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-amber-500 selection:text-slate-950">
      {/* Barre supérieure solennelle */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md px-4 py-3 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold">
            <Gavel className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-extrabold tracking-tight text-white flex items-center gap-2">
              La Salle d'audience <span className="text-xs font-normal text-amber-400">• Sougoudzap-ville</span>
            </h1>
            <p className="text-xs text-slate-400">
              Accusé à la barre : <span className="font-bold text-slate-200">{player.avatarName}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <button
            type="button"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-lg bg-slate-800/80 text-slate-300 hover:text-white border border-slate-700 text-xs flex items-center gap-1.5 transition-all"
            title="Activer/Désactiver l'ambiance sonore"
          >
            {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            <span className="hidden sm:inline">{soundEnabled ? 'Son activé' : 'Muet'}</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/roadmap', { state: { player } })}
            className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs flex items-center gap-1.5 transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Carte Roadmap</span>
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="p-2 rounded-lg bg-rose-950/40 text-rose-300 hover:bg-rose-900/50 hover:text-white border border-rose-800 text-xs flex items-center gap-1.5 transition-all"
            title="Se déconnecter"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Déconnexion</span>
          </button>
        </div>
      </header>

      {/* Corps principal : Scénographie selon la phase */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-8 flex flex-col justify-center">
        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl bg-rose-950/80 border border-rose-500 text-rose-200 text-sm flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-rose-400 shrink-0" />
            <p>{errorMessage}</p>
          </div>
        )}

        {/* --- PHASE 1 : INTRODUCTION AU PROCÈS / EXAMEN --- */}
        {phase === 'intro' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden"
          >
            {/* Décoration d'ambiance */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="text-center max-w-2xl mx-auto">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
                <Flame className="h-3.5 w-3.5" /> Épreuve Climax : Le Jugement Dernier
              </span>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Le Tribunal de Google Bot vous convoque à la barre
              </h2>

              <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
                Vous avez traversé les 7 étapes de Sougoudzap-ville. Pour obtenir votre 
                <span className="text-amber-400 font-semibold"> Certificat de Maîtrise Web</span> et être adoubé Tech Lead, 
                vous devez répondre en direct aux questions impitoyables du Juge Google Bot, du Client et des Utilisateurs.
              </p>

              {/* Représentation visuelle des jurés */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-8">
                <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-center">
                  <div className="h-10 w-10 mx-auto rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-2">
                    <Bot className="h-6 w-6" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Le Juge Google Bot</h4>
                  <p className="text-xs text-slate-400 mt-1">Évalue la rigueur, le SEO, les Core Web Vitals et les protocoles</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-center">
                  <div className="h-10 w-10 mx-auto rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-2">
                    <Briefcase className="h-6 w-6" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Le Client Exigeant</h4>
                  <p className="text-xs text-slate-400 mt-1">Exige le respect du PRD, de l'Appflow et la conformité RGPD</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-center">
                  <div className="h-10 w-10 mx-auto rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2">
                    <Users className="h-6 w-6" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Les Utilisateurs</h4>
                  <p className="text-xs text-slate-400 mt-1">Jugent l'accessibilité A11y, l'UX Copywriting et la sécurité 2FA</p>
                </div>
              </div>

              {/* Règles du procès */}
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-left text-xs sm:text-sm text-slate-400 space-y-2 mb-8">
                <div className="flex items-center gap-2 text-slate-200 font-semibold">
                  <Clock className="h-4 w-4 text-amber-400" /> Règles officielles de l'examen :
                </div>
                <ul className="list-disc list-inside space-y-1 pl-1">
                  <li><strong>25 questions QCM</strong> en rafale couvrant l'ensemble du cycle web.</li>
                  <li><strong>15 secondes strictes</strong> par question. Pas de retour en arrière.</li>
                  <li><strong>Seuil de réussite de 80 %</strong> (minimum 20 bonnes réponses) validé côté serveur.</li>
                  <li>En cas de réussite : diplôme PDF nominatif généré et téléchargeable immédiatement.</li>
                </ul>
              </div>

              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleStartExam}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 hover:from-amber-600 hover:to-rose-700 text-slate-950 font-black text-base tracking-wide shadow-xl shadow-amber-500/20 transition-all"
              >
                ⚖️ PRENDRE LA PAROLE ET LANCER L'EXAMEN
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* --- PHASE 2 : EXAMEN EN COURS (QCM EN RAFALE) --- */}
        {phase === 'exam' && currentQ && (
          <div className="space-y-6">
            {/* Barre de Progression & Chronomètre */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 backdrop-blur-md">
              <div className="flex items-center justify-between text-xs sm:text-sm mb-3">
                <span className="font-bold text-slate-300">
                  Question {currentIndex + 1} <span className="text-slate-500">/ {questions.length}</span>
                </span>

                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-amber-400 border border-slate-700">
                  {currentQ.category}
                </span>

                <div className={`flex items-center gap-1.5 font-mono font-bold text-sm px-3 py-1 rounded-lg ${
                  timeLeft <= 5 
                    ? 'bg-rose-950/80 text-rose-400 border border-rose-500/50 animate-pulse' 
                    : 'bg-slate-800 text-slate-200'
                }`}>
                  <Timer className="h-4 w-4" />
                  <span>{timeLeft}s</span>
                </div>
              </div>

              {/* Barre de temps animée (15s) */}
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <motion.div 
                  key={currentIndex}
                  initial={{ width: '100%' }}
                  animate={{ width: '0%' }}
                  transition={{ duration: 15, ease: 'linear' }}
                  className={`h-full rounded-full ${
                    timeLeft <= 5 ? 'bg-rose-500' : 'bg-gradient-to-r from-amber-400 to-rose-500'
                  }`}
                />
              </div>
            </div>

            {/* Carte de la Question */}
            <motion.div 
              key={currentQ.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl"
            >
              <h3 className="text-lg sm:text-2xl font-bold text-white mb-6 leading-snug">
                {currentQ.question}
              </h3>

              {/* Les 4 options de réponse */}
              <div className="grid grid-cols-1 gap-3">
                {currentQ.options.map((option, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleAnswer(idx)}
                    className="w-full text-left p-4 sm:p-5 rounded-2xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-amber-500/50 text-slate-200 hover:text-white transition-all flex items-center justify-between group active:scale-[0.99]"
                  >
                    <div className="flex items-center gap-3.5">
                      <span className="h-7 w-7 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 group-hover:text-amber-400 group-hover:border-amber-500/40 flex items-center justify-center font-mono text-xs font-bold">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="text-sm sm:text-base font-medium">{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {/* --- PHASE 3 : SOUMISSION & DÉLIBÉRATION --- */}
        {phase === 'submitting' && (
          <div className="text-center py-16">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
              className="h-16 w-16 mx-auto rounded-full border-4 border-amber-500/20 border-t-amber-500 mb-6"
            />
            <h3 className="text-2xl font-extrabold text-white">Le Tribunal délibère...</h3>
            <p className="text-sm text-slate-400 mt-2 max-w-md mx-auto">
              Le Juge Google Bot et les jurés examinent vos 25 réponses. Calcul officiel du score en cours...
            </p>
          </div>
        )}

        {/* --- PHASE 4 : RÉSULTAT DU VERDICT --- */}
        {phase === 'result' && examResult && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`rounded-3xl p-6 sm:p-10 border shadow-2xl backdrop-blur-xl ${
              examResult.passed 
                ? 'bg-slate-900/95 border-emerald-500/50 shadow-emerald-500/10' 
                : 'bg-slate-900/95 border-rose-500/50 shadow-rose-500/10'
            }`}
          >
            {examResult.passed ? (
              // SUCCÈS : SALLE D'AUDIENCE & CERTIFICATION
              <div className="text-center space-y-6">
                <div className="h-20 w-20 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <Trophy className="h-10 w-10 text-amber-300 animate-bounce" />
                </div>

                <div>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full mb-3">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Examen Validé avec Succès
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                    Félicitations, Maître {player.avatarName} !
                  </h2>
                  <p className="text-base text-slate-300 max-w-xl mx-auto mt-2">
                    Le Juge Google Bot et la Cour ont accordé votre titularisation. Vous atteignez le rang suprême de{' '}
                    <span className="font-bold text-amber-400">Tech Lead Certifié</span>.
                  </p>
                </div>

                {/* Score officiel */}
                <div className="inline-flex items-center gap-6 px-6 py-3 rounded-2xl bg-slate-800/80 border border-slate-700">
                  <div>
                    <p className="text-xs text-slate-400">Score officiel</p>
                    <p className="text-2xl font-black text-emerald-400">{examResult.scorePercentage}%</p>
                  </div>
                  <div className="h-8 w-px bg-slate-700" />
                  <div>
                    <p className="text-xs text-slate-400">Réponses validées</p>
                    <p className="text-2xl font-black text-white">{examResult.score} / {examResult.totalQuestions}</p>
                  </div>
                </div>

                {/* Bloc Certificat Officiel */}
                <div className="p-6 rounded-2xl bg-slate-950/80 border border-amber-500/30 text-left max-w-xl mx-auto space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                      <Gavel className="h-4 w-4" /> Certificat de Maîtrise Web (Officiel)
                    </h4>
                    <span className="text-[11px] text-slate-500 font-mono">Format PDF A4</span>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    Ce document sécurisé porte la signature de l'Architecte Ingrid et le sceau officiel de Sougoudzap-ville. 
                    Il est vérifiable publiquement via son jeton cryptographique unique.
                  </p>

                  <div className="text-xs font-mono text-slate-500 pt-1">
                    Jeton de vérification : <span className="text-slate-300 select-all">{examResult.verifyToken}</span>
                  </div>
                </div>

                {/* Actions : Téléchargement du véritable PDF */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleDownloadCertificate}
                    disabled={isDownloading}
                    className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-emerald-500 to-indigo-600 hover:from-amber-600 hover:to-indigo-700 text-slate-950 font-black text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-500/20 transition-all disabled:opacity-50"
                  >
                    <Download className="h-5 w-5" />
                    <span>{isDownloading ? 'Téléchargement...' : 'TÉLÉCHARGER MON CERTIFICAT (PDF)'}</span>
                  </motion.button>

                  {examResult.verifyToken && (
                    <a
                      href={`/verify/${examResult.verifyToken}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-sm font-bold flex items-center justify-center gap-2 border border-slate-700 transition-all"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>Vérifier en ligne</span>
                    </a>
                  )}
                </div>
              </div>
            ) : (
              // ÉCHEC : OBJECTION DU JUGE & RETOUR PÉDAGOGIQUE
              <div className="space-y-6">
                <div className="text-center">
                  <div className="h-16 w-16 mx-auto rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center mb-3">
                    <XCircle className="h-8 w-8" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {examResult.verdict}
                  </h2>
                  <p className="text-sm text-slate-300 mt-2 max-w-lg mx-auto">
                    {examResult.message}
                  </p>

                  <div className="inline-flex items-center gap-4 px-5 py-2 rounded-xl bg-slate-800/80 border border-slate-700 mt-4">
                    <span className="text-xs text-slate-400">Score obtenu :</span>
                    <span className="text-lg font-bold text-rose-400">{examResult.scorePercentage}%</span>
                    <span className="text-xs text-slate-500">({examResult.score} / {examResult.totalQuestions})</span>
                  </div>
                </div>

                {/* Explications pédagogiques des notions non maîtrisées */}
                {examResult.corrections && examResult.corrections.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <AlertTriangle className="h-4 w-4 text-amber-400" />
                      Notions à réviser avant votre prochaine audition :
                    </h4>

                    <div className="max-h-64 overflow-y-auto space-y-2.5 pr-2">
                      {examResult.corrections.map((corr) => (
                        <div 
                          key={corr.questionId}
                          className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 space-y-1"
                        >
                          <div className="flex items-center justify-between text-slate-400 font-semibold text-[11px]">
                            <span>{corr.category}</span>
                            <span className="text-rose-400">Objection</span>
                          </div>
                          <p className="font-medium text-slate-200">{corr.question}</p>
                          <p className="text-amber-300/90 text-[11px] leading-relaxed">
                            💡 {corr.explanation}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions de reprise */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={handleStartExam}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
                  >
                    <RotateCcw className="h-4 w-4" />
                    <span>Repasser devant le tribunal</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate('/roadmap', { state: { player } })}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Retourner sur la Roadmap</span>
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </main>

      {/* Footer minimaliste de la cour */}
      <footer className="border-t border-slate-900 bg-slate-950/90 px-4 py-3 text-center text-xs text-slate-600">
        Haute Cour d'Architecture de Sougoudzap-ville • WebDev Evolution • 25 Notions Fondamentales
      </footer>
    </div>
  );
}
