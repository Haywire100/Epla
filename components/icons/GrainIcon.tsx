import React from 'react';

export const GrainIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor"
    {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9.75h7.5v7.5h-7.5V9.75z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v5.25m0 7.5v2.25m-7.5-7.5H4.5m15 0h.75M9 4.5h6" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 17.25c-3.146 0-5.25-1.5-5.25-3.375 0-1.875 2.104-3.375 5.25-3.375s5.25 1.5 5.25 3.375c0 1.875-2.104 3.375-5.25 3.375z" />
  </svg>
);
