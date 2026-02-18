'use client';

interface SectionDividerProps {
    position: 'top' | 'bottom';
    color: string;
    height?: string;
    className?: string;
}

export default function SectionDivider({ position, color, height = 'h-16 md:h-24', className = '' }: SectionDividerProps) {
    // Different wave shapes for top vs bottom to create organic flow
    const pathData = position === 'bottom'
        ? "M0,64L48,58.7C96,53,192,43,288,48C384,53,480,75,576,80C672,85,768,75,864,64C960,53,1056,43,1152,42.7C1248,43,1344,53,1392,58.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        : "M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,213.3C672,224,768,224,864,202.7C960,181,1056,139,1152,133.3C1248,128,1344,160,1392,176L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z";

    return (
        <div className={`absolute left-0 w-full overflow-hidden leading-none z-10 ${position === 'bottom' ? '-bottom-[1px]' : '-top-[1px]'} ${className}`}>
            <svg
                className={`relative block w-[calc(100%+1.3px)] ${height}`}
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320"
                preserveAspectRatio="none"
            >
                <path
                    fill={color}
                    fillOpacity="1"
                    d={pathData}
                ></path>
            </svg>
        </div>
    );
}
