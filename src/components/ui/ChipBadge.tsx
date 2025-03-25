
import React from 'react';
import { cn } from '@/lib/utils';

type ChipVariant = 'purple' | 'teal' | 'neutral';

interface ChipBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: ChipVariant;
  className?: string;
}

const ChipBadge = ({ 
  children, 
  variant = 'purple', 
  className, 
  ...props 
}: ChipBadgeProps) => {
  return (
    <span 
      className={cn('chip-badge', {
        'chip-badge-purple': variant === 'purple',
        'chip-badge-teal': variant === 'teal',
        'bg-finley-neutral-light text-finley-neutral-dark': variant === 'neutral',
      }, className)}
      {...props}
    >
      {children}
    </span>
  );
};

export { ChipBadge };
