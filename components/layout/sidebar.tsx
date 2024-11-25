"use client";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import {
  BarChart3Icon,
  FileTextIcon,
  GitBranchIcon,
  LayoutDashboardIcon,
  SettingsIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icons } from "../Icons";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    name: "Repositories",
    href: "/dashboard/repositories",
    icon: GitBranchIcon,
  },
  {
    name: "Templates",
    href: "/dashboard/templates",
    icon: FileTextIcon,
  },
  {
    name: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3Icon,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: SettingsIcon,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 bg-[#1a1f37] border-r border-[#2a2f45] px-6">
        {/* Logo */}
        <div className="flex h-16 items-center gap-2">
          <Icons.logo className="h-8 w-8 text-[#2d8cf0]" />
          <span className="font-semibold text-lg">{siteConfig.name}</span>
        </div>

        {/* Navigation */}
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-4">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "bg-[#2d8cf0]/10 text-[#2d8cf0]"
                      : "text-muted-foreground hover:bg-[#1e2442] hover:text-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
