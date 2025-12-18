export interface Skill {
  name: string;
  icon?: string;
  level: number; // 1-100
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "medical-ai",
    title: "Medical AI & Imaging",
    icon: "",
    skills: [
      { name: "Medical Image Analysis", level: 92 },
      { name: "MRI/CT Reconstruction", level: 88 },
      { name: "Image Segmentation (U-Net)", level: 90 },
      { name: "DICOM Processing", level: 85 },
      { name: "MONAI Framework", level: 82 },
      { name: "VarNet Architecture", level: 85 },
    ],
  },
  {
    id: "ml-ai",
    title: "Deep Learning & ML",
    icon: "",
    skills: [
      { name: "PyTorch", level: 95 },
      { name: "TensorFlow/Keras", level: 90 },
      { name: "CNNs & Vision Models", level: 92 },
      { name: "NLP & Transformers", level: 88 },
      { name: "Multi-Modal Learning", level: 85 },
      { name: "Explainable AI (XAI)", level: 82 },
    ],
  },
  {
    id: "bioinformatics",
    title: "Bioinformatics",
    icon: "",
    skills: [
      { name: "Genomic Data Analysis", level: 85 },
      { name: "Gene Expression", level: 82 },
      { name: "Bioinformatics Pipelines", level: 80 },
      { name: "Statistical Genetics", level: 78 },
      { name: "R/Bioconductor", level: 80 },
    ],
  },
  {
    id: "programming",
    title: "Programming",
    icon: "",
    skills: [
      { name: "Python", level: 95 },
      { name: "Java", level: 85 },
      { name: "C++", level: 80 },
      { name: "R", level: 78 },
      { name: "MATLAB", level: 80 },
      { name: "SQL", level: 85 },
    ],
  },
  {
    id: "cloud",
    title: "Cloud & Infrastructure",
    icon: "",
    skills: [
      { name: "AWS (S3, EC2, SageMaker)", level: 85 },
      { name: "Google Cloud Platform", level: 82 },
      { name: "Docker", level: 88 },
      { name: "Kubernetes", level: 78 },
      { name: "HPC/SLURM", level: 80 },
      { name: "GPU Computing (CUDA)", level: 85 },
    ],
  },
  {
    id: "research",
    title: "Research & Analysis",
    icon: "",
    skills: [
      { name: "Research Methodology", level: 92 },
      { name: "Statistical Analysis", level: 88 },
      { name: "Scientific Writing", level: 85 },
      { name: "Data Visualization", level: 88 },
      { name: "Clinical Data Analysis", level: 82 },
      { name: "IRB/HIPAA Compliance", level: 78 },
    ],
  },
];

export const technologies = [
  // Medical AI
  "PyTorch", "MONAI", "VarNet", "U-Net", "DICOM",
  // ML/DL
  "TensorFlow", "Transformers", "CNNs", "LSTMs",
  // Bioinformatics
  "Bioconductor", "Genomics", "R",
  // Programming
  "Python", "Java", "C++", "SQL",
  // Cloud
  "AWS", "GCP", "Docker", "CUDA",
  // Data
  "Pandas", "NumPy", "Scikit-learn", "Matplotlib"
];

export const medicalDomains = [
  { name: "Medical Imaging", description: "MRI, CT, X-ray analysis" },
  { name: "Oncology AI", description: "Cancer detection & prognosis" },
  { name: "Genomics", description: "Genetic analysis & biomarkers" },
  { name: "Clinical NLP", description: "EHR & medical text mining" },
  { name: "Digital Pathology", description: "Histopathology analysis" },
  { name: "Epidemiology", description: "Disease prediction models" },
];
