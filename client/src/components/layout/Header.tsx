import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/store/cart-context";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Header() {
  const [location] = useLocation();
  const { cartCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/menu", label: "Меню" },
    { href: "/about", label: "О нас" },
    { href: "/contacts", label: "Контакты" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Mobile Menu Trigger */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Меню</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4 mt-8">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-serif font-bold tracking-wider mb-4">
                FORUM
              </Link>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "text-lg font-medium transition-colors hover:text-primary",
                    location === link.href ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <div className="flex-1 md:flex-none text-center md:text-left">
          <Link href="/" className="text-2xl font-serif font-bold tracking-widest hover:opacity-80 transition-opacity">
            FORUM
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 mx-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium uppercase tracking-wide transition-colors hover:text-primary",
                location === link.href ? "text-primary border-b-2 border-primary" : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Cart Icon */}
        <div className="flex items-center justify-end md:flex-1 lg:flex-none">
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground font-bold">
                  {cartCount}
                </span>
              )}
              <span className="sr-only">Корзина</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
