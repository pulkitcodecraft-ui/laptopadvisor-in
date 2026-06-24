"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { BRANCHES, BUDGET_RANGES, slugify } from "@/lib/constants";

const STORAGE_KEY = "laptop-finder-answers";

type Answers = {
  budget: string;
  branch: string;
  gaming: string;
  aiMl: string;
  platform: string;
  portability: string;
};

const INITIAL_ANSWERS: Answers = {
  budget: "",
  branch: "",
  gaming: "",
  aiMl: "",
  platform: "",
  portability: "",
};

function readStoredAnswers(): Answers {
  if (typeof window === "undefined") return INITIAL_ANSWERS;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved) as Answers;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
  return INITIAL_ANSWERS;
}

const GAMING_OPTIONS = [
  { value: "none", label: "No gaming", description: "Only coding, studying, video calls" },
  { value: "casual", label: "Casual gaming", description: "Occasional light gaming" },
  { value: "regular", label: "Regular gaming", description: "I game daily, serious about it" },
];

const AIML_OPTIONS = [
  { value: "none", label: "Not at all", description: "No ML, basic programming only" },
  { value: "sometimes", label: "Sometimes", description: "Occasional Jupyter notebooks" },
  { value: "regularly", label: "Regularly", description: "Deep learning, GPU-intensive work" },
];

const PLATFORM_OPTIONS = [
  { value: "macos", label: "macOS (MacBook)", description: "I'm open to Mac" },
  { value: "windows", label: "Windows", description: "I want Windows" },
  { value: "any", label: "No preference", description: "Show me the best option" },
];

const PORTABILITY_OPTIONS = [
  { value: "very", label: "Very important", description: "Carry it everywhere, hostels, labs" },
  { value: "somewhat", label: "Somewhat", description: "Mostly desk use, occasional travel" },
  { value: "not", label: "Not important", description: "Power over portability" },
];

const STEPS = [
  { key: "budget" as const, title: "What's your budget?", subtitle: "Be honest — we'll find the best option in your range, not the most expensive." },
  { key: "branch" as const, title: "Which branch are you in?", subtitle: "Different branches need different software and specs." },
  { key: "gaming" as const, title: "Will you game on this laptop?", subtitle: "Gaming needs change your GPU and battery requirements." },
  { key: "aiMl" as const, title: "Will you work on AI or Machine Learning?", subtitle: "ML workloads can need a dedicated GPU." },
  { key: "platform" as const, title: "macOS or Windows?", subtitle: "Some branches strongly favor one platform." },
  { key: "portability" as const, title: "How important is lightweight design?", subtitle: "Hostel life means you'll carry this laptop daily." },
];

export default function FinderPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(INITIAL_ANSWERS);
  const [isLoading, setIsLoading] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Hydrate quiz progress from localStorage after client mount
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional client-only hydration
    setAnswers(readStoredAnswers());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
  }, [answers, hydrated]);

  const currentStep = STEPS[step];
  const progress = ((step + 1) / STEPS.length) * 100;

  function handleSelect(key: keyof Answers, value: string) {
    const updated = { ...answers, [key]: value };
    setAnswers(updated);

    if (step < STEPS.length - 1) {
      setTimeout(() => setStep((s) => s + 1), 250);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const params = new URLSearchParams(updated);
      router.push(`/finder/result?${params.toString()}`);
    }, 2000);
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
        </div>
        <p className="mt-8 text-xl font-semibold text-text">
          Finding your perfect laptop...
        </p>
        <p className="mt-2 text-sm text-muted">
          Matching your branch, budget, and preferences
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-16">
      <div className="mb-10">
        <div className="mb-3 flex items-center justify-between text-sm text-muted">
          <span className="font-medium">
            Step {step + 1} of {STEPS.length}
          </span>
          {step > 0 && (
            <button
              type="button"
              onClick={goBack}
              className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-primary transition-colors hover:bg-primary/5"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
          )}
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-border">
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
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-2xl font-bold tracking-tight text-text sm:text-3xl">
            {currentStep.title}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-muted">
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
      className={`group w-full transition-all duration-200 ${
        compact ? "min-h-[56px]" : "min-h-[72px]"
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
