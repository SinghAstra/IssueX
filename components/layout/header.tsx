"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { PlusIcon, SearchIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Icons } from "../Icons";

interface HeaderProps {
  showLogo: boolean;
  showSearchBar: boolean;
}

export function Header({ showLogo, showSearchBar }: HeaderProps) {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="container flex h-16 items-center px-4">
        {showLogo && (
          <Link className="flex h-16 items-center gap-2" href="/">
            <Icons.logo className="h-8 w-8 text-[#2d8cf0]" />
            <span className="font-semibold text-lg uppercase tracking-wider">
              {siteConfig.name}
            </span>
          </Link>
        )}
        {showSearchBar && (
          <div className="flex-1 md:flex md:justify-center px-4 ">
            <div className="w-full max-w-2xl relative">
              <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search repositories and issues..."
                className="w-full bg-[hsl(var(--input))] pl-10 border border-border"
              />
            </div>
          </div>
        )}

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground bg-[hsl(var(--secondary))] hover:bg-[hsl(var(--accent))]"
              asChild
            >
              <Link href="/repositories">
                <PlusIcon className="h-5 w-5" />
              </Link>
            </Button>
          </div>

          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={session.user?.image || "/avatars/default.png"}
                      alt={session.user?.name || "User"}
                    />
                    <AvatarFallback>
                      {session.user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 bg-card border-border"
                align="end"
                forceMount
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{session.user?.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {session.user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-border" />
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-border" />
                <DropdownMenuItem
                  className="text-red-400 cursor-pointer"
                  onSelect={() => signOut()}
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              href="/auth/sign-in"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              <Icons.gitLogo className="mr-2 h-4 w-4" /> Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
