import React, { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { Bell, Heart, ListTodo, Dices, Image as ImageIcon, User as UserIcon } from 'lucide-react';
import { cn } from '../lib/utils';
import i18n from '../lib/i18n';

export default function Layout() {
  const { t } = useTranslation();
  const { profile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (profile?.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    if (profile?.language) {
      i18n.changeLanguage(profile.language);
    }
  }, [profile?.theme, profile?.language, i18n]);

  const navItems = [
    { path: '/', icon: Heart, label: t('home') },
    { path: '/timeline', icon: ImageIcon, label: t('timeline') },
    { path: '/wheel', icon: Dices, label: t('wheel'), isCenter: true },
    { path: '/bucket-list', icon: ListTodo, label: t('bucketList') },
    { path: '/profile', icon: UserIcon, label: t('profile') },
  ];

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto relative overflow-hidden bg-[var(--bg)] text-[var(--text)] shadow-2xl">
      {/* Top Bar */}
      <header className="flex justify-between items-center px-6 py-4 bg-transparent z-10">
        <div className="text-xl font-bold text-[var(--primary)] font-serif italic">
          {t('greeting')}
        </div>
        <div className="flex items-center gap-4">
          <button className="relative p-2 text-[var(--text)] hover:text-[var(--primary)] transition-colors">
            <Bell size={24} />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[var(--primary)] rounded-full border-2 border-[var(--bg)]"></span>
          </button>
          <button onClick={() => navigate('/profile')} className="w-10 h-10 rounded-full overflow-hidden border-2 border-[var(--primary)] p-0.5">
            <img 
              src={profile?.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile?.uid}`} 
              alt="Avatar" 
              className="w-full h-full rounded-full object-cover"
            />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto no-scrollbar pb-24 px-4">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="absolute bottom-0 w-full bg-[var(--surface)] rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.05)] dark:shadow-[0_-10px_40px_rgba(0,0,0,0.2)] px-6 py-4 z-50">
        <div className="flex justify-between items-center relative">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            
            if (item.isCenter) {
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className="relative -top-8 flex justify-center items-center w-16 h-16 rounded-full bg-[var(--primary)] text-white shadow-lg shadow-pink-500/30 transform transition-transform hover:scale-105 active:scale-95"
                >
                  <item.icon size={32} />
                </button>
              );
            }

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={cn(
                  "flex flex-col items-center gap-1 p-2 transition-colors",
                  isActive ? "text-[var(--primary)]" : "text-[var(--text-muted)] hover:text-[var(--text)]"
                )}
              >
                <item.icon size={24} className={isActive ? "fill-current" : ""} />
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
