import React from 'react';
import { CareerSuggestion } from '../types';

interface CareerCardProps {
  suggestion: CareerSuggestion;
}

// Fix: Changed JSX.Element to React.ReactNode to resolve the "Cannot find namespace 'JSX'" error.
const InfoRow: React.FC<{ icon: React.ReactNode; label: string; value: string; }> = ({ icon, label, value }) => (
    <div className="flex items-start mt-3">
        <div className="flex-shrink-0 h-6 w-6 text-sky-400">{icon}</div>
        <div className="ml-3">
            <p className="text-sm font-semibold text-slate-300">{label}</p>
            <p className="text-sm text-slate-400">{value}</p>
        </div>
    </div>
);

const CareerCard: React.FC<CareerCardProps> = ({ suggestion }) => {
  return (
    <div className="bg-slate-800/50 rounded-xl p-6 ring-1 ring-white/10 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-sky-500/10">
      <h3 className="text-xl font-bold text-sky-300">{suggestion.career}</h3>
      <p className="mt-2 text-slate-300 text-sm leading-relaxed">{suggestion.description}</p>
      
      <div className="mt-4 border-t border-slate-700 pt-4">
        <InfoRow 
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 6V5m0 14v-1m-7-7h-1m15 0h-1m-6.343-5.657l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707" /></svg>}
          label="Salary Range"
          value={suggestion.salaryRange}
        />
        <InfoRow 
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-9.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-9.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>}
          label="Education"
          value={suggestion.education}
        />
      </div>
    </div>
  );
};

export default CareerCard;
