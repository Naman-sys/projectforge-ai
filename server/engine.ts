import { IdeaInput, ProjectIdea, DatasetEntry, CodeTemplate } from "@shared/schema";
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

// === TEMPLATE GENERATORS ===

function getCodeTemplates(domain: string, language: string, skillLevel: string, modelName?: string): CodeTemplate[] {
  const templates: CodeTemplate[] = [];

  if (domain === "AIML") {
    if (language === "Python") {
      templates.push(
        {
          filename: "preprocessing.py",
          language: "python",
          content: `import pandas as pd\nimport numpy as np\nfrom sklearn.preprocessing import StandardScaler, LabelEncoder\n\ndef preprocess_data(df):\n    # 1. Handle missing values\n    df = df.fillna(df.mean())\n    \n    # 2. Encode categorical variables\n    le = LabelEncoder()\n    for col in df.select_dtypes(include=['object']):\n        df[col] = le.fit_transform(df[col])\n    \n    # 3. Feature Scaling\n    scaler = StandardScaler()\n    features = df.drop('target', axis=1)\n    scaled_features = scaler.fit_transform(features)\n    \n    return scaled_features, df['target']`
        },
        {
          filename: "train.py",
          language: "python",
          content: `import joblib\nfrom sklearn.model_selection import train_test_split\n# Model: ${modelName}\n\ndef train_model(X, y):\n    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)\n    # Logic for model training goes here\n    print("Training ${modelName}...")`
        },
        {
          filename: "requirements.txt",
          language: "plaintext",
          content: `pandas>=1.3.0\nnumpy>=1.21.0\nscikit-learn>=1.0.0\njoblib>=1.1.0`
        }
      );
    } else if (language === "JavaScript") {
      templates.push(
        {
          filename: "pipeline.js",
          language: "javascript",
          content: `const tf = require('@tensorflow/tfjs-node');\n\nasync function runPipeline() {\n  // Load and process data using TensorFlow.js\n  console.log("Initializing JS ML Pipeline for ${modelName}...");\n}`
        },
        {
          filename: "package.json",
          language: "json",
          content: `{\n  "dependencies": {\n    "@tensorflow/tfjs-node": "^4.0.0"\n  }\n}`
        }
      );
    } else if (language === "Java") {
      templates.push(
        {
          filename: "MLWorkflow.java",
          language: "java",
          content: `public class MLWorkflow {\n    public static void main(String[] args) {\n        System.out.println("Starting Java-based ML architecture...");\n        // DL4J / Weka scaffolding\n    }\n}`
        },
        {
          filename: "pom.xml",
          language: "xml",
          content: `<!-- DeepLearning4J or Weka dependencies -->`
        }
      );
    } else {
      // AI Integration for other languages
      templates.push({
        filename: "ai_client." + (language === "C++" ? "cpp" : "txt"),
        language: language.toLowerCase(),
        content: `// Integration for ${modelName} via REST API\n// Send inference requests to hosted model server`
      });
    }
  } else if (domain === "Web Dev") {
    if (language === "JavaScript") {
      templates.push(
        {
          filename: "server.js",
          language: "javascript",
          content: `const express = require('express');\nconst app = express();\n\napp.get('/', (req, res) => res.send('Web API Running'));\n\napp.listen(3000, () => console.log('Server started on port 3000'));`
        },
        {
          filename: "App.tsx",
          language: "typescript",
          content: `import React from 'react';\n\nexport default function App() {\n  return <div>Web Application Dashboard</div>;\n}`
        }
      );
    } else if (language === "Python") {
      templates.push({
        filename: "main.py",
        language: "python",
        content: `from fastapi import FastAPI\n\napp = FastAPI()\n\n@app.get("/")\ndef read_root():\n    return {"Status": "Web Server Running"}`
      });
    }
  } else if (domain === "App Dev") {
    if (language === "Java") {
      templates.push({
        filename: "MainActivity.java",
        language: "java",
        content: `package com.example.app;\n\nimport android.os.Bundle;\nimport androidx.appcompat.app.AppCompatActivity;\n\npublic class MainActivity extends AppCompatActivity {\n    @Override\n    protected void onCreate(Bundle savedInstanceState) {\n        super.onCreate(savedInstanceState);\n        setContentView(R.layout.activity_main);\n    }\n}`
      });
    }
  } else {
    // Default fallback
    templates.push({
      filename: "project_base.txt",
      language: "plaintext",
      content: `Base scaffolding for ${domain} project using ${language}.`
    });
  }

  return templates;
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
  let selectedModel: string | undefined;

  if (domain === "AIML") {
    const config = AIML_CONFIG[skillLevel];
    
    // Align model based on Problem Title
    selectedModel = config.models[0];
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
        { stage: "Model Training", details: `Optimizing ${selectedModel} using appropriate environments.` },
        { stage: "Model Evaluation", details: `Validated using ${selectedMetric} on hold-out test sets.` },
        { stage: "Deployment Strategy", details: "Integration and deployment as a microservice or standalone module." }
      ],
    };

    if (skillLevel === "Advanced") {
      aimlData.advancedMetadata = {
        optimization: "Advanced parameter optimization and cross-validation techniques.",
        explainability: "Model transparency and decision-making interpretability.",
        scalability: "Design for horizontal scaling and high-throughput inference.",
      };
    }

    description = `An industry-grade research project focusing on: "${problem}". It leverages relevant datasets to train a ${selectedModel} model, focusing on high-precision outputs and interpretability.`;
  }

  // Generate Code Templates based on domain and language
  const templates = getCodeTemplates(domain, language, skillLevel, selectedModel);

  // 5. Tech Stack
  let stack: string[] = [];
  if (language === "Python") {
    if (domain === "Web Dev") stack = ["Python", "FastAPI", "PostgreSQL", "React", "Tailwind"];
    else if (domain === "AIML" || domain === "Data Science") stack = ["Python", "NumPy", "Scikit-Learn", "TensorFlow", "Matplotlib"];
    else if (domain === "Cyber Security") stack = ["Python", "Scapy", "Cryptography", "Nmap Library"];
    else stack = ["Python", "Flask", "SQLite", "Bootstrap"];
  } else if (language === "JavaScript") {
    if (domain === "Web Dev") stack = ["Node.js", "Express", "React", "PostgreSQL", "Redux"];
    else if (domain === "AIML") stack = ["JavaScript", "TensorFlow.js", "Node.js", "Express"];
    else stack = ["JavaScript", "Node.js", "Socket.io", "MongoDB"];
  } else if (language === "Java") {
    stack = ["Java", "Spring Boot", "PostgreSQL", "Docker"];
    if (domain === "App Dev") stack = ["Java", "Android Studio", "Firebase"];
    else if (domain === "AIML") stack = ["Java", "DeepLearning4j", "Weka", "Maven"];
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
  if (domain === "AIML") {
    if (language === "Python") {
      structure = `project_root/\n├── data/\n├── models/\n├── src/\n│   ├── data/ (preprocessing.py)\n│   ├── models/ (train.py)\n├── requirements.txt\n└── main.py`;
    } else if (language === "JavaScript") {
      structure = `project_root/\n├── src/\n│   ├── ml/ (pipeline.js)\n├── package.json\n└── index.js`;
    } else {
      structure = `project_root/\n├── src/\n├── build/\n└── README.md`;
    }
  } else if (domain === "Web Dev") {
    structure = `project_root/\n├── src/\n│   ├── client/\n│   └── server/\n├── package.json\n└── README.md`;
  } else {
    structure = `project_root/\n├── src/\n├── tests/\n└── README.md`;
  }

  // 8. Roadmap
  const roadmap = [
    "Requirement Analysis: Industry-grade scope definition",
    "Environment Setup: Domain-specific configuration",
    "Architecture Design: Structuring the core application modules",
    "Core Development: Implementing key logic and features",
    "Integration: Connecting components and external services",
    "Testing: Production-grade quality assurance",
    "Documentation: Professional README and Technical guides"
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
    futureEnhancements: ["Scalability Optimization", "Cross-platform support", "Advanced Analytics Integration"],
    ...aimlData,
    codeTemplates: templates
  };
}
