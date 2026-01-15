import { IdeaInput, ProjectIdea, DatasetEntry } from "@shared/schema";
import natural from "natural";

const tokenizer = new natural.WordTokenizer();

// === DATASETS ===

const TITLES: Record<string, string[]> = {
  "AIML": ["Smart Disease Predictor", "Customer Churn Analyzer", "AI Traffic Management", "Voice Assistant", "Fake News Detector", "Sentiment Analysis Dashboard", "Object Detection System", "Recommendation Engine"],
  "Web Dev": ["E-Commerce Platform", "Task Management SaaS", "Real-time Chat App", "Portfolio Generator", "Crowdfunding Portal", "Social Networking Site", "Personal Finance Tracker", "Blog Engine"],
  "Data Science": ["Stock Market Visualizer", "Global Warming Trends", "Sports Performance Analysis", "Crypto Price Tracker", "Housing Price Predictor", "Customer Segmentation Tool", "Sales Forecasting Model", "Air Quality Monitor"],
  "Cyber Security": ["Packet Sniffer Tool", "Password Strength Analyzer", "Network Intrusion Detector", "Encrypted Chat System", "Malware Signature Scanner", "SQL Injection Scanner", "Phishing Link Detector", "VPN Client"],
  "App Dev": ["Fitness Tracker", "Budget Manager", "Recipe Finder", "Meditation Timer", "Local Event Finder", "Language Learning App", "Travel Planner", "Habit Tracker"]
};

const PROBLEMS: Record<string, string[]> = {
  "AIML": [
    "Early detection of diseases is crucial but often delayed due to lack of accessible tools.",
    "Businesses lose revenue because they cannot predict when customers will leave.",
    "Traffic congestion causes massive delays and pollution in urban areas.",
    "The spread of misinformation on social media threatens public discourse.",
    "Users struggle to find relevant products in vast digital marketplaces."
  ],
  "Web Dev": [
    "Small businesses struggle to set up online stores quickly and affordably.",
    "Remote teams lack unified tools for managing tasks effectively.",
    "Existing communication tools are bloated and slow.",
    "Freelancers need a professional way to showcase their work and manage clients.",
    "Finding reliable crowdfunding for community projects is difficult."
  ],
  "Cyber Security": [
    "Users often use weak passwords, making them vulnerable to hacks.",
    "Public networks are insecure, leading to data theft.",
    "Malware is evolving faster than traditional antivirus signatures.",
    "Web applications are frequently targeted by SQL injection attacks.",
    "Phishing attacks are becoming increasingly sophisticated and hard to detect."
  ]
};

const FEATURES_BASE = ["User Authentication", "Responsive Design", "Dashboard Analytics", "Export Reports (PDF/CSV)", "Dark Mode Support"];

const FEATURES_DOMAIN: Record<string, string[]> = {
  "AIML": ["Model Training Interface", "Real-time Prediction", "Confusion Matrix Visualization", "Dataset Upload Support", "Model Export (.pkl/.h5)", "Hyperparameter Tuning", "Data Augmentation", "API Integration"],
  "Web Dev": ["Payment Gateway Integration", "Real-time Notifications (WebSockets)", "CMS for Admin", "Social Media Login", "SEO Optimization", "Progressive Web App (PWA)", "API Documentation", "Multi-language Support"],
  "Cyber Security": ["Packet Capture Engine", "Encryption (AES-256)", "Vulnerability Scanning", "Log Analysis", "IP Blocking", "Brute Force Protection", "Multi-factor Authentication", "Security Audit Logs"],
  "Data Science": ["Interactive Charts (D3/Plotly)", "Data Cleaning Pipeline", "Statistical Summary", "Predictive Modeling", "CSV/Excel Import", "Automated EDA Reports", "Anomalies Detection", "Geospatial Mapping"],
  "App Dev": ["Push Notifications", "Offline Mode", "GPS/Location Services", "Camera Integration", "App Store Optimization", "Cloud Syncing", "Biometric Login", "In-app Purchases"]
};

// Industry-grade AIML Configuration
const AIML_CONFIG = {
  Beginner: {
    models: ["Logistic Regression", "Decision Tree", "K-Means"],
    type: "Supervised / Unsupervised",
    metrics: ["Accuracy", "Precision", "Recall"]
  },
  Intermediate: {
    models: ["Random Forest", "XGBoost", "Gradient Boosting"],
    type: "Ensemble Learning",
    metrics: ["F1-Score", "ROC-AUC", "Mean Squared Error"]
  },
  Advanced: {
    models: ["CNN (Computer Vision)", "LSTM / GRU (Time-series)", "Transformers (NLP)", "Hybrid Models"],
    type: "Deep Learning / Research",
    metrics: ["Loss Curves", "Perplexity", "mAP (Mean Average Precision)"]
  }
};

const DATASETS_AIML: DatasetEntry[] = [
  { name: "Kaggle: Electronic Health Records", description: "Structured patient data (50k+ records) for clinical prediction." },
  { name: "UCI: Bank Marketing Data", description: "Consumer behavior logs for subscription classification." },
  { name: "Kaggle: City Traffic Images", description: "10GB+ dataset of urban surveillance for object detection." },
  { name: "UCI: Sentiment140", description: "1.6M tweets for sentiment analysis and NLP benchmarking." },
  { name: "Kaggle: Global Financial Indices", description: "Time-series data for multi-variate stock prediction." }
];

// === NLP UTILS ===

function calculateRelevance(title: string, domain: string): number {
  const titleTokens = tokenizer.tokenize(title.toLowerCase()) || [];
  const domainTokens = tokenizer.tokenize(domain.toLowerCase()) || [];
  
  let score = 0;
  titleTokens.forEach(t => {
    if (domainTokens.includes(t)) score += 1;
  });
  
  return score;
}

// === LOGIC ENGINE ===

export function generateProject(input: IdeaInput): ProjectIdea {
  const { domain, language, skillLevel, projectType } = input;

  // 1. Select Theme with NLP Scoring
  const domainTitles = TITLES[domain] || TITLES["Web Dev"];
  const candidates = Array.from({ length: 3 }, () => domainTitles[Math.floor(Math.random() * domainTitles.length)]);
  const baseTitle = candidates.reduce((best, current) => {
    return calculateRelevance(current, domain) >= calculateRelevance(best, domain) ? current : best;
  });
  
  // 2. Customize Title based on Type
  let finalTitle = baseTitle;
  if (projectType === "Mini Project") finalTitle = `Lite ${baseTitle}`;
  if (projectType === "Major Project") finalTitle = `Advanced ${baseTitle} System`;
  if (projectType === "Startup Idea") finalTitle = `${baseTitle} Pro Platform`;

  // 3. Problem Statement
  const domainProblems = PROBLEMS[domain] || ["Manual processes are inefficient and prone to error.", "Data is scattered and hard to analyze.", "Users lack a centralized platform for this task."];
  const problem = domainProblems[Math.floor(Math.random() * domainProblems.length)];

  // 4. Intelligence Upgrades: Problem-to-Model Alignment
  let description = `This project addresses the critical issue: "${problem}". By building a ${skillLevel.toLowerCase()} level ${domain} application using ${language}, it provides a scalable and efficient solution for users and organizations.`;
  
  let aimlData: Partial<ProjectIdea> = {};
  if (domain === "AIML") {
    const config = AIML_CONFIG[skillLevel];
    
    // Align model based on Problem Title
    let selectedModel = config.models[0];
    let selectedType = "Supervised Learning";
    let selectedMetric = config.metrics[0];

    if (baseTitle.includes("Predictor") || baseTitle.includes("Analyzer")) {
      selectedModel = config.models[Math.floor(Math.random() * config.models.length)];
      selectedType = skillLevel === "Advanced" ? "Deep Learning (Supervised)" : "Supervised Learning";
    } else if (baseTitle.includes("Detector") || baseTitle.includes("Detection")) {
      selectedModel = skillLevel === "Advanced" ? "CNN" : config.models[1];
      selectedType = "Computer Vision / Supervised";
      selectedMetric = "F1-Score";
    } else if (baseTitle.includes("Engine") || baseTitle.includes("Assistant")) {
      selectedModel = skillLevel === "Advanced" ? "Transformers" : config.models[2];
      selectedType = "Natural Language Processing (NLP)";
      selectedMetric = "Precision";
    }

    aimlData = {
      modelName: selectedModel,
      learningType: selectedType,
      evaluationMetric: selectedMetric,
      mlPipeline: [
        { stage: "Data Collection", details: "Ingesting raw structured/unstructured data from public repositories." },
        { stage: "Data Preprocessing", details: "Handling missing values, outlier detection, and normalization." },
        { stage: "Feature Engineering", details: "Dimensionality reduction (PCA) and relevant feature selection." },
        { stage: "Model Training", details: `Optimizing ${selectedModel} using GPU-accelerated environments.` },
        { stage: "Model Evaluation", details: `Validated using ${selectedMetric} on hold-out test sets.` },
        { stage: "Deployment Strategy", details: "Containerized deployment using Docker and RESTful API endpoints." }
      ]
    };

    if (skillLevel === "Advanced") {
      aimlData.advancedMetadata = {
        optimization: "Bayesian Hyperparameter Tuning with 5-fold Cross Validation.",
        explainability: "Model transparency using SHAP (SHapley Additive exPlanations).",
        scalability: "Horizontal scaling via Kubernetes clusters and Redis caching."
      };
    }

    description = `An industry-grade research project focusing on: "${problem}". It leverages a large-scale public dataset to train a ${selectedModel} model, focusing on high-precision outputs and model interpretability.`;
  }

  // 5. Tech Stack
  let stack: string[] = [];
  if (language === "Python") {
    if (domain === "Web Dev") stack = ["Python", "FastAPI", "PostgreSQL", "React", "Tailwind"];
    else if (domain === "AIML" || domain === "Data Science") stack = ["Python", "NumPy", "Scikit-Learn", "TensorFlow", "Matplotlib"];
    else if (domain === "Cyber Security") stack = ["Python", "Scapy", "Cryptography", "Nmap Library"];
    else stack = ["Python", "Flask", "SQLite", "Bootstrap"];
  } else if (language === "JavaScript") {
    if (domain === "Web Dev") stack = ["Node.js", "Express", "React", "PostgreSQL", "Redux"];
    else stack = ["JavaScript", "Node.js", "Socket.io", "MongoDB"];
  } else if (language === "Java") {
    stack = ["Java", "Spring Boot", "PostgreSQL", "Docker"];
    if (domain === "App Dev") stack = ["Java", "Android Studio", "Firebase"];
  } else if (language === "C++") {
    stack = ["C++", "Standard Template Library (STL)", "CMake"];
    if (domain === "Cyber Security") stack = ["C++", "OpenSSL", "WinAPI/Posix"];
  }

  // 6. Features
  const specificFeatures = FEATURES_DOMAIN[domain] || [];
  const selectedFeatures = [
    ...FEATURES_BASE.slice(0, 2),
    ...specificFeatures.sort(() => 0.5 - Math.random()).slice(0, skillLevel === "Beginner" ? 2 : skillLevel === "Intermediate" ? 4 : 6)
  ];

  // 7. Folder Structure
  let structure = "";
  if (language === "Python") {
    structure = `
project_root/
├── app/
│   ├── core/
│   ├── api/
│   └── models/
├── data/
├── notebooks/ (EDA)
├── tests/
├── requirements.txt
└── main.py`;
  } else if (language === "JavaScript") {
    structure = `
project_root/
├── src/
│   ├── components/
│   ├── hooks/
│   └── services/
├── server/
├── package.json
└── README.md`;
  } else {
    structure = `
project_root/
├── src/
│   ├── main/java/
│   └── resources/
├── build.gradle
└── README.md`;
  }

  // 8. Roadmap
  const roadmap = [
    "Requirement Analysis: Industry-grade scope definition",
    "Environment Setup: Docker/Cuda configuration",
    "ML Pipeline Design: Data ingestion and preprocessing",
    "Core Development: Model training and validation",
    "Deployment: API integration and cloud hosting",
    "Testing: Production-grade stress testing",
    "Documentation: Professional README and Technical Paper"
  ];

  // 9. Dataset (AIML only)
  let datasets: DatasetEntry[] | undefined = undefined;
  if (domain === "AIML") {
    datasets = DATASETS_AIML.sort(() => 0.5 - Math.random()).slice(0, 2);
  } else if (domain === "Data Science") {
    datasets = [{ name: "Public API: Data.gov", description: "Access to thousands of open datasets from the US government." }];
  }

  return {
    title: finalTitle,
    problemStatement: problem,
    description: description,
    keyFeatures: selectedFeatures,
    techStack: stack,
    datasetSuggestions: datasets,
    roadmap: roadmap,
    folderStructure: structure,
    futureEnhancements: ["Real-time Cloud Sync", "Multi-user Collaboration", "Predictive Analytics Engine"],
    ...aimlData
  };
}
