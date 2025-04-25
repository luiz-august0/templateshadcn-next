import { Switch as CNSwitch } from '@/components/ui/switch';

export type SwitchProps = React.ComponentProps<typeof CNSwitch> & {
  label?: string;
};

export default function Switch({ label, ...props }: SwitchProps) {
  return (
    <div className="relative">
      {label && <label className="mb-2 block text-sm font-medium text-foreground">Ativo</label>}
      <CNSwitch {...props} />
    </div>
  );
}
