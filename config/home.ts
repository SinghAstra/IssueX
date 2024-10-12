import { Icons } from "@/components/ui/Icons";
import { NavLink } from "@/types";

export const homeNavLinks: NavLink[] = [
  {
    title: "Features",
    href: "/features",
    menu: [
      {
        title: "Link Shortening",
        tagline: "Shorten links and track their performance.",
        href: "/features/link-shortening",
        icon: "help",
      },
      {
        title: "Password Protection",
        tagline: "Secure your links with a password.",
        href: "/features/password-protection",
        icon: "lock",
      },
      {
        title: "Advanced Analytics",
        tagline: "Gain insights into who is clicking your links.",
        href: "/features/analytics",
        icon: "chart",
      },
      {
        title: "Custom QR Codes",
        tagline: "Use QR codes to reach your audience.",
        href: "/features/qr-codes",
        icon: "qr",
      },
    ],
  },
  {
    title: "Pricing",
    href: "/pricing",
  },
  {
    title: "Enterprise",
    href: "/enterprise",
  },
  {
    title: "Resources",
    href: "/resources",
    menu: [
      {
        title: "Blog",
        tagline: "Read articles on the latest trends in tech.",
        href: "/resources/blog",
        icon: "news",
      },
      {
        title: "Help",
        tagline: "Get answers to your questions.",
        href: "/resources/help",
        icon: "help",
      },
    ],
  },
  {
    title: "Changelog",
    href: "/changelog",
  },
];
