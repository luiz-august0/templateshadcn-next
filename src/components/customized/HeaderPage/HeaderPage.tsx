import type { Dispatch, SetStateAction } from 'react';
import { ArrowLeft, Filter, Plus, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CustomizedButtonProps } from '@/shared/types/general';

type HeaderPageProps = {
  titlePage: string;
  search?: (query: string) => void;
  setOpenFilter?: Dispatch<SetStateAction<boolean>>;
  setOpenForm?: () => void;
  back?: boolean;
  buttons?: CustomizedButtonProps[];
};

export default function HeaderPage({ titlePage, search, setOpenFilter, setOpenForm, back, buttons }: HeaderPageProps) {
  const router = useRouter();

  return (
    <div className="sticky top-0 z-40 flex min-h-24 rounded-es-lg rounded-ee-lg bg-background p-2 max-md:flex-col max-md:items-center md:items-end md:justify-between">
      <div className="flex flex-row items-center justify-center gap-4 max-md:mt-10">
        {back && (
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="h-10 w-10">
            <ArrowLeft className="h-5 w-5 text-primary" />
          </Button>
        )}
        <h1 className="text-3xl font-medium">{titlePage}</h1>
      </div>
      <div className="flex gap-4 max-md:mt-5">
        {search && (
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Pesquisar" className="h-10 pl-8" onChange={(e) => search(e.target.value)} />
          </div>
        )}
        {setOpenFilter && (
          <Button variant="outline" size="icon" onClick={() => setOpenFilter(true)} className="h-10 w-10">
            <Filter className="h-5 w-5 text-primary" />
          </Button>
        )}
        {setOpenForm && (
          <Button variant="default" size="sm" onClick={() => setOpenForm()} className="h-10">
            <Plus className="mr-2 h-4 w-4" />
            Novo
          </Button>
        )}
        {buttons?.map((button, index) => (
          <Button key={index} {...button} className={`h-10 ${button.className || ''}`}>
            {button.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
