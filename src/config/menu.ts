export type MenuAuthority = string | string[];

export interface MenuItem {
  label: string;
  href?: string;
  authority?: MenuAuthority;
  children?: {
    label: string;
    href: string;
    authority?: MenuAuthority;
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
      {
        label: "Eventos",
        href: "/dashboard/report/event",
        authority: ["EVENT_REPORT_VIEW", "EVENT_REPORT_VIEW_ALL"],
      },
      { label: "Usuários", href: "/dashboard/report/user" },
      { label: "Perfis", href: "/dashboard/report/profile" },
    ],
  },
  {
    label: "Administração",
    children: [
      {
        label: "Mensageria (DLQ)",
        href: "/dashboard/admin/dead-letters",
        authority: "DEAD_LETTER_VIEW",
      },
      {
        label: "Config. de E-mail (Base)",
        href: "/dashboard/admin/mail-config",
        authority: "MAIL_CONFIG_VIEW",
      },
    ],
  },
];
