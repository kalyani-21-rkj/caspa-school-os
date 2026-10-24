import React from 'react';

interface CaspaLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const CaspaLogo: React.FC<CaspaLogoProps> = ({
  className = '',
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'w-9 h-9',
    md: 'w-36 h-36 sm:w-40 sm:h-40',
    lg: 'w-44 h-44 sm:w-48 sm:h-48',
    xl: 'w-56 h-56',
  };

  return (
    <div className={`inline-flex items-center justify-center select-none ${className}`}>
      <img
        src="/assets/aistudio/caspa_logo_7f187f6a.png"
        alt="CASPA School OS"
        className={`${sizeClasses[size]} object-contain`}
      />
    </div>
  );
};
