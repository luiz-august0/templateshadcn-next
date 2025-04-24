import type { ComponentPropsWithoutRef } from 'react';

import { Skeleton as CNSkeleton } from '@/components/ui/skeleton';
import { cn } from '@/helpers/cn';

export interface Props extends ComponentPropsWithoutRef<typeof CNSkeleton> {
  skeletonsNumber?: number;
  gap?: number | string;
  className?: string;
}

export default function Skeleton({ skeletonsNumber = 1, gap = 4, className, ...props }: Props) {
  return (
    <div className={cn('flex flex-col', typeof gap === 'number' ? `space-y-${gap}` : `gap-[${gap}]`, className)}>
      {Array(skeletonsNumber)
        .fill(1)
        .map((_, index) => (
          <CNSkeleton key={index} {...props} />
        ))}
    </div>
  );
}
