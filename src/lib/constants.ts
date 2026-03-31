export const SITE_CONFIG = {
  name: "Feroze Basha",
  title: "Feroze Basha | Founder-Architect",
  description:
    "Founder of Future Beyond Tech & CEO of FIROSE Enterprises. Building enterprise SaaS infrastructure — RentFlow, Zentra, and the identity layer for Indian SaaS.",
  url: "https://ferozebasha.com",
  ogImage: "/og/default.png",
  email: "feroze@futurebeyondtech.com",
  github: "https://github.com/feroz-hub",
  githubOrg: "https://github.com/future-beyond-tech",
  linkedin: "https://www.linkedin.com/in/ferozebasha/",
  medium: "https://medium.com/@ferozebasha",
  upwork: "https://www.upwork.com/freelancers/ferozebasha",
} as const;

export interface NavItem {
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Systems", href: "/systems" },
  { label: "Capabilities", href: "/capabilities" },
  { label: "Experience", href: "/experience" },
  { label: "Writing", href: "/writing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const SOCIAL_LINKS = [
  { label: "GitHub", href: SITE_CONFIG.github, icon: "Github" },
  { label: "LinkedIn", href: SITE_CONFIG.linkedin, icon: "Linkedin" },
  { label: "Medium", href: SITE_CONFIG.medium, icon: "BookOpen" },
] as const;

export const TECH_STACK_MARQUEE = [
  "C#",
  ".NET 8",
  "ASP.NET Core",
  "PostgreSQL",
  "SQL Server",
  "Redis",
  "OAuth 2.0",
  "OIDC",
  "Clean Architecture",
  "CQRS",
  "Next.js",
  "TypeScript",
  "Playwright",
  "Docker",
  "Azure DevOps",
  "JWT",
  "mTLS",
  "YARP",
  "ML.NET",
  "React",
] as const;

export interface ProjectTier {
  label: string;
  description: string;
}

export const PROJECT_TIERS: Record<string, ProjectTier> = {
  flagship: {
    label: "Flagship Products",
    description: "Enterprise SaaS infrastructure built at Future Beyond Tech",
  },
  firose: {
    label: "FIROSE Digital",
    description: "Digital operations for FIROSE Enterprises conglomerate",
  },
  public: {
    label: "Public Projects",
    description: "Open-source builds and engineering explorations",
  },
  learning: {
    label: "Learning Resources",
    description: "Structured roadmaps and reference implementations",
  },
} as const;

export interface SystemProject {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  tier: keyof typeof PROJECT_TIERS;
  stack: string[];
  status: "active" | "shipped" | "scaffolded" | "learning";
  github?: string;
  caseStudy?: boolean;
  highlights: string[];
}

export const PROJECTS: SystemProject[] = [
  {
    slug: "rentflow",
    title: "RentFlow",
    tagline: "Multi-Tenant Property Management OS",
    description:
      "Full-stack SaaS platform for property managers — visual property builder, progressive trust unlock, 4-persona control plane, and ledger billing.",
    tier: "flagship",
    stack: ["Next.js 14", ".NET 8", "PostgreSQL", "Railway"],
    status: "active",
    caseStudy: true,
    highlights: [
      "Visual property builder with drag-and-drop floor plans",
      "Progressive trust unlock across tenant lifecycle",
      "Multi-tenant architecture with data isolation",
      "Ledger-based billing engine",
    ],
  },
  {
    slug: "zentra",
    title: "Zentra",
    tagline: "Custom OAuth 2.0/OIDC Identity Provider",
    description:
      "Built from scratch to RFC 6749/7636 spec — PKCE, refresh token rotation, cyberpunk admin UI, and enterprise-grade identity management.",
    tier: "flagship",
    stack: [".NET 8", "Clean Architecture", "OAuth 2.0", "OIDC"],
    status: "active",
    caseStudy: true,
    highlights: [
      "RFC 6749/7636 compliant from the ground up",
      "PKCE and refresh token rotation",
      "Cyberpunk-aesthetic admin dashboard",
      "Why we built our own instead of Auth0/Clerk",
    ],
  },
  {
    slug: "vyxnos-shield",
    title: "Vyxnos Shield",
    tagline: "Zero-Trust API Gateway",
    description:
      "High-performance API gateway with YARP reverse proxy, NativeAOT compilation, and zero-trust security model for microservice architectures.",
    tier: "flagship",
    stack: [".NET 8", "YARP", "NativeAOT", "KubeOps"],
    status: "scaffolded",
    highlights: [
      "YARP-based reverse proxy with policy engine",
      "NativeAOT for sub-millisecond cold starts",
      "Zero-trust security posture",
      "Kubernetes-native operations",
    ],
  },
  {
    slug: "eventra",
    title: "Eventra",
    tagline: "Event Management Platform",
    description:
      "Backend-first event management with domain workflows for events, attendees, identity, and notifications. Built for predictable behavior at scale.",
    tier: "public",
    stack: [".NET 8", "ASP.NET Core", "Identity", "Clean Architecture"],
    status: "active",
    github: "https://github.com/feroz-hub/Eventra",
    caseStudy: true,
    highlights: [
      "Authentication and role-based access",
      "Scalable domain workflows",
      "Reliable notification boundaries",
      "Feature-ready architecture",
    ],
  },
  {
    slug: "resort-management",
    title: "Resort Management",
    tagline: "Hospitality Operations Backend",
    description:
      "Backend system for bookings and operational workflows — role-based access, booking-oriented workflows, and architecture built for extension.",
    tier: "public",
    stack: [".NET 8", "ASP.NET Core", "JWT Auth", "PostgreSQL"],
    status: "shipped",
    github: "https://github.com/feroz-hub/ResortManagement",
    caseStudy: true,
    highlights: [
      "Role-based access and backend consistency",
      "Booking-oriented workflows with future scale",
      "Architecture built for extension, not just launch",
    ],
  },
  {
    slug: "sdlc-analyzer",
    title: "SDLC Analyzer",
    tagline: "Compliance Intelligence Engine",
    description:
      "Combines backend architecture with ML-assisted analysis so teams can surface delivery signals earlier in the lifecycle.",
    tier: "public",
    stack: [".NET 8", "ML.NET", "Hugging Face", "Clean Architecture"],
    status: "shipped",
    github: "https://github.com/feroz-hub/SDLC_Analyzer",
    caseStudy: true,
    highlights: [
      "Structured API layer for analysis workflows",
      "ML-assisted processing behind stable boundaries",
      "Security-aware input/output handling",
    ],
  },
  {
    slug: "congocart",
    title: "CongoCart",
    tagline: "Commerce Backend",
    description:
      "E-commerce checkout backend focusing on validation, security, workflow clarity, and future scale support.",
    tier: "public",
    stack: [".NET 8", "ASP.NET Core", "JWT", "PostgreSQL"],
    status: "shipped",
    github: "https://github.com/feroz-hub/CongoCart",
    caseStudy: true,
    highlights: [
      "JWT-based access and role-aware checkout flows",
      "Order and cart behavior shaped for consistency",
      "Architecture designed to grow into a fuller platform",
    ],
  },
];

export const STATS = [
  { value: "3", label: "SaaS Platforms" },
  { value: "5", label: "FMCG Brands" },
  { value: "1", label: "OAuth Server from Scratch" },
  { value: "64+", label: "Repositories" },
] as const;

export interface Experience {
  company: string;
  role: string;
  period: string;
  stack: string;
  highlights: string[];
}

export const EXPERIENCES: Experience[] = [
  {
    company: "Future Beyond Tech",
    role: "Founder & Chief Architect",
    period: "2024 → Present",
    stack: "Next.js, .NET 8, PostgreSQL, OAuth 2.0, OIDC, Clean Architecture",
    highlights: [
      "Building RentFlow (multi-tenant property management SaaS) and Zentra (custom identity provider)",
      "Scaffolded Vyxnos Shield — zero-trust API gateway with YARP + NativeAOT",
      "Architecting the infrastructure layer for Indian SaaS startups",
    ],
  },
  {
    company: "FIROSE Enterprises",
    role: "CEO",
    period: "Ongoing",
    stack: "Next.js, .NET 8, Razorpay, Google Ads, next-intl",
    highlights: [
      "Leading a Chennai-based MSME conglomerate across FMCG divisions",
      "Brands: Neat & Fresh, The Femison, AR Perfumes",
      "Built 55-product digital brochure and e-commerce operations",
    ],
  },
  {
    company: "Olympus",
    role: "Lead Engineer",
    period: "Feb 2024 → Present",
    stack: ".NET 8, C#, Azure DevOps, Git, Python, Playwright",
    highlights: [
      "Migrated authentication hashing from MD5 to SHA-256",
      "Built end-to-end automation for critical workflows using Playwright",
      "Improved performance, scalability, and maintainability through targeted backend enhancements",
    ],
  },
  {
    company: "HCL Tech",
    role: "Software Engineer",
    period: "Nov 2023 → Jan 2024",
    stack: ".NET 8, C#, ML.NET, Hugging Face, Git",
    highlights: [
      "Built SDLC requirement analyzer using .NET 8, ML.NET, and Hugging Face models",
      "Supported deployment and production readiness for enterprise .NET systems",
    ],
  },
  {
    company: "CTGI",
    role: "App Developer",
    period: "May 2023 → Aug 2024",
    stack: "C#, .NET, OAuth 2.0, OpenID Connect, Azure, TFS",
    highlights: [
      "Integrated IdentityServer-based authentication and authorization",
      "Added mobile security layer that reduced vulnerability exposure",
    ],
  },
  {
    company: "Security Engineering",
    role: "Security Framework Developer",
    period: "Nov 2022 → Apr 2023",
    stack: "mTLS, JWT, OAuth 2.0, OIDC, .NET, C#, X.509",
    highlights: [
      "Enabled mTLS and JWT-based token security in hardened application framework",
      "Reinforced core authentication protocols for connected systems",
    ],
  },
];
