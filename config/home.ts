import { Icons } from "@/components/ui/Icons";

export const homeNavLinks = [
  {
    title: "Features",
    href: "/",
    menu: [
      {
        title: "Link Shortening",
        tagline: "Shorten links and track their performance.",
        href: "/",
        icon: Icons.help,
      },
      {
        title: "Password Protection",
        tagline: "Secure your links with a password.",
        href: "/",
        icon: Icons.lock,
      },
      {
        title: "Advanced Analytics",
        tagline: "Gain insights into who is clicking your links.",
        href: "/",
        icon: Icons.chart,
      },
      {
        title: "Custom QR Codes",
        tagline: "Use QR codes to reach your audience.",
        href: "/",
        icon: Icons.qr,
      },
    ],
  },
  {
    title: "Pricing",
    href: "/",
  },
  {
    title: "Enterprise",
    href: "/",
  },
  {
    title: "Resources",
    href: "/",
    menu: [
      {
        title: "Blog",
        tagline: "Read articles on the latest trends in tech.",
        href: "/",
        icon: Icons.news,
      },
      {
        title: "Help",
        tagline: "Get answers to your questions.",
        href: "/",
        icon: Icons.help,
      },
    ],
  },
  {
    title: "Changelog",
    href: "/",
  },
];
