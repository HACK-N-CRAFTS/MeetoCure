import React from 'react';

/**
 * Enterprise-grade input component
 * @param {string} label - input label
 * @param {string} error - error message
 * @param {React.ReactNode} icon - optional icon
 * @param {string} helperText - helper text below input
 */
const EnterpriseInput = ({
  label,
  error,
  icon,
  helperText,
  className = '',
  containerClassName = '',
  ...props
}) => {
  return (
    <div className={`space-y-2 ${containerClassName}`}>
      {label && (
        <label className="block text-sm font-semibold text-slate-700">
          {label}
        </label>
      )}

      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">
            {icon}
          </div>
        )}

        <input
          className={`
            w-full px-4 py-3
            ${icon ? 'pl-12' : ''}
            border-2 rounded-xl
            ${error
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10'
              : 'border-slate-300 focus:border-[#004B5C] focus:ring-[#004B5C]/10'
            }
            focus:ring-4
            outline-none
            bg-white
            text-slate-900
            placeholder-slate-400
            text-base
            transition-all
            duration-200
            disabled:bg-slate-50
            disabled:text-slate-500
            ${className}
          `}
          {...props}
        />
      </div>

      {error && (
        <p className="text-sm text-red-500 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
          {error}
        </p>
      )}

      {helperText && !error && (
        <p className="text-sm text-slate-500">
          {helperText}
        </p>
      )}
    </div>
  );
};

/**
 * Textarea variant
 */
export const EnterpriseTextarea = ({
  label,
  error,
  helperText,
  className = '',
  containerClassName = '',
  rows = 4,
  ...props
}) => {
  return (
    <div className={`space-y-2 ${containerClassName}`}>
      {label && (
        <label className="block text-sm font-semibold text-slate-700">
          {label}
        </label>
      )}

      <textarea
        rows={rows}
        className={`
          w-full px-4 py-3
          border-2 rounded-xl
          ${error
            ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10'
            : 'border-slate-300 focus:border-[#004B5C] focus:ring-[#004B5C]/10'
          }
          focus:ring-4
          outline-none
          bg-white
          text-slate-900
          placeholder-slate-400
          text-base
          transition-all
          duration-200
          resize-none
          disabled:bg-slate-50
          disabled:text-slate-500
          ${className}
        `}
        {...props}
      />

      {error && (
        <p className="text-sm text-red-500 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
          {error}
        </p>
      )}

      {helperText && !error && (
        <p className="text-sm text-slate-500">
          {helperText}
        </p>
      )}
    </div>
  );
};

export default EnterpriseInput;
