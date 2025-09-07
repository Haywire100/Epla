import React from 'react';

export const OilIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={1.5} 
        stroke="currentColor" 
        {...props}
        >
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a.75.75 0 0 1-.75.75H6a.75.75 0 0 1-.75-.75V12.75h3.75v6zM15.75 18.75a.75.75 0 0 0 .75.75h1.5a.75.75 0 0 0 .75-.75V12.75h-3.75v6z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14.25c-1.24 0-2.25-1.01-2.25-2.25S10.76 9.75 12 9.75s2.25 1.01 2.25 2.25-1.01 2.25-2.25 2.25z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5A7.5 7.5 0 0 0 4.5 12v6.75A2.25 2.25 0 0 0 6.75 21h10.5A2.25 2.25 0 0 0 19.5 18.75V12A7.5 7.5 0 0 0 12 4.5z" />
    </svg>
);
