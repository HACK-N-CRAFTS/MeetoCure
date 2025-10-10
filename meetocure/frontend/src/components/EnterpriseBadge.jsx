import React from 'react';

/**
 * Enterprise-grade badge component
 * @param {string} variant - primary, secondary, success, warning, danger, info
 * @param {string} size - sm, md, lg
 * @param {React.ReactNode} icon - optional icon
 */
const EnterpriseBadge = ({
  variant = 'primary',
  size = 'md',
  icon = null,
  className = '',
  children
}) => {
  const baseStyles = 'inline-flex items-center gap-1.5 font-semibold rounded-full';

  const variants = {
    primary: 'bg-blue-100 text-blue-700 border border-blue-200',
    secondary: 'bg-slate-100 text-slate-700 border border-slate-200',
    success: 'bg-green-100 text-green-700 border border-green-200',
    warning: 'bg-amber-100 text-amber-700 border border-amber-200',
    danger: 'bg-red-100 text-red-700 border border-red-200',
    info: 'bg-cyan-100 text-cyan-700 border border-cyan-200',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}>
      {icon && <span className="inline-flex">{icon}</span>}
      {children}
    </span>
  );
};

export default EnterpriseBadge;
