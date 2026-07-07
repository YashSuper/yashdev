export const profile = {
  name: "Yash Bharadwaj",
  role: "Senior Frontend Engineer & Tech Lead",
  headline: "I design frontend systems that stay fast at enterprise scale.",
  subheadline:
    "Six years shipping React, Next.js and decoupled Drupal platforms for enterprise clients — leading architecture, mentoring engineers, and turning slow, fragile frontends into products teams love to build on.",
  location: "Jaipur, India · Working globally (remote)",
  email: "yashbharadwajsuper@gmail.com",
  availability: "Open to senior frontend & tech lead roles",
  resumeUrl: "#",
  photo: null, // drop a professional photo at src/assets/portrait.jpg and import it in Hero
  social: [
    { label: "GitHub", href: "https://github.com/yashbharadwaj", icon: "github" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/yashbharadwaj",
      icon: "linkedin",
    },
    { label: "X / Twitter", href: "https://x.com/yashbharadwaj", icon: "twitter" },
    { label: "Email", href: "mailto:yashbharadwajsuper@gmail.com", icon: "mail" },
  ],
};

export const navSections = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "philosophy", label: "Philosophy" },
  { id: "writing", label: "Writing" },
  { id: "contact", label: "Contact" },
];

export const metrics = [
  { value: "6+", label: "Years of experience", detail: "React, Next.js & Drupal" },
  { value: "3", label: "Enterprise products", detail: "Shipped as tech lead" },
  { value: "10k+", label: "CMS pages served", detail: "On decoupled Drupal" },
  { value: "8+", label: "Engineers led", detail: "Across product teams" },
  { value: "58%", label: "Faster first paint", detail: "3.8s → 1.6s FCP" },
];

export const caseStudies = [
  {
    id: "hcltech-experience-center",
    tag: "Real-time systems",
    title: "HCLTech Experience Center",
    summary:
      "A synchronized multi-screen platform powering an executive briefing center, where a presenter drives a dozen large-format displays in real time.",
    problem:
      "HCLTech's briefing center needed a dozen wall-sized displays to react in perfect sync as a presenter walked executives through content. Off-the-shelf signage tools couldn't handle presenter-driven, real-time choreography — and a visible lag or desync in front of C-level visitors was unacceptable.",
    role: "Tech Lead — owned frontend architecture, led 8 engineers, and worked directly with the client's experience-design team.",
    architecture: [
      "WebSocket-based state channel with a single source of truth: every screen is a stateless renderer subscribed to a shared scene graph.",
      "Deterministic scene transitions keyed to server timestamps, so displays stay in sync even when a client reconnects mid-presentation.",
      "React with a thin rendering layer per screen type — a new display size or orientation is a config entry, not a new build.",
    ],
    challenges: [
      "Recovering gracefully from network drops without a visible flicker on any wall display.",
      "GPU-heavy full-screen animation running for hours without memory creep on embedded players.",
    ],
    solution:
      "Built an idempotent, snapshot-on-reconnect protocol so any screen can rejoin and render the correct frame within one tick. Profiled and eliminated long-session leaks by recycling animation layers, keeping the system stable across full-day events.",
    impact: [
      "Sub-100ms sync across 12 concurrent displays",
      "Zero failed executive demos since launch",
      "New screen layouts onboarded in hours, not sprints",
    ],
    lessons:
      "Real-time UIs are distributed systems. Designing for reconnection first — not as an edge case — is what made the product feel bulletproof.",
    stack: ["React", "TypeScript", "WebSockets", "Node.js", "GSAP", "Docker"],
  },
  {
    id: "o2e-booking-platforms",
    tag: "Decoupled CMS",
    title: "O2E Brands Booking Platforms",
    summary:
      "Rebuilt the booking funnels for a family of home-service brands on a shared React + decoupled Drupal architecture.",
    problem:
      "Each brand ran its own aging monolithic site. Marketing couldn't ship landing pages without engineering, funnels were slow on mobile, and every brand-specific change multiplied maintenance cost across codebases.",
    role: "Senior Frontend Engineer — designed the shared frontend architecture and the CMS content model alongside Drupal backend engineers.",
    architecture: [
      "One white-label React SPA consuming a decoupled Drupal API, themed per brand through a design-token layer.",
      "Content model where marketers compose pages from a library of validated, accessible components.",
      "Route-level code splitting and aggressive caching of CMS responses at the edge.",
    ],
    challenges: [
      "Keeping a multi-step booking flow resilient to CMS content changes made by non-engineers.",
      "Meeting Core Web Vitals targets on content-heavy pages with third-party marketing scripts.",
    ],
    solution:
      "Introduced schema validation between CMS and frontend so malformed content degrades gracefully instead of breaking checkout. Cut first contentful paint from 3.8s to 1.6s through code splitting, image optimization and script deferral.",
    impact: [
      "FCP improved 3.8s → 1.6s",
      "Engagement up 25%, conversions up 17%",
      "Marketing ships pages with zero engineering time",
    ],
    lessons:
      "The contract between CMS and frontend is an API like any other — versioning and validating it is what makes decoupled architectures survive real editorial teams.",
    stack: ["React", "TypeScript", "Drupal", "JSON:API", "Redux", "Tailwind CSS"],
  },
  {
    id: "enterprise-cms-platform",
    tag: "Platform & design systems",
    title: "Enterprise CMS Publishing Platform",
    summary:
      "A component-driven publishing platform serving 10k+ pages, with a design system that let editorial teams scale content without scaling headcount.",
    problem:
      "A global content operation was publishing thousands of pages across regions with inconsistent markup, inaccessible components, and no shared source of truth — every redesign meant re-touching every page.",
    role: "Tech Lead — owned the design system, component API standards, and the frontend build and release pipeline.",
    architecture: [
      "Headless CMS feeding a typed component registry: every page is data, every component is versioned and documented.",
      "Design tokens as the single theming source across web properties.",
      "Visual regression and accessibility checks wired into CI so regressions fail the build, not the audit.",
    ],
    challenges: [
      "Migrating 10k+ legacy pages without content freezes or SEO loss.",
      "Enforcing accessibility across components authored by multiple teams.",
    ],
    solution:
      "Ran an incremental migration behind stable URLs with automated redirect mapping and parity checks. Shipped WCAG AA-compliant components with axe checks in CI, making accessibility the default rather than a review step.",
    impact: [
      "10k+ pages migrated with zero SEO regression",
      "Page build time for editors cut from days to hours",
      "Accessibility violations caught in CI, not production",
    ],
    lessons:
      "A design system succeeds when the easiest path is the correct one. Guardrails in CI beat guidelines in Confluence every time.",
    stack: ["Next.js", "TypeScript", "Drupal", "Storybook", "Playwright", "GitHub Actions"],
  },
];

export const experience = [
  {
    role: "Senior Software Engineer · Tech Lead",
    company: "Innoraft Solutions",
    period: "2022 — Present",
    location: "Jaipur, India",
    points: [
      "Lead a team of 8+ engineers across enterprise frontend and CMS projects, owning architecture decisions and code standards.",
      "Architected the real-time multi-screen platform for HCLTech's executive briefing center.",
      "Drove performance program that cut first contentful paint by 58% and lifted conversions 17% on client booking platforms.",
      "Mentor engineers through design reviews, pairing, and an internal frontend guild.",
    ],
    stack: ["React", "Next.js", "TypeScript", "Drupal", "Node.js"],
  },
  {
    role: "Software Engineer",
    company: "Innoraft Solutions",
    period: "2020 — 2022",
    location: "Jaipur, India",
    points: [
      "Built decoupled Drupal frontends in React for enterprise clients, from content modeling to release.",
      "Introduced TypeScript, component testing, and CI quality gates that became company-wide defaults.",
      "Shipped accessible, WCAG AA component libraries reused across client projects.",
    ],
    stack: ["React", "Drupal", "Redux", "SCSS", "Jest"],
  },
  {
    role: "Frontend Developer",
    company: "Early career & freelance",
    period: "2018 — 2020",
    location: "India",
    points: [
      "Delivered marketing sites, dashboards and CMS builds for agencies and direct clients.",
      "Learned the fundamentals the hard way: browser quirks, performance budgets, and shipping under real deadlines.",
    ],
    stack: ["JavaScript", "PHP", "Drupal", "WordPress"],
  },
];

export const skillGroups = [
  {
    title: "Frontend",
    blurb: "The core of my craft — component architecture and product UI.",
    skills: ["React", "Next.js", "TypeScript", "Redux / Zustand", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Architecture",
    blurb: "Designing systems that survive team growth and changing requirements.",
    skills: ["Design systems", "Micro-frontends", "Monorepos", "API contract design", "State architecture"],
  },
  {
    title: "CMS & Content",
    blurb: "Enterprise publishing at scale, decoupled by default.",
    skills: ["Drupal (decoupled)", "JSON:API / GraphQL", "Content modeling", "Editorial workflows"],
  },
  {
    title: "Performance",
    blurb: "Budgets, not vibes. Measured on real users.",
    skills: ["Core Web Vitals", "Bundle analysis", "Code splitting", "Caching & CDN", "Lighthouse CI"],
  },
  {
    title: "Testing & Quality",
    blurb: "Confidence to refactor comes from the test suite.",
    skills: ["Playwright", "Jest / Vitest", "Testing Library", "Visual regression", "axe / a11y audits"],
  },
  {
    title: "DevOps & Tooling",
    blurb: "Owning the path from commit to production.",
    skills: ["GitHub Actions", "Docker", "Vite / build tooling", "Vercel / Netlify", "Monitoring"],
  },
  {
    title: "AI-assisted engineering",
    blurb: "Using LLMs as leverage — with engineering judgment in the loop.",
    skills: ["AI pair programming", "Prompt design", "RAG-backed docs & search", "LLM API integration"],
  },
];

export const philosophy = [
  {
    title: "Scalability is a people problem",
    body: "Code scales when the tenth engineer can contribute as safely as the first. I optimize for clear module boundaries, typed contracts, and conventions a new hire can absorb in a week.",
  },
  {
    title: "Maintainability over cleverness",
    body: "The best abstraction is the one you can delete. I keep components boring, colocate what changes together, and treat every dependency as a long-term liability to justify.",
  },
  {
    title: "Accessibility is table stakes",
    body: "WCAG AA is the floor, not the ceiling. Semantic HTML first, keyboard paths always, and automated a11y checks in CI so regressions never reach users.",
  },
  {
    title: "Performance is a feature",
    body: "Users feel milliseconds before they see features. I set performance budgets at the start of a project and treat a regression like a failing test.",
  },
  {
    title: "Developer experience compounds",
    body: "Fast builds, honest types, and one-command setups aren't luxuries — they're how teams ship every day. I invest in the tooling that makes the right thing the easy thing.",
  },
];

export const articles = [
  {
    title: "Designing reconnection-first realtime UIs",
    description:
      "What building a 12-screen synchronized platform taught me about treating the frontend as a distributed system.",
    tag: "Architecture",
    readTime: "9 min read",
    href: "#",
  },
  {
    title: "Decoupled Drupal in production: the contract is everything",
    description:
      "Schema validation, versioning, and the practices that keep a headless CMS from breaking your checkout flow.",
    tag: "CMS",
    readTime: "7 min read",
    href: "#",
  },
  {
    title: "Cutting FCP from 3.8s to 1.6s without a rewrite",
    description:
      "A field report on performance budgets, code splitting, and the third-party script negotiations nobody warns you about.",
    tag: "Performance",
    readTime: "11 min read",
    href: "#",
  },
];

export const openSource = [
  {
    name: "react-sync-screens",
    description:
      "Primitives for building multi-display, WebSocket-synchronized React UIs with reconnection built in.",
    language: "TypeScript",
    stats: "Extracted from production",
    href: "#",
  },
  {
    name: "drupal-schema-guard",
    description:
      "Runtime schema validation for decoupled Drupal JSON:API responses — fail soft, never break the page.",
    language: "TypeScript",
    stats: "Used across client projects",
    href: "#",
  },
  {
    name: "a11y-ci-presets",
    description:
      "Opinionated axe-core + Playwright presets that make WCAG AA checks a one-line addition to CI.",
    language: "JavaScript",
    stats: "Internal → open sourced",
    href: "#",
  },
];

export const testimonials = [
  {
    quote:
      "Yash doesn't just build what's asked — he pushes back on the right things and the product ends up better for it. The briefing center hasn't missed a single demo.",
    name: "Placeholder — Client Director",
    role: "Enterprise Experience Program",
  },
  {
    quote:
      "The clearest technical communicator on the team. He turned our slowest property into our fastest and taught the team how he did it.",
    name: "Placeholder — Engineering Manager",
    role: "Digital Platforms",
  },
  {
    quote:
      "As a junior I dreaded code review until Yash ran them. Six months of his mentorship changed the trajectory of my career.",
    name: "Placeholder — Software Engineer",
    role: "Mentee, Frontend Guild",
  },
];
