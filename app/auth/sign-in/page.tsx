import { signIn } from "@/auth";
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
      <div className="flex mt-16 mb-8 items-center justify-center flex-col gap-2 w-full">
        <form
          action={async () => {
            "use server";
            await signIn("github");
          }}
          className="w-full px-8"
        >
          <button
            type="submit"
            className="relative inline-flex h-10 overflow-hidden rounded-full p-[1.5px] w-full"
          >
            <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,hsl(var(--primary))_0%,hsl(var(--primary-foreground))_50%,hsl(var(--primary))_100%)]" />

            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-[hsl(var(--background))] px-4 py-1 text-sm font-medium text-[hsl(var(--foreground))] backdrop-blur-3xl">
              Connect Github
              <Icons.next className="ml-2 size-6 animate-moveLeftRight" />
            </span>
          </button>
        </form>
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
