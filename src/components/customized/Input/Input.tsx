import { forwardRef, ReactNode } from 'react';

import { Input as CNInput, InputProps as CNInputProps } from '@/components/ui/input';
import { cn } from '@/helpers/cn';

export interface InputProps extends CNInputProps {
  label?: string;
  error?: string;
  right?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, label, error, right, ...props }, ref) => {
  return (
    <div className="relative">
      {label && (
        <label htmlFor={props.id} className="mb-2 block text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <div className="relative">
        <CNInput className={cn(error ? 'border-red-500' : '', className)} ref={ref} {...props} />
        {right}
      </div>
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
});

export default Input;
