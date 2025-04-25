'use client';

import { SidebarProvider, useSidebar } from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { AuthContext, AuthProvider } from '@/providers/AuthProvider';
import { AlignJustify, Loader2, Sandwich } from 'lucide-react';
import { ReactNode, useContext } from 'react';
import Sidebar from './components/sidebar/Sidebar';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
}

function RenderLayout({ children }: { children: ReactNode }) {
  const isMobile = useIsMobile();
  const { loadingSession } = useContext(AuthContext);
  const { toggleSidebar } = useSidebar();

  if (loadingSession) {
    return (
      <div className="fixed flex flex-col w-screen h-screen bg-[#00000080] items-center justify-center gap-2.5">
        <Loader2 className="h-11 w-11 animate-spin text-primary" />
        <h1 className="text-lg">Carregando, aguarde...</h1>
      </div>
    );
  }

  return (
    <div className={`flex w-full ${isMobile && 'flex-col'}`}>
      <Sidebar />
      {isMobile && (
        <div className="sticky z-10 top-0 w-full py-4 px-2 -mb-4">
          <Button type="button" variant="outline" onClick={toggleSidebar}>
            <AlignJustify className="mr-2 h-4 w-4" />
            Menu
          </Button>
        </div>
      )}
      <main className="flex-1 bg-background">{children}</main>
    </div>
  );
}

export default function Layout({ children }: Props) {
  return (
    <AuthProvider>
      <SidebarProvider>
        <RenderLayout>{children}</RenderLayout>
      </SidebarProvider>
    </AuthProvider>
  );
}
