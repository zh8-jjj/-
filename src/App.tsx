import { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Music, VolumeX } from 'lucide-react';
import WelcomeScreen from './components/WelcomeScreen';
import HomeScreen from './components/HomeScreen';
import DetailScreen from './components/DetailScreen';
import { sites } from './data';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'WELCOME' | 'HOME' | 'DETAIL'>('WELCOME');
  const [selectedSiteId, setSelectedSiteId] = useState<string | null>(null);
  
  // Audio state
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(e => console.log("Audio play failed:", e));
      }
    }
  };

  const handleEnter = () => {
    setCurrentScreen('HOME');
    // Try to auto-play music on first user interaction
    if (audioRef.current && !isPlaying) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(e => console.log("Auto-play prevented:", e));
    }
  };

  const handleSelectSite = (id: string) => {
    setSelectedSiteId(id);
    setCurrentScreen('DETAIL');
  };
  const handleBack = () => setCurrentScreen('HOME');

  const selectedSite = sites.find(s => s.id === selectedSiteId) || sites[0];

  return (
    <div className="w-full min-h-screen bg-surface text-on-surface font-body overflow-hidden relative max-w-md mx-auto shadow-2xl">
      {/* Global Music Toggle Button */}
      <button
        onClick={toggleMusic}
        className="fixed top-4 right-4 z-[999] w-10 h-10 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 shadow-lg active:scale-95 transition-transform"
      >
        {isPlaying ? (
          <Music className="w-5 h-5 animate-[spin_4s_linear_infinite]" />
        ) : (
          <VolumeX className="w-5 h-5 opacity-80" />
        )}
      </button>

      {/* Global Audio Element */}
      <audio ref={audioRef} src="/music.mp3" loop preload="auto" />

      <AnimatePresence mode="wait">
        {currentScreen === 'WELCOME' && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            <WelcomeScreen onEnter={handleEnter} />
          </motion.div>
        )}
        {currentScreen === 'HOME' && (
          <motion.div
            key="home"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="absolute inset-0"
          >
            <HomeScreen onSelectSite={handleSelectSite} />
          </motion.div>
        )}
        {currentScreen === 'DETAIL' && (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="absolute inset-0 bg-[#F1F8E9] overflow-y-auto"
          >
            <DetailScreen site={selectedSite} onBack={handleBack} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

