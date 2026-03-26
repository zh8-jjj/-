import { motion } from 'motion/react';

export default function WelcomeScreen({ onEnter }: { onEnter: () => void }) {
  return (
    <main className="relative h-full w-full flex flex-col items-center justify-between overflow-y-auto overflow-x-hidden bg-[#E8EBE4]">
      {/* Background Mountain Silhouettes */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHdIZGtRuz6Fc4AJvW9ZV-LQbe6Rf7CToGgrR2tzjSlmEXd4i6QPle_3mF8T061pSSByBu-QNAIyRB63J6C9Hv1cWU0M60mW9MBCk6SQRuOTwFFhtv3lPHZtLOzzi369XrUX1Wy9CGB7g1ZTTZCmmIzC19jJqWPsoC4_-uyRCC04WaYv0esFEgYv9CbJiB5aTvgdA9XhNhNJj1sh03_qk4vwHyd72un42sln3Pf5k0xg7OLSoDe2zA2WrkDiF5XRtTUHOC-JJNNAxp" 
          alt="Mountains" 
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#E8EBE4]/20 via-[#E8EBE4]/50 to-[#E8EBE4]"></div>
        <img 
          src="/T.png" 
          alt="柳树" 
          referrerPolicy="no-referrer"
          className="absolute -top-4 -right-4 w-64 md:w-80 h-auto opacity-85 mix-blend-multiply pointer-events-none drop-shadow-sm"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mt-[100px] px-8 w-full text-center flex-1 flex flex-col items-center">
        <header className="mb-10 flex flex-col items-center">
          <h1 className="font-headline text-5xl text-[#902020] tracking-widest leading-tight mb-5 drop-shadow-sm">
            清明祭英烈
          </h1>
          <div className="h-[3px] w-20 bg-[#B87B7B] mx-auto opacity-80"></div>
        </header>

        <div className="space-y-12 max-w-sm mx-auto mt-2">
          <p className="text-[#333333] font-headline text-[17px] tracking-widest font-bold">
            缅怀革命先烈，赓续红色血脉
          </p>
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.8
                }
              }
            }}
            className="text-[#333333] font-headline text-[15px] tracking-widest leading-loose space-y-10 text-center px-2"
          >
            <motion.p variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 1 } } }}>清明至，松柏寄哀思，丰碑忆忠魂。</motion.p>
            <motion.p variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 1 } } }}>南充是一片红色热土，无数革命先烈为民族独立、人民解放、国家富强献出宝贵生命。</motion.p>
            <motion.p variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 1 } } }}>全市各级退役军人事务部门用心守护烈士纪念设施，传承英烈精神、弘扬红色文化。</motion.p>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-20 pb-16 pt-8 flex flex-col items-center w-full shrink-0">
        <button 
          onClick={onEnter}
          className="group relative px-14 py-4 bg-[#A31D24] text-white rounded-xl font-headline text-lg tracking-[0.2em] shadow-lg active:scale-95 transition-all duration-300"
        >
          点击进入
        </button>
      </div>
    </main>
  );
}
