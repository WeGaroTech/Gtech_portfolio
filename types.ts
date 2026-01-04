
export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'frontend' | 'backend' | 'design' | 'devops' | 'strategy';
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export interface Member {
  id: string;
  name: string;
  role: string;
  avatar: string;
  level: number;
  xp: number;
  skills: Skill[];
  bio: string;
  stats: {
    coding: number;
    design: number;
    leadership: number;
    agility: number;
  };
}

export interface Project {
  id: string;
  title: string;
  description: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'DEPLOYED';
  tags: string[];
  metrics: { label: string; value: string }[];
  thumbnail: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  type: 'milestone' | 'win' | 'deployment';
}
