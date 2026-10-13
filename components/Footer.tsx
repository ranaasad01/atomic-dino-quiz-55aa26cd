"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { BRAND, navLinks } from "@/lib/data";

export default function Footer() {
  const t = useTranslations();
  const pathname = usePathname();
  const navT = t.raw("nav") as Record<string, string>;

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        background: "var(--primary)",
        borderTop: "3px solid var(--accent)",
      }}
    >
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          {/* Brand */}
          <div className="flex flex-col items-center gap-1 sm:items-start">
            <div className="flex items-center gap-2">
              <span className="text-3xl" aria-hidden="true">
                {BRAND.emoji}
              </span>
              <span
                className="text-xl font-bold text-white"
                style={{ fontFamily: "'Fredoka One', sans-serif" }}
              >
                {BRAND.name}
              </span>
            </div>
            <p
              className="text-sm text-white/70"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              {t("footer.tagline")}
            </p>
          </div>

          {/* Links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap justify-center gap-4">
              {navLinks.map((link) => {
                const isAnchor = link.href.startsWith("#");
                const label = navT[link.key] ?? link.label;

                const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
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
                    <Link
                      href={resolvedHref}
                      onClick={handleClick}
                      className="text-sm font-semibold text-white/80 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
                      style={{ fontFamily: "'Nunito', sans-serif" }}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div
          className="mt-8 border-t border-white/20 pt-6 text-center text-xs text-white/50"
          style={{ fontFamily: "'Nunito', sans-serif" }}
        >
          {t("footer.copyright")}
        </div>
      </div>
    </motion.footer>
  );
}