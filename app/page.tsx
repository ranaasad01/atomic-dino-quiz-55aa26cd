"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/Reveal";
import { scaleIn, fadeInUp, staggerContainer } from "@/lib/motion";
import { Star, Trophy, RotateCcw, CheckCircle, XCircle, Zap } from 'lucide-react';

// ── Quiz data ────────────────────────────────────────────────────────────────
interface Question {
  question: string;
  answers: string[];
  correct: number;
  funFact: string;
  emoji: string;
}

const QUESTIONS: Question[] = [
  {
    question: "What does the name 'Tyrannosaurus Rex' mean?",
    answers: ["Giant Lizard King", "Tyrant Lizard King", "Thunder Lizard King", "Terrible Lizard King"],
    correct: 1,
    funFact: "T. rex had tiny arms but a HUGE bite — the strongest of any land animal ever!",
    emoji: "🦖",
  },
  {
    question: "How long did the dinosaurs live on Earth before going extinct?",
    answers: ["10 million years", "65 million years", "165 million years", "500 million years"],
    correct: 2,
    funFact: "Dinosaurs ruled Earth for about 165 million years. Humans have only been around for about 300,000 years!",
    emoji: "⏳",
  },
  {
    question: "Which dinosaur had the longest neck?",
    answers: ["Brachiosaurus", "Diplodocus", "Brontosaurus", "Mamenchisaurus"],
    correct: 3,
    funFact: "Mamenchisaurus had a neck up to 10 meters long — that's longer than a school bus!",
    emoji: "🦕",
  },
  {
    question: "What did the Triceratops use its three horns for?",
    answers: ["Digging for food", "Scratching its back", "Fighting predators", "Attracting mates only"],
    correct: 2,
    funFact: "Triceratops horns could grow over 1 meter long and were used to fight off T. rex attacks!",
    emoji: "🦏",
  },
  {
    question: "Which dinosaur is the fastest ever discovered?",
    answers: ["Velociraptor", "Gallimimus", "Compsognathus", "Ornithomimus"],
    correct: 1,
    funFact: "Gallimimus could run up to 70 km/h — as fast as a racehorse! It looked like a giant ostrich.",
    emoji: "💨",
  },
  {
    question: "What are birds related to?",
    answers: ["Crocodiles", "Lizards", "Theropod dinosaurs", "Turtles"],
    correct: 2,
    funFact: "Birds are actually living dinosaurs! They evolved from small feathered theropods like Velociraptor.",
    emoji: "🐦",
  },
  {
    question: "How big was a Velociraptor really?",
    answers: ["As big as a horse", "As big as a turkey", "As big as a lion", "As big as a human"],
    correct: 1,
    funFact: "Real Velociraptors were only about the size of a turkey! Movies made them much bigger than they really were.",
    emoji: "🦃",
  },
  {
    question: "What does 'Stegosaurus' mean?",
    answers: ["Spiked Lizard", "Roof Lizard", "Armored Lizard", "Plated Dragon"],
    correct: 1,
    funFact: "The plates on Stegosaurus's back may have helped it control its body temperature — like a solar panel!",
    emoji: "🌡️",
  },
  {
    question: "Which dinosaur had the biggest brain compared to its body?",
    answers: ["T. rex", "Troodon", "Brachiosaurus", "Ankylosaurus"],
    correct: 1,
    funFact: "Troodon was one of the smartest dinosaurs! It had large eyes and a big brain for its size.",
    emoji: "🧠",
  },
  {
    question: "What caused the dinosaurs to go extinct?",
    answers: ["A giant volcano", "A huge asteroid", "An ice age", "A giant flood"],
    correct: 1,
    funFact: "A massive asteroid hit Earth about 66 million years ago, causing fires, darkness, and cold that wiped out most dinosaurs.",
    emoji: "☄️",
  },
];

// ── Fun dino facts for the hero ───────────────────────────────────────────────
const DINO_FACTS = [
  { emoji: "🦖", fact: "T. rex could eat 230 kg of meat in one bite!" },
  { emoji: "🦕", fact: "Some dinosaurs were as small as a chicken!" },
  { emoji: "🥚", fact: "The biggest dino egg was the size of a basketball!" },
  { emoji: "🦴", fact: "Dinosaur fossils have been found on every continent!" },
];

// ── Score helpers ─────────────────────────────────────────────────────────────
function getScoreEmoji(score: number, total: number): string {
  const pct = score / total;
  if (pct === 1) return "🏆";
  if (pct >= 0.8) return "🌟";
  if (pct >= 0.6) return "😄";
  if (pct >= 0.4) return "🦕";
  return "🥚";
}

function getScoreMessage(score: number, total: number): string {
  const pct = score / total;
  if (pct === 1) return "PERFECT! You're a Dino Expert!";
  if (pct >= 0.8) return "Amazing! You really know your dinos!";
  if (pct >= 0.6) return "Great job! You're a dino fan!";
  if (pct >= 0.4) return "Good try! Keep learning about dinos!";
  return "Keep exploring! Dinos are awesome!";
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function HomePage() {
  const t = useTranslations();

  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [showFact, setShowFact] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(QUESTIONS.length).fill(null));
  const [factIndex, setFactIndex] = useState(0);

  // Rotate hero fun facts
  useEffect(() => {
    const id = setInterval(() => setFactIndex((i) => (i + 1) % DINO_FACTS.length), 3500);
    return () => clearInterval(id);
  }, []);

  function handleAnswer(idx: number) {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(idx);
    setShowFact(true);
    const newAnswers = [...answers];
    newAnswers[currentQ] = idx;
    setAnswers(newAnswers);
    if (idx === QUESTIONS[currentQ].correct) {
      setScore((s) => s + 1);
    }
  }

  function handleNext() {
    if (currentQ + 1 >= QUESTIONS.length) {
      setQuizFinished(true);
    } else {
      setCurrentQ((q) => q + 1);
      setSelectedAnswer(null);
      setShowFact(false);
    }
  }

  function handleRestart() {
    setQuizStarted(false);
    setCurrentQ(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizFinished(false);
    setShowFact(false);
    setAnswers(Array(QUESTIONS.length).fill(null));
  }

  const q = QUESTIONS[currentQ];

  return (
    <main className="min-h-screen bg-[var(--background)] overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <Reveal>
        <section className="relative pt-12 pb-16 px-4 text-center overflow-hidden">
          {/* Background blobs */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-[var(--accent)]/30 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[var(--accent)]/25 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-0 w-48 h-48 bg-[var(--accent)]/20 rounded-full blur-2xl" />
          </div>

          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="text-8xl mb-4 select-none"
            aria-hidden="true"
          >
            🦕
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-5xl md:text-7xl font-black text-[var(--foreground)] leading-tight tracking-tight text-balance mb-4"
          >
            {t("hero.title")}
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.15 }}
            className="text-xl md:text-2xl text-[var(--foreground)] font-semibold mb-8 max-w-xl mx-auto leading-relaxed"
          >
            {t("hero.subtitle")}
          </motion.p>

          {/* Rotating fun fact */}
          <AnimatePresence mode="wait">
            <motion.div
              key={factIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 bg-white/80 border-2 border-[var(--accent)] rounded-2xl px-5 py-3 mb-8 shadow-md"
            >
              <span className="text-2xl">{DINO_FACTS[factIndex].emoji}</span>
              <span className="text-sm md:text-base font-semibold text-[var(--foreground)]">
                {DINO_FACTS[factIndex].fact}
              </span>
            </motion.div>
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setQuizStarted(true);
              document.getElementById("quiz")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 bg-[var(--accent)] text-white font-black text-xl px-10 py-5 rounded-full shadow-[0_6px_24px_rgba(0,0,0,0.15)] hover:bg-[var(--accent)] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--accent)]/50"
          >
            <Zap className="h-6 w-6" aria-hidden="true" />
            {t("hero.cta")}
          </motion.button>

          {/* Progress dots decoration */}
          <div className="flex justify-center gap-2 mt-8" aria-hidden="true">
            {QUESTIONS.map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full bg-[var(--accent)] opacity-40"
              />
            ))}
          </div>
        </section>
      </Reveal>

      {/* ── QUIZ SECTION ─────────────────────────────────────────────────── */}
      <section id="quiz" className="px-4 pb-20">
        <div className="max-w-2xl mx-auto">

          {!quizStarted && !quizFinished && (
            <Reveal>
              <div className="bg-white rounded-3xl shadow-[0_4px_32px_rgba(0,0,0,0.10)] border-2 border-[var(--accent)]/40 p-8 text-center">
                <div className="text-6xl mb-4">🎮</div>
                <h2 className="text-3xl font-black text-[var(--foreground)] mb-3">
                  {t("quiz.readyTitle")}
                </h2>
                <p className="text-[var(--foreground)] text-lg mb-6 leading-relaxed">
                  {t("quiz.readyDesc")}
                </p>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {(Array.isArray(t.raw("quiz.rules")) ? t.raw("quiz.rules") : []) as { icon: string; text: string }[]}
                  {(Array.isArray(t.raw("quiz.rules")) ? (t.raw("quiz.rules") as { icon: string; text: string }[]) : []).map((rule, i) => (
                    <div key={i} className="flex items-center gap-2 bg-[var(--accent)]/10 rounded-2xl p-3">
                      <span className="text-2xl">{rule.icon}</span>
                      <span className="text-sm font-semibold text-[var(--foreground)]">{rule.text}</span>
                    </div>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setQuizStarted(true)}
                  className="bg-[var(--accent)] text-white font-black text-xl px-10 py-4 rounded-full shadow-lg hover:bg-[var(--accent)] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--accent)]/50"
                >
                  {t("quiz.startBtn")}
                </motion.button>
              </div>
            </Reveal>
          )}

          {quizStarted && !quizFinished && (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQ}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                {/* Progress bar */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-[var(--foreground)]">
                      {t("quiz.questionLabel")} {currentQ + 1} / {QUESTIONS.length}
                    </span>
                    <span className="text-sm font-bold text-[var(--accent)]">
                      ⭐ {score} {t("quiz.pointsLabel")}
                    </span>
                  </div>
                  <div className="w-full bg-[var(--accent)]/20 rounded-full h-4 overflow-hidden">
                    <motion.div
                      className="h-4 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent)]"
                      initial={{ width: `${(currentQ / QUESTIONS.length) * 100}%` }}
                      animate={{ width: `${((currentQ + 1) / QUESTIONS.length) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                {/* Question card */}
                <div className="bg-white rounded-3xl shadow-[0_4px_32px_rgba(0,0,0,0.10)] border-2 border-[var(--accent)]/30 p-8 mb-4">
                  <div className="text-5xl text-center mb-4">{q.emoji}</div>
                  <h2 className="text-2xl md:text-3xl font-black text-[var(--foreground)] text-center mb-8 leading-tight text-balance">
                    {q.question}
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {q.answers.map((answer, idx) => {
                      const isSelected = selectedAnswer === idx;
                      const isCorrect = idx === q.correct;
                      const revealed = selectedAnswer !== null;

                      let btnClass =
                        "w-full text-left px-5 py-4 rounded-2xl font-bold text-base border-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 ";

                      if (!revealed) {
                        btnClass +=
                          "bg-[var(--background)] border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--accent)]/20 hover:border-[var(--accent)] hover:scale-[1.02]";
                      } else if (isCorrect) {
                        btnClass +=
                          "bg-[var(--background)] border-[var(--border)] text-[var(--foreground)] scale-[1.02]";
                      } else if (isSelected && !isCorrect) {
                        btnClass +=
                          "bg-[var(--background)] border-[var(--border)] text-[var(--foreground)]";
                      } else {
                        btnClass +=
                          "bg-[var(--background)] border-[var(--border)] text-[var(--foreground)] opacity-50";
                      }

                      return (
                        <motion.button
                          key={idx}
                          whileHover={!revealed ? { scale: 1.02 } : {}}
                          whileTap={!revealed ? { scale: 0.98 } : {}}
                          onClick={() => handleAnswer(idx)}
                          disabled={revealed}
                          className={btnClass}
                          aria-pressed={isSelected}
                        >
                          <span className="flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-white/60 flex items-center justify-center text-sm font-black shrink-0">
                              {String.fromCharCode(65 + idx)}
                            </span>
                            <span>{answer}</span>
                            {revealed && isCorrect && (
                              <CheckCircle className="h-5 w-5 ml-auto shrink-0 text-[var(--foreground)]" aria-hidden="true" />
                            )}
                            {revealed && isSelected && !isCorrect && (
                              <XCircle className="h-5 w-5 ml-auto shrink-0 text-[var(--foreground)]" aria-hidden="true" />
                            )}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Fun fact reveal */}
                <AnimatePresence>
                  {showFact && (
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="bg-[var(--background)] border-2 border-[var(--border)] rounded-2xl p-5 mb-4"
                    >
                      <p className="font-bold text-[var(--foreground)] text-sm mb-1">
                        {selectedAnswer === q.correct ? "🎉 Correct!" : "❌ Not quite!"}
                      </p>
                      <p className="text-[var(--foreground)] text-sm leading-relaxed">
                        <span className="font-black">🦕 Dino Fact: </span>
                        {q.funFact}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {selectedAnswer !== null && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleNext}
                    className="w-full bg-[var(--accent)] text-white font-black text-lg py-4 rounded-2xl shadow-lg hover:bg-[var(--accent)] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--accent)]/50"
                  >
                    {currentQ + 1 >= QUESTIONS.length ? t("quiz.seeResults") : t("quiz.nextBtn")}
                  </motion.button>
                )}
              </motion.div>
            </AnimatePresence>
          )}

          {/* ── SCORE SCREEN ─────────────────────────────────────────────── */}
          {quizFinished && (
            <AnimatePresence>
              <motion.div
                id="score"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 180, damping: 16 }}
              >
                <div className="bg-white rounded-3xl shadow-[0_4px_40px_rgba(0,0,0,0.12)] border-2 border-[var(--accent)]/40 p-8 text-center mb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 250, damping: 14, delay: 0.2 }}
                    className="text-8xl mb-4"
                    aria-hidden="true"
                  >
                    {getScoreEmoji(score, QUESTIONS.length)}
                  </motion.div>

                  <h2 className="text-4xl font-black text-[var(--foreground)] mb-2">
                    {t("score.title")}
                  </h2>
                  <p className="text-xl font-bold text-[var(--foreground)] mb-6">
                    {getScoreMessage(score, QUESTIONS.length)}
                  </p>

                  {/* Big score display */}
                  <div className="inline-flex items-center justify-center gap-3 bg-gradient-to-br from-[var(--accent)]/20 to-[var(--accent)]/20 rounded-3xl px-10 py-6 mb-8 border-2 border-[var(--accent)]/30">
                    <Trophy className="h-10 w-10 text-[var(--accent)]" aria-hidden="true" />
                    <div>
                      <div className="text-6xl font-black text-[var(--foreground)] leading-none">
                        {score}<span className="text-3xl text-[var(--foreground)]">/{QUESTIONS.length}</span>
                      </div>
                      <div className="text-sm font-bold text-[var(--foreground)] mt-1">
                        {t("score.correctLabel")}
                      </div>
                    </div>
                  </div>

                  {/* Per-question review */}
                  <div className="grid grid-cols-5 gap-2 mb-8">
                    {QUESTIONS.map((question, i) => {
                      const wasCorrect = answers[i] === question.correct;
                      return (
                        <div
                          key={i}
                          title={`Q${i + 1}: ${wasCorrect ? "Correct" : "Wrong"}`}
                          className={`rounded-xl py-2 text-center text-sm font-black border-2 ${
                            wasCorrect
                              ? "bg-[var(--background)] border-[var(--border)] text-[var(--foreground)]"
                              : "bg-[var(--background)] border-[var(--border)] text-[var(--foreground)]"
                          }`}
                        >
                          {wasCorrect ? "✓" : "✗"}
                          <div className="text-xs font-semibold opacity-70">Q{i + 1}</div>
                        </div>
                      );
                    })}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleRestart}
                    className="inline-flex items-center gap-2 bg-[var(--accent)] text-white font-black text-xl px-10 py-4 rounded-full shadow-lg hover:bg-[var(--accent)] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--accent)]/50"
                  >
                    <RotateCcw className="h-5 w-5" aria-hidden="true" />
                    {t("score.playAgain")}
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* ── FUN FACTS SECTION ────────────────────────────────────────────── */}
      <Reveal>
        <section className="bg-[var(--background)] py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-4xl" aria-hidden="true">🦴</span>
              <h2 className="text-4xl font-black text-[var(--foreground)] mt-2 mb-3">
                {t("facts.title")}
              </h2>
              <p className="text-[var(--foreground)] text-lg font-semibold">
                {t("facts.subtitle")}
              </p>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {(Array.isArray(t.raw("facts.items")) ? (t.raw("facts.items") as { emoji: string; title: string; body: string }[]) : []).map((item, i) => (
                <motion.div
                  key={i}
                  variants={scaleIn}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="bg-white rounded-2xl p-6 shadow-[0_2px_16px_rgba(0,0,0,0.07)] border-2 border-[var(--accent)]/20 transition-shadow hover:shadow-[0_6px_24px_rgba(0,0,0,0.12)]"
                >
                  <div className="text-4xl mb-3">{item.emoji}</div>
                  <h3 className="text-lg font-black text-[var(--foreground)] mb-2">{item.title}</h3>
                  <p className="text-[var(--foreground)] text-sm leading-relaxed">{item.body}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* ── DINO TYPES SECTION ───────────────────────────────────────────── */}
      <Reveal>
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-4xl" aria-hidden="true">🌿</span>
              <h2 className="text-4xl font-black text-[var(--foreground)] mt-2 mb-3">
                {t("types.title")}
              </h2>
              <p className="text-[var(--foreground)] text-lg font-semibold">
                {t("types.subtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(Array.isArray(t.raw("types.items")) ? (t.raw("types.items") as { emoji: string; name: string; desc: string; color: string }[]) : []).map((dino, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="rounded-3xl p-7 text-center shadow-[0_2px_20px_rgba(0,0,0,0.08)] border-2 border-white/60"
                    style={{ background: dino.color }}
                  >
                    <div className="text-6xl mb-4">{dino.emoji}</div>
                    <h3 className="text-xl font-black text-[var(--foreground)] mb-2">{dino.name}</h3>
                    <p className="text-[var(--foreground)] text-sm leading-relaxed font-semibold">{dino.desc}</p>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── CHALLENGE CTA ────────────────────────────────────────────────── */}
      <Reveal>
        <section className="py-16 px-4 pb-24">
          <div className="max-w-2xl mx-auto">
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="bg-gradient-to-br from-[var(--accent)]/90 to-[var(--accent)]/80 rounded-3xl p-10 text-center shadow-[0_8px_40px_rgba(0,0,0,0.15)] border-2 border-white/30"
            >
              <div className="text-6xl mb-4" aria-hidden="true">🏆</div>
              <h2 className="text-4xl font-black text-white mb-3 text-balance">
                {t("cta.title")}
              </h2>
              <p className="text-white/90 text-lg font-semibold mb-8 leading-relaxed">
                {t("cta.subtitle")}
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    handleRestart();
                    document.getElementById("quiz")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2 bg-white text-[var(--accent)] font-black text-lg px-8 py-4 rounded-full shadow-lg hover:bg-[var(--accent)]/20 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50"
                >
                  <Star className="h-5 w-5" aria-hidden="true" />
                  {t("cta.btn")}
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      </Reveal>

    </main>
  );
}