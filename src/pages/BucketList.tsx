import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Trash2, Heart, Utensils, Activity } from 'lucide-react';
import { cn } from '../lib/utils';

export default function BucketList() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('want');

  const tabs = [
    { id: 'want', label: t('wantToDo') },
    { id: 'scheduled', label: t('scheduled') },
    { id: 'done', label: t('done') },
    { id: 'explore', label: t('explore') },
  ];

  const items = [
    { id: 1, title: 'Cùng nhau đi ăn nhà hàng sang trọng', category: '@ĂN UỐNG', icon: Utensils, status: 'want' },
    { id: 2, title: 'Cùng nhau ngắm bình minh trên biển', category: '@HOẠT ĐỘNG', icon: Activity, status: 'want' },
  ];

  return (
    <div className="flex flex-col pt-4 pb-12">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-3xl font-serif italic font-bold text-[var(--primary)] mb-1">{t('bucketListTitle')}</h2>
          <p className="text-sm text-[var(--text-muted)]">{t('bucketListDesc')}</p>
        </div>
        <button className="w-12 h-12 bg-[var(--primary)] text-white rounded-2xl flex items-center justify-center shadow-lg shadow-pink-500/30 active:scale-95 transition-transform">
          <Plus size={24} />
        </button>
      </div>

      {/* Progress Card */}
      <div className="w-full bg-gradient-to-br from-[var(--primary)] to-rose-500 rounded-3xl p-6 text-white shadow-lg mb-6 relative overflow-hidden">
        <Heart className="absolute -right-4 -top-4 w-32 h-32 text-white/10 fill-current" />
        <h3 className="text-xs font-bold tracking-widest uppercase mb-2 opacity-90">{t('progress')}</h3>
        <div className="text-5xl font-bold mb-4">3/5</div>
        <div className="w-full h-2 bg-white/30 rounded-full overflow-hidden">
          <div className="h-full bg-white rounded-full" style={{ width: '60%' }}></div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto no-scrollbar gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "whitespace-nowrap px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all",
              activeTab === tab.id 
                ? "bg-[var(--primary)] text-white shadow-md" 
                : "bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--text)]"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-[var(--surface)] p-4 rounded-2xl shadow-sm flex flex-col gap-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-pink-50 dark:bg-pink-500/10 text-[var(--primary)] flex items-center justify-center shrink-0">
                <item.icon size={20} />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-[var(--text)] leading-snug mb-1">{item.title}</h4>
                <span className="text-xs font-bold text-[var(--text-muted)] uppercase">{item.category}</span>
              </div>
              <button className="text-gray-300 hover:text-red-500 transition-colors">
                <Trash2 size={20} />
              </button>
            </div>
            <button className="w-full py-2.5 bg-pink-50 dark:bg-pink-500/10 text-[var(--primary)] rounded-xl text-sm font-bold flex items-center justify-center gap-2">
              <Heart size={16} className="fill-current" /> {t('together')}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
