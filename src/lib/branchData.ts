export interface BranchLaptop {
  name: string;
  reason: string;
  priceRange: string;
  affiliateUrl: string;
}

export interface BranchGuide {
  name: string;
  slug: string;
  description: string;
  recommendedOS: "macOS" | "Windows" | "Both";
  macRecommended: boolean;
  macNote: string;
  softwareUsed: string[];
  typicalUsage: string;
  gamingCompatibility: "Good" | "Limited" | "Not Needed";
  batteryImportance: "Critical" | "Important" | "Moderate";
  commonMistakes: string[];
  seniorTip: string;
  recommendedLaptops: BranchLaptop[];
}

export const BRANCH_DATA: BranchGuide[] = [
  {
    name: "Computer Science",
    slug: "computer-science",
    description:
      "CS students live in terminals, browsers, and IDEs. You'll compile code, run Docker containers, and maybe dabble in ML — but most of your day is VS Code and Chrome tabs, not GPU-heavy rendering.",
    recommendedOS: "Both",
    macRecommended: true,
    macNote:
      "MacBooks are popular in CS for Unix-like tooling and battery life. Check if your college uses Windows-only software for specific courses.",
    softwareUsed: [
      "VS Code",
      "Git",
      "Docker",
      "Node.js",
      "Python",
      "IntelliJ",
      "Chrome",
      "WSL (Windows)",
    ],
    typicalUsage:
      "You'll spend most of your time writing and debugging code, pushing to GitHub, attending online lectures, and running local dev servers. Occasional ML assignments need 16GB RAM but rarely a dedicated GPU unless you're doing deep learning electives.",
    gamingCompatibility: "Limited",
    batteryImportance: "Important",
    commonMistakes: [
      "Buying a gaming laptop when you only code — adds weight and kills battery.",
      "Sticking with 8GB RAM — Docker and Chrome together will freeze your machine.",
      "Choosing Mac without checking if your lab uses Windows-only tools.",
    ],
    seniorTip:
      "Get 16GB RAM and a good keyboard. You'll type more than you game. A ₹60,000–₹80,000 laptop with solid build quality beats a flashy gaming rig for CS.",
    recommendedLaptops: [
      {
        name: "Lenovo IdeaPad Slim 5",
        reason: "Excellent value for coding with 16GB RAM and good keyboard.",
        priceRange: "₹55,000–₹65,000",
        affiliateUrl: "https://www.amazon.in",
      },
      {
        name: "Apple MacBook Air M2",
        reason: "Best battery and build for CS students who can afford it.",
        priceRange: "₹90,000–₹1,10,000",
        affiliateUrl: "https://www.amazon.in",
      },
      {
        name: "ASUS Vivobook 16",
        reason: "Large screen for split-pane coding at a mid-range price.",
        priceRange: "₹50,000–₹60,000",
        affiliateUrl: "https://www.amazon.in",
      },
    ],
  },
  {
    name: "Mechanical",
    slug: "mechanical",
    description:
      "Mechanical engineering means CAD, simulation, and MATLAB. SolidWorks and ANSYS will push your laptop harder than a CS student's Chrome tabs ever will.",
    recommendedOS: "Windows",
    macRecommended: false,
    macNote:
      "Most CAD and simulation software (SolidWorks, ANSYS, CATIA) requires Windows. Mac is not recommended unless you dual-boot or use a VM.",
    softwareUsed: [
      "SolidWorks",
      "ANSYS",
      "MATLAB",
      "AutoCAD",
      "Fusion 360",
      "Excel",
    ],
    typicalUsage:
      "You'll model parts in CAD, run finite element analysis, and submit MATLAB assignments. These tools need a dedicated GPU and at least 16GB RAM. Expect your laptop to run hot during simulations.",
    gamingCompatibility: "Good",
    batteryImportance: "Moderate",
    commonMistakes: [
      "Buying an ultrabook without a dedicated GPU — CAD will lag badly.",
      "Ignoring thermal performance — thin laptops throttle under ANSYS loads.",
      "Choosing Mac and struggling with Windows-only CAD licenses.",
    ],
    seniorTip:
      "Prioritize GPU and cooling over portability. A ₹70,000–₹90,000 laptop with RTX 3050/4050 and 16GB RAM is the sweet spot for mechanical students.",
    recommendedLaptops: [
      {
        name: "HP Victus 15",
        reason: "Dedicated GPU for CAD at a student-friendly price.",
        priceRange: "₹60,000–₹75,000",
        affiliateUrl: "https://www.amazon.in",
      },
      {
        name: "Lenovo LOQ 15",
        reason: "Good thermals for long simulation sessions.",
        priceRange: "₹70,000–₹85,000",
        affiliateUrl: "https://www.amazon.in",
      },
      {
        name: "Dell G15",
        reason: "Reliable build with strong service network in India.",
        priceRange: "₹65,000–₹80,000",
        affiliateUrl: "https://www.amazon.in",
      },
    ],
  },
  {
    name: "Civil",
    slug: "civil",
    description:
      "Civil engineers use AutoCAD, STAAD Pro, and ETABS for structural design. You'll also visit sites — so durability and reasonable weight matter alongside compute power.",
    recommendedOS: "Windows",
    macRecommended: false,
    macNote:
      "AutoCAD, STAAD, and ETABS are Windows-native. Mac support is limited or nonexistent for core civil software.",
    softwareUsed: [
      "AutoCAD",
      "STAAD Pro",
      "ETABS",
      "Revit",
      "MATLAB",
      "Excel",
      "Primavera",
    ],
    typicalUsage:
      "Design assignments involve 2D/3D drafting and structural analysis. Files can be large, and you'll multitask between CAD, PDFs, and Excel. A good display helps when reading detailed drawings.",
    gamingCompatibility: "Not Needed",
    batteryImportance: "Important",
    commonMistakes: [
      "Buying without checking STAAD/ETABS system requirements.",
      "Choosing a tiny 13-inch screen — CAD on small displays is painful.",
      "Skipping SSD — HDD laptops feel ancient with large project files.",
    ],
    seniorTip:
      "Get at least 16GB RAM, 512GB SSD, and a 15-inch screen. You don't need a gaming GPU, but integrated graphics alone may struggle with Revit.",
    recommendedLaptops: [
      {
        name: "Lenovo IdeaPad Slim 5",
        reason: "Balanced specs for AutoCAD without overspending.",
        priceRange: "₹55,000–₹65,000",
        affiliateUrl: "https://www.amazon.in",
      },
      {
        name: "ASUS VivoBook Pro 15",
        reason: "OLED display makes CAD work easier on the eyes.",
        priceRange: "₹65,000–₹80,000",
        affiliateUrl: "https://www.amazon.in",
      },
      {
        name: "HP Pavilion 15",
        reason: "Solid all-rounder with good HP service centers.",
        priceRange: "₹50,000–₹60,000",
        affiliateUrl: "https://www.amazon.in",
      },
    ],
  },
  {
    name: "Electrical",
    slug: "electrical",
    description:
      "Electrical engineering combines MATLAB, Simulink, and circuit simulation with long hours in labs. Battery life and reliable performance matter as much as raw specs.",
    recommendedOS: "Windows",
    macRecommended: false,
    macNote:
      "MATLAB/Simulink and tools like PSCAD work best on Windows. Some lab instrumentation software is Windows-only.",
    softwareUsed: [
      "MATLAB",
      "Simulink",
      "PSCAD",
      "Multisim",
      "Python",
      "ETAP",
      "LabVIEW",
    ],
    typicalUsage:
      "You'll simulate circuits, analyze power systems, and write MATLAB scripts. Lab sessions mean carrying your laptop daily — weight and battery become real factors by second year.",
    gamingCompatibility: "Limited",
    batteryImportance: "Critical",
    commonMistakes: [
      "Buying a heavy gaming laptop you'll carry to labs every day.",
      "Underestimating MATLAB memory usage with large simulations.",
      "Ignoring battery degradation — cheap batteries die in year two.",
    ],
    seniorTip:
      "A lightweight 15-inch laptop with 16GB RAM and 8+ hours battery beats a powerful desktop replacement you'll dread carrying.",
    recommendedLaptops: [
      {
        name: "Lenovo IdeaPad Slim 5",
        reason: "Light enough for daily lab commutes with solid performance.",
        priceRange: "₹55,000–₹65,000",
        affiliateUrl: "https://www.amazon.in",
      },
      {
        name: "ASUS Zenbook 14",
        reason: "Premium portability with all-day battery for lab days.",
        priceRange: "₹70,000–₹85,000",
        affiliateUrl: "https://www.amazon.in",
      },
      {
        name: "Acer Aspire 5",
        reason: "Budget-friendly option that handles MATLAB well.",
        priceRange: "₹45,000–₹55,000",
        affiliateUrl: "https://www.amazon.in",
      },
    ],
  },
  {
    name: "Electronics",
    slug: "electronics",
    description:
      "Electronics students juggle circuit simulators, PCB design, and embedded programming. You'll need compatibility with lab tools and enough RAM for simulation software.",
    recommendedOS: "Both",
    macRecommended: false,
    macNote:
      "Many embedded toolchains and lab software work on Windows. Linux via dual-boot is popular among ECE seniors for embedded development.",
    softwareUsed: [
      "Multisim",
      "KiCad",
      "Arduino IDE",
      "MATLAB",
      "Proteus",
      "Python",
      "Xilinx Vivado",
    ],
    typicalUsage:
      "Circuit design, PCB layout, and microcontroller programming form the core workload. FPGA tools and SPICE simulators can be memory-hungry during project season.",
    gamingCompatibility: "Limited",
    batteryImportance: "Important",
    commonMistakes: [
      "Buying without USB ports for lab equipment and programmers.",
      "Choosing outdated processors — Vivado compilation is painfully slow.",
      "Ignoring Linux compatibility if your lab uses open-source toolchains.",
    ],
    seniorTip:
      "Make sure you have enough USB-A ports or carry a hub. 16GB RAM and an i5/Ryzen 5 from the last two generations is the practical minimum.",
    recommendedLaptops: [
      {
        name: "Lenovo ThinkPad E14",
        reason: "Great port selection and Linux-friendly hardware.",
        priceRange: "₹55,000–₹70,000",
        affiliateUrl: "https://www.amazon.in",
      },
      {
        name: "HP Pavilion 15",
        reason: "Reliable for Multisim and everyday lab work.",
        priceRange: "₹50,000–₹60,000",
        affiliateUrl: "https://www.amazon.in",
      },
      {
        name: "ASUS Vivobook 15",
        reason: "Budget option that handles ECE software adequately.",
        priceRange: "₹45,000–₹55,000",
        affiliateUrl: "https://www.amazon.in",
      },
    ],
  },
  {
    name: "AI/ML",
    slug: "ai",
    description:
      "AI and ML students run Jupyter notebooks, train models, and work with frameworks like PyTorch and TensorFlow. GPU access becomes important early — not just in final year.",
    recommendedOS: "Both",
    macRecommended: true,
    macNote:
      "MacBook with Apple Silicon handles light ML well. Serious deep learning still benefits from NVIDIA CUDA on Windows/Linux.",
    softwareUsed: [
      "Python",
      "Jupyter",
      "PyTorch",
      "TensorFlow",
      "VS Code",
      "CUDA",
      "Google Colab",
      "scikit-learn",
    ],
    typicalUsage:
      "You'll preprocess datasets, train models locally or on cloud GPUs, and deploy notebooks for assignments. RAM and GPU matter more here than for most other branches.",
    gamingCompatibility: "Good",
    batteryImportance: "Moderate",
    commonMistakes: [
      "Expecting to train large models on CPU-only laptops.",
      "Buying 8GB RAM — datasets won't even load properly.",
      "Ignoring cloud options — Colab can supplement a mid-range laptop.",
    ],
    seniorTip:
      "If budget allows, get an RTX 4050/4060 laptop. If not, get 16GB+ RAM and use Google Colab for GPU tasks — don't pretend your integrated graphics will train ResNet.",
    recommendedLaptops: [
      {
        name: "ASUS TUF A15",
        reason: "RTX GPU for local training at a reasonable price.",
        priceRange: "₹75,000–₹90,000",
        affiliateUrl: "https://www.amazon.in",
      },
      {
        name: "Apple MacBook Air M2",
        reason: "Excellent for learning ML concepts and light models.",
        priceRange: "₹90,000–₹1,10,000",
        affiliateUrl: "https://www.amazon.in",
      },
      {
        name: "Lenovo LOQ 15",
        reason: "Best bang-for-buck GPU laptop for AI coursework.",
        priceRange: "₹70,000–₹85,000",
        affiliateUrl: "https://www.amazon.in",
      },
    ],
  },
  {
    name: "Data Science",
    slug: "data-science",
    description:
      "Data science students work with pandas, SQL, visualization tools, and ML libraries. Large datasets and multiple tools open simultaneously demand RAM and a decent processor.",
    recommendedOS: "Both",
    macRecommended: true,
    macNote:
      "MacBooks handle Python data workflows smoothly. Windows is fine too — just ensure 16GB+ RAM regardless of platform.",
    softwareUsed: [
      "Python",
      "Jupyter",
      "pandas",
      "SQL",
      "Tableau",
      "Power BI",
      "R",
      "VS Code",
    ],
    typicalUsage:
      "You'll clean datasets, build visualizations, run statistical models, and present findings. Chrome, Jupyter, and a database client running together will eat RAM fast.",
    gamingCompatibility: "Not Needed",
    batteryImportance: "Important",
    commonMistakes: [
      "Buying 8GB RAM — pandas with medium datasets will swap constantly.",
      "Prioritizing GPU over RAM — most DS work is CPU and memory bound.",
      "Choosing a slow HDD — data I/O becomes a bottleneck immediately.",
    ],
    seniorTip:
      "16GB RAM minimum, 32GB if you can afford it. A fast SSD matters more than a dedicated GPU for 90% of data science coursework.",
    recommendedLaptops: [
      {
        name: "Lenovo IdeaPad Slim 5",
        reason: "16GB RAM variant is perfect for pandas workloads.",
        priceRange: "₹55,000–₹65,000",
        affiliateUrl: "https://www.amazon.in",
      },
      {
        name: "Apple MacBook Air M2",
        reason: "Silent, fast, and great for Python data stacks.",
        priceRange: "₹90,000–₹1,10,000",
        affiliateUrl: "https://www.amazon.in",
      },
      {
        name: "ASUS Vivobook 16",
        reason: "Large screen helps with data visualization work.",
        priceRange: "₹50,000–₹60,000",
        affiliateUrl: "https://www.amazon.in",
      },
    ],
  },
];

export function getBranchBySlug(slug: string): BranchGuide | undefined {
  return BRANCH_DATA.find((branch) => branch.slug === slug);
}

export function getAllBranchSlugs(): string[] {
  return BRANCH_DATA.map((branch) => branch.slug);
}
