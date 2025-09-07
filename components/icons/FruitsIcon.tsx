import React from 'react';

export const FruitsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={1.5} 
        stroke="currentColor" 
        {...props}
        >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.235c0 .39-.313.715-.7.715h-1.1c-.387 0-.7-.325-.7-.715V3.03m1.8 0A12.01 12.01 0 0 1 18 6.5c0 4.25-2.73 7.85-6.43 9.17M4.5 15.67A9.002 9.002 0 0 1 12 3c1.78 0 3.44.52 4.8 1.38" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.5c0-1.89 1.54-3.42 3.43-3.42h.01c1.89 0 3.43 1.53 3.43 3.42 0 1.89-1.54 3.42-3.43 3.42h-.01C5.29 9.92 3.75 8.39 3.75 6.5zM13.5 15.67c-1.35.63-2.88.98-4.5.98a9.002 9.002 0 0 1-8.25-6.17" />
    </svg>
);
