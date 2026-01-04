
import React, { useState, useEffect } from 'react';
import { TEAM_MEMBERS, PROJECTS, ACHIEVEMENTS, TIMELINE } from './constants';
import { HUDCard, ProgressBar, HUDButton } from './components/HUDElements';
import { SectionHeader } from './components/SectionHeader';
import { getTeamBriefing } from './services/geminiService';
import { Member } from './types';

const Icons = {
  Hexagon: ({ className = "" }: { className?: string }) => (
    <svg className={`w-8 h-8 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    </svg>
  ),
  Shield: ({ className = "" }: { className?: string }) => (
    <svg className={`w-5 h-5 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  Zap: ({ className = "" }: { className?: string }) => (
    <svg className={`w-5 h-5 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  Palette: ({ className = "" }: { className?: string }) => (
    <svg className={`w-5 h-5 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2" />
    </svg>
  ),
  Menu: ({ className = "" }: { className?: string }) => (
    <svg className={`w-6 h-6 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="18" x2="20" y2="18" />
    </svg>
  ),
  Close: ({ className = "" }: { className?: string }) => (
    <svg className={`w-6 h-6 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  ChevronLeft: ({ className = "" }: { className?: string }) => (
    <svg className={`w-5 h-5 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  ),
  Github: ({ className = "" }: { className?: string }) => (
    <svg className={`w-5 h-5 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>
  ),
  Twitter: ({ className = "" }: { className?: string }) => (
    <svg className={`w-5 h-5 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
    </svg>
  ),
  Globe: ({ className = "" }: { className?: string }) => (
    <svg className={`w-5 h-5 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
    </svg>
  )
};

const THEMES = [
  { name: 'Cyber', rgb: '34, 211, 238', label: 'Cyan' },
  { name: 'Void', rgb: '168, 85, 247', label: 'Purple' },
  { name: 'Blaze', rgb: '245, 158, 11', label: 'Amber' },
  { name: 'Crimson', rgb: '239, 68, 68', label: 'Red' },
  { name: 'Pulse', rgb: '236, 72, 153', label: 'Pink' }
];

const MemberDetail: React.FC<{ member: Member; onClose: () => void }> = ({ member, onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-[#020203] overflow-y-auto animate-reveal-up p-4 sm:p-12 lg:p-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12 sm:mb-16">
          <button 
            onClick={onClose}
            className="group flex items-center space-x-4 text-slate-400 hover:text-accent transition-all font-orbitron text-[10px] uppercase tracking-[0.4em]"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 border border-white/10 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-all">
              <Icons.ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="text-[9px] sm:text-[10px]">Terminate Dossier View</span>
          </button>
          <div className="flex flex-col items-start sm:items-end font-mono text-[9px] text-slate-600 uppercase tracking-widest leading-relaxed">
            <span>Security Clearance: Level 5</span>
            <span>Auth Token: G-TECH-OP-{member.id}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16">
          <div className="lg:col-span-4 space-y-8">
            <div className="relative group/portrait max-w-sm mx-auto lg:mx-0">
              <div className="absolute -inset-1 bg-accent/30 blur-2xl opacity-40"></div>
              <div className="relative hud-border border-white/10 bg-black aspect-[3/4] overflow-hidden grayscale group-hover/portrait:grayscale-0 transition-all duration-700">
                <img src={member.avatar} alt={member.name} className="w-full h-full object-cover opacity-80 group-hover/portrait:opacity-100 group-hover/portrait:scale-105 transition-all duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
              </div>
            </div>

            <HUDCard title="Operational Status" className="bg-white/5 border-none shadow-none p-4">
              <div className="space-y-4">
                 <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono text-slate-500 uppercase">Current XP</span>
                    <span className="text-[10px] font-mono text-accent">{member.xp}/100</span>
                 </div>
                 <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-accent" style={{ width: `${member.xp}%` }}></div>
                 </div>
              </div>
            </HUDCard>
          </div>

          <div className="lg:col-span-8">
            <header className="mb-10 sm:mb-12">
              <div className="font-mono text-[9px] sm:text-[10px] text-accent uppercase tracking-[0.5em] mb-4">Founding Operative Dossier</div>
              <h1 className="text-4xl sm:text-6xl lg:text-8xl font-orbitron font-black uppercase tracking-tighter mb-6 leading-tight group">
                {member.name}
              </h1>
              <div className="flex flex-col space-y-2 pt-2">
                <div className="h-[2px] w-12 bg-accent/40"></div>
                <span className="font-orbitron text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-slate-300">
                  {member.role}
                </span>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12">
              <div className="space-y-10 sm:space-y-12">
                <div className="space-y-6">
                  <h4 className="font-orbitron text-[10px] sm:text-xs font-black uppercase tracking-[0.4em] text-accent/60 flex items-center">
                    <Icons.Zap className="mr-2 w-4 h-4" /> Directive
                  </h4>
                  <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed italic">
                    "{member.bio}"
                  </p>
                </div>
                <div className="space-y-8">
                  {member.skills.map(skill => (
                    <ProgressBar key={skill.name} label={skill.name} value={skill.level} />
                  ))}
                </div>
              </div>
              <div className="space-y-8">
                <HUDCard title="Combat Attributes" className="bg-white/5 border-none">
                  {Object.entries(member.stats).map(([key, val]) => (
                    <ProgressBar key={key} label={key} value={val} />
                  ))}
                </HUDCard>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [isBooting, setIsBooting] = useState(true);
  const [bootProgress, setBootProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('foundry');
  const [briefing, setBriefing] = useState<string>('System initialized. Founders authenticated. Awaiting mission input...');
  const [briefingLoading, setBriefingLoading] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeTheme, setActiveTheme] = useState(THEMES[0]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navItems = [
    { label: 'Foundry', target: 'foundry', id: 'command' },
    { label: 'Roster', target: 'roster', id: 'roster' },
    { label: 'Missions', target: 'missions', id: 'missions' },
    { label: 'Uplink', target: 'uplink', id: 'uplink' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    const elements = document.querySelectorAll('.reveal-item');
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isBooting, selectedMember]);

  useEffect(() => {
    if (isBooting) {
      const interval = setInterval(() => {
        setBootProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setIsBooting(false), 600);
            return 100;
          }
          return prev + Math.random() * 25;
        });
      }, 150);
      return () => clearInterval(interval);
    }
  }, [isBooting]);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress((winScroll / height) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeTheme = (theme: typeof THEMES[0]) => {
    setActiveTheme(theme);
    document.documentElement.style.setProperty('--accent', theme.rgb);
    document.documentElement.style.setProperty('--accent-glow', `rgba(${theme.rgb}, 0.5)`);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      alert("SECURE UPLINK ESTABLISHED: Data transmitted to GTech command.");
      setContactForm({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  const cycleTheme = () => {
    const currentIndex = THEMES.findIndex(t => t.name === activeTheme.name);
    const nextIndex = (currentIndex + 1) % THEMES.length;
    changeTheme(THEMES[nextIndex]);
  };

  const triggerBriefing = async (query: string) => {
    setBriefingLoading(true);
    const result = await getTeamBriefing(query);
    setBriefing(result);
    setBriefingLoading(false);
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  if (isBooting) {
    return (
      <div className="fixed inset-0 bg-[#020203] z-[100] flex flex-col items-center justify-center p-8 text-center">
        <div className="w-full max-w-sm relative">
          <div className="flex justify-between items-end mb-4 px-1">
            <div className="font-orbitron font-black text-3xl sm:text-4xl tracking-tighter">G <span className="text-cyan-400 animate-pulse">Tech</span></div>
            <div className="font-mono text-[9px] text-cyan-400 opacity-60 uppercase tracking-[0.3em]">BOOT_SEQ_{Math.floor(bootProgress)}%</div>
          </div>
          <div className="h-1 w-full bg-white/5 overflow-hidden relative border border-white/10 rounded-full">
            <div className="h-full bg-cyan-400 transition-all duration-300" style={{ width: `${bootProgress}%` }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={`min-h-screen bg-grid relative transition-all duration-1000 ${selectedMember ? 'scale-95 blur-xl opacity-30 pointer-events-none' : 'scale-100'}`}>
        {/* HUD Navigation */}
        <nav className="fixed top-0 left-0 w-full z-40 bg-black/40 backdrop-blur-xl border-b border-white/5 h-16 sm:h-20 flex flex-col justify-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-10 w-full h-full flex items-center justify-between">
            <div className="flex items-center space-x-3 sm:space-x-4 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-accent flex items-center justify-center rotate-45 group-hover:rotate-[225deg] transition-transform duration-1000">
                <span className="text-black font-black -rotate-45 font-orbitron text-lg sm:text-2xl">G</span>
              </div>
              <span className="font-orbitron font-black text-xl sm:text-2xl tracking-tighter">G <span className="text-accent">Tech</span></span>
            </div>
            
            <div className="hidden lg:flex items-center space-x-12 font-orbitron text-[10px] tracking-[0.4em] uppercase font-bold">
              {navItems.map((item) => (
                <button 
                  key={item.target}
                  onClick={() => scrollToSection(item.id)}
                  className="group relative py-2 transition-all hover:text-accent text-slate-400"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-3 sm:space-x-6">
              <button onClick={cycleTheme} className="flex items-center space-x-2 sm:space-x-4 bg-white/5 border border-white/10 px-3 sm:px-4 py-2 hover:bg-accent/10 transition-all rounded-sm">
                <Icons.Palette className="text-accent w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-[9px] sm:text-[10px] text-accent font-orbitron font-black uppercase tracking-widest hidden sm:inline">{activeTheme.name}</span>
              </button>
              <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden w-8 h-8 flex items-center justify-center border border-white/10 text-slate-400 hover:text-accent transition-colors"
              >
                <Icons.Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="h-[2px] bg-white/5 w-full relative">
            <div className="h-full bg-accent transition-all ease-out" style={{ width: `${scrollProgress}%` }}></div>
          </div>
        </nav>

        {/* Mobile Navigation Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl lg:hidden flex flex-col items-center justify-center p-8 animate-reveal-up">
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center border border-white/10 text-slate-400 hover:text-accent transition-colors"
            >
              <Icons.Close className="w-6 h-6" />
            </button>
            <div className="flex flex-col items-center space-y-8">
              {navItems.map((item) => (
                <button 
                  key={item.target}
                  onClick={() => scrollToSection(item.id)}
                  className="font-orbitron text-2xl uppercase tracking-[0.4em] font-black text-slate-400 hover:text-accent transition-all"
                >
                  {item.label}
                </button>
              ))}
              <div className="h-[1px] w-24 bg-white/10 my-4"></div>
              <div className="flex space-x-6">
                <Icons.Github className="w-6 h-6 opacity-40" />
                <Icons.Twitter className="w-6 h-6 opacity-40" />
                <Icons.Globe className="w-6 h-6 opacity-40" />
              </div>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <section id="command" className="pt-32 sm:pt-48 pb-20 sm:pb-32 px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-20 items-center">
            <div className="reveal-item text-center lg:text-left">
               <div className="inline-flex items-center space-x-4 bg-accent/5 border border-accent/20 px-4 sm:px-5 py-2 rounded-full mb-8 sm:mb-10">
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-accent rounded-full animate-ping"></div>
                <span className="text-[9px] sm:text-[11px] font-mono uppercase tracking-[0.3em] sm:tracking-[0.4em] text-accent font-black">PROTOCOL: ALPHA_ESTABLISHED</span>
              </div>
              <h1 className="text-5xl xs:text-6xl sm:text-7xl lg:text-9xl font-orbitron font-black uppercase tracking-tighter mb-8 sm:mb-10 leading-[0.9]">
                BUILD <br /> <span className="text-accent">FORCE.</span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-slate-400 max-w-lg mx-auto lg:mx-0 mb-10 sm:mb-12 leading-relaxed font-light">
                High-performance founding squad for mission-critical builds. We don't just ship; we deploy resilience.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <HUDButton className="w-full sm:w-auto" onClick={() => triggerBriefing("Explain GTech's deployment methodology.")}>Initiate Briefing</HUDButton>
                <HUDButton variant="outline" className="w-full sm:w-auto" onClick={() => scrollToSection('roster')}>View Roster</HUDButton>
              </div>
            </div>
            <HUDCard title="DIAGNOSTIC_OVR" className="reveal-item bg-black/80 max-w-xl mx-auto lg:mx-0">
              <div className="p-4 sm:p-6 bg-white/5 border border-white/5 font-mono text-xs sm:text-sm min-h-[120px] sm:min-h-[140px] mb-6 sm:mb-8">
                <p className="text-accent leading-relaxed">{briefingLoading ? "Analyzing node state..." : briefing}</p>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="p-3 sm:p-4 border border-white/5 bg-white/5 text-center">
                  <div className="text-xl sm:text-2xl font-orbitron font-black text-accent">100%</div>
                  <div className="text-[7px] sm:text-[8px] uppercase tracking-widest opacity-50">Precision</div>
                </div>
                <div className="p-3 sm:p-4 border border-white/5 bg-white/5 text-center">
                  <div className="text-xl sm:text-2xl font-orbitron font-black text-white">GEN-1</div>
                  <div className="text-[7px] sm:text-[8px] uppercase tracking-widest opacity-50">Squad</div>
                </div>
              </div>
            </HUDCard>
          </div>
        </section>

        {/* Roster Section */}
        <section id="roster" className="py-20 sm:py-32 px-4 sm:px-6 max-w-7xl mx-auto border-t border-white/5">
          <SectionHeader title="The Founding Hub" subtitle="OPERATIVE_GEN_1" icon={<Icons.Hexagon />} />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10">
            {TEAM_MEMBERS.map((member) => (
              <HUDCard 
                key={member.id} 
                title={`OP_${member.id}`} 
                className="reveal-item hover:-translate-y-2 sm:hover:-translate-y-4 cursor-pointer"
                onClick={() => setSelectedMember(member)}
              >
                <div className="flex flex-col items-center mb-6">
                  <img src={member.avatar} className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-accent/20 p-1 mb-4 grayscale group-hover:grayscale-0 transition-all" />
                  <h4 className="font-orbitron font-black text-lg sm:text-xl text-center">{member.name}</h4>
                  <p className="text-[9px] sm:text-[10px] text-accent uppercase font-mono tracking-widest text-center mt-1">{member.role}</p>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 italic text-center mb-6 line-clamp-3">"{member.bio}"</p>
                <div className="text-center font-mono text-[9px] sm:text-[10px] uppercase text-accent font-bold tracking-widest border-t border-white/5 pt-4">Access Dossier</div>
              </HUDCard>
            ))}
          </div>
        </section>

        {/* Secure Uplink Section */}
        <section id="uplink" className="py-20 sm:py-32 px-4 sm:px-6 max-w-4xl mx-auto border-t border-white/5">
          <SectionHeader title="Secure Uplink" subtitle="CONTACT_CHANNEL_SECURED" icon={<Icons.Zap />} />
          <HUDCard title="ENCRYPTED_MESSAGE_TERMINAL" className="reveal-item bg-black/60">
            <form onSubmit={handleContactSubmit} className="space-y-6 sm:space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                <div className="space-y-2 sm:space-y-3">
                  <label className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.3em] text-slate-500">Operative_Name</label>
                  <input 
                    type="text" 
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    placeholder="IDENTIFY YOURSELF"
                    className="w-full bg-white/5 border border-white/10 p-3 sm:p-4 font-mono text-xs sm:text-sm text-white focus:outline-none focus:border-accent/60 focus:bg-accent/5 transition-all"
                  />
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <label className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.3em] text-slate-500">Contact_Endpoint</label>
                  <input 
                    type="email" 
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    placeholder="EMAIL@PROTOCOL.COM"
                    className="w-full bg-white/5 border border-white/10 p-3 sm:p-4 font-mono text-xs sm:text-sm text-white focus:outline-none focus:border-accent/60 focus:bg-accent/5 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2 sm:space-y-3">
                <label className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.3em] text-slate-500">Operational_Details</label>
                <textarea 
                  required
                  rows={4}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                  placeholder="STATE YOUR MISSION OBJECTIVE..."
                  className="w-full bg-white/5 border border-white/10 p-3 sm:p-4 font-mono text-xs sm:text-sm text-white focus:outline-none focus:border-accent/60 focus:bg-accent/5 transition-all resize-none"
                />
              </div>
              <div className="pt-2 sm:pt-4">
                <HUDButton className="w-full h-14 sm:h-16" variant="primary">
                  {isSubmitting ? "TRANSMITTING..." : "TRANSMIT UPLINK DATA"}
                </HUDButton>
              </div>
            </form>
          </HUDCard>
        </section>

        {/* Tactical Footer */}
        <footer className="mt-10 sm:mt-20 border-t border-white/5 bg-black/40 backdrop-blur-xl py-12 sm:py-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-16">
            <div className="space-y-4 sm:space-y-6">
              <div className="font-orbitron font-black text-2xl sm:text-3xl tracking-tighter">G <span className="text-accent">Tech</span></div>
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-slate-400">Squad Status: Active</span>
              </div>
              <p className="text-[10px] sm:text-xs text-slate-500 leading-relaxed font-mono uppercase tracking-widest">
                PRECISION_BUILDS // MISSION_CRITICAL // NODE_01
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <h5 className="font-orbitron text-[9px] sm:text-[10px] uppercase tracking-[0.4em] font-black text-white">Command_Hub</h5>
              <ul className="space-y-2 sm:space-y-3 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-slate-400">
                <li className="hover:text-accent cursor-pointer transition-colors" onClick={() => scrollToSection('command')}>Foundry</li>
                <li className="hover:text-accent cursor-pointer transition-colors" onClick={() => scrollToSection('roster')}>Operatives</li>
                <li className="hover:text-accent cursor-pointer transition-colors" onClick={() => scrollToSection('uplink')}>Secure Uplink</li>
              </ul>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <h5 className="font-orbitron text-[9px] sm:text-[10px] uppercase tracking-[0.4em] font-black text-white">Network_Nodes</h5>
              <div className="flex sm:grid sm:grid-cols-2 gap-4">
                <a href="#" className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-accent hover:text-accent transition-all">
                  <Icons.Github className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-accent hover:text-accent transition-all">
                  <Icons.Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-accent hover:text-accent transition-all">
                  <Icons.Globe className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <h5 className="font-orbitron text-[9px] sm:text-[10px] uppercase tracking-[0.4em] font-black text-white">Diagnostic_Info</h5>
              <div className="space-y-2 font-mono text-[8px] sm:text-[9px] uppercase tracking-widest text-slate-500">
                <div className="flex justify-between">
                  <span>Latency</span>
                  <span className="text-white">12ms</span>
                </div>
                <div className="flex justify-between">
                  <span>Protocol</span>
                  <span className="text-white">V1.4.2</span>
                </div>
                <div className="flex justify-between">
                  <span>Sync_Last</span>
                  <span className="text-white">Just Now</span>
                </div>
                <div className="pt-2 border-t border-white/5 mt-2">
                  <span className="text-accent opacity-50">© GTECH_SYSTEMS_2026</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {selectedMember && (
        <MemberDetail member={selectedMember} onClose={() => setSelectedMember(null)} />
      )}
    </>
  );
};

export default App;
