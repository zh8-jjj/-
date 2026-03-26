import { useState } from 'react';
import { ArrowLeft, MapPin, Flower2, BookOpen, Flame } from 'lucide-react';
import { Site } from '../data';
import { motion, AnimatePresence } from 'motion/react';

const TRIBUTE_MESSAGES = [
  "向革命先烈致敬！",
  "人民英雄永垂不朽！",
  "缅怀先烈，吾辈自强！",
  "山河无恙，国泰民安！",
  "永远铭记你们的牺牲！",
  "致敬最可爱的人！",
  "清明祭英烈，遗志永传承。"
];

export default function DetailScreen({ site, onBack }: { site: Site, onBack: () => void }) {
  const [tributeType, setTributeType] = useState<'flower' | 'candle' | null>(null);

  let overviewTitle = "陵园概览";
  if (site.name.includes("李鸣珂烈士塑像")) overviewTitle = "烈士塑像概览";
  else if (site.name.includes("西充县烈士纪念广场") || site.name.includes("蓬安县烈士纪念广场")) overviewTitle = "广场概览";
  else if (site.name.includes("升保起义纪念园")) overviewTitle = "纪念园概览";
  else if (site.name.includes("高金虎烈士墓") || site.name.includes("杨吉甫烈士墓")) overviewTitle = "烈士墓概览";

  const handleTribute = (type: 'flower' | 'candle') => {
    setTributeType(type);
    setTimeout(() => {
      setTributeType(null);
    }, 2500);
  };

  return (
    <div className="relative min-h-screen pb-12 font-sans" style={{ backgroundColor: '#F4F9F4', backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\' fill=\'%23e2ede2\' fill-opacity=\'0.4\'/%3E%3C/g%3E%3C/svg%3E")' }}>
      {/* Header */}
      <header className="fixed top-0 w-full max-w-md z-50 bg-[#F4F9F4]/90 backdrop-blur-sm border-b border-[#d1e0d1]/50">
        <div className="flex justify-between items-center px-4 py-4">
          <button onClick={onBack} className="p-2 rounded-full active:bg-black/5 text-[#8F000D] transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="font-serif text-lg font-bold text-[#8F000D] tracking-widest">{site.name}</h1>
          <div className="w-10"></div> {/* Spacer to center title */}
        </div>
      </header>

      {/* Hero Image */}
      <section className="relative h-[280px] w-full overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-t from-[#F4F9F4] via-transparent to-transparent z-10 pointer-events-none"></div>
        <motion.img 
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src={site.image} 
          alt={site.name} 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover" 
        />
        
        {/* Danmaku Overlay */}
        <div className="absolute top-20 left-0 right-0 bottom-12 z-10 overflow-hidden pointer-events-none">
          {TRIBUTE_MESSAGES.map((msg, i) => (
            <div
              key={i}
              className="absolute whitespace-nowrap text-white/90 font-medium text-sm tracking-widest drop-shadow-md animate-danmaku"
              style={{ 
                top: `${(i % 5) * 20}%`, 
                animationDuration: `${10 + (i % 3) * 2}s`, 
                animationDelay: `${i * 1.5}s` 
              }}
            >
              {msg}
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 relative z-20 -mt-8">
        {/* Title & Address */}
        <div className="bg-white/90 backdrop-blur-md rounded-xl p-4 shadow-md shadow-[#d1e0d1]/30 mb-6 border border-[#d1e0d1]/50">
          <div className="flex items-start gap-2 text-[#5A403E]">
            <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-[#8F000D]/70" />
            <p className="text-sm leading-relaxed">{site.address}</p>
          </div>
        </div>

        {/* Overview Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-[#8F000D]"></div>
            <h2 className="font-serif text-xl font-bold text-[#1B1D0E] tracking-widest">{overviewTitle}</h2>
          </div>
          <p className="text-[#5A403E] leading-loose text-sm text-justify indent-7">
            {site.history}
          </p>
          
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-[#F4F9F4]/80 p-4 rounded-xl border border-[#d1e0d1]/50 shadow-sm shadow-[#d1e0d1]/20">
              <p className="text-[11px] text-[#5A403E]/70 mb-1 tracking-widest">竣工年份</p>
              <p className="font-serif text-lg text-[#8F000D]">{site.year}</p>
            </div>
            <div className="bg-[#F4F9F4]/80 p-4 rounded-xl border border-[#d1e0d1]/50 shadow-sm shadow-[#d1e0d1]/20">
              <p className="text-[11px] text-[#5A403E]/70 mb-1 tracking-widest">占地面积</p>
              <p className="font-serif text-lg text-[#8F000D]">{site.area}</p>
            </div>
          </div>
        </div>

        {/* Context Section */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-[#8F000D]"></div>
            <h2 className="font-serif text-xl font-bold text-[#1B1D0E] tracking-widest">红色记忆</h2>
          </div>
          <div className="bg-white/60 rounded-2xl p-5 border border-[#d1e0d1]/50 shadow-sm">
            <p className="text-[#5A403E] leading-loose text-sm text-justify indent-7">
              {site.context}
            </p>
          </div>
        </div>
      </section>

      {/* Bottom Action Bar (Normal Flow) */}
      <div className="w-full px-6 mt-4 flex justify-center gap-4">
        <button 
          onClick={() => handleTribute('flower')}
          className="py-3.5 px-6 rounded-full bg-[#8F000D] text-white font-bold text-sm shadow-lg shadow-[#8F000D]/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 tracking-widest flex-1"
        >
          <Flower2 className="w-4 h-4" />
          在线献花
        </button>
        <button 
          onClick={() => handleTribute('candle')}
          className="py-3.5 px-6 rounded-full bg-[#D97706] text-white font-bold text-sm shadow-lg shadow-[#D97706]/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 tracking-widest flex-1"
        >
          <Flame className="w-4 h-4" />
          点亮蜡烛
        </button>
      </div>

      {/* Tribute Modal */}
      <AnimatePresence>
        {tributeType && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-md max-w-md mx-auto"
            onClick={() => setTributeType(null)}
          >
            <motion.div
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.6 }}
              className="flex flex-col items-center"
            >
              <motion.img
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                src={tributeType === 'flower' ? '/R.png' : '/F.png'}
                alt={tributeType === 'flower' ? "菊花" : "蜡烛"}
                referrerPolicy="no-referrer"
                className="w-48 h-48 object-contain drop-shadow-2xl"
              />
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mt-8 text-white text-2xl md:text-3xl tracking-[0.25em] drop-shadow-lg font-bold text-center"
                style={{ fontFamily: '"SimSun", "STSong", serif', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
              >
                浩气长存 英魂不朽
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
