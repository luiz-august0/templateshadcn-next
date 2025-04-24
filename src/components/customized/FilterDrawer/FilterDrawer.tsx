import type * as React from 'react';
import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';

type FilterDrawerProps = {
  openFilter: boolean;
  setOpenFilter: React.Dispatch<React.SetStateAction<boolean>>;
  disableButtons?: boolean;
  onCleanFilters?: () => void;
  onFilter?: () => void;
  children: React.ReactNode;
};

export default function FilterDrawer({
  openFilter,
  setOpenFilter,
  disableButtons = false,
  onCleanFilters,
  onFilter,
  children,
}: FilterDrawerProps) {
  return (
    <Sheet open={openFilter} onOpenChange={setOpenFilter}>
      <SheetContent side="right" className="w-[320px] sm:w-[400px] p-0">
        <div className="flex flex-col h-full justify-between">
          <div className="p-6">
            <SheetHeader className="flex flex-row items-center justify-between">
              <SheetTitle className="text-3xl font-normal">Filtros</SheetTitle>
              <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setOpenFilter(false)}>
                <X className="h-5 w-5" />
                <span className="sr-only">Fechar</span>
              </Button>
            </SheetHeader>
            <div className="flex flex-col mt-10 gap-4">{children}</div>
          </div>
          {!disableButtons && (
            <SheetFooter className="flex-row justify-end gap-2 p-6 border-t">
              <Button variant="outline" onClick={onCleanFilters}>
                Limpar
              </Button>
              <Button onClick={onFilter}>Filtrar</Button>
            </SheetFooter>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
