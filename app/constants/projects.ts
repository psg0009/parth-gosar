export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tech: string[];
  image?: string;
  github?: string;
  live?: string;
  paper?: string;
  featured: boolean;
  category: "medical" | "ai" | "research" | "startup" | "web";
}

export const projects: Project[] = [
  // Featured GitHub Projects
  {
    id: "vibe-debug",
    title: "Vibe-Debug",
    description: "AI-powered debugging tool using Gemini 3 Pro for visual bug detection. Upload two PNG screenshots + code to identify buggy lines, generate diff fixes, and create Jest/Playwright tests automatically.",
    longDescription: "Built with TypeScript and Vite, this tool leverages Google's Gemini API to analyze screenshot pairs, spot differences, and produce automated test cases within seconds.",
    tech: ["TypeScript", "Vite", "Gemini 3 Pro", "Node.js", "Jest", "Playwright"],
    github: "https://github.com/psg0009/Vibe-Debug",
    featured: true,
    category: "ai",
  },
  {
    id: "climate-methodology-gen",
    title: "Climate Research Methodology Generator",
    description: "Fine-tuned T5 and BART transformer models to generate research methodologies from climate science problem statements, achieving ROUGE-L of 0.421 and BERTScore of 0.851.",
    longDescription: "Academic project using Hugging Face Transformers with the ClimateFever dataset, optimized with Optuna hyperparameter tuning on Google Colab with Tesla T4 GPU.",
    tech: ["T5", "BART", "Hugging Face", "NLP", "Climate Science", "Optuna"],
    github: "https://github.com/psg0009/CMPSC-497-Final-Project-",
    featured: true,
    category: "ai",
  },
  {
    id: "goldbach-conjecture",
    title: "Goldbach Conjecture Analysis",
    description: "Computational research validating Goldbach's Conjecture and analyzing Prime Gaps using Cramér's Conjecture, extending verification beyond 4×10¹⁸ with interactive Plotly visualizations.",
    longDescription: "Demonstrates prime gap validation following Cramér's bound ((log p)²), with Python scripts for gap computation, conjecture verification, and distribution analysis.",
    tech: ["Python", "Number Theory", "Plotly", "Data Analysis", "Mathematics"],
    github: "https://github.com/psg0009/Goldbach-Conjecture-Analysis",
    featured: true,
    category: "research",
  },
  {
    id: "synthetic-data-ml",
    title: "Synthetic Healthcare Data Privacy",
    description: "Research on synthetic patient data for healthcare AI, evaluating utility, security, and privacy using CTGAN/MedGAN generation with differential privacy achieving ~95% model accuracy.",
    longDescription: "Implements membership inference attacks, adversarial FGSM attacks, and federated learning approaches. XGBoost and LSTM models for disease prediction with privacy safeguards.",
    tech: ["Python", "CTGAN", "MedGAN", "XGBoost", "LSTM", "Differential Privacy"],
    github: "https://github.com/psg0009/SyntheticData-ML",
    featured: true,
    category: "medical",
  },
  {
    id: "likhit",
    title: "Likhit - Handwriting Analysis",
    description: "Novel handwriting analysis platform with OCR leveraging GPT-4, achieving 97% recognition accuracy for educational feedback.",
    longDescription: "AI-powered handwriting recognition system that provides detailed analysis and educational feedback to help improve penmanship and writing skills.",
    tech: ["JavaScript", "Python", "GPT-4", "OCR", "Machine Learning"],
    github: "https://github.com/psg0009/Likhit",
    featured: true,
    category: "ai",
  },
  {
    id: "biasbusters",
    title: "BiasBusters - AI Fairness Game",
    description: "Educational web game teaching AI bias concepts through interactive prompt engineering challenges. Players learn to identify and mitigate bias in AI systems.",
    longDescription: "Built with Next.js and Claude API, featuring Firebase authentication and real-time leaderboards. Players progress through levels learning about different types of AI bias and fairness concepts.",
    tech: ["Next.js", "TypeScript", "Claude API", "Firebase", "Tailwind CSS"],
    github: "https://github.com/ved-2004/Bias-Removal-Prompt-Game",
    featured: true,
    category: "ai",
  },
  // Non-featured projects
  {
    id: "sequence-alignment",
    title: "Sequence Alignment Tool",
    description: "Bioinformatics tool for DNA/protein sequence alignment using dynamic programming algorithms including Needleman-Wunsch and Smith-Waterman.",
    tech: ["Python", "Bioinformatics", "Dynamic Programming", "Shell"],
    github: "https://github.com/psg0009/Sequence-Alignment",
    featured: false,
    category: "research",
  },
  {
    id: "cmpsc-311",
    title: "Systems Programming Projects",
    description: "Collection of systems programming assignments in C, covering memory management, file I/O, data structures, and low-level system operations.",
    tech: ["C", "Systems Programming", "Memory Management", "File I/O"],
    github: "https://github.com/psg0009/CMPSC-311",
    featured: false,
    category: "research",
  },
  {
    id: "stock-price-dashboard",
    title: "Stock Price Dashboard",
    description: "Real-time stock price visualization dashboard with interactive charts, market analysis, and live data feeds.",
    tech: ["JavaScript", "HTML", "Data Visualization", "REST APIs", "Finance"],
    github: "https://github.com/psg0009/stock-price-dashboard-",
    featured: false,
    category: "web",
  },
  {
    id: "svm-ml-project",
    title: "SVM Machine Learning Project",
    description: "Support Vector Machine implementation achieving 97.24% training accuracy and 76.55% test accuracy for classification tasks.",
    longDescription: "Academic project exploring SVM algorithms with various kernel functions and hyperparameter optimization techniques.",
    tech: ["Python", "Scikit-learn", "SVM", "Machine Learning", "Data Analysis"],
    github: "https://github.com/squiddycodes/CMPSC497",
    featured: false,
    category: "ai",
  },
  {
    id: "research-paper",
    title: "Research Publications",
    description: "Repository containing academic research papers and publications in AI, machine learning, and computational research.",
    tech: ["Research", "Academic Writing", "AI/ML"],
    github: "https://github.com/psg0009/Research-Paper",
    featured: false,
    category: "research",
  },
  {
    id: "web-dev-summer",
    title: "Web Development Projects",
    description: "Collection of web development projects including AJAX implementations, client-side applications, and personal website development.",
    tech: ["HTML", "CSS", "JavaScript", "Java", "AJAX"],
    github: "https://github.com/psg0009/Web_DevSUMMER",
    featured: false,
    category: "web",
  },
  {
    id: "cmpen-331",
    title: "Computer Architecture Labs",
    description: "Assembly language programming projects covering processor design, memory hierarchy, and low-level system architecture.",
    tech: ["Assembly", "Computer Architecture", "Hardware Design"],
    github: "https://github.com/psg0009/CMPEN-331",
    featured: false,
    category: "research",
  },
];

export const projectCategories = [
  { id: "all", label: "All Projects" },
  { id: "medical", label: "Medical AI" },
  { id: "ai", label: "AI/ML" },
  { id: "research", label: "Research" },
  { id: "startup", label: "Startup" },
  { id: "web", label: "Web Dev" },
];

export const researchHighlights = [
  {
    id: "mri",
    title: "MRI Reconstruction",
    lab: "Fan MRI Lab, USC",
    description: "Developing deep learning models for accelerated MRI reconstruction",
    impact: "15% workflow acceleration",
  },
  {
    id: "cancer",
    title: "Cancer Therapy",
    lab: "Epigenetics Lab, USC",
    description: "Identifying epigenetic biomarkers for personalized cancer treatment",
    impact: "12% accuracy improvement",
  },
  {
    id: "prediction",
    title: "Disease Prediction",
    lab: "Independent Research",
    description: "Multi-modal frameworks for blood cancer detection and prognosis",
    impact: "Interpretable AI models",
  },
  {
    id: "epidemiology",
    title: "Epidemiology AI",
    lab: "Penn State IST",
    description: "NLP-powered influenza outbreak prediction systems",
    impact: "20% faster processing",
  },
];
