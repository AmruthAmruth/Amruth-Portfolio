import { Project } from '@/types';

/**
 * Portfolio projects data
 */
export const projects: Project[] = [
    {
        title: 'Stratify',
        impact: 'Multi-Tenant SaaS Project Management Platform',
        problem: 'Stratify is a scalable multi-tenant project management platform inspired by tools like Jira. It allows multiple organizations to manage projects, sprints, and tasks within isolated workspaces while supporting real-time collaboration and customizable company branding.',
        features: [
            'Implemented a secure multi-tenant architecture using Node.js AsyncLocalStorage and a custom Mongoose plugin that automatically injects tenant constraints into queries, ensuring strict data isolation between organizations.',
            'Structured the backend using Clean Architecture principles with dependency injection to separate business logic from infrastructure and maintain a modular, maintainable codebase.',
            'Built real-time collaboration features including live Kanban board updates, notifications, and team chat using Socket.IO with JWT-based WebSocket authentication.',
            'Strengthened production APIs with stateless JWT authentication, rate limiting, security headers, and centralized error handling to ensure reliability and security.',
        ],
        outcome: '',
        techStack: [
            { name: 'React', icon: 'R' },
            { name: 'Node.js', icon: 'N' },
            { name: 'Express', icon: 'E' },
            { name: 'TypeScript', icon: 'TS' },
            { name: 'MongoDB', icon: 'M' },
            { name: 'Socket.IO', icon: 'S' },
            { name: 'AWS', icon: 'A' },
        ],
        liveUrl: 'https://stratifyapp.ddns.net/',
        githubUrl: 'https://github.com/AmruthAmruth/Stratify',
        gradient: 'from-blue-500 to-cyan-500',
        status: 'Live',
        environment: 'Production',
        createdAt: '2d ago',
        buildDuration: '1m 2s',
    },
    {
    title: 'Speedo',
    impact: 'High-Performance GPS Fleet Analytics Platform',

    problem:
        'A GPS fleet analytics platform built to process large-scale vehicle trip data, detect driving events, and visualize vehicle movement on an interactive GIS dashboard.',

    features: [
        'Built a memory-efficient GPS data processing pipeline using Node.js Streams, enabling large CSV trip logs to be processed with O(1) memory usage instead of loading entire datasets into memory.',
        'Implemented spatial-temporal analytics using the Haversine formula and speed calculations to detect vehicle stoppage, idling, overspeeding, and trip-level driving patterns.',
        'Designed the backend using Clean Architecture, dependency injection, and separation of concerns to keep domain logic modular, testable, and maintainable.',
        'Developed an interactive React + Leaflet GIS dashboard capable of visualizing thousands of GPS coordinates with speed-based color-coded trip polylines.',
        'Optimized GPS visualization and data processing to handle large trip datasets efficiently while maintaining a responsive dashboard experience.'
    ],

    outcome:
        'Demonstrates the ability to design high-performance backend systems, process large datasets efficiently, and build real-time geospatial visualizations for data-intensive applications.',

    techStack: [
        { name: 'Node.js', icon: 'N' },
        { name: 'TypeScript', icon: 'TS' },
        { name: 'MongoDB', icon: 'M' },
        { name: 'React', icon: 'R' },
        { name: 'Leaflet', icon: 'L' },
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
        impact: 'Full-Stack E-Commerce Platform',
        problem: 'FashionZone is a full-stack e-commerce platform that provides a complete online shopping experience along with a powerful admin dashboard for product, order, and sales management. The system supports secure authentication, advanced product management, and integrated payment processing.',
        features: [
            'Built a server-side rendered e-commerce platform using Node.js, Express, EJS, and MongoDB to deliver fast page loads and SEO-friendly product pages.',
            'Implemented secure authentication workflows including OTP-based signup, password recovery, and social login using Passport.js.',
            'Developed a full admin management system with product/category CRUD operations, order management, coupon systems, and sales analytics dashboards.',
            'Integrated Razorpay payment gateway supporting COD payments and failed payment recovery flows for a reliable checkout experience.',
            'Added image processing pipeline using Sharp to automatically crop and optimize uploaded product images.',
        ],
        outcome: '',
        techStack: [
            { name: 'Node.js', icon: 'N' },
            { name: 'Express', icon: 'E' },
            { name: 'MongoDB', icon: 'M' },
            { name: 'EJS', icon: 'EJS' },
            { name: 'Bootstrap', icon: 'B' },
            { name: 'Razorpay', icon: 'R' },
            { name: 'Passport.js', icon: 'P' },
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
