import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Utensils, Coffee, Gamepad2, RotateCw } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Wheel() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('eat');
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<string | null>(null);

  const tabs = [
    { id: 'eat', icon: Utensils, label: t('eat') },
    { id: 'drink', icon: Coffee, label: t('drink') },
    { id: 'play', icon: Gamepad2, label: t('play') },
  ];

  const options = {
    eat: ['Bánh hỏi', 'Phở', 'Bún chả', 'Pizza', 'Sushi', 'Cơm tấm'],
    drink: ['Trà sữa', 'Cà phê', 'Sinh tố', 'Nước ép', 'Trà đào', 'Bia'],
    play: ['Xem phim', 'Dạo phố', 'Chơi game', 'Mua sắm', 'Công viên', 'Ở nhà'],
  };

  const spinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setResult(null);
    
    // Random rotation between 5 to 10 full spins + random offset
    const newRotation = rotation + (360 * 5) + Math.floor(Math.random() * 360);
    setRotation(newRotation);

    setTimeout(() => {
      setIsSpinning(false);
      const currentOptions = options[activeTab as keyof typeof options];
      // Calculate which option won based on final rotation
      const normalizedRotation = newRotation % 360;
      const sliceAngle = 360 / currentOptions.length;
      // The pointer is at the top (0 degrees)
      const winningIndex = Math.floor((360 - normalizedRotation + (sliceAngle / 2)) % 360 / sliceAngle);
      setResult(currentOptions[winningIndex]);
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center pt-6 pb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif italic font-bold text-[var(--primary)] mb-2">{t('randomWheel')}</h2>
        <p className="text-sm text-[var(--text-muted)] px-8">{t('wheelDesc')}</p>
      </div>

      {/* Tabs */}
      <div className="flex bg-[var(--surface)] p-1 rounded-full shadow-sm mb-12 w-full max-w-xs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-medium transition-all",
              activeTab === tab.id 
                ? "bg-[var(--primary)] text-white shadow-md" 
                : "text-[var(--text-muted)] hover:text-[var(--text)]"
            )}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Wheel Area */}
      <div className="relative w-64 h-64 mb-12">
        {/* Pointer */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-6 h-6 bg-[var(--primary)] rotate-45 z-20 rounded-sm shadow-sm"></div>
        
        {/* Wheel */}
        <motion.div 
          className="w-full h-full rounded-full border-4 border-dashed border-[var(--primary-light)] relative bg-[var(--surface)] shadow-xl overflow-hidden"
          animate={{ rotate: rotation }}
          transition={{ duration: 3, ease: [0.2, 0.8, 0.2, 1] }}
        >
          {options[activeTab as keyof typeof options].map((opt, i, arr) => {
            const angle = (360 / arr.length) * i;
            return (
              <div 
                key={i}
                className="absolute w-full h-full flex justify-center pt-4"
                style={{ transform: `rotate(${angle}deg)` }}
              >
                <span className="text-xs font-bold text-[var(--primary)] uppercase tracking-wider">{opt}</span>
              </div>
            );
          })}
        </motion.div>

        {/* Center Result Display */}
        <div className="absolute inset-0 m-auto w-32 h-32 bg-white dark:bg-slate-800 rounded-full shadow-inner flex flex-col items-center justify-center z-10 border-4 border-[var(--bg)]">
          {result ? (
            <motion.div 
              initial={{ scale: 0 }} 
              animate={{ scale: 1 }} 
              className="text-center"
            >
              <div className="text-2xl mb-1">✨</div>
              <div className="text-sm font-bold text-[var(--primary)] uppercase">{result}</div>
            </motion.div>
          ) : (
            <div className="text-[var(--text-muted)] text-xs uppercase tracking-widest">?</div>
          )}
        </div>
      </div>

      {/* Spin Button */}
      <button 
        onClick={spinWheel}
        disabled={isSpinning}
        className="w-full max-w-xs py-4 bg-gradient-to-r from-[var(--primary)] to-rose-500 text-white rounded-full font-bold text-lg shadow-lg shadow-pink-500/30 flex items-center justify-center gap-2 active:scale-95 transition-transform disabled:opacity-70"
      >
        <RotateCw size={20} className={isSpinning ? "animate-spin" : ""} />
        {t('spinRandom')}
      </button>
    </div>
  );
}
