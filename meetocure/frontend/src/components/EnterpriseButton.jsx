import React from 'react';

/**
 * Enterprise-grade button component with multiple variants
 * @param {string} variant - primary, secondary, outline, danger, success
 * @param {string} size - sm, md, lg
 * @param {boolean} fullWidth - makes button full width
 * @param {React.ReactNode} icon - optional icon component
 * @param {React.ReactNode} children - button content
 */
const EnterpriseButton = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon = null,
  loading = false,
  disabled = false,
  className = '',
  children,
  ...props
}) => {
  const baseStyles = 'font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-gradient-to-r from-[#004B5C] to-[#006B7D] hover:from-[#006B7D] hover:to-[#008B9E] text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]',
    secondary: 'bg-white hover:bg-slate-50 text-[#004B5C] border-2 border-slate-200 hover:border-[#004B5C] shadow-md hover:shadow-lg',
    outline: 'bg-transparent hover:bg-[#004B5C] text-[#004B5C] hover:text-white border-2 border-[#004B5C]',
    danger: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]',
    success: 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Loading...
        </>
      ) : (
        <>
          {icon && <span>{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
};

export default EnterpriseButton;
