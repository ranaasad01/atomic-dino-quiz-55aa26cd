export interface NavLink {
  label: string;
  href: string;
  key: string;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/", key: "home" },
  { label: "Quiz", href: "#quiz", key: "quiz" },
  { label: "Score", href: "#score", key: "score" },
  { label: "Results", href: "#results", key: "results" },
];

export const BRAND = {
  name: "Dino Quiz",
  tagline: "How well do you know your dinosaurs?",
  emoji: "🦕",
} as const;

export type QuizQuestion = {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
};