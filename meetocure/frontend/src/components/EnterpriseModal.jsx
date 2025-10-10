import React, { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

/**
 * Enterprise-grade modal component
 * @param {boolean} isOpen - controls modal visibility
 * @param {function} onClose - callback when modal closes
 * @param {string} title - modal title
 * @param {string} size - sm, md, lg, xl
 */
const EnterpriseModal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  className = ''
}) => {
  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[60] px-4 animate-fadeIn"
      onClick={closeOnOverlayClick ? onClose : undefined}
    >
      <div
        className={`bg-white rounded-3xl shadow-2xl w-full ${sizes[size]} transform transition-all animate-slideUp ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">
            {title && (
              <h2 className="text-2xl font-bold text-slate-900">
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-500 hover:text-slate-700"
                aria-label="Close modal"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="px-6 py-6">
          {children}
        </div>
      </div>
    </div>
  );
};

/**
 * Modal Footer Component
 */
export const ModalFooter = ({ children, className = '' }) => (
  <div className={`flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 bg-slate-50/50 rounded-b-3xl ${className}`}>
    {children}
  </div>
);

export default EnterpriseModal;