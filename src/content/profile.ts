export const profile = {
  name: 'James Junior Hlungwane',
  role: 'Full-stack software engineer',
  location: 'Pretoria, South Africa',
  availability: 'Open to full-stack engineering roles',
  email: 'hlungwane.james.junior@gmail.com',
  phone: { display: '072 476 4574', href: 'tel:+27724764574' },
  github: 'https://github.com/De-Junior',
  linkedin: 'https://www.linkedin.com/in/james-junior-hlungwane-4307aa1a0',
  cv: '/James-Junior-Hlungwane-CV.pdf',
  photo: '/james-hlungwane.jpg',
  source: 'https://github.com/De-Junior/REACT-Portfolio',
} as const;

/** The at-a-glance summary in the hero, written for a recruiter's first read. */
export const summary: { label: string; value: string }[] = [
  { label: 'Focus', value: 'Full-stack web and mobile applications' },
  { label: 'Building', value: 'RouteClub, at Route Technologies' },
  { label: 'Previously', value: 'Software Developer, Sima Digital Agencies' },
  { label: 'Core stack', value: 'TypeScript, React, Next.js, Node.js, PostgreSQL, Expo' },
  { label: 'Education', value: 'Diploma in IT, Richfield, 2025' },
  { label: 'Based in', value: 'Pretoria, open to relocating' },
];
