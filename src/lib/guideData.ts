export interface GuideSection {
  heading: string;
  content: string;
}

export interface Guide {
  slug: string;
  title: string;
  summary: string;
  category: string;
  sections: GuideSection[];
  conclusion: string;
}

export const GUIDE_CONTENT: Guide[] = [
  {
    slug: "macbook-vs-windows",
    title: "MacBook vs Windows for Engineering Students",
    summary: "An honest comparison — not fanboy advice, just what works for each branch in Indian colleges.",
    category: "Platform",
    sections: [
      { heading: "When MacBook wins", content: "CS, AI, and Data Science students benefit from excellent battery life, silent operation, and Unix-like tooling. Most web development, Python, and mobile dev workflows feel smoother on macOS." },
      { heading: "When Windows is mandatory", content: "Mechanical, Civil, and many Electrical workflows need SolidWorks, ANSYS, STAAD Pro, or ETABS — often Windows-only or poorly supported on Mac even with Boot Camp gone on Apple Silicon." },
      { heading: "The dual-life hack", content: "Some IIIT and IIT seniors run Linux on a Windows laptop or use WSL. Mac users rely on cloud VMs or lab desktops for Windows-only assignments." },
    ],
    conclusion: "Pick based on your branch's software list, not Instagram aesthetics. A ₹60,000 Windows laptop that runs your CAD beats a ₹1,00,000 Mac that doesn't.",
  },
  {
    slug: "ai-machine-learning",
    title: "AI & Machine Learning Laptops",
    summary: "When you need a GPU, when Colab is enough, and how much RAM ML actually consumes.",
    category: "Branch",
    sections: [
      { heading: "Do you need a GPU?", content: "For coursework and learning: often no. Google Colab free tier handles most assignments. For serious project work and internships: an RTX 4050/4060 laptop saves hours of waiting." },
      { heading: "RAM matters more early on", content: "Loading datasets, preprocessing, and running Jupyter with multiple libraries needs 16GB minimum. 32GB is ideal if you work with large CSVs or image datasets locally." },
      { heading: "Apple Silicon for ML", content: "M2/M3 MacBooks handle scikit-learn and small PyTorch models well. CUDA-specific research code still prefers NVIDIA on Windows/Linux." },
    ],
    conclusion: "Start with 16GB RAM. Add GPU only if you're doing regular deep learning beyond what Colab provides free.",
  },
  {
    slug: "gaming-in-college",
    title: "Gaming in College — Without Regrets",
    summary: "How to game without carrying a 2.5kg brick to every lab.",
    category: "Lifestyle",
    sections: [
      { heading: "The real trade-off", content: "Gaming laptops offer performance but sacrifice battery, weight, and fan noise. In a hostel with one plug point per room, battery life matters." },
      { heading: "Casual vs serious gaming", content: "Valorant and CS2 run on integrated graphics at low settings. AAA titles need dedicated GPU — be honest about how often you'll play." },
      { heading: "The smarter split", content: "Some seniors keep a budget coding laptop and game on a desktop at home or use a console. Cheaper over 4 years than one overpowered laptop." },
    ],
    conclusion: "If you game less than 5 hours a week, skip the gaming laptop. Use saved money for a better primary machine.",
  },
  {
    slug: "laptop-for-coding",
    title: "Best Laptop for Coding",
    summary: "What actually matters for VS Code, Git, Docker, and side projects.",
    category: "Branch",
    sections: [
      { heading: "Keyboard and screen", content: "You'll type 8+ hours on some days. Keyboard feel beats processor speed for daily happiness. 14–15 inch screens reduce eye strain for split-pane coding." },
      { heading: "RAM and SSD", content: "16GB RAM for Docker + Chrome + IDE. 512GB SSD minimum — node_modules alone can eat 10GB across projects." },
      { heading: "Processor", content: "Any modern i5/Ryzen 5 from the last 2 generations is enough for coding. Don't pay extra for i9 unless you're compiling massive C++ projects daily." },
    ],
    conclusion: "₹55,000–₹75,000 gets an excellent coding laptop. Spend on RAM and SSD before processor branding.",
  },
  {
    slug: "student-discounts",
    title: "Student Discounts in India",
    summary: "Where to find real savings — Apple EDU, Microsoft, and campus stores.",
    category: "Savings",
    sections: [
      { heading: "Apple Education Pricing", content: "Verify via UNiDAYS or Apple Education store. Savings of ₹8,000–₹15,000 on MacBooks during back-to-college season." },
      { heading: "Amazon & Flipkart sales", content: "Big Billion Days and Great Indian Festival often beat 'regular' prices by 10–15%. Compare with student pricing — sometimes sales win." },
      { heading: "Campus stores", content: "Some IITs and BITS have tie-ups with Dell/Lenovo/HP. Ask seniors before buying from random 'campus dealer' WhatsApp groups." },
    ],
    conclusion: "Never buy at full MRP in August-September. Wait for a sale or use student pricing — patience saves ₹10,000+.",
  },
  {
    slug: "gst-benefits",
    title: "GST Benefits for Student Buyers",
    summary: "What GST applies to laptops and what students mistakenly believe they can claim.",
    category: "Savings",
    sections: [
      { heading: "GST on laptops", content: "Laptops attract 18% GST in India, usually included in the listed price on Amazon/Flipkart. You're not paying extra on top unless buying from some B2B dealers." },
      { heading: "Input tax credit myths", content: "Individual students cannot claim GST input credit. Only registered businesses can. Ignore anyone promising 'GST invoice discount' unless you're buying for a registered firm." },
      { heading: "Institutional purchases", content: "Some lab equipment bought through college accounts may have different tax treatment — personal laptops don't qualify." },
    ],
    conclusion: "Focus on sale price and student discounts, not GST loopholes that don't apply to personal purchases.",
  },
  {
    slug: "credit-card-offers",
    title: "Credit Card Offers & No-Cost EMI",
    summary: "When EMI actually helps and when it costs more than the laptop.",
    category: "Savings",
    sections: [
      { heading: "No-cost EMI reality", content: "Banks often add processing fees or higher base prices. Calculate total outflow — 'no cost' sometimes means cost is hidden in the product price." },
      { heading: "Instant discounts", content: "HDFC/SBI/ICICI card offers during sales can give 10% instant discount up to ₹1,500–₹2,000. Worth it if you were paying full anyway." },
      { heading: "Student credit cards", content: "Some banks offer student cards with low limits. Don't EMI a laptop on your first credit card unless you've budgeted monthly payments." },
    ],
    conclusion: "Pay upfront if possible. Use card offers for instant discounts, not long EMI chains unless cash flow genuinely requires it.",
  },
  {
    slug: "service-centers",
    title: "Service Center Quality Matters",
    summary: "Why the cheapest laptop from an unknown brand can cost more over 4 years.",
    category: "Buying Tips",
    sections: [
      { heading: "Check before you buy", content: "Search '[Brand] service center [your city]' on Google Maps. Read recent reviews. A dead laptop during end-sem exams is brutal." },
      { heading: "Brand tier list for India", content: "Dell, HP, Lenovo, and Apple generally have the widest service networks. Acer and ASUS are decent in metros. Unknown brands = courier-to-Mumbai repairs." },
      { heading: "Warranty types", content: "On-site warranty saves hostel trips. Accidental damage protection is expensive but some parents prefer peace of mind." },
    ],
    conclusion: "Pay ₹5,000 more for a brand with local service over an unknown brand with better specs on paper.",
  },
  {
    slug: "iit-computer-labs",
    title: "IIT Computer Labs — What You Still Need",
    summary: "Labs have powerful desktops. Here's what your personal laptop still must handle.",
    category: "College",
    sections: [
      { heading: "What labs provide", content: "High-end desktops for CAD, simulation, and GPU workloads. You access these during lab hours for heavy assignments." },
      { heading: "What you still need", content: "Online classes, assignments, GitHub, LaTeX reports, video calls, and midnight coding before deadlines — all on your laptop." },
      { heading: "Don't overspend on GPU", content: "If your lab has RTX workstations, your laptop doesn't need the same GPU unless you game or do ML outside lab hours." },
    ],
    conclusion: "Buy for portability and daily tasks. Use labs for heavy compute — that's what they're for.",
  },
  {
    slug: "software-compatibility",
    title: "Software Compatibility Guide",
    summary: "MATLAB, SolidWorks, Vivado — which OS each tool prefers.",
    category: "Buying Tips",
    sections: [
      { heading: "Windows-only staples", content: "SolidWorks, ANSYS (full version), STAAD Pro, ETABS, many PLC tools — Windows first. Mac users need alternatives or lab access." },
      { heading: "Cross-platform tools", content: "MATLAB, Python, VS Code, AutoCAD (limited Mac), KiCad, Arduino IDE — work on both with varying experience." },
      { heading: "Linux preference", content: "Some CS and ECE seniors prefer Linux for development. Verify Wi-Fi and sleep work well on your model before committing." },
    ],
    conclusion: "List every software from your syllabus before choosing Mac vs Windows. One Windows-only course can ruin a Mac-only purchase.",
  },
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return GUIDE_CONTENT.find((g) => g.slug === slug);
}

export function getAllGuideSlugs(): string[] {
  return GUIDE_CONTENT.map((g) => g.slug);
}
