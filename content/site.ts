// Single source of truth for every piece of copy on the site.
// No invented facts, links, testimonials or images beyond what is written here.

export const site = {
  name: "Nimsara Gamage",
  role: "Software engineer, systems builder and digital artist.",
  tagline:
    "Full-stack and DevOps engineer in Malabe, Sri Lanka, with a self-taught artist's eye for form.",
  email: "senathngamage@gmail.com",
  linkedin: "linkedin.com/in/senath-gamage",
  linkedinUrl: "https://linkedin.com/in/senath-gamage",
  phone: "+94 78 77 1212 7", // included in the data, hidden by default
  location: "Malabe, Sri Lanka",
  languages: [
    { name: "English", level: "fluent" },
    { name: "Sinhala", level: "native" },
  ],
  statement:
    "I build the product, then run what it lives on. I turn slow, fragile systems into fast, reliable ones.",
  facts: [
    "Based in Malabe, Sri Lanka.",
    "Leads by code review, mentoring and architecture decisions.",
    "Full-stack and DevOps engineer with a self-taught artist's eye.",
    "26 published 3D models on CGTrader since 2016.",
  ],
  education: [
    {
      degree: "BEng (Hons) Software Engineering",
      school: "London Metropolitan University (UK) via ESOFT",
      period: "2025 to 2026",
      note: "First Class Honours, top performer",
    },
    {
      degree: "HND Information Technology",
      school: "SLIIT",
      period: "2020 to 2023",
    },
    {
      degree: "G.C.E. A/L Physical Science",
      school: "Dharmaraja College, Kandy",
      period: "2020",
    },
  ],
  range: [
    {
      id: "backend",
      title: "Backend",
      statement: "Services that stay fast as they grow.",
      tools: ["PHP", "Laravel", "Go", "NestJS"],
      color: "violet",
    },
    {
      id: "infrastructure",
      title: "Infrastructure",
      statement: "Production that runs itself.",
      tools: ["Linux", "Docker", "MicroK8s", "CI/CD"],
      color: "inkTint",
    },
    {
      id: "interfaces",
      title: "Interfaces",
      statement: "Front ends people enjoy using.",
      tools: ["Vue.js", "TypeScript", "Next.js", "React"],
      color: "lilac",
    },
    {
      id: "form",
      title: "Form",
      statement: "A self-taught artist's eye.",
      tools: ["Blender", "since 2016"],
      color: "deepViolet",
    },
  ] as const,
  experience: [
    {
      company: "Elevex Technologies (Pvt) Ltd",
      role: "Software Engineer",
      period: "Jan 2025 to present",
      points: [
        "Owns production deployment on Linux, Docker and MicroK8s with CI/CD.",
        "Designs multi-tenant databases and leads front-end and back-end delivery.",
        "Mentors junior developers through code review and technical interviews.",
      ],
    },
    {
      company: "Ceylon Linux (Pvt) Ltd",
      role: "Software Developer",
      period: "Feb 2024 to Jan 2025",
      points: [
        "Built Laravel and Go microservices and cut database query times by 40%.",
        "Maintained legacy PHP systems.",
        "Shipped third-party integrations.",
      ],
    },
    {
      company: "Ceylon Linux (Pvt) Ltd",
      role: "Intern Backend Developer",
      period: "Sep 2023 to Feb 2024",
      points: [
        "Built Laravel and Go microservices and cut database query times by 40%.",
        "Maintained legacy PHP systems.",
        "Shipped third-party integrations.",
      ],
    },
  ],
  projects: [
    {
      name: "Private project management platform",
      description:
        "Internal tool for team workflows, task tracking and role-based access.",
      status: "Screenshots coming soon",
    },
    {
      name: "Social and learning platform",
      description:
        "Hybrid social network and LMS: course delivery, progress tracking, community.",
      status: "Screenshots coming soon",
    },
  ],
  art: {
    count: 26,
    caption: "published 3D models on CGTrader",
    detail: "7.8K+ views, since 2016.",
  },
  nav: [
    { label: "Range", href: "#range" },
    { label: "Who I am", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "Form", href: "#form" },
    { label: "Contact", href: "#contact" },
  ],
} as const;

export type Site = typeof site;
