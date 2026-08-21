export const aboutContent = {
  headline: 'Carlos Gonzalez',
  subtitle: 'Software Engineering Intern & CS Student at UTEP',
  bio: `Hey! I'm Carlos — a Computer Science student at The University of Texas at El Paso, expected to graduate in May 2027. I'm passionate about building full-stack web and mobile applications, with a growing focus on AI-powered tools.

I've interned at both a university research lab and a local startup, where I've shipped production websites, built mobile apps with Flutter, and developed AI systems using LangChain and OpenAI. I'm also the President of Google Developer Groups at UTEP, where I organize workshops and hackathons for 100+ attendees.

I'm a Dean's List student and Honors Program member who loves turning complex problems into clean, user-friendly solutions. Always open to new opportunities — feel free to reach out!`,
  location: 'El Paso, TX',
  email: 'cgonzalez94@miners.utep.edu',
  github: 'https://github.com/CarlosGonzalez0211',
  linkedin: 'https://linkedin.com/in/carlosgzg',
};

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
}

export const experienceData: Experience[] = [
  {
    company: 'University of Texas at El Paso',
    role: 'Software Engineering Intern',
    period: 'Sep 2023 — Present',
    description:
      'Building AI-powered tools and production websites for university faculty and stakeholders.',
    highlights: [
      'Developing an AI assistant for 1,300 faculty using LangChain, OpenAI APIs, and MongoDB vector search, reducing search time by 300%',
      'Built and shipped 4 production websites for faculty stakeholders, including forums and blogs',
      'Collaborating with designers and PMs across the full SDLC to deliver solutions meeting 100% of requirements',
    ],
  },
  {
    company: 'DropDev (Local Startup)',
    role: 'Software Engineering Intern — Mobile',
    period: 'Aug 2025 — Dec 2025',
    description:
      'Built the entire Flutter frontend for a full-stack mobile application.',
    highlights: [
      'Developed the complete Flutter frontend with responsive UI components and internationalization (i18n) across multiple locales',
      'Collaborated in daily Agile/Scrum workflows, coordinating API contracts and endpoint integration with backend developer',
    ],
  },
  {
    company: 'DropDev (Local Startup)',
    role: 'Software Engineering Intern — Web',
    period: 'May 2025 — Aug 2025',
    description:
      'Developed production websites for small businesses and managed full deployment pipelines.',
    highlights: [
      'Improved 5 companies\' online presence by developing production websites using React.js, Tailwind CSS, HTML, and JavaScript',
      'Managed full deployment pipeline using GitHub Actions, Vercel, Porkbun, and GitHub Pages for reliable continuous deployment',
    ],
  },
  {
    company: 'DropDev (Local Startup)',
    role: 'Software Engineering Intern — AI',
    period: 'May 2024 — Aug 2024',
    description:
      'Developed an AI question-answer system with RAG for client data analysis.',
    highlights: [
      'Built an AI Q&A system using React.js, Flask, and OpenAI API with Retrieval-Augmented Generation over a vector database',
      'Led Scrum meetings and Git workflows, increasing team productivity by 35%',
    ],
  },
];

export interface Project {
  name: string;
  description: string;
  tech: string[];
  link?: string;
  github?: string;
}

export const projectsData: Project[] = [
  {
    name: 'UTEP AI Faculty Assistant',
    description:
      'AI assistant that simplifies access to university services and policies for 1,300 faculty members, using vector search and RAG.',
    tech: ['LangChain', 'OpenAI API', 'MongoDB', 'Python'],
    github: 'https://github.com/CarlosGonzalez0211',
  },
  {
    name: 'Bloomberg Tech Lab App',
    description:
      'Full-stack web application built during Bloomberg Tech Lab on Campus, with in-memory caching and containerized deployment.',
    tech: ['React', 'Flask', 'Redis', 'Docker'],
    github: 'https://github.com/CarlosGonzalez0211',
  },
  {
    name: 'AI Tournament Predictor',
    description:
      'Binary classification model using BigQuery ML to predict NCAA tournament outcomes, achieving 65% accuracy in winner predictions.',
    tech: ['SQL', 'BigQuery ML', 'Machine Learning', 'Python'],
    github: 'https://github.com/CarlosGonzalez0211',
  },
  {
    name: 'DropDev AI Q&A System',
    description:
      'RAG-powered question-answer system that lets clients upload data and receive tailored AI responses to improve decision-making.',
    tech: ['React.js', 'Flask', 'OpenAI API', 'Vector DB'],
    github: 'https://github.com/CarlosGonzalez0211',
  },
];

export interface TechCategory {
  category: string;
  items: { name: string; icon: string }[];
}

export const techStackData: TechCategory[] = [
  {
    category: 'Languages',
    items: [
      { name: 'Python', icon: '🐍' },
      { name: 'JavaScript', icon: '🟨' },
      { name: 'TypeScript', icon: '🔷' },
      { name: 'Java', icon: '☕' },
      { name: 'SQL', icon: '🗄️' },
      { name: 'Dart', icon: '🎯' },
      { name: 'GoLang', icon: '🐹' },
    ],
  },
  {
    category: 'Frameworks & Libraries',
    items: [
      { name: 'React.js', icon: '⚛️' },
      { name: 'Node.js', icon: '🟢' },
      { name: 'Flutter', icon: '🦋' },
      { name: 'Angular', icon: '🅰️' },
      { name: 'LangChain', icon: '🔗' },
      { name: 'PyTorch', icon: '🔥' },
      { name: 'HuggingFace', icon: '🤗' },
      { name: 'NumPy', icon: '🔢' },
    ],
  },
  {
    category: 'Tools & Cloud',
    items: [
      { name: 'Firebase', icon: '🔶' },
      { name: 'Docker', icon: '🐳' },
      { name: 'MongoDB Atlas', icon: '🍃' },
      { name: 'Supabase', icon: '⚡' },
      { name: 'BigQuery', icon: '📊' },
      { name: 'GitHub Actions', icon: '⚙️' },
      { name: 'Vercel', icon: '▲' },
      { name: 'Git', icon: '🔀' },
    ],
  },
  {
    category: 'AI Development Tools',
    items: [
      { name: 'Claude Code', icon: '🤖' },
      { name: 'Cursor', icon: '✨' },
      { name: 'ChatGPT', icon: '💬' },
      { name: 'Gemini', icon: '♊' },
      { name: 'OpenAI Codex', icon: '🧠' },
    ],
  },
  {
    category: 'Practices',
    items: [
      { name: 'Agile/Scrum', icon: '🏃' },
      { name: 'CI/CD', icon: '🔄' },
      { name: 'API Integration', icon: '🔌' },
      { name: 'i18n', icon: '🌐' },
    ],
  },
];

export interface Trip {
  title: string;
  location: string;
  date: string;
  description: string;
}

export const tripsData: Trip[] = [
  {
    title: 'Bloomberg Tech Lab on Campus',
    location: 'El Paso, TX',
    date: 'February 2025',
    description:
      'Built a full-stack web app during an intensive Bloomberg-sponsored program with React, Flask, Redis, and Docker.',
  },
  {
    title: 'GDG Workshops & Hackathons',
    location: 'UTEP, El Paso, TX',
    date: '2022 — Present',
    description:
      'Organized and led workshops on Angular, Android Studio, Firebase, Flutter, and Google Cloud for 100+ attendees as GDG President.',
  },
  {
    title: 'CodePath Mentorship',
    location: 'Remote',
    date: 'May — Aug 2025',
    description:
      'Mentored students on resume optimization, LinkedIn profiles, interview preparation, and career advising.',
  },
  {
    title: 'DropDev Startup Journey',
    location: 'El Paso, TX',
    date: '2024 — 2025',
    description:
      'Three internship stints at a local startup — from AI systems to web development to mobile apps, growing across the full stack.',
  },
];

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

export const testimonialsData: Testimonial[] = [
  {
    quote:
      "Carlos is one of the most dedicated developers I've worked with. He doesn't just write code — he solves problems.",
    name: 'Placeholder',
    role: 'Engineering Manager',
    company: 'DropDev',
  },
  {
    quote:
      'His ability to translate complex requirements into elegant solutions is remarkable. A true team player.',
    name: 'Placeholder',
    role: 'Faculty Stakeholder',
    company: 'UTEP',
  },
  {
    quote:
      'Carlos brought our frontend to the next level. His attention to UX detail and performance is exceptional.',
    name: 'Placeholder',
    role: 'Project Lead',
    company: 'DropDev',
  },
];

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  credential?: string;
  description: string;
  skills: string[];
}

export const certsData: Certification[] = [
  {
    name: 'Intro to Large Language Models',
    issuer: 'Online Certification',
    date: '2024',
    description: 'Foundational training in how large language models work and how to build useful applications with them.',
    skills: ['LLM fundamentals', 'Prompt engineering', 'AI application design'],
  },
  {
    name: 'Intro to Project Management',
    issuer: 'Online Certification',
    date: '2024',
    description: 'Practical training in planning, organizing, and communicating software projects from kickoff through delivery.',
    skills: ['Project planning', 'Agile workflows', 'Stakeholder communication'],
  },
  {
    name: 'CodePath Web Development',
    issuer: 'CodePath',
    date: '2024',
    description: 'Hands-on web development program focused on building responsive interfaces and shipping projects with modern tools.',
    skills: ['HTML/CSS', 'JavaScript', 'Responsive UI', 'Git'],
  },
];

export const interestsContent = `# Things I enjoy outside of code

## 🎮 Videogames
RPGs are my weakness — I can spend hundreds of hours in a single world. Currently playing through some massive open-world adventures. Favorite series include Zelda, Final Fantasy, and Souls-likes.

## 🎵 Music
Everything from lo-fi beats while coding to metal when I need energy. Always have headphones on.

## ✈️ Travel
I love exploring new cities, trying local food, and meeting people from different cultures. Born and raised near the border — the mix of Mexican and American culture shapes how I see the world.

## 📚 Learning
I'm a lifelong learner. Whether it's a new framework, a design pattern, or a completely different field — I love understanding how things work. Currently deep into AI/ML and LLMs.

## 🏋️ Fitness
Helps me stay sharp and balanced. A good workout clears the mind better than anything.`;

export const trashFiles = [
  {
    name: 'rejected_startup_ideas.txt',
    content:
      "1. Uber for dogs\n2. Blockchain-powered todo list\n3. AI that writes your excuses\n4. NFT of my lunch\n5. Social network for introverts (just a blank page)",
  },
  {
    name: 'cover_letter_v47_FINAL.md',
    content:
      "Dear Hiring Manager,\n\nI am writing to express my extreme interest in... ah forget it, I'll just build something cool and show them.",
  },
  {
    name: 'monday_motivation.txt',
    content:
      "You got this!\n\n...is what I tell myself every Monday at 6 AM.\n\nSpoiler: I do not, in fact, got this.",
  },
];
