import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { differenceInYears, differenceInMonths, differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';
import { Smile, Gift, ShieldAlert, Tags, CalendarHeart, ShieldCheck, HeartCrack, ChevronRight, Heart } from 'lucide-react';

export default function Home() {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Fake start date for prototype
  const startDate = new Date('2023-01-17T00:00:00');
  const [timeTogether, setTimeTogether] = useState({
    years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTimeTogether({
        years: differenceInYears(now, startDate),
        months: differenceInMonths(now, startDate) % 12,
        days: differenceInDays(now, startDate) % 30,
        hours: differenceInHours(now, startDate) % 24,
        minutes: differenceInMinutes(now, startDate) % 60,
        seconds: differenceInSeconds(now, startDate) % 60,
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const slides = [
    (
      <div key="timer" className="relative w-full h-48 rounded-3xl overflow-hidden shadow-lg">
        <img src="https://picsum.photos/seed/couple/800/400" alt="Background" className="absolute inset-0 w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
          <h3 className="text-sm font-medium tracking-widest uppercase mb-4 opacity-80">{t('timeTogether')}</h3>
          <div className="grid grid-cols-3 gap-x-6 gap-y-2 text-center">
            <div><div className="text-2xl font-bold">{timeTogether.years}</div><div className="text-xs opacity-80">{t('years')}</div></div>
            <div><div className="text-2xl font-bold">{timeTogether.months}</div><div className="text-xs opacity-80">{t('months')}</div></div>
            <div><div className="text-2xl font-bold">{timeTogether.days}</div><div className="text-xs opacity-80">{t('days')}</div></div>
            <div><div className="text-2xl font-bold">{timeTogether.hours}</div><div className="text-xs opacity-80">{t('hours')}</div></div>
            <div><div className="text-2xl font-bold">{timeTogether.minutes}</div><div className="text-xs opacity-80">{t('minutes')}</div></div>
            <div><div className="text-2xl font-bold">{timeTogether.seconds}</div><div className="text-xs opacity-80">{t('seconds')}</div></div>
          </div>
        </div>
      </div>
    ),
    (
      <div key="mood" className="w-full h-48 rounded-3xl bg-gradient-to-br from-pink-400 to-rose-500 p-6 flex flex-col justify-center text-white shadow-lg">
        <h3 className="text-lg font-bold mb-4 text-center">{t('moodToday')}</h3>
        <div className="flex justify-around items-center">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl mb-2">🥰</div>
            <span className="text-sm">Minh Thắng</span>
          </div>
          <Heart className="fill-white w-8 h-8 animate-pulse" />
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl mb-2">😘</div>
            <span className="text-sm">Kim Ngân</span>
          </div>
        </div>
      </div>
    )
  ];

  const quickActions = [
    { icon: Smile, title: t('moodToday'), desc: t('recordMood'), color: 'text-emerald-500', bg: 'bg-emerald-100' },
    { icon: Gift, title: t('surpriseBox'), desc: t('sendSecretMsg'), color: 'text-purple-500', bg: 'bg-purple-100' },
    { icon: ShieldAlert, title: t('makeUp'), desc: t('resolveConflicts'), color: 'text-rose-500', bg: 'bg-rose-100' },
  ];

  const systemSettings = [
    { icon: Tags, title: t('categoryMgmt'), color: 'text-indigo-500', bg: 'bg-indigo-100' },
    { icon: CalendarHeart, title: t('eventsHolidays'), color: 'text-pink-500', bg: 'bg-pink-100' },
    { icon: ShieldCheck, title: t('security'), color: 'text-amber-500', bg: 'bg-amber-100' },
    { icon: HeartCrack, title: t('disconnect'), color: 'text-red-500', bg: 'bg-red-100' },
  ];

  return (
    <div className="flex flex-col gap-6 pb-8">
      {/* Carousel */}
      <div className="relative w-full overflow-hidden rounded-3xl" onClick={() => setCurrentSlide((s) => (s + 1) % slides.length)}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            {slides[currentSlide]}
          </motion.div>
        </AnimatePresence>
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
          {slides.map((_, i) => (
            <div key={i} className={`w-2 h-2 rounded-full ${i === currentSlide ? 'bg-white' : 'bg-white/40'}`} />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-col gap-3">
        {quickActions.map((action, i) => (
          <button key={i} className="flex items-center p-4 bg-[var(--surface)] rounded-2xl shadow-sm active:scale-[0.98] transition-transform">
            <div className={`w-12 h-12 rounded-full ${action.bg} ${action.color} flex items-center justify-center mr-4`}>
              <action.icon size={24} />
            </div>
            <div className="flex-1 text-left">
              <h4 className="font-semibold text-[var(--text)]">{action.title}</h4>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">{action.desc}</p>
            </div>
            <ChevronRight size={20} className="text-[var(--text-muted)] opacity-50" />
          </button>
        ))}
      </div>

      {/* System Settings */}
      <div className="mt-4">
        <h3 className="text-xs font-bold tracking-widest text-[var(--text-muted)] uppercase mb-4 ml-2">{t('system')}</h3>
        <div className="flex flex-col gap-3">
          {systemSettings.map((setting, i) => (
            <button key={i} className="flex items-center p-4 bg-[var(--surface)] rounded-2xl shadow-sm active:scale-[0.98] transition-transform">
              <div className={`w-10 h-10 rounded-full ${setting.bg} ${setting.color} flex items-center justify-center mr-4`}>
                <setting.icon size={20} />
              </div>
              <div className="flex-1 text-left font-medium text-[var(--text)]">
                {setting.title}
              </div>
              <ChevronRight size={20} className="text-[var(--text-muted)] opacity-50" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
