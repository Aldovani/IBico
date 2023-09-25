import Link from "next/link";
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="flex gap-20">
      <div className="w-1/3 bg-cover min-h-screen bg-[url('/img/auth-image.jpg')] bg-no-repeat pt-8 pl-16 max-md:hidden">
        <Link href="/" className="font-bold text-4xl">
          IBico
        </Link>
      </div>

      {children}
    </main>
  );
}
