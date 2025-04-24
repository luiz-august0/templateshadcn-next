'use client';

import { sessionVerify } from '@/core/auth/services/auth';
import { User } from '@/core/users/types/models';
import { handlerHttpError } from '@/helpers/toast';
import UserForm from '@/shared/profile/components/form/UserForm';
import { Loader } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const router = useRouter();
  const { data, status } = useSession();
  const [user, setUser] = useState<User>();
  const [loadingUser, setLoadingUser] = useState<boolean>(true);
  const [openUserModal, setOpenUserModal] = useState<boolean>(false);

  useEffect(() => {
    const handleSession = async () => {
      try {
        await sessionVerify();
      } catch (error) {
        handlerHttpError(error);
        await signOut({ redirect: false });
        router.replace('/login');
      }
    };

    if (status == 'authenticated') {
      handleSession();
    } else if (status == 'unauthenticated') {
      router.replace('/login');
    }
  }, [status, router]);

  const loadUser = async () => {
    if (openUserModal && data?.user) {
      setLoadingUser(true);

      setUser(data?.user);

      setLoadingUser(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, [data, openUserModal]);

  if (!status || status == 'loading') {
    return (
      <div className="fixed top-0 left-0 w-screen h-screen items-center justify-center backdrop-blur-lg bg[rgba(0, 0, 0, 0.5)] gap-2.5">
        <Loader />
        <h1 className="text-sm">Carregando, aguarde...</h1>
      </div>
    );
  }

  return (
    <div className="flex max-md:flex-col">
      {/* TODO <MenuSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} setOpenUserModal={setOpenUserModal} /> */}
      <div className="h-screen w-full md:pr-6 md:pl-6 md:ml-20 pb-10 overflow-auto">{children}</div>
      {openUserModal && (
        <UserForm
          loadingUser={loadingUser}
          open={openUserModal}
          setOpen={setOpenUserModal}
          userAuthenticated
          user={user}
        />
      )}
    </div>
  );
}
