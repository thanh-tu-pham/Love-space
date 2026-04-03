import React from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, MapPin, Calendar } from 'lucide-react';

export default function Timeline() {
  const { t } = useTranslation();

  const memories = [
    {
      id: 1,
      date: '14/02/2024',
      title: 'Valentine đầu tiên',
      location: 'Nhà hàng Pháp',
      image: 'https://picsum.photos/seed/valen/800/600',
      desc: 'Một buổi tối thật lãng mạn và tuyệt vời.'
    },
    {
      id: 2,
      date: '25/12/2023',
      title: 'Giáng sinh an lành',
      location: 'Phố đi bộ',
      image: 'https://picsum.photos/seed/xmas/800/600',
      desc: 'Cùng nhau đón Giáng sinh dưới cái lạnh 15 độ.'
    }
  ];

  return (
    <div className="flex flex-col pt-4 pb-12">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-3xl font-serif italic font-bold text-[var(--primary)] mb-1">{t('timeline')}</h2>
          <p className="text-sm text-[var(--text-muted)]">Lưu giữ từng khoảnh khắc</p>
        </div>
        <button className="w-12 h-12 bg-[var(--primary)] text-white rounded-2xl flex items-center justify-center shadow-lg shadow-pink-500/30 active:scale-95 transition-transform">
          <Plus size={24} />
        </button>
      </div>

      <div className="relative border-l-2 border-[var(--primary-light)] ml-4 pl-6 flex flex-col gap-8">
        {memories.map((memory) => (
          <div key={memory.id} className="relative">
            {/* Timeline Dot */}
            <div className="absolute -left-[31px] top-0 w-4 h-4 bg-[var(--primary)] rounded-full border-4 border-[var(--bg)] shadow-sm"></div>
            
            <div className="bg-[var(--surface)] rounded-2xl overflow-hidden shadow-sm">
              <img src={memory.image} alt={memory.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <div className="flex items-center gap-4 text-xs text-[var(--text-muted)] font-medium mb-2">
                  <div className="flex items-center gap-1"><Calendar size={14} /> {memory.date}</div>
                  <div className="flex items-center gap-1"><MapPin size={14} /> {memory.location}</div>
                </div>
                <h3 className="text-lg font-bold text-[var(--text)] mb-1">{memory.title}</h3>
                <p className="text-sm text-[var(--text-muted)]">{memory.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
