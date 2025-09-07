import React from 'react';

export const VegetableIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={1.5} 
        stroke="currentColor" 
        {...props}
        >
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 8.25l-4.5 4.5-4.5-4.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 12.75l4.5 4.5 4.5-4.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" />
    </svg>
);
