import { Icons } from "@/components/ui/Icons";

export const homeNavLinks = [
  {
    title: "Features",
    href: "/features",
    menu: [
      {
        title: "Link Shortening",
        tagline: "Shorten links and track their performance.",
        href: "/features/link-shortening",
        icon: Icons.help,
      },
      {
        title: "Password Protection",
        tagline: "Secure your links with a password.",
        href: "/features/password-protection",
        icon: Icons.lock,
      },
      {
        title: "Advanced Analytics",
        tagline: "Gain insights into who is clicking your links.",
        href: "/features/analytics",
        icon: Icons.chart,
      },
      {
        title: "Custom QR Codes",
        tagline: "Use QR codes to reach your audience.",
        href: "/features/qr-codes",
        icon: Icons.qr,
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
        icon: Icons.news,
      },
      {
        title: "Help",
        tagline: "Get answers to your questions.",
        href: "/resources/help",
        icon: Icons.help,
      },
    ],
  },
  {
    title: "Changelog",
    href: "/changelog",
  },
];
