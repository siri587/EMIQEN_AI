import React from 'react';

interface BrandLogoProps {
  variant?: 'full' | 'icon' | 'stacked';
  theme?: 'light' | 'dark';
  showDomain?: boolean;
  className?: string;
  iconSize?: number;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  theme = 'light',
  className = '',
  iconSize = 36,
}) => (
  <img
    src="/brand/emiqen-logo.png"
    alt="EMIQEN.com"
    width={iconSize * 25 / 7}
    height={iconSize}
    className={`block h-auto w-auto ${theme === 'dark' ? 'rounded-md bg-white px-1' : ''} ${className}`}
    style={{ height: iconSize }}
  />
);
