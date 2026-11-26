export const profile = {
  name: 'James Junior Hlungwane',
  role: 'Full-Stack Software Engineer',
  location: 'Giyani, South Africa',
  availability: 'Open to junior full-stack and React Native roles',
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
  { label: 'Focus', value: 'Mobile and web applications, React Native and full-stack' },
  { label: 'Building', value: 'RouteClub, live on Google Play and the App Store' },
  { label: 'Role', value: 'Director & Software Engineer, Route Technologies' },
  { label: 'Core stack', value: 'TypeScript, React, React Native, Expo, Next.js, Node.js, PostgreSQL' },
  { label: 'Education', value: 'Diploma in IT (NQF 6), Richfield, 2025' },
  { label: 'Based in', value: 'Giyani, open to relocation nationwide' },
];
