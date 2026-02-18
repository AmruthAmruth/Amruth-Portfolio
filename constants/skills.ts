import { Skill } from '@/types';

/**
 * Technical skills organized by category
 */
export const skills: Skill[] = [
    // Languages
    { name: 'JavaScript (ES6+)', category: 'Languages', color: 'from-yellow-400 to-yellow-600' },
    { name: 'TypeScript', category: 'Languages', color: 'from-blue-400 to-blue-600' },

    // Frontend
    { name: 'React.js', category: 'Frontend', color: 'from-cyan-400 to-cyan-600' },
    { name: 'Next.js', category: 'Frontend', color: 'from-gray-700 to-gray-900' },
    { name: 'Redux', category: 'Frontend', color: 'from-purple-400 to-purple-600' },
    { name: 'HTML5', category: 'Frontend', color: 'from-orange-400 to-orange-600' },
    { name: 'CSS3', category: 'Frontend', color: 'from-blue-400 to-blue-600' },
    { name: 'Tailwind CSS', category: 'Frontend', color: 'from-teal-400 to-teal-600' },

    // Backend
    { name: 'Node.js', category: 'Backend', color: 'from-green-500 to-green-700' },
    { name: 'Express.js', category: 'Backend', color: 'from-gray-600 to-gray-800' },
    { name: 'REST APIs', category: 'Backend', color: 'from-indigo-400 to-indigo-600' },
    { name: 'MVC', category: 'Backend', color: 'from-blue-500 to-blue-700' },
    { name: 'Clean Architecture', category: 'Backend', color: 'from-violet-400 to-violet-600' },

    // Databases
    { name: 'MongoDB', category: 'Databases', color: 'from-green-400 to-green-600' },
    { name: 'SQL', category: 'Databases', color: 'from-sky-400 to-sky-600' },

    // Real-time
    { name: 'Socket.IO', category: 'Real-time', color: 'from-gray-700 to-gray-900' },
    { name: 'WebSockets', category: 'Real-time', color: 'from-blue-500 to-blue-700' },

    // Security
    { name: 'JWT Authentication', category: 'Security', color: 'from-red-400 to-red-600' },
    { name: 'RBAC', category: 'Security', color: 'from-pink-400 to-pink-600' },
    { name: 'Input Validation', category: 'Security', color: 'from-rose-400 to-rose-600' },
    { name: 'Rate Limiting', category: 'Security', color: 'from-orange-400 to-orange-600' },

    // DevOps & Cloud
    { name: 'AWS EC2', category: 'DevOps & Cloud', color: 'from-orange-500 to-orange-700' },
    { name: 'Nginx', category: 'DevOps & Cloud', color: 'from-green-500 to-green-700' },
    { name: 'Docker', category: 'DevOps & Cloud', color: 'from-blue-500 to-blue-700' },
    { name: 'Vercel', category: 'DevOps & Cloud', color: 'from-gray-800 to-black' },
    { name: 'Render', category: 'DevOps & Cloud', color: 'from-purple-500 to-purple-700' },
    { name: 'CI/CD', category: 'DevOps & Cloud', color: 'from-teal-500 to-teal-700' },

    // Tools
    { name: 'Git', category: 'Tools', color: 'from-orange-500 to-orange-700' },
    { name: 'GitHub', category: 'Tools', color: 'from-gray-700 to-gray-900' },
    { name: 'Postman', category: 'Tools', color: 'from-orange-400 to-orange-600' },
    { name: 'Jira', category: 'Tools', color: 'from-blue-500 to-blue-700' },
    { name: 'Agile/Scrum', category: 'Tools', color: 'from-cyan-500 to-cyan-700' },
    { name: 'Firebase', category: 'Tools', color: 'from-yellow-500 to-yellow-700' },
];

/**
 * Skill categories in display order
 */
export const categories = [
    'Languages',
    'Frontend',
    'Backend',
    'Databases',
    'Real-time',
    'Security',
    'DevOps & Cloud',
    'Tools',
];
