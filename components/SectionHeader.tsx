
import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  icon?: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, icon }) => {
  return (
    <div className="mb-10 sm:mb-12 relative group">
      <div className="flex items-center space-x-3 mb-3 justify-center sm:justify-start">
        <div className="h-[1px] w-6 sm:w-12 bg-accent/50 group-hover:w-16 sm:group-hover:w-20 transition-all duration-500"></div>
        <span className="font-mono text-accent text-[9px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] uppercase animate-[reveal-up_0.6s_ease-out]">{subtitle}</span>
      </div>
      <div className="flex items-center justify-between flex-col sm:flex-row text-center sm:text-left gap-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-orbitron font-black uppercase tracking-tight animate-[reveal-up_0.8s_ease-out_both] leading-tight">
          {title}<span className="text-accent group-hover:animate-pulse">.</span>
        </h2>
        {icon && (
          <div className="hidden sm:block opacity-20 group-hover:opacity-100 group-hover:text-accent group-hover:rotate-12 transition-all duration-700 flex-shrink-0 ml-4">
            {icon}
          </div>
        )}
      </div>
      <div className="mt-6 w-0 group-hover:w-full h-[1px] bg-gradient-to-r from-accent/50 via-accent/10 to-transparent transition-all duration-1000 hidden sm:block"></div>
    </div>
  );
};
