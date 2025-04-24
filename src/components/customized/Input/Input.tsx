import { type ComponentPropsWithoutRef } from 'react';

import { Input as CNInput } from '@/components/ui/input';
import { cn } from '@/helpers/cn';

interface Props extends Omit<ComponentPropsWithoutRef<typeof CNInput>, 'type'> {
  label?: string;
  error?: string;
}

export default function Input({ className, label, error, ...props }: Props) {
  return (
    <div className="relative">
      {label && (
        <label htmlFor={props.id} className="mb-2 block text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <CNInput className={cn('pr-10', className)} {...props} />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
}
