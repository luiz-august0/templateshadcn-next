// import * as Icon from '@mui/icons-material';

export type ItemProps = {
  title: string;
  to: string;
  icon: string;
};

export const menuItems: ItemProps[] = [
  {
    title: 'Dashboard',
    to: '/',
    icon: 'Home',
  },
  {
    title: 'Relatórios',
    to: '/relatorios',
    icon: 'Assessment',
  },
  {
    title: 'Usuários',
    to: '/usuarios',
    icon: 'SupervisedUserCircle',
  },
  {
    title: 'Conexão de Dados',
    to: '/conexao',
    icon: 'Storage',
  },
];
