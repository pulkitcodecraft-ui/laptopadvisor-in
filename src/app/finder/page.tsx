"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowLeft, Check, Laptop, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { BRANCHES, BUDGET_RANGES, slugify } from "@/lib/constants";
import type { FinderAnswers } from "@/lib/finderEngine";

const STORAGE_KEY = "laptop-finder-answers";

const INITIAL_ANSWERS: FinderAnswers = {
  budget: "",
  branch: "",
  gaming: "",
  aiMl: "",
  platform: "",
  portability: "",
};

function readStoredAnswers(): FinderAnswers {
  if (typeof window === "undefined") return INITIAL_ANSWERS;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved) as FinderAnswers;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
  return INITIAL_ANSWERS;
}

const GAMING_OPTIONS = [
  { value: "none", label: "No gaming", description: "Only coding, studying, video calls" },
  { value: "casual", label: "Casual gaming", description: "Occasional light gaming" },
  { value: "regular", label: "Regular gaming", description: "I game daily — need a real GPU" },
];

const AIML_OPTIONS = [
  { value: "none", label: "Not at all", description: "No ML, basic programming only" },
  { value: "sometimes", label: "Sometimes", description: "Occasional Jupyter notebooks" },
  { value: "regularly", label: "Regularly", description: "Deep learning, GPU-intensive work" },
];

const PLATFORM_OPTIONS = [
  { value: "macos", label: "macOS (MacBook)", description: "I'm open to Mac" },
  { value: "windows", label: "Windows", description: "I want Windows for engineering software" },
  { value: "any", label: "No preference", description: "Show me the best option either way" },
];

const PORTABILITY_OPTIONS = [
  { value: "very", label: "Very important", description: "Carry it daily — labs, hostels, classes" },
  { value: "somewhat", label: "Somewhat", description: "Mostly desk use, occasional travel" },
  { value: "not", label: "Not important", description: "Power and performance over weight" },
];

const STEPS = [
  {
    key: "branch" as const,
    title: "Which branch are you in?",
    subtitle: "We match laptops to the software your branch actually runs — CAD, ML, circuits, and more.",
  },
  {
    key: "budget" as const,
    title: "What's your budget?",
    subtitle: "Honest range helps us rank from our 19 curated picks — not random expensive models.",
  },
  {
    key: "platform" as const,
    title: "macOS or Windows?",
    subtitle: "Some branches strongly favor one platform for licensed tools.",
  },
  {
    key: "gaming" as const,
    title: "Will you game on this laptop?",
    subtitle: "Gaming changes GPU, thermals, and battery expectations.",
  },
  {
    key: "aiMl" as const,
    title: "Will you work on AI or Machine Learning?",
    subtitle: "Regular ML work benefits from more RAM and a dedicated GPU.",
  },
  {
    key: "portability" as const,
    title: "How important is lightweight design?",
    subtitle: "Engineering students carry laptops every day — weight matters.",
  },
];

const LOADING_MESSAGES = [
  "Scanning 19 laptops in our database…",
  "Matching branch software requirements…",
  "Checking GPU, RAM, and battery fit…",
  "Ranking your top personalised picks…",
];

export default function FinderPage() {
  const router = useRouter();
  const reducedMotion = useReducedMotion() ?? false;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<FinderAnswers>(INITIAL_ANSWERS);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional client-only hydration
    setAnswers(readStoredAnswers());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
  }, [answers, hydrated]);

  useEffect(() => {
    if (!isLoading) return;
    const interval = setInterval(() => {
      setLoadingMsg((m) => (m + 1) % LOADING_MESSAGES.length);
    }, 600);
    return () => clearInterval(interval);
  }, [isLoading]);

  const currentStep = STEPS[step];
  const progress = ((step + 1) / STEPS.length) * 100;

  function handleSelect(key: keyof FinderAnswers, value: string) {
    const updated = { ...answers, [key]: value };
    setAnswers(updated);

    if (step < STEPS.length - 1) {
      setTimeout(() => setStep((s) => s + 1), 200);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const params = new URLSearchParams(updated);
      router.push(`/finder/result/?${params.toString()}`);
    }, 900);
  }

  function goBack() {
    if (step > 0) setStep((s) => s - 1);
  }

  function resetQuiz() {
    localStorage.removeItem(STORAGE_KEY);
    setAnswers(INITIAL_ANSWERS);
    setStep(0);
  }

  if (!hydrated) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-border border-t-primary" />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-border border-t-primary" />
          <Sparkles className="absolute inset-0 m-auto h-6 w-6 text-primary" />
        </div>
        <p className="mt-8 text-xl font-semibold text-text">
          Finding your perfect laptop…
        </p>
        <AnimatePresence mode="wait">
          <motion.p
            key={loadingMsg}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="mt-2 text-sm text-muted"
          >
            {LOADING_MESSAGES[loadingMsg]}
          </motion.p>
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-16">
      <div className="mb-10 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
          <Laptop className="h-6 w-6 text-primary" />
        </div>
        <p className="type-label text-primary">Find My Laptop</p>
        <h1 className="type-section-title mt-2 text-text">
          6 taps · your top 3
        </h1>
        <p className="type-body-sm mx-auto mt-3 max-w-md text-muted sm:text-base">
          Honest answers only. We match budget + branch, flag Mac/gaming traps,
          then show your best 3 — nothing else.
        </p>
      </div>

      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between text-sm text-muted">
          <span className="font-medium">
            Step {step + 1} of {STEPS.length}
          </span>
          {step > 0 && (
            <button
              type="button"
              onClick={goBack}
              className="inline-flex min-h-[44px] min-w-[44px] items-center gap-1.5 rounded-xl px-3 py-2 text-primary transition-colors active:scale-95 hover:bg-primary/5"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
          )}
        </div>

        <div className="mb-4 flex justify-center gap-2">
          {STEPS.map((s, i) => (
            <div
              key={s.key}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === step
                  ? "w-8 bg-primary"
                  : i < step
                    ? "w-2 bg-primary/60"
                    : "w-2 bg-border"
              }`}
              aria-hidden
            />
          ))}
        </div>

        <div className="h-1.5 overflow-hidden rounded-full bg-border">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={reducedMotion ? false : { opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reducedMotion ? undefined : { opacity: 0, x: -20 }}
          transition={{ duration: reducedMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="type-card-title text-lg text-text sm:text-xl">
            {currentStep.title}
          </h2>
          <p className="type-body-sm mt-3 text-muted sm:text-base">
            {currentStep.subtitle}
          </p>

          <div className="mt-8 space-y-3">
            {currentStep.key === "budget" &&
              BUDGET_RANGES.map((option) => (
                <OptionCard
                  key={option.value}
                  selected={answers.budget === option.value}
                  label={option.label}
                  description={option.description}
                  onClick={() => handleSelect("budget", option.value)}
                />
              ))}

            {currentStep.key === "branch" && (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {BRANCHES.map((branch) => (
                  <OptionCard
                    key={branch}
                    selected={answers.branch === slugify(branch)}
                    label={branch}
                    onClick={() => handleSelect("branch", slugify(branch))}
                    compact
                  />
                ))}
              </div>
            )}

            {currentStep.key === "gaming" &&
              GAMING_OPTIONS.map((option) => (
                <OptionCard
                  key={option.value}
                  selected={answers.gaming === option.value}
                  label={option.label}
                  description={option.description}
                  onClick={() => handleSelect("gaming", option.value)}
                />
              ))}

            {currentStep.key === "aiMl" &&
              AIML_OPTIONS.map((option) => (
                <OptionCard
                  key={option.value}
                  selected={answers.aiMl === option.value}
                  label={option.label}
                  description={option.description}
                  onClick={() => handleSelect("aiMl", option.value)}
                />
              ))}

            {currentStep.key === "platform" &&
              PLATFORM_OPTIONS.map((option) => (
                <OptionCard
                  key={option.value}
                  selected={answers.platform === option.value}
                  label={option.label}
                  description={option.description}
                  onClick={() => handleSelect("platform", option.value)}
                />
              ))}

            {currentStep.key === "portability" &&
              PORTABILITY_OPTIONS.map((option) => (
                <OptionCard
                  key={option.value}
                  selected={answers.portability === option.value}
                  label={option.label}
                  description={option.description}
                  onClick={() => handleSelect("portability", option.value)}
                />
              ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-10 text-center">
        <Button href="/" variant="ghost" size="sm" onClick={resetQuiz}>
          Start over
        </Button>
      </div>
    </div>
  );
}

function OptionCard({
  label,
  description,
  selected,
  onClick,
  compact = false,
}: {
  label: string;
  description?: string;
  selected: boolean;
  onClick: () => void;
  compact?: boolean;
}) {
  return (
    <Card
      hover
      onClick={onClick}
      className={`group w-full transition-all duration-200 active:scale-[0.99] ${
        compact ? "min-h-[52px]" : "min-h-[76px]"
      } ${selected ? "border-primary ring-2 ring-primary/20" : ""}`}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-semibold text-text">{label}</p>
          {description && (
            <p className="mt-1 text-sm text-muted">{description}</p>
          )}
        </div>
        {selected && (
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary">
            <Check className="h-3.5 w-3.5 text-white" />
          </div>
        )}
      </div>
    </Card>
  );
}
