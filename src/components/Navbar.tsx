import { useState } from "react";
import { Menu, X } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { title: "Home", href: "/" },
  { title: "Features", href: "#features" },
  { title: "How It Works", href: "#how-it-works" },
  { title: "About", href: "#about" },
  { title: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-navbar-yellow/20" style={{ 
      background: 'var(--gradient-navbar)',
      boxShadow: 'var(--navbar-shadow)'
    }}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center">
              <span className="text-2xl font-black tracking-tight text-navbar-yellow hover:text-navbar-yellow-hover transition-colors duration-200" style={{ textShadow: "2px 2px 0px hsl(var(--navbar-blue-dark))" }}>
                LOCATION
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavigationMenu>
              <NavigationMenuList>
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuLink
                      href={item.href}
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "text-navbar-blue-dark hover:text-navbar-blue font-medium transition-all duration-300 hover:scale-105 hover:drop-shadow-lg"
                      )}
                    >
                      {item.title}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button
              variant="ghost"
              className="text-navbar-blue-dark hover:text-navbar-blue hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Sign In
            </Button>
            <Button className="bg-white text-navbar-blue-dark font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-0.5">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-navbar-blue-dark hover:bg-white/20 transition-all duration-300"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-white/20">
            {navItems.map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="block px-4 py-2 text-navbar-blue-dark hover:text-navbar-blue hover:bg-white/20 rounded-md transition-all duration-300 hover:translate-x-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.title}
              </a>
            ))}
            <div className="px-4 pt-4 space-y-2 border-t border-white/20">
              <Button
                variant="outline"
                className="w-full text-navbar-blue-dark hover:text-navbar-blue border-white/30 hover:bg-white/20 transition-all duration-300"
              >
                Sign In
              </Button>
              <Button className="w-full bg-white text-navbar-blue-dark font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105">
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
