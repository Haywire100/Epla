
import React from 'react';

export const TruckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    {...props}
  >
    <path
      d="M9 17a2 2 0 10-4 0 2 2 0 004 0z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19 17a2 2 0 10-4 0 2 2 0 004 0z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13 17H6V6h10v4l5 3v6h-2"
    />
  </svg>
);
