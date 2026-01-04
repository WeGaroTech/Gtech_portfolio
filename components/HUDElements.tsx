
import React from 'react';

interface HUDCardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const HUDCard: React.FC<HUDCardProps> = ({ children, title, className = "", style, onClick }) => {
  return (
    <div 
      style={style}
      onClick={onClick}
      className={`hud-border hud-border-tl hud-border-tr hud-border-bl hud-border-br bg-[#0d0d0f]/95 backdrop-blur-3xl p-6 sm:p-10 group transition-all duration-700 hover:shadow-[0_0_60px_rgba(var(--accent),0.2)] ${onClick ? 'cursor-pointer active:scale-[0.98]' : ''} ${className}`}
    >
      {/* Precision Corner Indicator */}
      <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-accent opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all"></div>
      
      {title && (
        <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-5">
          <div className="flex items-center">
            <div className="w-1.5 h-4 bg-accent mr-4 animate-pulse"></div>
            <h3 className={`font-orbitron font-black uppercase tracking-[0.4em] text-[10px] sm:text-xs text-accent/70 transition-all group-hover:text-accent group-hover:glow-accent truncate mr-4`}>
              {title}
            </h3>
          </div>
          <div className="flex space-x-2 flex-shrink-0">
            <div className="w-2 h-2 rounded-full bg-accent/20 animate-pulse"></div>
            <div className="w-6 sm:w-12 h-1.5 bg-accent/10 group-hover:bg-accent/40 transition-all duration-1000"></div>
          </div>
        </div>
      )}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Interactive Bottom Bar */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[3px] bg-accent opacity-0 group-hover:w-[60%] group-hover:opacity-100 transition-all duration-1000"></div>
    </div>
  );
};

export const ProgressBar: React.FC<{ label: string; value: number; color?: string; max?: number }> = ({ 
  label, value, color = "bg-accent", max = 100 
}) => {
  const percentage = (value / max) * 100;
  return (
    <div className="mb-8 group/progress">
      <div className="flex justify-between items-end mb-3 px-1">
        <span className="text-[10px] font-mono font-black uppercase tracking-[0.3em] opacity-40 group-hover/progress:opacity-100 transition-opacity truncate mr-4">{label}</span>
        <span className="text-[11px] font-mono font-black text-accent">{value}%</span>
      </div>
      <div className="h-2 w-full bg-white/5 overflow-hidden border border-white/10 p-[2px] rounded-full">
        <div 
          className={`h-full ${color} transition-all duration-1500 ease-out shadow-[0_0_20px_rgba(var(--accent),0.8)] relative rounded-full`}
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.5)_50%,transparent_100%)] w-24 animate-[scanline_2s_infinite]"></div>
        </div>
      </div>
    </div>
  );
};

export const HUDButton: React.FC<{ 
  children: React.ReactNode; 
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'outline' 
}> = ({ children, onClick, className = "", variant = 'primary' }) => {
  const baseClasses = "font-orbitron px-8 sm:px-12 py-4 uppercase text-[11px] sm:text-xs tracking-[0.4em] transition-all relative group overflow-hidden active:scale-95 text-center flex items-center justify-center min-h-[60px] font-black button-glitch-effect";
  const variants = {
    primary: "bg-accent text-black hover:shadow-[0_0_40px_rgba(var(--accent),0.8)]",
    outline: "border-2 border-accent/40 text-accent hover:bg-accent/10 hover:border-accent hover:shadow-[0_0_25px_rgba(var(--accent),0.4)]"
  };

  return (
    <button onClick={onClick} className={`${baseClasses} ${variants[variant]} ${className}`}>
      <span className="relative z-10 whitespace-nowrap group-hover:scale-110 transition-transform">{children}</span>
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/40 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/40 opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </button>
  );
};
