
import { Member, Project, Achievement, TimelineEvent } from './types';

export const TEAM_MEMBERS: Member[] = [
  {
    id: '1',
    name: 'Cheangchang Ch Momin',
    role: 'Co-founder | DevOps & Security Ops',
    avatar: 'https://picsum.photos/seed/cheangchang/400/400',
    level: 1,
    xp: 45,
    bio: 'Securing the GTech perimeter and optimizing the low-level logic. A veteran in systems hardening with a lethal command of the Rust language.',
    skills: [
      { name: 'Rust', level: 98, category: 'backend' },
      { name: 'Security Ops', level: 95, category: 'devops' },
      { name: 'CI/CD Pipelines', level: 92, category: 'devops' }
    ],
    stats: { coding: 98, design: 30, leadership: 88, agility: 90 }
  },
  {
    id: '2',
    name: 'Jerry Blair Ch Momin',
    role: 'Co-founder | Lead Infrastructure',
    avatar: 'https://picsum.photos/seed/jerry/400/400',
    level: 1,
    xp: 42,
    bio: 'Orchestrating the GTech backbone. Expert in Linux distributions and high-scale Python architecture. If it runs, he built the engine.',
    skills: [
      { name: 'Linux Kernel', level: 96, category: 'devops' },
      { name: 'Python', level: 94, category: 'backend' },
      { name: 'Cloud Arch', level: 90, category: 'backend' }
    ],
    stats: { coding: 95, design: 25, leadership: 85, agility: 92 }
  },
  {
    id: '3',
    name: 'Chingbat W Sangma',
    role: 'Co-founder | Lead Designer',
    avatar: 'https://picsum.photos/seed/chingbat/400/400',
    level: 1,
    xp: 48,
    bio: 'The creative soul of GTech. Linguist, Photoshop master, and sonic architect. Crafting pixel-perfect interfaces and immersive audio experiences.',
    skills: [
      { name: 'Photoshop', level: 99, category: 'design' },
      { name: 'UI/UX Design', level: 97, category: 'design' },
      { name: 'Music Production', level: 90, category: 'design' }
    ],
    stats: { coding: 40, design: 99, leadership: 82, agility: 88 }
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'GTech Core Alpha',
    description: 'Our flagship decentralized computation engine. Built on a hardened Rust core with automated security auditing.',
    status: 'IN_PROGRESS',
    tags: ['Rust', 'Hardening', 'P2P'],
    metrics: [{ label: 'Beta Waitlist', value: '4.2k' }, { label: 'Security Score', value: 'A+' }],
    thumbnail: 'https://picsum.photos/seed/alpha/800/450'
  },
  {
    id: 'p2',
    title: 'Project Sonic-UX',
    description: 'A revolutionary design system blending visual linguistic patterns with adaptive music-making AI.',
    status: 'COMPLETED',
    tags: ['Design System', 'Sonic Engine'],
    metrics: [{ label: 'Visual Clarity', value: '98%' }, { label: 'UX Rating', value: '5/5' }],
    thumbnail: 'https://picsum.photos/seed/prototype/800/450'
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'a1', title: 'Incubation Complete', description: 'Cheangchang, Jerry, and Chingbat unified the GTech core.', icon: '🐣', unlocked: true },
  { id: 'a2', title: 'Hardened Kernel', description: 'Infrastructure successfully migrated to custom Linux-hardened nodes.', icon: '🛡️', unlocked: true },
  { id: 'a3', title: 'First Soundmark', description: 'Finalized the GTech sonic brand identity.', icon: '🎵', unlocked: true }
];

export const TIMELINE: TimelineEvent[] = [
  { id: 't1', date: 'Jan 2024', title: 'The Assembly', description: 'Initial concept conceived by the founding trio.', type: 'milestone' },
  { id: 't2', date: 'March 2024', title: 'Core Deployment', description: 'Rust engine alpha release to secure testing nodes.', type: 'deployment' },
  { id: 't3', date: 'Next Up', title: 'Seed Series', description: 'Expanding the GTech network beyond the founding nodes.', type: 'milestone' }
];
