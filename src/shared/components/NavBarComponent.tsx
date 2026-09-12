"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { MenuAuthority, menuConfig } from "@/src/config/menu";
import { useCurrentUser } from "@/src/modules/auth/auth.hooks";
import Link from "next/link";

export function NavBarComponent() {
  const { data: currentUser } = useCurrentUser();

  function isAllowed(authority?: MenuAuthority) {
    if (!authority) return true;

    const required = Array.isArray(authority) ? authority : [authority];

    return required.some(
      (item) => currentUser?.authorities.includes(item) ?? false,
    );
  }

  const visibleMenu = menuConfig
    .filter((menu) => isAllowed(menu.authority))
    .map((menu) => ({
      ...menu,
      children: menu.children?.filter((child) => isAllowed(child.authority)),
    }))
    .filter((menu) => menu.href || (menu.children && menu.children.length > 0));

  return (
    <div className="z-[5] px-2">
      <NavigationMenu viewport={false}>
        <NavigationMenuList>
          {visibleMenu.map((menu) => (
            <NavigationMenuItem key={menu.label}>
              {menu.href && !menu.children && (
                <NavigationMenuLink asChild>
                  <Link
                    href={menu.href}
                    className="hover:bg-accent rounded-md px-3 py-2"
                  >
                    {menu.label}
                  </Link>
                </NavigationMenuLink>
              )}

              {menu.children && (
                <>
                  <NavigationMenuTrigger>{menu.label}</NavigationMenuTrigger>

                  <NavigationMenuContent className="grid gap-1 p-2">
                    {menu.children.map((child) => (
                      <NavigationMenuLink asChild key={child.label}>
                        <Link
                          href={child.href}
                          className="hover:bg-accent block rounded-md px-2 py-1"
                        >
                          {child.label}
                        </Link>
                      </NavigationMenuLink>
                    ))}
                  </NavigationMenuContent>
                </>
              )}
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
