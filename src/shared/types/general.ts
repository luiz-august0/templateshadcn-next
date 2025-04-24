import { buttonVariants } from '@/components/ui/button';
import { VariantProps } from 'class-variance-authority';

export type CustomizedButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  } & {
    label: JSX.Element | string;
  };
