export interface MenuItem {
  label: string;
  href?: string;
  // Se definido, o item só aparece para quem tem essa authority (ver `/auth/me`,
  // useHasAuthority). Itens sem `authority` continuam visíveis pra qualquer usuário logado,
  // igual sempre foi — o backend segue sendo quem realmente impõe a permissão.
  authority?: string;
  children?: {
    label: string;
    href: string;
    authority?: string;
  }[];
}

export const menuConfig: MenuItem[] = [
  {
    label: "Home",
    href: "/dashboard",
  },
  {
    label: "Cadastros",
    children: [
      { label: "Clientes", href: "/dashboard/client" },
      { label: "Empresas", href: "/dashboard/company" },
      { label: "Pessoas", href: "/dashboard/person" },
      { label: "Perfis", href: "/dashboard/profile" },
      { label: "Profissionais", href: "/dashboard/professional" },
      { label: "Usuários", href: "/dashboard/user" },
    ],
  },
  {
    label: "Relatórios",
    children: [
      { label: "Usuários", href: "/dashboard/report/user" },
      { label: "Perfis", href: "/dashboard/report/profile" },
    ],
  },
  {
    label: "Administração",
    children: [
      { label: "Mensageria (DLQ)", href: "/dashboard/admin/dead-letters", authority: "DEAD_LETTER_VIEW" },
      { label: "Config. de E-mail (Base)", href: "/dashboard/admin/mail-config", authority: "MAIL_CONFIG_VIEW" },
    ],
  },
];
