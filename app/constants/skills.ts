export interface Skill {
  name: string;
  icon?: string;
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
      { name: "Medical Image Analysis" },
      { name: "MRI/CT Reconstruction" },
      { name: "Image Segmentation (U-Net)" },
      { name: "VarNet Architecture" },
      { name: "MONAI Framework" },
      { name: "DICOM Processing" },
    ],
  },
  {
    id: "ml-ai",
    title: "Deep Learning & ML",
    icon: "",
    skills: [
      { name: "PyTorch" },
      { name: "CNNs & Vision Models" },
      { name: "TensorFlow/Keras" },
      { name: "NLP & Transformers" },
      { name: "Multi-Modal Learning" },
      { name: "Explainable AI (XAI)" },
    ],
  },
  {
    id: "bioinformatics",
    title: "Bioinformatics",
    icon: "",
    skills: [
      { name: "Genomic Data Analysis" },
      { name: "Bioinformatics Pipelines" },
      { name: "Gene Expression" },
      { name: "R/Bioconductor" },
      { name: "Statistical Genetics" },
      { name: "Sequence Alignment" },
    ],
  },
  {
    id: "research",
    title: "Research & Analysis",
    icon: "",
    skills: [
      { name: "Research Methodology" },
      { name: "Statistical Analysis" },
      { name: "Data Visualization" },
      { name: "Scientific Writing" },
      { name: "Clinical Data Analysis" },
      { name: "IRB/HIPAA Compliance" },
    ],
  },
];

export const technologies = [
  // Medical AI Frameworks
  "MONAI", "VarNet", "U-Net", "DICOM", "Bioconductor", "Genomics",
  // ML/DL Frameworks
  "PyTorch", "TensorFlow", "Transformers", "CNNs", "LSTMs", "Scikit-learn",
  // Programming Languages
  "Python", "Java", "C++", "R", "SQL", "MATLAB",
  // Cloud & Infrastructure
  "AWS", "GCP", "Docker", "Kubernetes", "CUDA",
  // Data Science Tools
  "Pandas", "NumPy", "Matplotlib", "OpenCV", "Hugging Face",
];

export const medicalDomains = [
  { name: "Medical Imaging", description: "MRI, CT, X-ray analysis" },
  { name: "Oncology AI", description: "Cancer detection & prognosis" },
  { name: "Genomics", description: "Genetic analysis & biomarkers" },
  { name: "Clinical NLP", description: "EHR & medical text mining" },
  { name: "Digital Pathology", description: "Histopathology analysis" },
  { name: "Epidemiology", description: "Disease prediction models" },
];
