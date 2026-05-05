"use client";

import { Menu, User, Settings, LogOut, LayoutDashboard, ShoppingBag, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "./ModeTogle";
import { useEffect, useState, useCallback } from "react";
import { getSeation } from "@/action/medicine.action";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface NavbarProps {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
}

const Navbar1 = ({
  logo = {
    url: "/",
    src: "/medinestlogo.png",
    alt: "logo",
    title: "Medi Nest",
  },
  className,
}: NavbarProps) => {
  // ✅ mounted আর আলাদা state নয়, সরাসরি session loading track করব
  const [seation, setSeation] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true); // ✅ loading state যোগ
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // ✅ fetch function কে useCallback দিয়ে stable রাখা
  const fetchSeation = useCallback(async () => {
    try {
      const data = await getSeation();
      if (data && data.user) {
        setSeation(data.user);
      } else {
        setSeation(null);
      }
    } catch (error) {
      console.error("Failed to fetch session:", error);
      setSeation(null);
    } finally {
      setIsLoading(false); // ✅ loading শেষ
    }
  }, []);

  useEffect(() => {
    // ✅ mounted check ছাড়াই সরাসরি call — client component এ এটাই সঠিক
    fetchSeation();
  }, [fetchSeation]);

  // ✅ pathname বদলালে session re-check (login/logout redirect এর পর)
  useEffect(() => {
    fetchSeation();
  }, [pathname, fetchSeation]);

  const logOut = async () => {
    await authClient.signOut();
    setSeation(null);
    router.push("/login");
    router.refresh(); // ✅ router refresh যোগ
  };

  // ✅ loading এর সময় skeleton দেখাবে, null নয়
  // এতে layout shift হবে না
  const baseRoutes = [
    { title: "Home", url: "/" },
    { title: "All Medicine", url: "/allmedicine" },
    { title: "Search", url: "/search" },
    { title: "About Us", url: "/about" },
    { title: "Contact", url: "/contact" },
  ];

  const authRoutes = [
    { title: "Dashboard", url: "/user-dashboard" },
  ];

  const routes = seation ? [...baseRoutes, ...authRoutes] : baseRoutes;

  return (
    <header className={cn("sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm", className)}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href={logo.url} className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <img
            src={logo.src}
            className="h-8 w-auto dark:invert"
            alt={logo.alt}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <span className="hidden text-xl font-bold tracking-tight sm:inline-block">
            {logo.title}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {routes.map((route) => (
            <Link
              key={route.title}
              href={route.url}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary relative group",
                pathname === route.url ? "text-primary font-semibold" : "text-muted-foreground"
              )}
            >
              {route.title}
              <span className={cn(
                "absolute -bottom-[21px] left-0 h-[2px] w-full bg-primary transition-transform duration-300 ease-out",
                pathname === route.url ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              )} />
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/search" className={cn("flex items-center justify-center w-9 h-9 rounded-full text-muted-foreground hover:text-primary hover:bg-muted transition-colors", pathname === '/search' && 'text-primary bg-primary/10')}>
            <Search className="h-4 w-4" />
          </Link>
          <ModeToggle />

          {/* ✅ loading এর সময় placeholder দেখাবে */}
          {isLoading ? (
            <div className="h-10 w-24 animate-pulse rounded-full bg-muted" />
          ) : !seation ? (
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" className="font-medium">
                <Link href="/login">Log in</Link>
              </Button>
              <Button asChild className="font-medium rounded-full px-6">
                <Link href="/signup">Sign up</Link>
              </Button>
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full border-2 border-primary/20 hover:border-primary/50 transition-colors">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={seation?.image} alt={seation?.name || "User"} />
                    <AvatarFallback className="bg-primary/10 text-primary font-medium">
                      {seation?.name ? seation.name.charAt(0).toUpperCase() : <User className="h-4 w-4" />}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 mt-2" align="end" forceMount>
                <DropdownMenuLabel className="font-normal p-3">
                  <div className="flex flex-col space-y-1.5">
                    <p className="text-sm font-semibold leading-none">{seation?.name || "User"}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {seation?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="p-2 cursor-pointer">
                  <Link href="/user-dashboard" className="flex items-center w-full">
                    <LayoutDashboard className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                {seation?.role == "USER" && (
                  <DropdownMenuItem asChild className="p-2 cursor-pointer">
                    <Link href="/user-dashboard/myorder" className="flex items-center w-full">
                      <ShoppingBag className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>My Orders</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                {seation?.role == "USER" && (
                  <DropdownMenuItem asChild className="p-2 cursor-pointer">
                    <Link href="/user-dashboard/manage-profile" className="flex items-center w-full">
                      <User className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logOut} className="p-2 cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-100 dark:focus:bg-red-900/20">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span className="font-medium">Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-2 md:hidden">
          <ModeToggle />

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] sm:w-[400px] flex flex-col p-0">
              <SheetHeader className="border-b p-6 text-left">
                <SheetTitle className="flex items-center gap-2">
                  <img
                    src={logo.src}
                    className="h-6 w-auto dark:invert"
                    alt={logo.alt}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <span className="text-xl font-bold">{logo.title}</span>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-2 p-4 flex-1 overflow-y-auto">
                <nav className="flex flex-col gap-1 mt-4">
                  {routes.map((route) => (
                    <Link
                      key={route.title}
                      href={route.url}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center rounded-lg px-4 py-3 text-base font-medium transition-colors hover:bg-muted",
                        pathname === route.url ? "bg-primary/10 text-primary font-semibold" : "text-foreground"
                      )}
                    >
                      {route.title}
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="border-t p-6 bg-muted/30 mt-auto">
                {isLoading ? (
                  // ✅ Mobile loading skeleton
                  <div className="h-11 w-full animate-pulse rounded-lg bg-muted" />
                ) : !seation ? (
                  <div className="flex flex-col gap-3">
                    <Button asChild variant="outline" className="w-full justify-center h-11">
                      <Link href="/login" onClick={() => setIsOpen(false)}>Log in</Link>
                    </Button>
                    <Button asChild className="w-full justify-center h-11">
                      <Link href="/signup" onClick={() => setIsOpen(false)}>Sign up</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-5">
                    <div className="flex items-center gap-4 bg-background p-4 rounded-xl border shadow-sm">
                      <Avatar className="h-12 w-12 border-2 border-primary/10">
                        <AvatarImage src={seation?.image} alt={seation?.name || "User"} />
                        <AvatarFallback className="bg-primary/10 text-primary text-lg">
                          {seation?.name ? seation.name.charAt(0).toUpperCase() : <User className="h-6 w-6" />}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col flex-1 overflow-hidden">
                        <span className="text-base font-semibold truncate">{seation?.name || "User"}</span>
                        <span className="text-sm text-muted-foreground truncate">{seation?.email}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <Button asChild variant="outline" className="w-full justify-start h-10">
                        <Link href="/profile" onClick={() => setIsOpen(false)}>
                          <User className="mr-2 h-4 w-4" /> Profile
                        </Link>
                      </Button>
                      <Button asChild variant="outline" className="w-full justify-start h-10">
                        <Link href="/settings" onClick={() => setIsOpen(false)}>
                          <Settings className="mr-2 h-4 w-4" /> Settings
                        </Link>
                      </Button>
                    </div>

                    <Button
                      variant="destructive"
                      className="w-full justify-start h-11 font-medium"
                      onClick={() => {
                        logOut();
                        setIsOpen(false);
                      }}
                    >
                      <LogOut className="mr-2 h-5 w-5" /> Log out
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export { Navbar1 };