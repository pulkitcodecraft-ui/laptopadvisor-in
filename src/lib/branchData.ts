export interface BranchLaptop {
  slug: string;
  reason: string;
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
        slug: "ideapad-slim-3",
        reason: "Excellent value for coding with 16GB RAM and good keyboard.",
      },
      {
        slug: "apple-macbook-air-13-m5",
        reason: "Best battery and build for CS students who can afford it.",
      },
      {
        slug: "asus-vivobook-s16",
        reason: "Large OLED screen for split-pane coding at a mid-range price.",
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
        slug: "hp-victus-15-ryzen-5-rtx-3050",
        reason: "Dedicated GPU for CAD at a student-friendly price.",
      },
      {
        slug: "lenovo-loq-15-rtx-3050a",
        reason: "Good thermals for long simulation sessions.",
      },
      {
        slug: "acer-aspire-7-gaming",
        reason: "Affordable RTX 3050 with upgradeable RAM and wide service network.",
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
        slug: "ideapad-slim-3",
        reason: "Balanced specs for AutoCAD without overspending.",
      },
      {
        slug: "asus-vivobook-s16",
        reason: "OLED display makes CAD work easier on the eyes.",
      },
      {
        slug: "asus-vivobook-15",
        reason: "Solid all-rounder with good ASUS service coverage.",
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
        slug: "ideapad-slim-3",
        reason: "Light enough for daily lab commutes with solid performance.",
      },
      {
        slug: "asus-vivobook-s14",
        reason: "Premium portability with all-day battery for lab days.",
      },
      {
        slug: "motorola-moto-book-60",
        reason: "Budget-friendly option with OLED display and 16GB RAM.",
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
        slug: "motorola-moto-book-60",
        reason: "Great port selection and strong everyday performance.",
      },
      {
        slug: "asus-vivobook-15",
        reason: "Reliable for Multisim and everyday lab work.",
      },
      {
        slug: "ideapad-slim-3",
        reason: "Budget option that handles ECE software adequately.",
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
        slug: "asus-tuf-gaming-a15",
        reason: "RTX GPU for local training at a reasonable price.",
      },
      {
        slug: "apple-macbook-air-13-m5",
        reason: "Excellent for learning ML concepts and light models.",
      },
      {
        slug: "lenovo-loq-15-rtx-3050a",
        reason: "Best bang-for-buck GPU laptop for AI coursework.",
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
        slug: "ideapad-slim-3",
        reason: "16GB RAM variant is perfect for pandas workloads.",
      },
      {
        slug: "apple-macbook-air-13-m5",
        reason: "Silent, fast, and great for Python data stacks.",
      },
      {
        slug: "asus-vivobook-s16",
        reason: "Large screen helps with data visualization work.",
      },
    ],
  },
  {
    name: "Chemical",
    slug: "chemical",
    description:
      "Chemical engineering students run process simulators, MATLAB, and Aspen Plus alongside data-heavy coursework. Moderate compute needs, but multitasking between spreadsheets, simulations, and reports demands reliable RAM.",
    recommendedOS: "Windows",
    macRecommended: false,
    macNote:
      "Aspen Plus, HYSYS, and many plant-design tools are Windows-first. Mac support is limited for core chemical engineering software.",
    softwareUsed: [
      "Aspen Plus",
      "MATLAB",
      "Excel",
      "Python",
      "ChemCAD",
      "COMSOL",
    ],
    typicalUsage:
      "You'll model chemical processes, solve numerical problems in MATLAB, and submit lab reports. Simulation runs can take time — a stable laptop with 16GB RAM handles semester workload better than a thin ultrabook.",
    gamingCompatibility: "Not Needed",
    batteryImportance: "Important",
    commonMistakes: [
      "Buying 8GB RAM — Aspen and MATLAB together will freeze during assignments.",
      "Choosing Mac without checking if your college licenses Windows-only simulators.",
      "Ignoring SSD speed — large simulation files load painfully on HDDs.",
    ],
    seniorTip:
      "16GB RAM and 512GB SSD are the practical baseline. You don't need a gaming GPU unless you also game — integrated graphics is fine for most chemical eng software.",
    recommendedLaptops: [
      {
        slug: "ideapad-slim-3",
        reason: "Balanced specs for MATLAB and simulation at a student price.",
      },
      {
        slug: "asus-vivobook-15",
        reason: "Reliable all-rounder with good service network.",
      },
      {
        slug: "motorola-moto-book-60",
        reason: "Strong value for everyday chemical eng coursework.",
      },
    ],
  },
  {
    name: "Engineering Physics",
    slug: "engineering-physics",
    description:
      "Engineering physics blends programming, numerical methods, and research-oriented computing. Python and MATLAB dominate, with occasional simulation and data analysis workloads.",
    recommendedOS: "Both",
    macRecommended: true,
    macNote:
      "MacBooks work well for Python and research workflows. Verify lab software requirements — some instrumentation tools may need Windows.",
    softwareUsed: [
      "Python",
      "MATLAB",
      "Jupyter",
      "LaTeX",
      "Origin",
      "COMSOL",
      "VS Code",
    ],
    typicalUsage:
      "Coding assignments, numerical simulations, and research projects fill most of your screen time. Battery life matters for library and lab sessions; raw GPU power is rarely essential unless you specialize in compute-heavy research.",
    gamingCompatibility: "Limited",
    batteryImportance: "Important",
    commonMistakes: [
      "Overspending on GPU when your coursework is mostly CPU-bound Python.",
      "Skipping 16GB RAM — Jupyter, browser tabs, and MATLAB add up fast.",
      "Choosing a heavy gaming laptop you'll carry to labs daily.",
    ],
    seniorTip:
      "A lightweight laptop with 16GB RAM, good keyboard, and all-day battery beats a bulky workstation. Linux-friendly hardware is a bonus if your lab uses open-source stacks.",
    recommendedLaptops: [
      {
        slug: "apple-macbook-air-13-m5",
        reason: "Excellent for Python, research writing, and long battery life.",
      },
      {
        slug: "asus-vivobook-s14",
        reason: "Portable with strong CPU for daily lab carry.",
      },
      {
        slug: "ideapad-slim-3",
        reason: "Strong value for MATLAB and Python workloads.",
      },
    ],
  },
  {
    name: "Aerospace",
    slug: "aerospace",
    description:
      "Aerospace engineering means CAD, CFD, and FEA tools like CATIA and ANSYS. These workloads need dedicated GPU power, strong cooling, and enough RAM for large mesh files.",
    recommendedOS: "Windows",
    macRecommended: false,
    macNote:
      "CATIA, ANSYS Fluent, and most aerospace CAD/CFD stacks are Windows-native. Mac is not practical unless your college provides lab access for all heavy tools.",
    softwareUsed: [
      "CATIA",
      "ANSYS",
      "MATLAB",
      "SolidWorks",
      "OpenVSP",
      "Python",
    ],
    typicalUsage:
      "You'll design components, run aerodynamic simulations, and submit analysis reports. Simulation sessions push CPU and GPU hard — expect fan noise and heat during project deadlines.",
    gamingCompatibility: "Good",
    batteryImportance: "Moderate",
    commonMistakes: [
      "Buying an ultrabook without dedicated GPU — CFD and CAD will struggle.",
      "Ignoring thermals — thin laptops throttle under ANSYS loads.",
      "Choosing 8GB RAM — mesh files and multitasking need 16GB minimum.",
    ],
    seniorTip:
      "RTX 3050/4050 with 16GB RAM is the practical floor for aerospace coursework. Use college labs for the heaviest simulations if budget is tight.",
    recommendedLaptops: [
      {
        slug: "hp-victus-15-ryzen-5-rtx-3050",
        reason: "Dedicated GPU for CAD and simulation at a student price.",
      },
      {
        slug: "lenovo-loq-15-rtx-3050a",
        reason: "Good thermals for long ANSYS sessions.",
      },
      {
        slug: "acer-aspire-7-gaming",
        reason: "Affordable RTX 3050 with upgradeable RAM and wide service network.",
      },
    ],
  },
  {
    name: "Architecture",
    slug: "architecture",
    description:
      "Architecture students live in Revit, SketchUp, Lumion, and Photoshop. Display quality, color accuracy, and GPU performance matter as much as portability for design reviews and studio work.",
    recommendedOS: "Windows",
    macRecommended: false,
    macNote:
      "Revit and Lumion are Windows-first. Mac can work for SketchUp and presentation work, but most Indian architecture programs expect Windows for core studio software.",
    softwareUsed: [
      "Revit",
      "SketchUp",
      "AutoCAD",
      "Lumion",
      "Photoshop",
      "Rhino",
    ],
    typicalUsage:
      "You'll model buildings, render walkthroughs, and present boards. Large project files and real-time rendering eat RAM and GPU. A good display reduces eye strain during long studio nights.",
    gamingCompatibility: "Limited",
    batteryImportance: "Important",
    commonMistakes: [
      "Buying a 13-inch screen — architectural drawings need space.",
      "Skipping dedicated GPU — Lumion and Enscape need it for smooth previews.",
      "Choosing sRGB-only panels when color-accurate displays help for presentations.",
    ],
    seniorTip:
      "15–16 inch screen, 16GB RAM minimum, RTX 3050 or better, and 512GB+ SSD. Prioritize display size and GPU over ultra-lightweight design — studio work is visual.",
    recommendedLaptops: [
      {
        slug: "asus-vivobook-s16",
        reason: "OLED display and solid CPU for Revit and rendering.",
      },
      {
        slug: "hp-victus-15-ryzen-5-rtx-3050",
        reason: "Strong GPU for Lumion at a reasonable student price.",
      },
      {
        slug: "lenovo-loq-15-rtx-3050a",
        reason: "Large screen and good thermals for long studio sessions.",
      },
    ],
  },
  {
    name: "Biotechnology",
    slug: "biotechnology",
    description:
      "Biotech students use R, Python, bioinformatics tools, and statistical software for data analysis. RAM and storage matter more than GPU for most coursework.",
    recommendedOS: "Both",
    macRecommended: true,
    macNote:
      "MacBooks handle Python and R workflows smoothly. Windows is fine too — check if your lab uses Windows-only instrumentation software.",
    softwareUsed: [
      "R",
      "Python",
      "Jupyter",
      "BLAST",
      "Excel",
      "GraphPad",
      "MATLAB",
    ],
    typicalUsage:
      "Data analysis, lab report writing, and running bioinformatics pipelines form the core workload. Multiple datasets and browser-based tools open together — 16GB RAM keeps things smooth.",
    gamingCompatibility: "Not Needed",
    batteryImportance: "Important",
    commonMistakes: [
      "Buying 8GB RAM — R and Python with medium datasets will swap constantly.",
      "Prioritizing gaming GPU over RAM and SSD.",
      "Choosing a laptop with poor battery for long lab and library sessions.",
    ],
    seniorTip:
      "16GB RAM, fast SSD, and a comfortable keyboard beat expensive graphics. Mac or Windows both work — pick based on what your lab standardizes on.",
    recommendedLaptops: [
      {
        slug: "ideapad-slim-3",
        reason: "16GB RAM ideal for R and Python data analysis.",
      },
      {
        slug: "apple-macbook-air-13-m5",
        reason: "Silent and reliable for research and writing-heavy semesters.",
      },
      {
        slug: "asus-vivobook-15",
        reason: "Budget option that handles biotech software adequately.",
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
