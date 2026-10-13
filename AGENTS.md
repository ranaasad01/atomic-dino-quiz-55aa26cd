# AGENTS.md

Project conventions for AI agents and humans editing this codebase.

## Original request
A quiz about dinosaurs with ten questions and a score

## Goal
Build an interactive 10-question dinosaur quiz app with live scoring, instant answer feedback, progress tracking, and a final results screen — all client-side.

## Project type
other

## Design system — match this exactly
- Color tokens: `--background: #F5F0DC`, `--foreground: #1B3A2D`, `--card: #FFFDF2`, `--border: #B8A96A`, `--muted-foreground: #5A6E5C`, `--primary: #2D6A4F`, `--accent: #D4A017`

## Existing components — reuse these, don't create near-duplicates
- Footer (components/Footer.tsx)
- LanguageToggle (components/LanguageToggle.tsx)
- LocaleProvider (components/LocaleProvider.tsx)
- Navbar (components/Navbar.tsx)

## Existing i18n namespaces
Every translation key must be namespaced (`hero.title`, never a bare `title`) so two components never collide on the same catalog slot. Reuse one of these, or pick a new, distinct name:
`cta`, `facts`, `footer`, `hero`, `nav`, `quiz`, `score`, `types`

When editing or adding pages: preserve the design system above, reuse existing components and the shared nav data file, and keep the established structure and tone.
