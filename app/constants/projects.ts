export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tech: string[];
  image?: string;
  live?: string;
  paper?: string;
  featured: boolean;
  category: "medical" | "ai" | "research";
}

export const projects: Project[] = [
  // Featured Projects - Best representation of diverse skills
  {
    id: "vwi-mri-reconstruction",
    title: "Vessel Wall MRI Reconstruction",
    description: "End-to-end deep learning model for accelerated Vessel Wall Imaging (VWI) MRI reconstruction using VarNet architecture for improved diagnostic imaging of intracranial vessel walls.",
    longDescription: "Developed at Fan MRI Lab, USC. Enables faster MRI acquisition while maintaining image quality for stroke and aneurysm assessment.",
    tech: ["Python", "PyTorch", "VarNet", "MRI Reconstruction", "Deep Learning", "Medical Imaging"],
    featured: true,
    category: "medical",
  },
  {
    id: "crossmodal-hemanet",
    title: "CrossModal-HemaNet: Blood Cancer Diagnosis",
    description: "Multi-modal deep learning model for blood cancer prediction combining computer vision (WBC segmentation) with genomic data analysis under class imbalance conditions.",
    longDescription: "Features comprehensive metrics, data augmentation techniques, and multiple class balance strategies. Paper under review for publication.",
    tech: ["Python", "PyTorch", "OpenCV", "scikit-learn", "Deep Learning", "Computer Vision"],
    featured: true,
    category: "medical",
  },
  {
    id: "synthetic-data-ml",
    title: "Synthetic Healthcare Data Privacy",
    description: "Research on synthetic patient data for healthcare AI, evaluating utility, security, and privacy using CTGAN/MedGAN generation with differential privacy achieving ~95% model accuracy.",
    longDescription: "Implements membership inference attacks, adversarial FGSM attacks, and federated learning approaches. XGBoost and LSTM models for disease prediction with privacy safeguards.",
    tech: ["Python", "CTGAN", "MedGAN", "XGBoost", "LSTM", "Differential Privacy"],
    featured: true,
    category: "medical",
  },
  {
    id: "algobot",
    title: "AlgoBot - Algorithmic Trading System",
    description: "Production-ready algorithmic trading system for Indian stock market with MA-RSI, Momentum, and Mean Reversion strategies. Features real-time trading, backtesting, and Streamlit dashboard.",
    longDescription: "Built with Python for Upstox API integration, featuring stop-loss, take-profit, position sizing, Docker support, and multi-channel notifications via Email and Telegram.",
    tech: ["Python", "Upstox API", "Streamlit", "Docker", "Trading Algorithms"],
    featured: true,
    category: "ai",
  },
  {
    id: "sec-stock-tracker",
    title: "SEC Stock Tracking Platform",
    description: "React Native/Expo app tracking SEC institutional filings (13F, 13D, 13G, Form 4/5) to provide early signals on stock movements from institutional activity.",
    longDescription: "Features real-time EDGAR data integration, institutional holdings analysis, sector distribution, watchlist management, and dark/light theme support.",
    tech: ["React Native", "Expo", "SEC EDGAR API", "TypeScript", "Analytics"],
    featured: true,
    category: "ai",
  },
  {
    id: "smartrides",
    title: "SmartRides - Student Transportation",
    description: "Comprehensive ride-sharing platform for university students with AI-powered driver-passenger matching, real-time GPS tracking, and Stripe payment integration.",
    longDescription: "Features .edu email verification, campus-specific pickup points, group rides, scheduled bookings, safety alerts, and multi-category rating system.",
    tech: ["React Native", "Node.js", "Stripe", "Google Maps API", "Firebase"],
    featured: true,
    category: "ai",
  },
  {
    id: "jain-ai",
    title: "Jain AI - Ancient Text Translation",
    description: "AI-powered platform for translating, interpreting, and contextualizing ancient Jain Prakrit & Agama texts using NLP and LLMs.",
    longDescription: "Provides searchable knowledge of canonical Jain scriptures, decoding philosophy, grammar, and metaphors with historical and philosophical context.",
    tech: ["Python", "NLP", "LLMs", "Prakrit", "Translation"],
    featured: true,
    category: "ai",
  },
  {
    id: "climate-methodology-gen",
    title: "Climate Research Methodology Generator",
    description: "Fine-tuned T5 and BART transformer models to generate research methodologies from climate science problem statements, achieving ROUGE-L of 0.421 and BERTScore of 0.851.",
    longDescription: "Academic project using Hugging Face Transformers with the ClimateFever dataset, optimized with Optuna hyperparameter tuning on Google Colab with Tesla T4 GPU.",
    tech: ["T5", "BART", "Hugging Face", "NLP", "Climate Science", "Optuna"],
    featured: true,
    category: "research",
  },
  // Non-featured projects
  {
    id: "biasbusters",
    title: "BiasBusters - AI Fairness Game",
    description: "Educational web game teaching AI bias concepts through interactive prompt engineering challenges. Players learn to identify and mitigate bias in AI systems.",
    longDescription: "Built with Next.js and Claude API, featuring Firebase authentication and real-time leaderboards. Players progress through levels learning about different types of AI bias.",
    tech: ["Next.js", "TypeScript", "Claude API", "Firebase", "Tailwind CSS"],
    featured: false,
    category: "ai",
  },
  {
    id: "likhit",
    title: "Likhit - Handwriting Analysis",
    description: "Novel handwriting analysis platform with OCR leveraging GPT-4, achieving 97% recognition accuracy for educational feedback.",
    longDescription: "AI-powered handwriting recognition system that provides detailed analysis and educational feedback to help improve penmanship and writing skills.",
    tech: ["JavaScript", "Python", "GPT-4", "OCR", "Machine Learning"],
    featured: false,
    category: "ai",
  },
  {
    id: "numerical-data-handler",
    title: "Numerical Data Handler",
    description: "Data pipeline tool for handling numerical datasets with Polygon API integration and Cloudflare R2 storage for efficient data management.",
    tech: ["Python", "Polygon API", "Cloudflare R2", "Data Engineering"],
    featured: false,
    category: "research",
  },
  {
    id: "sequence-alignment",
    title: "Sequence Alignment Algorithm",
    description: "Memory-efficient sequence alignment implementation comparing basic vs optimized algorithms. Achieves significant memory reduction while maintaining correctness.",
    tech: ["Python", "Dynamic Programming", "Algorithm Optimization", "Bioinformatics"],
    featured: false,
    category: "research",
  },
  {
    id: "recipe-meal-planner",
    title: "Recipe & Meal Planner System",
    description: "Full-stack application for recipe management and meal planning with database design, Flask backend API, and interactive frontend.",
    tech: ["Python", "Flask", "SQL", "HTML/CSS", "Database Design"],
    featured: false,
    category: "research",
  },
  {
    id: "vibe-debug",
    title: "Vibe-Debug",
    description: "AI-powered debugging tool using Gemini 3 Pro for visual bug detection. Upload screenshots + code to identify bugs, generate fixes, and create Jest/Playwright tests.",
    longDescription: "Built with TypeScript and Vite, leveraging Google's Gemini API to analyze screenshot pairs and produce automated test cases.",
    tech: ["TypeScript", "Vite", "Gemini 3 Pro", "Node.js", "Jest", "Playwright"],
    featured: false,
    category: "ai",
  },
  {
    id: "goldbach-conjecture",
    title: "Goldbach Conjecture Analysis",
    description: "Computational research validating Goldbach's Conjecture and analyzing Prime Gaps using Cramer's Conjecture with interactive Plotly visualizations.",
    tech: ["Python", "Number Theory", "Plotly", "Data Analysis", "Mathematics"],
    featured: false,
    category: "research",
  },
];

export const projectCategories = [
  { id: "all", label: "All Projects" },
  { id: "medical", label: "Medical AI" },
  { id: "ai", label: "AI/ML" },
  { id: "research", label: "Research" },
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
