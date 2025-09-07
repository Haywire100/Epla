import React from 'react';

export const StarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="w-5 h-5"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M10.868 2.884c.321-.662 1.215-.662 1.536 0l1.815 3.734 4.118.6a1.002 1.002 0 01.554 1.705l-2.98 2.895.702 4.103a.999.999 0 01-1.45 1.053L10 15.17l-3.676 1.932a.999.999 0 01-1.45-1.053l.703-4.103-2.98-2.895a1.002 1.002 0 01.554-1.705l4.118-.6 1.815-3.734z"
      clipRule="evenodd"
    />
  </svg>
);
