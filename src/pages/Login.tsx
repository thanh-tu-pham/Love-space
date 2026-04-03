import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { Heart } from 'lucide-react';

export default function Login() {
  const { user, signInWithGoogle } = useAuth();
  const { t } = useTranslation();

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen max-w-md mx-auto bg-[var(--bg)] text-[var(--text)] px-6">
      <div className="flex flex-col items-center mb-12 animate-bounce">
        <Heart size={80} className="text-[var(--primary)] fill-current mb-4" />
        <h1 className="text-3xl font-bold font-serif italic text-center">Love Space</h1>
        <p className="text-[var(--text-muted)] text-center mt-2">Nơi lưu giữ kỷ niệm của hai bạn</p>
      </div>
      
      <button
        onClick={signInWithGoogle}
        className="w-full py-4 px-6 bg-[var(--surface)] border border-[var(--primary-light)] rounded-2xl shadow-sm flex items-center justify-center gap-3 text-lg font-medium hover:bg-[var(--primary-light)] transition-colors"
      >
        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-6 h-6" />
        {t('login')}
      </button>
    </div>
  );
}
