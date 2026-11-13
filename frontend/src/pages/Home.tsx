import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Sun, Cloud, Heart, Rocket, Star, Footprints } from 'lucide-react';
import { registerPlayer } from '../services/api';

export default function Home() {
  const [playerName, setPlayerName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleStartAdventure = async () => {
    if (!playerName.trim()) return;
    
    setLoading(true);
    try {
      const data = await registerPlayer(playerName);
      if (data.player?.id) {
        localStorage.setItem('webdev_player_id', data.player.id);
      }
      navigate('/roadmap', { state: { player: data.player } });
    } catch (error) {
      alert("Oups, impossible de rejoindre la maternité pour le moment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 via-amber-50 to-emerald-100 flex flex-col justify-between items-center relative overflow-hidden text-slate-800 p-4 select-none">
      {/* Éléments décoratifs Jardin d'enfants (Soleil, nuages, étoiles) */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
        className="absolute -top-12 -right-12 text-amber-400 opacity-90 pointer-events-none"
      >
        <Sun className="h-44 w-44 drop-shadow-md" />
      </motion.div>

      <motion.div 
        animate={{ x: [-20, 20, -20] }}
        transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
        className="absolute top-12 left-10 text-white/90 drop-shadow-sm pointer-events-none hidden sm:block"
      >
        <Cloud className="h-20 w-20 fill-white" />
      </motion.div>

      <motion.div 
        animate={{ x: [15, -15, 15] }}
        transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
        className="absolute top-24 right-32 text-white/80 drop-shadow-sm pointer-events-none hidden sm:block"
      >
        <Cloud className="h-16 w-16 fill-white" />
      </motion.div>

      {/* Petits confettis / Étoiles en arrière-plan */}
      <div className="absolute top-1/4 left-1/6 text-amber-400/60 animate-bounce">
        <Star className="h-6 w-6 fill-amber-300" />
      </div>
      <div className="absolute top-1/3 right-1/5 text-pink-400/60 animate-pulse">
        <Heart className="h-6 w-6 fill-pink-300" />
      </div>

      {/* Header Joyeux */}
      <header className="pt-8 text-center z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 12 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/80 backdrop-blur-md shadow-md border-2 border-amber-300 text-amber-700 font-extrabold text-xs sm:text-sm tracking-wide mb-3"
        >
          <Sparkles className="h-4 w-4 text-amber-500 fill-amber-400" />
          <span>Le Jardin d'Éveil de Sougoudzap-ville</span>
          <Sparkles className="h-4 w-4 text-amber-500 fill-amber-400" />
        </motion.div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-800 drop-shadow-sm flex items-center justify-center gap-3">
          <span className="text-sky-600">Cyr</span>
          <span className="text-amber-500">Samuel</span>
          <span className="text-emerald-500">Evolution</span>
          <motion.span 
            animate={{ rotate: [-10, 10, -10] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="inline-block"
          >
            👶
          </motion.span>
        </h1>
        <p className="mt-2 text-base sm:text-lg font-bold text-slate-600 max-w-md mx-auto">
          Grandis, joue et deviens un <span className="text-indigo-600 underline decoration-wavy decoration-amber-400">Super Tech Lead</span> !
        </p>
      </header>

      {/* Boîte de jeu centrale (Carte d'inscription façon cahier d'écolier) */}
      <motion.main 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-md bg-white/95 backdrop-blur-md p-6 sm:p-8 rounded-[2.5rem] shadow-2xl border-4 border-amber-200 relative z-10 my-8"
      >
        {/* Stickers mignons sur les coins */}
        <div className="absolute -top-4 -left-3 h-9 w-9 rounded-2xl bg-pink-400 text-white flex items-center justify-center shadow-md rotate-[-12deg] text-lg">
          🎈
        </div>
        <div className="absolute -top-4 -right-3 h-9 w-9 rounded-2xl bg-emerald-400 text-white flex items-center justify-center shadow-md rotate-[12deg] text-lg">
          🧸
        </div>

        <div className="text-center mb-6">
          <div className="h-16 w-16 mx-auto rounded-3xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-3xl shadow-inner mb-3">
            🍼
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-800">
            Prêt(e) à entrer dans le bac à sable ?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-1">
            Choisis le prénom de ton Bébé Dev pour commencer l'aventure !
          </p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Ex: CyrSamuel, Léa, Alex..." 
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleStartAdventure()}
              maxLength={20}
              className="w-full px-5 py-4 rounded-2xl bg-amber-50/60 border-2 border-amber-300 text-slate-900 placeholder-slate-400 font-bold text-center text-lg focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-200 transition-all shadow-inner"
            />
          </div>

          <motion.button 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleStartAdventure}
            disabled={loading || !playerName.trim()}
            className="w-full bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 hover:from-amber-500 hover:to-rose-500 text-white font-black text-lg py-4 px-6 rounded-2xl shadow-xl shadow-orange-500/25 border-b-4 border-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <span>Préparation du berceau... 🍼</span>
            ) : (
              <>
                <Rocket className="h-5 w-5 animate-pulse" />
                <span>C'est parti, on joue ! 🎨</span>
              </>
            )}
          </motion.button>
        </div>

        <div className="mt-6 pt-4 border-t-2 border-dashed border-amber-100 flex items-center justify-center gap-2 text-xs font-bold text-slate-400">
          <Footprints className="h-4 w-4 text-emerald-500" />
          <span>7 Niveaux rigolos • 25 Notions • 1 Vrai Diplôme</span>
        </div>
      </motion.main>

      {/* Petit sol herbeux décoratif en bas */}
      <footer className="w-full text-center py-4 z-10 text-xs font-bold text-emerald-800">
        🌱 Maternité & École Ludique de Sougoudzap-ville • Fait avec bienveillance & joie
      </footer>
    </div>
  );
}
