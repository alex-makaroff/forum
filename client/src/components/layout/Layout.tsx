import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Toaster } from "@/components/ui/toaster";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans text-foreground">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}
