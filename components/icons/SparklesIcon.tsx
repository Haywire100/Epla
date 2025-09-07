
import React from 'react';

export const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 010 1.414l-2.293 2.293m-4.586-4.586l-2.293 2.293a1 1 0 000 1.414l2.293 2.293m4.586 4.586l2.293 2.293a1 1 0 010 1.414l-2.293 2.293m-4.586-4.586l-2.293 2.293a1 1 0 000 1.414l2.293 2.293M17 3l2.293 2.293a1 1 0 010 1.414L17 9"
    />
  </svg>
);
