"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import {
  AlertTriangle,
  Apple,
  ArrowRight,
  Banknote,
  Building2,
  Cpu,
  CreditCard,
  Gamepad2,
  GraduationCap,
  HardDrive,
  Laptop,
  Monitor,
  Percent,
  Scale,
  Sparkles,
  Star,
  Wrench,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import SectionHeader from "@/components/ui/SectionHeader";
import TrustBadge from "@/components/ui/TrustBadge";
import CountUpBadge from "@/components/ui/CountUpBadge";
import { BRANCHES, COLLEGES, slugify } from "@/lib/constants";
import { scrollFadeVariants, sectionFadeVariants, motionEase } from "@/lib/motion";

const STATS = [
  { value: "12+", label: "Engineering Branches" },
  { value: "50+", label: "Laptops Reviewed" },
  { value: "10+", label: "Top Colleges" },
  { value: "100%", label: "Unbiased Picks" },
];

const CONFUSION_TOPICS: {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}[] = [
  { icon: Apple, title: "MacBook vs Windows", description: "Which platform actually works for your branch and college?", href: "/guides/macbook-vs-windows" },
  { icon: Cpu, title: "AI & Machine Learning", description: "Do you really need a GPU for Jupyter and deep learning?", href: "/guides/ai-machine-learning" },
  { icon: Gamepad2, title: "Gaming In College", description: "Can you game without ruining battery life and portability?", href: "/guides/gaming-in-college" },
  { icon: Laptop, title: "Laptop For Coding", description: "What specs matter for VS Code, Git, and side projects?", href: "/guides/laptop-for-coding" },
  { icon: Wrench, title: "Mechanical Engineering", description: "CAD, MATLAB, and simulation — what hardware do you need?", href: "/branch/mechanical" },
  { icon: Building2, title: "Civil Engineering", description: "AutoCAD, STAAD, and field work — laptop or desktop?", href: "/branch/civil" },
  { icon: Monitor, title: "Electronics", description: "Circuit simulators, embedded tools, and lab compatibility.", href: "/branch/electronics" },
  { icon: HardDrive, title: "Electrical", description: "Power systems software and long lab hours on battery.", href: "/branch/electrical" },
  { icon: Scale, title: "Architecture", description: "Revit, SketchUp, and why display quality matters.", href: "/branch/architecture" },
  { icon: GraduationCap, title: "Data Science", description: "Pandas, SQL, and when 16GB RAM becomes non-negotiable.", href: "/branch/data-science" },
  { icon: Percent, title: "Student Discounts", description: "Apple EDU, Microsoft, and campus store deals explained.", href: "/guides/student-discounts" },
  { icon: Banknote, title: "GST Benefits", description: "What students can claim and what sellers won't tell you.", href: "/guides/gst-benefits" },
  { icon: CreditCard, title: "Credit Card Offers", description: "No-cost EMI traps and when offers actually save money.", href: "/guides/credit-card-offers" },
  { icon: Wrench, title: "Service Center Quality", description: "Why brand service network matters more than specs.", href: "/guides/service-centers" },
  { icon: Monitor, title: "IIT Computer Labs", description: "What labs provide vs what you still need on your own.", href: "/guides/iit-computer-labs" },
  { icon: Cpu, title: "Software Compatibility", description: "MATLAB, SolidWorks, and OS-specific software gotchas.", href: "/guides/software-compatibility" },
];

const BRANCH_DESCRIPTIONS: Record<string, string> = {
  "Computer Science": "VS Code, compilers, Docker, and occasional ML notebooks.",
  AI: "PyTorch, CUDA workloads, and GPU-heavy model training.",
  "Data Science": "Jupyter, pandas, SQL clients, and visualization tools.",
  Mechanical: "SolidWorks, ANSYS, MATLAB, and CAD-heavy assignments.",
  Civil: "AutoCAD, STAAD Pro, ETABS, and site visit portability.",
  Electrical: "MATLAB, Simulink, PSCAD, and circuit simulation tools.",
  Electronics: "Multisim, KiCad, embedded IDEs, and lab instrument software.",
  Chemical: "Aspen, MATLAB, and process simulation with moderate compute.",
  "Engineering Physics": "Python, MATLAB, and research-oriented computing.",
  Aerospace: "CATIA, ANSYS, CFD tools, and demanding simulations.",
  Architecture: "Revit, SketchUp, Lumion, and large design files.",
  Biotechnology: "R, Python, bioinformatics tools, and data analysis.",
};

const MISTAKES = [
  { title: "Buying 8GB RAM in 2024", description: "Chrome tabs, IDE, and MATLAB will choke. 16GB is the real minimum now." },
  { title: "Choosing Gaming Laptop for Coding", description: "Heavy chassis, poor battery, loud fans — overkill if you don't game daily." },
  { title: "Ignoring Service Center Quality", description: "A cheap laptop with no nearby service center becomes expensive fast." },
  { title: "Buying Mac Without Checking Software", description: "Some engineering software still needs Windows — verify before you spend." },
  { title: "Skipping Student Discounts", description: "Apple EDU, Microsoft, and campus stores can save ₹10,000–₹20,000." },
  { title: "Ignoring Laptop Weight for Hostels", description: "You'll carry this to labs daily. 2kg+ gets old by mid-semester." },
  { title: "Buying Refurbished Without Checking Warranty", description: "No warranty means one dead keyboard away from a ₹15,000 repair bill." },
];

const COLLEGE_CITIES: Record<string, string> = {
  "IIT Bombay": "Mumbai", "IIT Delhi": "New Delhi", "IIT Madras": "Chennai",
  "IIT Kanpur": "Kanpur", "IIT Kharagpur": "Kharagpur", "IIT Roorkee": "Roorkee",
  "IIT Guwahati": "Guwahati", "BITS Pilani": "Pilani", "NIT Trichy": "Tiruchirappalli",
  "IIIT Hyderabad": "Hyderabad",
};

export default function HomePage() {
  const reducedMotion = useReducedMotion() ?? false;
  const heroMotion = sectionFadeVariants(reducedMotion);

  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="relative -mt-[72px] overflow-hidden pt-[72px]">
        {/* aurora background */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-hero-light dark:bg-transparent">
          <div className="bg-grid absolute inset-0 opacity-60 dark:opacity-30" />
          <div className="bg-hero-ambient">
            <div className="aurora-1 animate-aurora absolute -left-32 -top-24 h-[34rem] w-[34rem] rounded-full bg-primary/25 blur-[120px] dark:bg-primary/30" />
            <div className="aurora-2 animate-float-slow absolute -right-24 top-10 h-[30rem] w-[30rem] rounded-full bg-accent/25 blur-[120px] dark:bg-accent/25" />
            <div className="aurora-3 animate-pulse-glow absolute bottom-0 left-1/3 h-[26rem] w-[26rem] rounded-full bg-pink-400/15 blur-[120px] dark:bg-primary/15" />
          </div>
          <div className="hidden dark:block absolute inset-0 bg-mesh opacity-50" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
        </div>

        <div className="section-container relative grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
          <motion.div {...heroMotion}>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-card/70 px-3.5 py-1.5 text-xs font-semibold text-primary backdrop-blur dark:border-primary/25 dark:bg-card/80">
              <Sparkles className="h-3.5 w-3.5" />
              Trusted by engineering students across India
            </span>

            <h1 className="mt-6 text-[2.6rem] font-extrabold leading-[1.05] tracking-tight text-text sm:text-6xl lg:text-[4.2rem]">
              Find The Right
              <br className="hidden sm:block" />{" "}
              <span className="text-gradient-shimmer">Laptop</span> For Your{" "}
              <span className="relative whitespace-nowrap">
                Branch
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 300 12"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 9C70 3 230 2 298 7"
                    stroke="url(#u)"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="u" x1="0" y1="0" x2="300" y2="0" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#4f46e5" />
                      <stop offset="1" stopColor="#a855f7" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
              Know what students in your branch actually buy, what software
              you&apos;ll use, and what mistakes to avoid before spending{" "}
              <span className="font-semibold text-text">₹50,000–₹2,00,000</span>.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Button href="/finder" size="lg" className="group">
                Find My Laptop
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
              </Button>
              <Button href="/compare" variant="secondary" size="lg">
                Compare Laptops
              </Button>
            </div>

            <TrustBadge />
          </motion.div>

          {/* Hero visual */}
          <motion.div
            initial={
              reducedMotion
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity: 0, scale: 0.92, y: 30 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={
              reducedMotion
                ? { duration: 0 }
                : { duration: 0.7, ease: motionEase }
            }
            className="relative hidden lg:block"
          >
            <div className="animate-float relative mx-auto max-w-sm">
              {/* glow */}
              <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-primary/40 to-accent/40 opacity-60 blur-3xl" />

              {/* main glass card */}
              <div className="glass rounded-[1.75rem] p-6 shadow-2xl shadow-primary/20">
                <div className="flex items-center justify-between">
                  <Badge variant="gradient">★ Top Pick</Badge>
                  <span className="text-xs font-semibold text-muted">
                    CSE · ₹70K–1L
                  </span>
                </div>

                <div className="mt-5 flex h-36 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 via-card to-accent/10 dark:from-primary/15 dark:via-surface dark:to-accent/15">
                  <Laptop className="h-16 w-16 text-primary" strokeWidth={1.4} />
                </div>

                <h3 className="mt-5 text-lg font-bold text-text">
                  Best for Computer Science
                </h3>
                <div className="mt-2 flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="ml-1 text-sm text-muted">4.8</span>
                </div>

                <div className="mt-4 space-y-2.5">
                  {[
                    "16GB RAM · 512GB SSD",
                    "Long battery for labs",
                    "Runs VS Code, Docker, ML",
                  ].map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm text-text">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-success/15">
                        <Zap className="h-3 w-3 text-success" />
                      </span>
                      {f}
                    </div>
                  ))}
                </div>
              </div>

              <CountUpBadge
                label="Saved"
                value={18000}
                format="currency"
                className="animate-float-slow absolute -left-10 top-16"
              />
              <CountUpBadge
                label="Match score"
                value={96}
                format="percent"
                className="animate-float absolute -right-8 bottom-12"
              />
            </div>
          </motion.div>
        </div>

        {/* stats strip */}
        <div className="section-container relative pb-10">
          <motion.div
            {...sectionFadeVariants(reducedMotion)}
            className="grid grid-cols-2 gap-3 rounded-3xl border border-border bg-card/70 p-4 backdrop-blur sm:grid-cols-4 sm:p-6 dark:bg-card/80"
          >
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                {...scrollFadeVariants(i, reducedMotion)}
                className="text-center"
              >
                <p className="text-2xl font-extrabold text-gradient sm:text-3xl">
                  {s.value}
                </p>
                <p className="mt-1 text-xs font-medium text-muted sm:text-sm">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ---------- CONFUSION ---------- */}
      <section className="py-16 sm:py-24">
        <div className="section-container">
          <motion.div {...sectionFadeVariants(reducedMotion)}>
            <SectionHeader
              eyebrow="Common Questions"
              title="What Are You Confused About?"
              subtitle="Straight answers to the questions every engineering student asks before buying."
            />
          </motion.div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CONFUSION_TOPICS.map((topic, i) => (
              <motion.div key={topic.title} {...scrollFadeVariants(i, reducedMotion)}>
                <Link href={topic.href} className="group block h-full">
                  <Card hover className="h-full">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 transition-transform group-hover:scale-110">
                      <topic.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-bold text-text transition-colors group-hover:text-primary">
                      {topic.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {topic.description}
                    </p>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- BRANCHES ---------- */}
      <section className="relative overflow-hidden border-y border-border bg-surface py-16 sm:py-24">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" />
        <div className="section-container relative">
          <motion.div {...sectionFadeVariants(reducedMotion)}>
            <SectionHeader
              eyebrow="By Branch"
              title="Choose Your Branch"
              subtitle="Every branch has different software and hardware needs. Start where you study."
            />
          </motion.div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {BRANCHES.map((branch, i) => (
              <motion.div key={branch} {...scrollFadeVariants(i, reducedMotion)}>
                <Link href={`/branch/${slugify(branch)}`} className="group block h-full">
                  <Card hover className="h-full">
                    <h3 className="font-bold text-text transition-colors group-hover:text-primary">
                      {branch}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {BRANCH_DESCRIPTIONS[branch]}
                    </p>
                    <p className="mt-4 inline-flex items-center text-sm font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                      Read guide
                      <ArrowRight className="ml-1.5 h-4 w-4" />
                    </p>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- MISTAKES ---------- */}
      <section className="py-16 sm:py-24">
        <div className="section-container">
          <motion.div {...sectionFadeVariants(reducedMotion)}>
            <SectionHeader
              eyebrow="Avoid These"
              title="Students Regret These Mistakes Every Year"
              subtitle="Learn from thousands of buyers before you so you don't waste money."
            />
          </motion.div>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide lg:grid lg:grid-cols-3 lg:overflow-visible">
            {MISTAKES.map((mistake, i) => (
              <motion.div
                key={mistake.title}
                {...scrollFadeVariants(i, reducedMotion)}
                className="group relative min-w-[280px] shrink-0 overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-primary/10 lg:min-w-0"
              >
                <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-orange-400 to-red-400" />
                <div className="mb-3 flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 dark:bg-orange-500/15">
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                  </span>
                  <Badge variant="gray">Common mistake</Badge>
                </div>
                <h3 className="font-bold text-text">{mistake.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {mistake.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- COLLEGES ---------- */}
      <section className="relative overflow-hidden border-y border-border bg-surface py-16 sm:py-24">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" />
        <div className="section-container relative">
          <motion.div {...sectionFadeVariants(reducedMotion)}>
            <SectionHeader
              eyebrow="By College"
              title="Find Your College's Laptop Guide"
              subtitle="Campus-specific advice from labs, software requirements, and senior recommendations."
            />
          </motion.div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {COLLEGES.map((college, i) => (
              <motion.div key={college} {...scrollFadeVariants(i, reducedMotion)}>
                <Link href={`/college/${slugify(college)}`} className="group block h-full">
                  <Card hover className="flex h-full items-center justify-between">
                    <div>
                      <h3 className="font-bold text-text">{college}</h3>
                      <p className="mt-1 text-sm text-muted">
                        {COLLEGE_CITIES[college]}
                      </p>
                    </div>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-all group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-accent group-hover:text-white">
                      <ArrowRight className="h-5 w-5" />
                    </span>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="bg-mesh absolute inset-0" />
        <div className="bg-grid-dark absolute inset-0 opacity-40" />
        <div className="section-container relative text-center">
          <motion.div {...heroMotion}>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              2-minute personalised quiz
            </span>
            <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-extrabold text-white sm:text-5xl sm:leading-[1.1]">
              Still not sure? Let us pick for you.
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-base text-white/70 sm:text-lg">
              Answer 6 simple questions and get personalized recommendations for
              your branch, budget, and college.
            </p>
            <div className="mt-9 flex justify-center">
              <Link
                href="/finder"
                className="btn-shine group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-ink shadow-2xl transition-transform hover:scale-[1.03]"
              >
                Start Finder Quiz
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
