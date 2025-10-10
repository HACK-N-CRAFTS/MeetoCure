import React from 'react';

/**
 * Enterprise-grade card component with hover effects
 * @param {React.ReactNode} children - card content
 * @param {boolean} hoverable - adds hover effects
 * @param {string} className - additional classes
 */
const EnterpriseCard = ({
  children,
  hoverable = true,
  clickable = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'bg-white rounded-2xl border border-slate-200/50 shadow-sm transition-all duration-300';
  const hoverStyles = hoverable ? 'hover:shadow-xl ' : '';
  const clickableStyles = clickable ? 'cursor-pointer active:scale-[0.98]' : '';

  return (
    <div
      className={`${baseStyles} ${hoverStyles} ${clickableStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * Card Header Component
 */
export const CardHeader = ({ children, className = '' }) => (
  <div className={`px-6 py-4 border-b border-slate-200/50 ${className}`}>
    {children}
  </div>
);

/**
 * Card Body Component
 */
export const CardBody = ({ children, className = '' }) => (
  <div className={`px-6 py-5 ${className}`}>
    {children}
  </div>
);

/**
 * Card Footer Component
 */
export const CardFooter = ({ children, className = '' }) => (
  <div className={`px-6 py-4 border-t border-slate-200/50 bg-slate-50/50 rounded-b-2xl ${className}`}>
    {children}
  </div>
);

export default EnterpriseCard;
