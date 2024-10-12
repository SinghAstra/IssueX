import { Icons } from "@/components/ui/Icons";

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage?: string;
  links: {
    twitter: string;
    github: string;
    linkedIn: string;
  };
};

type MenuItem = {
  title: string;
  tagline: string;
  href: string;
  icon: keyof typeof Icons;
};

type NavLink = {
  title: string;
  href: string;
  menu?: MenuItem[];
};
