export type MistakeItem = {
  title: string;
  description: string;
  fix: string;
};

export const CORE_MISTAKES: MistakeItem[] = [
  {
    title: "Buying 8GB RAM in 2026",
    description:
      "8GB struggles with Chrome, VS Code, Android Studio and AI tools.",
    fix: "16GB minimum for a 4-year college laptop.",
  },
  {
    title: "Ignoring Soldered RAM",
    description: "Many thin laptops cannot be upgraded later.",
    fix: "Buy enough RAM now or pick an upgradable model.",
  },
  {
    title: "Buying 256GB SSD for Engineering",
    description: "Windows, IDEs, Adobe apps and projects fill 256GB fast.",
    fix: "512GB SSD is the safer starting point.",
  },
  {
    title: "Buying Mac Without Checking Software",
    description:
      "Some engineering tools still work best on Windows or have limited macOS support.",
    fix: "Verify your branch software list before you spend.",
  },
  {
    title: "Buying a Gaming Laptop for Coding",
    description:
      "Extra weight, heat and shorter battery if you do not game or use GPU-heavy tools.",
    fix: "Skip the RTX unless your workload actually needs it.",
  },
  {
    title: "Ignoring Service Centre Availability",
    description:
      "A cheap laptop gets expensive when the nearest centre is hundreds of km away.",
    fix: "Check brand service coverage in your city before buying.",
  },
  {
    title: "Skipping Student Discounts",
    description:
      "Apple Education, Lenovo, Dell, HP and campus offers are often ignored.",
    fix: "Compare EDU pricing — saves ₹5,000–₹20,000 easily.",
  },
  {
    title: "Choosing Specs Instead of Usage",
    description:
      "An RTX laptop looks powerful but may be wrong for your branch and daily work.",
    fix: "Match laptop to branch software and workload, not hype.",
  },
  {
    title: "Ignoring Battery Life",
    description:
      "3–4 hours of battery hurts during lectures and library sessions.",
    fix: "Aim for 6+ hours real-world use for campus days.",
  },
  {
    title: "Buying the Wrong Processor Series",
    description: "H-series = more power; U-series = better battery life.",
    fix: "Pick the series that matches how you actually use the laptop.",
  },
  {
    title: "Ignoring Laptop Weight",
    description: "A 2.5kg machine gets tiring when you carry it daily.",
    fix: "Under 1.6kg is ideal for most hostel + lab routines.",
  },
  {
    title: "Buying Refurbished Without Warranty",
    description: "Used laptops fail without warning — repairs are costly.",
    fix: "Only buy refurb with official warranty and battery health check.",
  },
];

export const ADVANCED_MISTAKES: MistakeItem[] = [
  {
    title: "Ignoring Display Quality",
    description: "Poor panels cause eye strain during long coding sessions.",
    fix: "Prefer IPS or OLED with at least 300 nits brightness.",
  },
  {
    title: "Not Checking Keyboard Quality",
    description: "You will type thousands of assignments on this keyboard.",
    fix: "Try the keyboard in-store or read reviews about key travel.",
  },
  {
    title: "Buying ARM Windows Without Research",
    description: "Some professional software and drivers still have gaps on ARM.",
    fix: "Confirm every app you need runs on ARM Windows first.",
  },
  {
    title: "Ignoring USB & HDMI Ports",
    description: "Thin laptops often need dongles for projectors, LAN or monitors.",
    fix: "Count the ports you need for college labs and presentations.",
  },
  {
    title: "Skipping College Software Research",
    description:
      "SolidWorks, CATIA, ANSYS, Xilinx and more are often Windows-first.",
    fix: "Ask seniors or check your branch lab software list first.",
  },
  {
    title: "Ignoring Warranty Extension",
    description: "One motherboard repair can cost more than extended warranty.",
    fix: "Compare 1-year extra warranty cost vs typical repair bills.",
  },
];
