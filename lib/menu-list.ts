import { BarChart2, Bell, type LucideIcon, Package, Settings, ShoppingBag, Tag } from 'lucide-react'

type Submenu = {
  href: string
  label: string
  active?: boolean
}

type Menu = {
  href: string
  label: string
  active?: boolean
  icon: LucideIcon
  submenus?: Submenu[]
}

type Group = {
  groupLabel: string
  menus: Menu[]
}

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: '',
      menus: [
        {
          href: '/dashboard',
          icon: ShoppingBag,
          label: 'Produtos',
          submenus: []
        },
        {
          href: '/dashboard',
          icon: Package,
          label: 'Pedidos',
          submenus: []
        },
        {
          href: '/dashboard',
          icon: BarChart2,
          label: 'Relatórios',
          submenus: []
        },
        {
          href: '/dashboard',
          icon: Tag,
          label: 'Cupons de Desconto',
          submenus: []
        },
        // {
        //   href: "/dashboard",
        //   label: "Notificações",
        //   icon: Bell,
        //   submenus: []
        // },
        {
          href: '/dashboard',
          icon: Settings,
          label: 'Configurações',
          submenus: []
        }
      ]
    }
    // {
    //   groupLabel: "Contents",
    //   menus: [
    //     {
    //       href: "",
    //       label: "Posts",
    //       icon: SquarePen,
    //       submenus: [
    //         {
    //           href: "/posts",
    //           label: "All Posts"
    //         },
    //         {
    //           href: "/posts/new",
    //           label: "New Post"
    //         }
    //       ]
    //     },
    //     {
    //       href: "/categories",
    //       label: "Categories",
    //       icon: Bookmark
    //     },
    //     {
    //       href: "/tags",
    //       label: "opa",
    //       icon: Tag
    //     }
    //   ]
    // },
    // {
    //   groupLabel: "Settings",
    //   menus: [
    //     {
    //       href: "/users",
    //       label: "Users",
    //       icon: Users
    //     },
    //     {
    //       href: "/account",
    //       label: "Account",
    //       icon: Settings
    //     }
    //   ]
    // }
  ]
}
