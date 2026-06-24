export interface CollegeGuide {
  name: string;
  slug: string;
  city: string;
  description: string;
  campusLife: string;
  labSetup: string;
  popularLaptops: string[];
  seniorTip: string;
}

export const COLLEGE_DATA: CollegeGuide[] = [
  {
    name: "IIT Bombay",
    slug: "iit-bombay",
    city: "Mumbai",
    description:
      "IIT Bombay's diverse labs and startup culture mean CS students lean Mac while mechanical and civil students need Windows workstations.",
    campusLife:
      "Hostels are spread across campus — you'll walk a lot. Lightweight laptops with good battery are essential for late-night coding in Hostel 8 or library sessions.",
    labSetup:
      "Computer labs have high-end desktops for heavy simulation. Your laptop is for assignments, not replacing lab machines.",
    popularLaptops: ["MacBook Air M2", "Lenovo ThinkPad", "HP Victus 15"],
    seniorTip:
      "Don't buy the most expensive laptop in week one. Wait till you know your branch's actual software requirements.",
  },
  {
    name: "IIT Delhi",
    slug: "iit-delhi",
    city: "New Delhi",
    description:
      "IIT Delhi students face extreme Delhi heat — laptop thermals matter. CS and AI branches dominate MacBook adoption on campus.",
    campusLife:
      "Bhatti nights and long lab hours mean you'll need a laptop that survives 4+ years of daily use. Build quality beats flashy specs.",
    labSetup:
      "CAD labs and computing centers are well-equipped. Personal laptops need to handle MATLAB, Python, and occasional gaming.",
    popularLaptops: ["MacBook Air M2", "Lenovo IdeaPad Slim 5", "ASUS Vivobook 16"],
    seniorTip:
      "Check HP/Dell service centers near Hauz Khas before buying — you'll need them eventually.",
  },
  {
    name: "IIT Madras",
    slug: "iit-madras",
    city: "Chennai",
    description:
      "Humid Chennai weather tests laptop durability. Electrical and CS branches have different needs — verify before buying.",
    campusLife:
      "Cycle-friendly campus but you'll still carry laptops to classes. 1.5kg or less is ideal for daily commutes across the large campus.",
    labSetup:
      "Research labs have GPU servers for ML. Your laptop needs 16GB RAM but not necessarily a dedicated GPU for coursework.",
    popularLaptops: ["Lenovo IdeaPad Slim 5", "Acer Aspire 5", "MacBook Air M2"],
    seniorTip:
      "Humidity kills cheap laptops. Invest in a good laptop stand and avoid leaving it in a closed bag while hot.",
  },
  {
    name: "IIT Kanpur",
    slug: "iit-kanpur",
    city: "Kanpur",
    description:
      "IIT Kanpur's open-source culture means many ECE seniors run Linux. Think about compatibility before choosing hardware.",
    campusLife:
      "Winter gets cold, summer gets hot — your laptop will see temperature extremes in hostel rooms without AC.",
    labSetup:
      "Strong computing infrastructure. Focus on portability and reliability over maximum specs.",
    popularLaptops: ["Lenovo ThinkPad E14", "HP Pavilion 15", "Dell Inspiron 15"],
    seniorTip:
      "ThinkPad resale value is excellent if you want to upgrade after 2 years.",
  },
  {
    name: "IIT Kharagpur",
    slug: "iit-kharagpur",
    city: "Kharagpur",
    description:
      "Asia's largest residential campus means long walks between departments. Battery life is non-negotiable at IIT KGP.",
    campusLife:
      "You'll eat at multiple messes and work from different hostels. A laptop with 8+ hour battery saves you daily.",
    labSetup:
      "Mechanical and civil labs need Windows laptops with decent GPU for CAD work.",
    popularLaptops: ["Lenovo IdeaPad Slim 5", "HP Victus 15", "ASUS Vivobook 15"],
    seniorTip:
      "Carry your charger anyway — '8 hour battery' claims rarely hold with 20 Chrome tabs open.",
  },
  {
    name: "IIT Roorkee",
    slug: "iit-roorkee",
    city: "Roorkee",
    description:
      "One of India's oldest engineering colleges with strong civil and mechanical programs requiring Windows-based CAD software.",
    campusLife:
      "Hostel LAN gaming culture is real — if you game, factor that in. Otherwise, skip the gaming laptop.",
    labSetup:
      "Well-maintained computer centers. Personal laptop mainly for assignments and online classes.",
    popularLaptops: ["HP Victus 15", "Lenovo LOQ 15", "Acer Aspire 5"],
    seniorTip:
      "Civil students: verify AutoCAD and STAAD run smoothly before the semester starts, not during submission week.",
  },
  {
    name: "IIT Guwahati",
    slug: "iit-guwahati",
    city: "Guwahati",
    description:
      "Beautiful but remote campus — service center access is limited. Choose brands with reliable nationwide support.",
    campusLife:
      "Monsoon season is tough on electronics. A good laptop bag and waterproof sleeve are as important as the laptop itself.",
    labSetup:
      "Growing AI/ML research scene. CS and AI students benefit from 16GB+ RAM.",
    popularLaptops: ["Lenovo IdeaPad Slim 5", "MacBook Air M2", "HP Pavilion 15"],
    seniorTip:
      "Service centers are far — buy extended warranty if available. Repairs in Guwahati take longer than in metros.",
  },
  {
    name: "BITS Pilani",
    slug: "bits-pilani",
    city: "Pilani",
    description:
      "BITS Pilani's flexible curriculum attracts students with diverse laptop needs — from coding to robotics to finance minors.",
    campusLife:
      "Desert climate in Pilani — keep laptops cool and dust-free. Library and CIL are your second homes.",
    labSetup:
      "Excellent computing facilities. Personal laptop for projects, assignments, and placement prep.",
    popularLaptops: ["MacBook Air M2", "Lenovo IdeaPad Slim 5", "ASUS Vivobook 16"],
    seniorTip:
      "Placements start early at BITS — have a reliable laptop by second year for OA prep and projects.",
  },
  {
    name: "NIT Trichy",
    slug: "nit-trichy",
    city: "Tiruchirappalli",
    description:
      "NIT Trichy offers excellent value education with strong placement culture — your laptop is an investment in your career.",
    campusLife:
      "Active coding and robotics clubs. CS and ECE students often upgrade laptops after first year when requirements become clear.",
    labSetup:
      "Standard engineering lab setup. Windows recommended for most branches.",
    popularLaptops: ["Lenovo IdeaPad Slim 5", "HP Pavilion 15", "Acer Aspire 5"],
    seniorTip:
      "Don't overspend under peer pressure. A ₹55,000 laptop used well beats a ₹1,20,000 one used for Netflix.",
  },
  {
    name: "IIIT Hyderabad",
    slug: "iiit-hyderabad",
    city: "Hyderabad",
    description:
      "IIIT Hyderabad is CS-focused — expect heavy coding, ML coursework, and a campus where MacBooks are extremely common.",
    campusLife:
      "Coding-heavy culture from day one. You'll compile, debug, and deploy constantly. Keyboard quality matters.",
    labSetup:
      "Research labs with GPU clusters. Your laptop handles daily coding; labs handle heavy ML training.",
    popularLaptops: ["MacBook Air M2", "MacBook Pro 14", "Lenovo ThinkPad"],
    seniorTip:
      "Linux compatibility is valued here. Think about dual-boot or WSL if you choose Windows.",
  },
];

export function getCollegeBySlug(slug: string): CollegeGuide | undefined {
  return COLLEGE_DATA.find((c) => c.slug === slug);
}

export function getAllCollegeSlugs(): string[] {
  return COLLEGE_DATA.map((c) => c.slug);
}
