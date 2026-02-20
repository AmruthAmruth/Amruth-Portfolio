import { Project } from '@/types';

/**
 * Portfolio projects data
 */
export const projects: Project[] = [
    {
        title: 'Stratify',
        impact: 'Multi-tenant SaaS empowering teams with Agile workflows and 100% theme customization.',
        problem: 'Teams needed a flexible project management solution that could adapt to their unique branding and workflows, similar to Jira but with complete visual control.',
        features: [
            'Role-Based Access Control (RBAC) for secure multi-tenant architecture',
            'Agile-style project management with sprints, backlogs, and boards',
            '100% customizable themes per company — colors, logos, and layouts',
            'Real-time collaboration and task tracking',
        ],
        outcome: 'A scalable SaaS platform enabling companies to manage projects with their own identity.',
        techStack: [
            { name: 'MongoDB', icon: 'M' },
            { name: 'Express', icon: 'E' },
            { name: 'React', icon: 'R' },
            { name: 'Node.js', icon: 'N' },
        ],
        liveUrl: 'https://stratify.ddns.net',
        githubUrl: 'https://github.com/AmruthAmruth/Stratify',
        gradient: 'from-blue-500 to-cyan-500',
        status: 'Live',
        environment: 'Production',
        createdAt: '2d ago',
        buildDuration: '1m 2s',
    },
    {
        title: 'Speedo',
        impact: 'Real-time vehicle tracking system with speed intelligence, stop detection, and detailed trip analytics.',
        problem: 'Fleet managers required more than basic GPS tracking. Speedo provides real-time vehicle monitoring with speed intelligence, stop detection, and detailed trip analytics — enabling data-driven fleet optimization.',
        features: [
            'Real-time vehicle tracking using WebSockets',
            'Speed classification: ideal, overspeed, and stop detection',
            'Trip history with ride analytics dashboard',
            'Interactive map visualization for live monitoring',
        ],
        outcome: 'Lack of actionable insights in traditional tracking systems — solved with real-time data and fleet analytics.',
        techStack: [
            { name: 'MongoDB', icon: 'M' },
            { name: 'Express', icon: 'E' },
            { name: 'React', icon: 'R' },
            { name: 'Node.js', icon: 'N' },
            { name: 'Socket.io', icon: 'S' },
        ],
        liveUrl: 'https://speedo-vehicle-trip-tracking-and-an.vercel.app',
        githubUrl: 'https://github.com/AmruthAmruth/Speedo',
        gradient: 'from-teal-500 to-green-500',
        status: 'Live',
        environment: 'Production',
        createdAt: '5d ago',
        buildDuration: '45s',
    },
    {
        title: 'FashionZone',
        impact: 'Full-featured e-commerce platform with seamless payment integration and admin control.',
        problem: 'Small fashion businesses needed an affordable, complete e-commerce solution with payment processing and inventory management.',
        features: [
            'Dynamic shopping cart with real-time inventory updates',
            'Comprehensive admin panel for product and order management',
            'Razorpay payment gateway integration for secure transactions',
            'Responsive design optimized for mobile shopping',
        ],
        outcome: 'A production-ready e-commerce platform driving online sales for fashion retailers.',
        techStack: [
            { name: 'MongoDB', icon: 'M' },
            { name: 'Express', icon: 'E' },
            { name: 'Node.js', icon: 'N' },
            { name: 'EJS', icon: 'EJS' },
        ],
        liveUrl: 'https://fashionzone.ddns.net',
        githubUrl: 'https://github.com/AmruthAmruth/FashionZone',
        gradient: 'from-pink-500 to-purple-500',
        status: 'Live',
        environment: 'Preview',
        createdAt: '1w ago',
        buildDuration: '2m 15s',
    },
];
