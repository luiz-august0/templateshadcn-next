import type React from 'react';

import { Eye, EyeOff } from 'lucide-react';
import { useState, type ComponentPropsWithoutRef } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/helpers/cn';

interface Props extends Omit<ComponentPropsWithoutRef<typeof Input>, 'type'> {
  label?: string;
  error?: string;
}

export default function PasswordInput({ className, label, error, ...props }: Props) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <div className="relative">
      {label && (
        <label htmlFor={props.id} className="mb-2 block text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <div className="relative">
        <Input className={cn('pr-10', className)} type={showPassword ? 'text' : 'password'} {...props} />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={handleClickShowPassword}
          onMouseDown={handleMouseDownPassword}
          aria-label="toggle password visibility"
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4 text-muted-foreground" />
          ) : (
            <Eye className="h-4 w-4 text-muted-foreground" />
          )}
        </Button>
      </div>
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
}
