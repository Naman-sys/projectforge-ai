import { IdeaInput, ProjectIdea } from "@shared/schema";

// === DATASETS ===

const TITLES: Record<string, string[]> = {
  "AIML": ["Smart Disease Predictor", "Customer Churn Analyzer", "AI Traffic Management", "Voice Assistant", "Fake News Detector"],
  "Web Dev": ["E-Commerce Platform", "Task Management SaaS", "Real-time Chat App", "Portfolio Generator", "Crowdfunding Portal"],
  "Data Science": ["Stock Market Visualizer", "Global Warming Trends", "Sports Performance Analysis", "Crypto Price Tracker", "Housing Price Predictor"],
  "Cyber Security": ["Packet Sniffer Tool", "Password Strength Analyzer", "Network Intrusion Detector", "Encrypted Chat System", "Malware Signature Scanner"],
  "App Dev": ["Fitness Tracker", "Budget Manager", "Recipe Finder", "Meditation Timer", "Local Event Finder"]
};

const PROBLEMS: Record<string, string[]> = {
  "AIML": ["Early detection of diseases is crucial but often delayed due to lack of accessible tools.", "Businesses lose revenue because they cannot predict when customers will leave.", "Traffic congestion causes massive delays and pollution in urban areas."],
  "Web Dev": ["Small businesses struggle to set up online stores quickly and affordably.", "Remote teams lack unified tools for managing tasks effectively.", "Existing communication tools are bloated and slow."],
  "Cyber Security": ["Users often use weak passwords, making them vulnerable to hacks.", "Public networks are insecure, leading to data theft.", "Malware is evolving faster than traditional antivirus signatures."]
};

const FEATURES_BASE = ["User Authentication", "Responsive Design", "Dashboard Analytics", "Export Reports (PDF/CSV)", "Dark Mode Support"];

const FEATURES_DOMAIN: Record<string, string[]> = {
  "AIML": ["Model Training Interface", "Real-time Prediction", "Confusion Matrix Visualization", "Dataset Upload Support", "Model Export (.pkl/.h5)"],
  "Web Dev": ["Payment Gateway Integration", "Real-time Notifications (WebSockets)", "CMS for Admin", "Social Media Login", "SEO Optimization"],
  "Cyber Security": ["Packet Capture Engine", "Encryption (AES-256)", "Vulnerability Scanning", "Log Analysis", "IP Blocking"],
  "Data Science": ["Interactive Charts (D3/Plotly)", "Data Cleaning Pipeline", "Statistical Summary", "Predictive Modeling", "CSV/Excel Import"],
  "App Dev": ["Push Notifications", "Offline Mode", "GPS/Location Services", "Camera Integration", "App Store Optimization"]
};

// === LOGIC ENGINE ===

export function generateProject(input: IdeaInput): ProjectIdea {
  const { domain, language, skillLevel, projectType } = input;

  // 1. Select Theme
  const domainTitles = TITLES[domain] || TITLES["Web Dev"];
  const baseTitle = domainTitles[Math.floor(Math.random() * domainTitles.length)];
  
  // 2. Customize Title based on Type
  let finalTitle = baseTitle;
  if (projectType === "Mini Project") finalTitle = `Simple ${baseTitle}`;
  if (projectType === "Startup Idea") finalTitle = `NextGen ${baseTitle} Platform`;

  // 3. Problem Statement
  const domainProblems = PROBLEMS[domain] || ["Manual processes are inefficient and prone to error.", "Data is scattered and hard to analyze.", "Users lack a centralized platform for this task."];
  const problem = domainProblems[Math.floor(Math.random() * domainProblems.length)];

  // 4. Description
  const description = `This project aims to solve the problem of "${problem}" by building a ${skillLevel.toLowerCase()} level ${domain} application. The system will leverage ${language} to provide a robust solution.`;

  // 5. Tech Stack
  let stack: string[] = [];
  if (language === "Python") {
    if (domain === "Web Dev") stack = ["Python", "Django/FastAPI", "PostgreSQL", "HTML/CSS"];
    else if (domain === "AIML" || domain === "Data Science") stack = ["Python", "Pandas", "Scikit-Learn", "TensorFlow/PyTorch", "Jupyter"];
    else stack = ["Python", "Tkinter/PyQt", "SQLite"];
  } else if (language === "JavaScript") {
    if (domain === "Web Dev") stack = ["React", "Node.js", "Express", "MongoDB", "TailwindCSS"];
    else stack = ["JavaScript", "Electron", "Node.js"];
  } else if (language === "Java") {
    stack = ["Java", "Spring Boot", "MySQL", "Thymeleaf"];
    if (domain === "App Dev") stack = ["Java", "Android SDK", "Firebase", "XML Layouts"];
  } else if (language === "C++") {
    stack = ["C++", "STL", "CMake", "Qt"];
    if (domain === "Cyber Security") stack = ["C++", "OpenSSL", "libpcap", "Wireshark"];
  }

  // 6. Features
  const specificFeatures = FEATURES_DOMAIN[domain] || [];
  const selectedFeatures = [
    ...FEATURES_BASE.slice(0, 2), // Take 2 base features
    ...specificFeatures.slice(0, skillLevel === "Beginner" ? 2 : skillLevel === "Intermediate" ? 4 : 6)
  ];

  // 7. Folder Structure
  let structure = "";
  if (language === "Python") {
    structure = `
project-root/
├── main.py
├── requirements.txt
├── src/
│   ├── modules/
│   ├── utils/
│   └── data/
├── tests/
└── README.md`;
  } else if (language === "JavaScript") {
    structure = `
project-root/
├── package.json
├── src/
│   ├── components/
│   ├── pages/
│   └── api/
├── public/
└── README.md`;
  } else {
    structure = `
project-root/
├── src/
│   ├── main/
│   └── test/
├── config/
└── README.md`;
  }

  // 8. Roadmap
  const roadmap = [
    "Requirement Analysis & Planning",
    "Environment Setup & Installation",
    "Core Feature Implementation",
    "UI/UX Design & Integration",
    "Testing & Debugging",
    "Documentation & Deployment"
  ];

  // 9. Dataset (AIML only)
  const datasets = domain === "AIML" || domain === "Data Science" 
    ? ["Kaggle: " + baseTitle + " Dataset", "UCI Machine Learning Repository", "Mock generated data"] 
    : undefined;

  return {
    title: finalTitle,
    problemStatement: problem,
    description: description,
    keyFeatures: selectedFeatures,
    techStack: stack,
    datasetSuggestions: datasets,
    roadmap: roadmap,
    folderStructure: structure,
    futureEnhancements: ["Mobile App Integration", "AI-powered Insights", "Cloud Deployment (AWS/Azure)"]
  };
}
