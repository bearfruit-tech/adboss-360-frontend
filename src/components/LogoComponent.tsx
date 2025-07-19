import React from "react";

interface LogoComponentProps {
  color?: string;
  size?: number | string;
  className?: string;
}

/**
 * LogoComponent renders the main logo SVG.
 * If a color prop is provided, it overrides the primary fill color.
 * Replace the SVG below with your actual logo SVG as needed.
 */
const LogoComponent: React.FC<LogoComponentProps> = ({ color = "#111", size = 80, className }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Example: Replace this with your actual logo SVG paths */}
      <circle cx="40" cy="40" r="35" fill={color} />
      <text x="40" y="47" textAnchor="middle" fontSize="24" fill="#fff" fontFamily="Arial" fontWeight="bold">
        LOGO
      </text>
    </svg>
  );
};

export default LogoComponent; 