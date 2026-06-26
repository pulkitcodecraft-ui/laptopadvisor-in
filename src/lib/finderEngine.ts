import { BUDGET_RANGES, BRANCHES, slugify } from "@/lib/constants";
import { getBranchBySlug, type BranchGuide } from "@/lib/branchData";
import { LAPTOP_CATALOG, type CatalogLaptop } from "@/lib/laptopCatalog";

export type FinderAnswers = {
  budget: string;
  branch: string;
  gaming: string;
  aiMl: string;
  platform: string;
  portability: string;
};

export type LaptopMatch = {
  laptop: CatalogLaptop;
  score: number;
  reasons: string[];
  inBudget: boolean;
};

export type FinderAlert = {
  type: "warning" | "info";
  title: string;
  message: string;
};

const WINDOWS_ONLY_SOFTWARE: Record<string, string> = {
  mechanical: "SolidWorks, AutoCAD 3D, and ANSYS",
  civil: "AutoCAD, STAAD Pro, and ETABS",
  chemical: "Aspen Plus, HYSYS, and MATLAB Simulink",
  aerospace: "CATIA, ANSYS Fluent, and SolidWorks",
  architecture: "Revit, Lumion, and AutoCAD",
  electrical: "MATLAB Simulink, PSCAD, and lab instrumentation tools",
};

const BUDGET_ORDER = [
  "under-50000",
  "50000-70000",
  "70000-100000",
  "100000-plus",
] as const;

const GAMING_LABELS: Record<string, string> = {
  none: "No gaming",
  casual: "Casual gaming",
  regular: "Regular gaming",
};

const AIML_LABELS: Record<string, string> = {
  none: "No AI/ML work",
  sometimes: "Sometimes (notebooks)",
  regularly: "Regular deep learning",
};

const PLATFORM_LABELS: Record<string, string> = {
  macos: "macOS preferred",
  windows: "Windows preferred",
  any: "No platform preference",
};

const PORTABILITY_LABELS: Record<string, string> = {
  very: "Very portable",
  somewhat: "Balanced portability",
  not: "Power over portability",
};

function parseWeightKg(weight: string): number | null {
  if (!weight || weight === "—") return null;
  const match = weight.match(/([\d.]+)\s*kg/i);
  return match ? parseFloat(match[1]) : null;
}

function hasDedicatedGpu(laptop: CatalogLaptop): boolean {
  const gpu = laptop.specs.gpu.toLowerCase().trim();
  if (!gpu || gpu === "—" || gpu === "integrated" || gpu === "graphics") {
    return false;
  }
  if (/rtx|gtx|geforce|2050|3050|4050|4060|4070|4080|4090|5050|5060/i.test(gpu)) {
    return true;
  }
  if (/radeon\s*rx|rx\s*\d{3,4}/i.test(gpu)) {
    return true;
  }
  return laptop.tags.some((t) => t.toLowerCase().includes("gaming"));
}

function hasGamingTag(laptop: CatalogLaptop): boolean {
  return laptop.tags.some((t) => t.toLowerCase().includes("gaming"));
}

function isUltraBattery(laptop: CatalogLaptop): boolean {
  const battery = laptop.specs.battery.toLowerCase();
  return battery.includes("ultra") || /1[4-9]\s*-\s*1[68]|18\+/.test(battery);
}

function isApple(laptop: CatalogLaptop): boolean {
  return laptop.brand.toLowerCase() === "apple";
}

function budgetIndex(value: string): number {
  return BUDGET_ORDER.indexOf(value as (typeof BUDGET_ORDER)[number]);
}

function scoreBudget(laptop: CatalogLaptop, budget: string): { pts: number; reason?: string } {
  if (!budget) return { pts: 0 };
  const dist = Math.abs(budgetIndex(laptop.budgetRange) - budgetIndex(budget));
  if (dist === 0) {
    return {
      pts: 30,
      reason: `Fits your ${BUDGET_RANGES.find((b) => b.value === budget)?.label ?? "budget"} range`,
    };
  }
  if (dist === 1) return { pts: 16, reason: "Close to your budget tier" };
  if (dist === 2) return { pts: 6 };
  return { pts: 0 };
}

function scoreBranch(laptop: CatalogLaptop, branch: string): { pts: number; reason?: string } {
  if (!branch) return { pts: 0 };
  if (laptop.branches.includes(branch)) {
    const branchName = BRANCHES.find((b) => slugify(b) === branch) ?? branch;
    return { pts: 25, reason: `Works well for ${branchName} software & workload` };
  }
  return { pts: 0 };
}

function scoreGaming(laptop: CatalogLaptop, gaming: string): { pts: number; reason?: string } {
  const gpu = hasDedicatedGpu(laptop);
  const weight = parseWeightKg(laptop.specs.weight);

  if (gaming === "regular") {
    if (gpu && hasGamingTag(laptop)) {
      return { pts: 35, reason: "Gaming laptop with dedicated GPU for daily play" };
    }
    if (gpu) {
      return { pts: 30, reason: "Dedicated GPU for gaming & heavy workloads" };
    }
    if (isApple(laptop)) {
      return { pts: -35 };
    }
    if (isUltraBattery(laptop)) {
      return { pts: -28 };
    }
    return { pts: -25 };
  }

  if (gaming === "casual") {
    if (gpu) return { pts: 14, reason: "Handles casual gaming" };
    if (isApple(laptop)) return { pts: 4, reason: "Light games only on Apple Silicon" };
    if (!gpu && weight !== null && weight <= 2.0) return { pts: 8 };
    return { pts: 5 };
  }

  if (gaming === "none") {
    if (!gpu && weight !== null && weight <= 2.0) {
      return { pts: 12, reason: "Lightweight coding laptop — no gaming bulk" };
    }
    if (!gpu) return { pts: 8 };
    return { pts: 3 };
  }
  return { pts: 0 };
}

function scoreAiMl(laptop: CatalogLaptop, aiMl: string, gaming: string): { pts: number; reason?: string } {
  const gpu = hasDedicatedGpu(laptop);
  const ram = laptop.specs.ram.toLowerCase();

  if (aiMl === "regularly") {
    if (gpu) return { pts: 15, reason: "GPU suitable for ML training locally" };
    if (isApple(laptop)) return { pts: 10, reason: "Apple Silicon handles light ML well" };
    return { pts: 4 };
  }
  if (aiMl === "sometimes") {
    if (ram.includes("16")) return { pts: 10, reason: "16GB RAM for Jupyter & datasets" };
    return { pts: 5 };
  }
  if (aiMl === "none") {
    if (gaming === "regular" && gpu) return { pts: 4 };
    if (!gpu) return { pts: 8 };
    return { pts: 2 };
  }
  return { pts: 0 };
}

function scorePlatform(
  laptop: CatalogLaptop,
  platform: string,
  gaming: string,
): { pts: number; reason?: string } {
  if (gaming === "regular") {
    if (isApple(laptop)) return { pts: -20 };
    if (!isApple(laptop)) return { pts: 8, reason: "Windows — best for gaming titles & drivers" };
  }

  if (platform === "macos") {
    if (isApple(laptop)) return { pts: 10, reason: "macOS — great for coding & battery" };
    return { pts: 0 };
  }
  if (platform === "windows") {
    if (!isApple(laptop)) return { pts: 10, reason: "Windows — best for engineering software" };
    return { pts: 0 };
  }
  return { pts: 5 };
}

function getWindowsSoftwareLabel(branch: BranchGuide): string {
  return (
    WINDOWS_ONLY_SOFTWARE[branch.slug] ??
    branch.softwareUsed.slice(0, 3).join(", ")
  );
}

function hasMacPlatformConflict(answers: FinderAnswers): boolean {
  const branch = getBranchBySlug(answers.branch);
  if (!branch || answers.platform !== "macos") return false;
  return branch.recommendedOS === "Windows" && !branch.macRecommended;
}

function hasMacGamingConflict(answers: FinderAnswers): boolean {
  return answers.gaming === "regular" && answers.platform === "macos";
}

function needsGamingGpu(answers: FinderAnswers): boolean {
  return answers.gaming === "regular";
}

/** When Mac won't work for branch/gaming, rank Windows laptops instead. */
export function getEffectivePlatform(answers: FinderAnswers): string {
  if (needsGamingGpu(answers)) {
    return "windows";
  }
  if (hasMacPlatformConflict(answers) || hasMacGamingConflict(answers)) {
    return "windows";
  }
  return answers.platform;
}

export function getFinderAlerts(answers: FinderAnswers): FinderAlert[] {
  const alerts: FinderAlert[] = [];
  const branch = getBranchBySlug(answers.branch);
  const budgetLabel =
    BUDGET_RANGES.find((b) => b.value === answers.budget)?.label ?? "your budget";

  if (branch && hasMacPlatformConflict(answers)) {
    const software = getWindowsSoftwareLabel(branch);
    alerts.push({
      type: "warning",
      title: "macOS Compatibility Alert",
      message: `Core ${branch.name.toLowerCase()} engineering software like ${software} do not run natively on macOS. You will need to rely on campus computer labs or virtualize Windows. Below are our top 3 Windows picks in ${budgetLabel} that actually run your coursework.`,
    });
  }

  if (hasMacGamingConflict(answers)) {
    alerts.push({
      type: "warning",
      title: "Serious gaming + Mac — not a good match",
      message:
        "MacBooks lack dedicated gaming GPUs and many AAA titles run poorly or not at all on macOS. For regular gaming at college, a Windows laptop with RTX 3050/4050 is the practical choice. We've ranked Windows gaming-capable picks in your budget below.",
    });
  } else if (answers.gaming === "regular") {
    alerts.push({
      type: "info",
      title: "Gaming needs a dedicated GPU",
      message:
        "Regular gaming means RTX 2050/3050/4050 class laptops — not MacBooks or ultra-battery ultrabooks. Expect 4–6 hr battery on gaming models; that's normal for the trade-off.",
    });
  } else if (
    answers.platform === "macos" &&
    answers.gaming === "casual" &&
    branch?.gamingCompatibility === "Good"
  ) {
    alerts.push({
      type: "info",
      title: "Casual gaming on Mac",
      message:
        "Light games run on Apple Silicon, but your branch also benefits from Windows-only tools. If gaming matters, consider a dual-purpose Windows laptop instead of a MacBook.",
    });
  }

  if (answers.budget === "under-50000" && answers.gaming === "regular") {
    alerts.push({
      type: "warning",
      title: "Budget vs gaming needs",
      message: `Dedicated gaming GPUs are rare under ₹50,000 in India. Our top 3 below are the best options near ${budgetLabel} — expect compromises on GPU tier or stretch to ₹50k–₹70k for RTX laptops.`,
    });
  }

  if (answers.budget === "under-50000" && answers.aiMl === "regularly") {
    alerts.push({
      type: "warning",
      title: "AI/ML on a tight budget",
      message:
        "Local deep learning needs 16GB RAM and ideally an NVIDIA GPU — hard to find under ₹50,000. Use Google Colab for coursework and pick the strongest CPU/RAM laptop in your range below.",
    });
  }

  if (
    answers.platform === "macos" &&
    answers.aiMl === "regularly" &&
    !hasMacPlatformConflict(answers)
  ) {
    alerts.push({
      type: "info",
      title: "ML on Apple Silicon",
      message:
        "MacBooks handle light ML via Apple Silicon (MPS), but CUDA and many research stacks still prefer NVIDIA on Windows/Linux. Fine for notebooks and courses — not ideal for heavy GPU training.",
    });
  }

  if (answers.budget === "100000-plus" && answers.portability === "very") {
    alerts.push({
      type: "info",
      title: "Premium + ultra-portable",
      message: `At ${budgetLabel}, MacBook Air/Pro and premium ultrabooks shine — great battery for carrying across campus every day.`,
    });
  }

  return alerts;
}

function scorePortability(
  laptop: CatalogLaptop,
  portability: string,
  gaming: string,
): { pts: number; reason?: string } {
  const weight = parseWeightKg(laptop.specs.weight);
  if (weight === null) {
    if (gaming === "regular" && hasDedicatedGpu(laptop)) return { pts: 4 };
    return { pts: 0 };
  }

  if (gaming === "regular") {
    if (hasDedicatedGpu(laptop)) {
      if (weight <= 2.3) {
        return { pts: 6, reason: "Gaming laptop in a carry-able weight class" };
      }
      if (portability === "not") {
        return { pts: 8, reason: "Heavier build with more power headroom" };
      }
      return { pts: 5 };
    }
    if (portability === "very" && weight <= 1.75 && !hasDedicatedGpu(laptop)) {
      return { pts: -8 };
    }
    return { pts: 0 };
  }

  if (portability === "very") {
    if (weight <= 1.45) return { pts: 8, reason: `Only ${weight} kg — easy for labs & hostels` };
    if (weight <= 1.75) return { pts: 5 };
    if (weight <= 2.0) return { pts: 2 };
    return { pts: 0 };
  }
  if (portability === "somewhat") {
    if (weight <= 2.1) return { pts: 5 };
    return { pts: 2 };
  }
  if (portability === "not" && weight >= 2.0 && hasDedicatedGpu(laptop)) {
    return { pts: 5, reason: "Heavier build with more power headroom" };
  }
  return { pts: 3 };
}

export function matchLaptops(answers: FinderAnswers, limit = 3): LaptopMatch[] {
  const effectivePlatform = getEffectivePlatform(answers);
  const scoringAnswers = { ...answers, platform: effectivePlatform };
  const results: LaptopMatch[] = [];

  for (const laptop of LAPTOP_CATALOG) {
    const reasons: string[] = [];
    let score = 0;
    const inBudget = laptop.budgetRange === answers.budget;

    const budget = scoreBudget(laptop, answers.budget);
    score += budget.pts;
    if (budget.reason) reasons.push(budget.reason);
    if (!inBudget) score -= 12;

    const branch = scoreBranch(laptop, answers.branch);
    score += branch.pts;
    if (branch.reason) reasons.push(branch.reason);

    const gaming = scoreGaming(laptop, answers.gaming);
    score += gaming.pts;
    if (gaming.reason) reasons.push(gaming.reason);

    const aiMl = scoreAiMl(laptop, answers.aiMl, answers.gaming);
    score += aiMl.pts;
    if (aiMl.reason) reasons.push(aiMl.reason);

    const platform = scorePlatform(laptop, scoringAnswers.platform, answers.gaming);
    score += platform.pts;
    if (platform.reason) reasons.push(platform.reason);

    const portability = scorePortability(laptop, answers.portability, answers.gaming);
    score += portability.pts;
    if (portability.reason) reasons.push(portability.reason);

    if (laptop.isRecommended && !needsGamingGpu(answers)) score += 4;
    else if (laptop.isRecommended && hasDedicatedGpu(laptop)) score += 4;
    if (laptop.description) score += 2;

    const maxScore = 130;
    const normalized = Math.max(0, Math.min(100, Math.round((score / maxScore) * 100)));

    results.push({
      laptop,
      score: normalized,
      reasons: reasons.slice(0, 4),
      inBudget,
    });
  }

  const byBudgetThenScore = (a: LaptopMatch, b: LaptopMatch) => {
    if (a.inBudget !== b.inBudget) return a.inBudget ? -1 : 1;
    const distA = Math.abs(
      budgetIndex(a.laptop.budgetRange) - budgetIndex(answers.budget)
    );
    const distB = Math.abs(
      budgetIndex(b.laptop.budgetRange) - budgetIndex(answers.budget)
    );
    if (distA !== distB) return distA - distB;
    return b.score - a.score;
  };

  const pickTop = (pool: LaptopMatch[]) => {
    const sorted = [...pool].sort(byBudgetThenScore);

    if (needsGamingGpu(answers)) {
      const gamingMatches = sorted.filter((r) => hasDedicatedGpu(r.laptop));
      if (gamingMatches.length >= limit) {
        return gamingMatches.slice(0, limit);
      }
      if (gamingMatches.length > 0) {
        const filler = sorted.filter((r) => !hasDedicatedGpu(r.laptop));
        return [...gamingMatches, ...filler].slice(0, limit);
      }
    }

    return sorted.slice(0, limit);
  };

  const inBudgetMatches = results.filter((r) => r.inBudget);
  if (inBudgetMatches.length >= limit) {
    return pickTop(inBudgetMatches);
  }

  return pickTop(results);
}

export function getBudgetLabel(budget: string): string | undefined {
  return BUDGET_RANGES.find((b) => b.value === budget)?.label;
}

export function getFinderAnswerLabels(answers: FinderAnswers) {
  const branch = getBranchBySlug(answers.branch);
  const budgetLabel = BUDGET_RANGES.find((b) => b.value === answers.budget)?.label;

  return [
    budgetLabel && { label: "Budget", value: budgetLabel },
    branch && { label: "Branch", value: branch.name },
    answers.gaming && { label: "Gaming", value: GAMING_LABELS[answers.gaming] ?? answers.gaming },
    answers.aiMl && { label: "AI/ML", value: AIML_LABELS[answers.aiMl] ?? answers.aiMl },
    answers.platform && {
      label: "Platform",
      value: PLATFORM_LABELS[answers.platform] ?? answers.platform,
    },
    answers.portability && {
      label: "Portability",
      value: PORTABILITY_LABELS[answers.portability] ?? answers.portability,
    },
  ].filter(Boolean) as { label: string; value: string }[];
}

export function getBranchSeniorTip(branchSlug: string): string | undefined {
  return getBranchBySlug(branchSlug)?.seniorTip;
}
