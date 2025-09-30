import { useState } from "react";
import { Menu, X, Palette } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const yellowThemes = [
  {
    gradient: "linear-gradient(90deg, #FFE259 0%, #FFA751 100%)",
    shadow: "0 4px 20px rgba(255, 186, 0, 0.4)",
    buttonBg: "bg-white text-yellow-900",
    textColor: "text-yellow-900",
    hoverTextColor: "hover:text-yellow-700",
  },
  {
    gradient: "linear-gradient(90deg, #FCE38A 0%, #F38181 100%)",
    shadow: "0 4px 20px rgba(243, 129, 129, 0.4)",
    buttonBg: "bg-white text-yellow-800",
    textColor: "text-yellow-800",
    hoverTextColor: "hover:text-yellow-600",
  },
  {
    gradient: "linear-gradient(90deg, #F6D365 0%, #FDA085 100%)",
    shadow: "0 4px 20px rgba(253, 160, 133, 0.4)",
    buttonBg: "bg-white text-yellow-700",
    textColor: "text-yellow-700",
    hoverTextColor: "hover:text-yellow-500",
  },
  {
    gradient: "linear-gradient(90deg, #FFF9A5 0%, #FFD700 100%)",
    shadow: "0 4px 20px rgba(255, 215, 0, 0.4)",
    buttonBg: "bg-white text-yellow-600",
    textColor: "text-yellow-600",
    hoverTextColor: "hover:text-yellow-400",
  },
  {
    gradient: "linear-gradient(90deg, #FFF176 0%, #FBC02D 100%)",
    shadow: "0 4px 20px rgba(251, 192, 45, 0.4)",
    buttonBg: "bg-white text-yellow-500",
    textColor: "text-yellow-500",
    hoverTextColor: "hover:text-yellow-300",
  },
];

const blueThemes = [
  {
    gradient: "linear-gradient(90deg, #89F7FE 0%, #66A6FF 100%)",
    shadow: "0 4px 20px rgba(102, 166, 255, 0.4)",
    buttonBg: "bg-blue-100 text-blue-900",
    textColor: "text-white",
    hoverTextColor: "hover:text-blue-200",
  },
  {
    gradient: "linear-gradient(90deg, #43C6AC 0%, #191654 100%)",
    shadow: "0 4px 20px rgba(67, 198, 172, 0.4)",
    buttonBg: "bg-blue-200 text-blue-900",
    textColor: "text-white",
    hoverTextColor: "hover:text-blue-300",
  },
  {
    gradient: "linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)",
    shadow: "0 4px 20px rgba(0, 242, 254, 0.4)",
    buttonBg: "bg-blue-300 text-blue-900",
    textColor: "text-white",
    hoverTextColor: "hover:text-blue-100",
  },
  {
    gradient: "linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%)",
    shadow: "0 4px 20px rgba(0, 201, 255, 0.4)",
    buttonBg: "bg-white text-blue-800",
    textColor: "text-white",
    hoverTextColor: "hover:text-blue-200",
  },
  {
    gradient: "linear-gradient(90deg, #3a7bd5 0%, #00d2ff 100%)",
    shadow: "0 4px 20px rgba(0, 210, 255, 0.4)",
    buttonBg: "bg-white text-blue-700",
    textColor: "text-white",
    hoverTextColor: "hover:text-blue-300",
  },
];

const navItems = [
  { title: "Home", href: "/" },
  { title: "Features", href: "#features" },
  { title: "How It Works", href: "#how-it-works" },
  { title: "About", href: "#about" },
  { title: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeType, setThemeType] = useState<"yellow" | "blue">("yellow");
  const [themeIndex, setThemeIndex] = useState(0);

  const toggleTheme = () => {
    if (themeType === "yellow") {
      if (themeIndex < yellowThemes.length - 1) {
        setThemeIndex(themeIndex + 1);
      } else {
        setThemeType("blue");
        setThemeIndex(0);
      }
    } else {
      if (themeIndex < blueThemes.length - 1) {
        setThemeIndex(themeIndex + 1);
      } else {
        setThemeType("yellow");
        setThemeIndex(0);
      }
    }
  };

  const currentTheme =
    themeType === "yellow"
      ? yellowThemes[themeIndex]
      : blueThemes[themeIndex];

  const {
    gradient,
    shadow,
    textColor,
    hoverTextColor,
    buttonBg,
  } = currentTheme;

  return (
    <nav
      className="sticky top-0 z-50 w-full border-b border-white/20"
      style={{
        background: gradient,
        boxShadow: shadow,
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center">
              <span
                className={cn(
                  "text-2xl font-black tracking-tight transition-colors duration-200",
                  textColor,
                  hoverTextColor
                )}
                style={{
                  textShadow:
                    themeType === "yellow"
                      ? "2px 2px 0px rgba(30, 30, 30, 0.2)"
                      : "2px 2px 0px rgba(0, 0, 0, 0.5)",
                }}
              >
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
                        `${textColor} ${hoverTextColor} font-medium transition-all duration-300 hover:scale-105 hover:drop-shadow-lg`
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
              size="icon"
              onClick={toggleTheme}
              className={cn(
                textColor,
                "hover:bg-white/20 transition-all duration-300 hover:scale-110 hover:rotate-180"
              )}
              title="Switch color theme"
            >
              <Palette className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              className={cn(
                textColor,
                hoverTextColor,
                "hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              )}
            >
              Sign In
            </Button>
            <Button
              className={cn(
                buttonBg,
                "font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
              )}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className={cn(
                textColor,
                "hover:bg-white/20 transition-all duration-300 hover:scale-110 hover:rotate-180"
              )}
              title="Switch color theme"
            >
              <Palette className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn(
                textColor,
                "hover:bg-white/20 transition-all duration-300"
              )}
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
                className={cn(
                  "block px-4 py-2 rounded-md transition-all duration-300 hover:translate-x-1 hover:bg-white/20",
                  textColor,
                  hoverTextColor
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.title}
              </a>
            ))}
            <div className="px-4 pt-4 space-y-2 border-t border-white/20">
              <Button
                variant="outline"
                className={cn(
                  "w-full border-white/30 hover:bg-white/20 transition-all duration-300",
                  textColor,
                  hoverTextColor
                )}
              >
                Sign In
              </Button>
              <Button
                className={cn(
                  "w-full font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105",
                  buttonBg
                )}
              >
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
