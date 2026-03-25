import { useState, useRef } from 'react';
import { Hand } from 'lucide-react';
import { sites } from '../data';

export default function HomeScreen({ onSelectSite }: { onSelectSite: (id: string) => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const cardWidth = scrollRef.current.offsetWidth * 0.85 + 24; // 85vw + gap
      const index = Math.round(scrollLeft / cardWidth);
      setActiveIndex(index);
    }
  };

  return (
    <div className="flex flex-col h-full relative bg-gradient-to-b from-[#E8EBE4] to-[#F4F5EF] overflow-hidden">
      {/* Background faint elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-[#DCE3D6]/30 to-transparent"></div>
      </div>

      {/* Top Nav */}
      <nav className="relative z-10 w-full flex items-center justify-center h-16 shrink-0 pt-6">
        <h1 className="text-xl font-bold text-[#902020] tracking-widest font-headline italic">清明祭英烈</h1>
      </nav>

      <main className="relative z-10 flex-1 flex flex-col pt-8 pb-8 overflow-y-auto">
        <header className="px-8 mb-8 text-center">
          <h2 className="text-4xl font-headline font-bold text-[#902020] tracking-widest mb-3">清明·寄思</h2>
          <p className="text-[#4A5D23] font-headline text-sm tracking-[0.2em]">人民英雄永垂不朽</p>
          <div className="mt-4 flex justify-center">
            <div className="h-[1px] w-16 bg-[#B87B7B] opacity-50"></div>
          </div>
        </header>

        <div className="relative flex-1 flex flex-col justify-center">
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 px-[7.5vw] py-4 scrollbar-hide"
          >
            {sites.map((site) => {
              return (
                <div key={site.id} className="snap-center shrink-0 w-[85vw] max-w-sm">
                  <div className="rounded-[2rem] overflow-hidden flex flex-col shadow-2xl shadow-black/10 bg-white relative">
                    <div className="h-64 w-full relative overflow-hidden">
                      <img 
                        src={site.image} 
                        alt={site.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="px-8 pb-8 pt-8 flex flex-col items-center text-center">
                      <h3 className="font-headline text-2xl font-bold text-[#111111] mb-4 tracking-widest">{site.name}</h3>
                      <p className="text-[#555555] text-sm font-headline leading-loose mb-8 px-2 line-clamp-2">
                        {site.shortDesc}
                      </p>
                      <button 
                        onClick={() => onSelectSite(site.id)}
                        className="w-full py-3.5 px-6 rounded-xl bg-[#A31D24] text-white font-headline text-lg tracking-[0.2em] transition-transform active:scale-95 shadow-lg shadow-[#A31D24]/20"
                      >
                        进入
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-8">
            {sites.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-2 rounded-full transition-all duration-300 ${idx === activeIndex ? 'w-6 bg-[#902020]' : 'w-2 bg-[#E0C0C0]'}`}
              ></div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center gap-2 opacity-60">
          <Hand className="w-6 h-6 text-[#888888] animate-bounce" />
          <span className="text-xs tracking-widest font-headline text-[#888888]">左滑切换目的地</span>
        </div>
      </main>
    </div>
  );
}
