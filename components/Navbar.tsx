"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { navLinks, BRAND } from "@/lib/data";

export default function Navbar() {
  const t = useTranslations();
  const pathname = usePathname();
  const navT = t.raw("nav") as Record<string, string>;

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full"
      style={{
        background: "var(--card)",
        borderBottom: "2px solid var(--border)",
        boxShadow: "0 4px 16px rgba(45,106,79,0.10)",
      }}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
        {/* Logo / Brand */}
        <Link
          href="/"
          className="flex items-center gap-2 text-[var(--primary)] transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] rounded-xl"
          aria-label={BRAND.name}
        >
          <span className="text-3xl" aria-hidden="true">
            {BRAND.emoji}
          </span>
          <span
            className="text-xl leading-none"
            style={{ fontFamily: "'Fredoka One', sans-serif", color: "var(--primary)" }}
          >
            {BRAND.name}
          </span>
        </Link>

        {/* Nav links */}
        <nav aria-label="Main navigation">
          <ul className="flex items-center gap-1 sm:gap-2">
            {navLinks.map((link) => {
              const isAnchor = link.href.startsWith("#");
              const label = navT[link.key] ?? link.label;

              const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
                if (isAnchor && pathname === "/") {
                  e.preventDefault();
                  document
                    .querySelector(link.href)
                    ?.scrollIntoView({ behavior: "smooth" });
                }
              };

              const resolvedHref = isAnchor
                ? pathname === "/"
                  ? link.href
                  : "/" + link.href
                : link.href;

              return (
                <li key={link.key}>
                  <motion.div whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.96 }}>
                    <Link
                      href={resolvedHref}
                      onClick={handleAnchorClick}
                      className="block rounded-2xl px-3 py-1.5 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
                      style={{
                        fontFamily: "'Nunito', sans-serif",
                        color: "var(--foreground)",
                      }}
                    >
                      {label}
                    </Link>
                  </motion.div>
                </li>
              );
            })}

            {/* CTA */}
            <li>
              <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="#quiz"
                  onClick={(e) => {
                    if (pathname === "/") {
                      e.preventDefault();
                      document
                        .querySelector("#quiz")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="ml-2 block rounded-2xl px-4 py-2 text-sm font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                  style={{
                    background: "var(--primary)",
                    color: "#fff",
                    fontFamily: "'Nunito', sans-serif",
                    boxShadow: "0 3px 10px rgba(45,106,79,0.25)",
                  }}
                >
                  {t("nav.cta")}
                </Link>
              </motion.div>
            </li>
          </ul>
        </nav>
      </div>
    </motion.header>
  );
}