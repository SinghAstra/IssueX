import { Icons } from "@/components/ui/Icons";
import { siteConfig } from "@/config/site";
import Link from "next/link";

const SignInPage = () => {
  return (
    <div className="flex flex-col items-start max-w-sm mx-auto min-h-screen overflow-hidden pt-4 ">
      <div className="flex items-center w-full py-8 border-b border-border/80">
        <Link href="/" className="flex items-center gap-x-2">
          <Icons.logo className="w-6 h-6" />
          <h1 className="text-lg font-medium">{siteConfig.name}</h1>
        </Link>
      </div>

      <div className="flex flex-col items-start w-full">
        <p className="text-sm text-muted-foreground">
          By signing in, you agree to our{" "}
          <Link href="/terms" className="text-primary">
            Terms of Service{" "}
          </Link>
          and{" "}
          <Link href="/privacy" className="text-primary">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
