"use client";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icons } from "../Icons";

interface NavigationItem {
  name: string;
  href: string;
  icon: keyof typeof Icons;
}

interface SidebarProps {
  navigation: NavigationItem[];
}

export function Sidebar({ navigation }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
      <div className="flex grow flex-col gap-y-3 bg-background border-r border-border px-2">
        {/* Logo */}
        <Link className="flex h-16 items-center gap-2" href="/dashboard">
          <Icons.logo className="h-8 w-8 text-primary" />
          <span className="font-semibold text-lg uppercase tracking-wider text-foreground">
            {siteConfig.name}
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-2">
            {navigation.map((item) => {
              const IconComponent = Icons[item.icon];
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "group flex items-center gap-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      pathname === item.href
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-card hover:text-foreground"
                    )}
                  >
                    <IconComponent className="h-5 w-5 shrink-0" />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}
