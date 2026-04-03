import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { Settings, Camera, LogOut, Moon, Sun, Heart } from 'lucide-react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function Profile() {
  const { t } = useTranslation();
  const { profile, logout } = useAuth();
  const [dob, setDob] = useState(profile?.dob || '');

  const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 8) val = val.slice(0, 8);
    
    let formatted = val;
    if (val.length > 4) {
      formatted = `${val.slice(0, 2)} / ${val.slice(2, 4)} / ${val.slice(4)}`;
    } else if (val.length > 2) {
      formatted = `${val.slice(0, 2)} / ${val.slice(2)}`;
    }
    setDob(formatted);
  };

  const toggleTheme = async () => {
    if (!profile) return;
    const newTheme = profile.theme === 'dark' ? 'light' : 'dark';
    const docRef = doc(db, 'users', profile.uid);
    await updateDoc(docRef, { theme: newTheme });
    window.location.reload();
  };

  const toggleLanguage = async () => {
    if (!profile) return;
    const newLang = profile.language === 'vi' ? 'ja' : 'vi';
    const docRef = doc(db, 'users', profile.uid);
    await updateDoc(docRef, { language: newLang });
    window.location.reload();
  };

  return (
    <div className="flex flex-col gap-6 pb-8 items-center">
      {/* Avatar Section */}
      <div className="relative mt-4">
        <div className="w-28 h-28 rounded-full border-4 border-[var(--bg)] shadow-xl overflow-hidden relative">
          <img 
            src={profile?.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile?.uid}`} 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
            <Camera className="text-white" size={32} />
          </div>
        </div>
        <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-[var(--primary)]">
          <Settings size={18} />
        </button>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold text-[var(--text)]">{profile?.displayName || 'User'}</h2>
        <p className="text-[var(--primary)] font-medium italic">@{profile?.displayName?.toLowerCase().replace(/\s/g, '') || 'user'}</p>
      </div>

      {/* DOB Input */}
      <div className="w-full bg-[var(--surface)] p-5 rounded-3xl shadow-sm">
        <label className="block text-xs font-bold text-[var(--text-muted)] uppercase mb-2 ml-1">Ngày sinh</label>
        <input 
          type="text" 
          value={dob}
          onChange={handleDobChange}
          placeholder="DD / MM / YYYY"
          className="w-full bg-[var(--bg)] text-[var(--text)] px-4 py-3 rounded-xl border border-transparent focus:border-[var(--primary)] focus:outline-none transition-colors font-mono text-center text-lg"
        />
      </div>

      {/* Relationship Info */}
      <div className="w-full bg-[var(--surface)] p-6 rounded-3xl shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary-light)] rounded-bl-full opacity-20 -z-0"></div>
        <h3 className="text-sm font-bold text-[var(--primary)] flex items-center gap-2 mb-6 relative z-10">
          <Heart size={16} className="fill-current" /> {t('ourRelationship')}
        </h3>
        
        <div className="flex justify-between relative z-10">
          <div>
            <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">{t('partner')}</p>
            <p className="text-lg font-serif italic font-medium text-[var(--primary)]">Kim Ngân</p>
          </div>
          <div className="w-px bg-gray-200 dark:bg-gray-700"></div>
          <div className="text-right">
            <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">{t('togetherSince')}</p>
            <p className="text-lg font-bold text-[var(--primary)]">17/1/2023</p>
          </div>
        </div>
      </div>

      {/* Settings & Actions */}
      <div className="w-full flex flex-col gap-3">
        <button 
          onClick={toggleTheme}
          className="w-full py-4 px-6 flex items-center justify-between bg-[var(--surface)] rounded-2xl font-medium shadow-sm active:scale-[0.98] transition-transform"
        >
          <div className="flex items-center gap-3 text-[var(--text)]">
            {profile?.theme === 'dark' ? <Sun size={20} className="text-amber-500" /> : <Moon size={20} className="text-indigo-500" />}
            Chuyển đổi giao diện
          </div>
          <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider">
            {profile?.theme === 'dark' ? 'Sáng' : 'Tối'}
          </span>
        </button>

        <button 
          onClick={toggleLanguage}
          className="w-full py-4 px-6 flex items-center justify-between bg-[var(--surface)] rounded-2xl font-medium shadow-sm active:scale-[0.98] transition-transform"
        >
          <div className="flex items-center gap-3 text-[var(--text)]">
            <span className="text-xl">🌐</span>
            Ngôn ngữ (Language)
          </div>
          <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider">
            {profile?.language === 'ja' ? '日本語' : 'Tiếng Việt'}
          </span>
        </button>

        <button 
          onClick={logout}
          className="w-full py-4 flex items-center justify-center gap-2 text-red-500 bg-red-50 dark:bg-red-500/10 rounded-2xl font-medium shadow-sm active:scale-[0.98] transition-transform"
        >
          <LogOut size={20} />
          Đăng xuất
        </button>
      </div>
    </div>
  );
}
