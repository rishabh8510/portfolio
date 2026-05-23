"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/component/navLinks";
import { Menu, X } from "lucide-react";

export default function Header() {
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [hasShadow, setHasShadow] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ✅ FIX: route change pe reset
  useEffect(() => {
    if (pathname === "/") {
      setScrolled(false); // home default = transparent
    } else {
      setScrolled(true); // other pages = white
    }

    setHasShadow(false); // shadow bhi reset
  }, [pathname]);

  // ✅ optimized scroll
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 50;

          // home page only
          if (pathname === "/") {
            setScrolled((prev) =>
              prev !== isScrolled ? isScrolled : prev
            );
          }

          setHasShadow((prev) =>
            prev !== isScrolled ? isScrolled : prev
          );

          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-300
          ${
            scrolled
              ? "bg-white/90 backdrop-blur-md py-4"
              : "py-5"
          }
          ${hasShadow ? "shadow-md" : ""}
        `}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">

          {/* Logo */}
{/* Logo */}
<Link href="/" className="flex items-center gap-3">
  <div
    className={`flex h-9 w-9 items-center justify-center rounded-xl font-bold text-sm transition-colors duration-300
      ${
        scrolled
          ? "bg-black text-white"
          : "bg-white text-black"
      }
    `}
  >
    RT
  </div>

  <span
    className={`text-xl font-bold transition-colors duration-300
      ${
        scrolled
          ? "text-black"
          : "text-white"
      }
    `}
  >
    Rishabh
    <span
      className={`${
        scrolled ? "text-gray-500" : "text-gray-300"
      }`}
    >
    </span>
  </span>
</Link>

          {/* Desktop Navigation */}
          <nav
            className={`hidden md:flex items-center gap-1 text-sm font-medium ${
              scrolled
                ? ""
                : "border border-white rounded-full px-3 py-1.5"
            }`}
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.path;

              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`px-4 py-2 rounded-full transition-colors duration-200
                    ${
                      scrolled
                        ? isActive
                          ? "text-black font-semibold"
                          : "text-gray-500 hover:text-black hover:bg-gray-100"
                        : isActive
                        ? "text-white font-semibold"
                        : "text-gray-300 hover:text-white hover:bg-white/10"
                    }
                  `}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-3">

            {/* CTA Button */}
            <button
              className={`hidden md:block group rounded-full px-7 py-4 text-sm font-medium transition-all duration-200 cursor-pointer
                ${
                  scrolled
                    ? "bg-black text-white hover:bg-[#934b1c]"
                    : "bg-white text-black hover:bg-[#934b1c] hover:text-white"
                }
                hover:scale-105 active:scale-95
              `}
            >
              <span className="flex items-center gap-2">
                Let's Talk!
                <svg
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center justify-center h-9 w-9 rounded-full border border-gray-200 bg-white"
            >
              {mobileMenuOpen ? (
                <X className="h-4 w-4 text-black" />
              ) : (
                <Menu className="h-4 w-4 text-black" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation same */}
    </>
  );
}