export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
  type: "work" | "research" | "teaching";
  url?: string;
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  focus?: string;
}

export interface Award {
  id: string;
  title: string;
  organization: string;
  date: string;
  description?: string;
}

export interface Leadership {
  id: string;
  role: string;
  organization: string;
  location: string;
  startDate: string;
  endDate: string;
  description?: string[];
}

export interface NewsArticle {
  id: string;
  title: string;
  source: string;
  date: string;
  description: string;
  url: string;
}

export interface ISCJourneyStep {
  id: string;
  role: string;
  period: string;
  description: string;
  highlight?: boolean;
}

export interface Publication {
  id: string;
  title: string;
  authors: string;
  venue: string;
  date: string;
  status: "published" | "under_review" | "preprint";
  url?: string;
  doi?: string;
}

export const experiences: Experience[] = [
  {
    id: "handshake",
    role: "AI Researcher",
    company: "Handshake",
    location: "San Francisco, CA",
    startDate: "Jun 2025",
    endDate: "Jul 2025",
    description: [
      "Trained and fine-tuned AI models for enterprise applications",
      "Developed training datasets and evaluation metrics",
    ],
    type: "work",
  },
  {
    id: "botstacks",
    role: "Data Analyst",
    company: "BotStacks",
    location: "San Francisco, CA",
    startDate: "May 2025",
    endDate: "Jul 2025",
    description: [
      "Analyzed system performance and optimized data pipelines",
      "Implemented data-driven solutions for product improvements",
    ],
    type: "work",
  },
  {
    id: "insurespectre",
    role: "Founder",
    company: "INSURESPECTRE",
    location: "State College, PA",
    startDate: "May 2025",
    endDate: "Jul 2025",
    description: [
      "Architected AI-powered insurance platform helping 100+ students find better health insurance options",
      "Streamlined insurance search for students with unique insurance needs",
    ],
    type: "work",
    url: "https://insurespectre.com",
  },
  {
    id: "ist-research-assistant",
    role: "Research Assistant",
    company: "Penn State College of Information Sciences and Technology",
    location: "University Park, PA",
    startDate: "Mar 2023",
    endDate: "May 2025",
    description: [
      "Designed and implemented machine learning models for conversational AI development, leveraging NLP techniques to enhance response accuracy by 30%",
      "Directed application of ML techniques to refine conversational AI system, resulting in 20% uplift in user engagement",
      "Elevated open-source project standards by ensuring code quality and documentation, leading to 25% increase in community contributions",
    ],
    type: "research",
  },
  {
    id: "nlp-intern",
    role: "Summer NLP Intern",
    company: "Penn State College of Information Sciences and Technology",
    location: "University Park, PA",
    startDate: "May 2024",
    endDate: "Aug 2024",
    description: [
      "Engineered AI-driven application for Influenza Predictive Analysis",
      "Integrated NLP techniques and ML models, reducing data processing time by 20%",
      "Improved model accuracy by 10%",
    ],
    type: "research",
  },
  {
    id: "fan-mri",
    role: "Research Assistant",
    company: "Fan MRI Lab, USC",
    location: "Los Angeles, CA",
    startDate: "Sep 2025",
    endDate: "Present",
    description: [
      "Accelerated radiologist workflow by 15% through building multimodal model",
      "Optimized processing speed, cutting image processing time by 2 seconds",
    ],
    type: "research",
    url: "https://sites.usc.edu/fan-mri-lab/staff/",
  },
  {
    id: "epigenetics",
    role: "Research Assistant",
    company: "Epigenetics & Cancer Therapy Lab, USC",
    location: "Los Angeles, CA",
    startDate: "Aug 2025",
    endDate: "Present",
    description: [
      "Conducting research on epigenetic mechanisms in cancer therapy",
    ],
    type: "research",
  },
  {
    id: "oss-research",
    role: "Research Assistant",
    company: "Open-Source Software Interest Group, Penn State",
    location: "University Park, PA",
    startDate: "Aug 2024",
    endDate: "May 2025",
    description: [
      "Developing financial and risk modeling platform to predict stock price movement",
      "Utilizing PyTorch, echo state networks, and XGBoost with NLP models",
    ],
    type: "research",
  },
  {
    id: "la-oop",
    role: "Learning Assistant - Department of Computer Science",
    company: "Penn State College of Engineering",
    location: "University Park, PA",
    startDate: "Aug 2024",
    endDate: "May 2025",
    description: [
      "Assisted students with Java programming concepts and OOP principles in CMPSC 221",
    ],
    type: "teaching",
  },
  {
    id: "la-physics",
    role: "Learning Assistant - Department of Physics",
    company: "Penn State Eberly College of Science",
    location: "University Park, PA",
    startDate: "Jan 2024",
    endDate: "May 2024",
    description: [
      "Collaborated with faculty to design and deliver interactive lectures on semiconductors and electricity",
      "Increased student attendance and participation by 10% through engaging content and real-world applications",
      "Contributed to development of course materials and assessments enhancing educational experience",
    ],
    type: "teaching",
  },
  {
    id: "la-math",
    role: "Learning Assistant - Department of Mathematics",
    company: "Penn State Eberly College of Science",
    location: "University Park, PA",
    startDate: "Jan 2023",
    endDate: "Dec 2023",
    description: [
      "Orchestrated comprehensive academic success programs for calculus students",
      "Achieved 35% increase in exam scores and 50% reduction in course withdrawal rates",
      "Implemented personalized study plans contributing to 25% rise in overall GPA for the student cohort",
      "Led weekly 2-hour sessions addressing key mathematical concepts",
    ],
    type: "teaching",
  },
  {
    id: "psg-foundation",
    role: "Founder",
    company: "P.S.G Foundation",
    location: "India",
    startDate: "May 2018",
    endDate: "Present",
    description: [
      "Founded nonprofit organization focused on community empowerment and outreach",
      "Led communication strategies and community service initiatives",
    ],
    type: "work",
    url: "https://www.instagram.com/psgfoundation_/",
  },
];

export const education: Education[] = [
  {
    id: "usc",
    degree: "Master of Science - Computer Science",
    school: "University of Southern California",
    location: "Los Angeles, CA",
    startDate: "Aug 2025",
    endDate: "May 2027",
    focus: "Artificial Intelligence",
  },
  {
    id: "psu",
    degree: "Bachelor of Science - Computer Science",
    school: "The Pennsylvania State University",
    location: "University Park, PA",
    startDate: "Aug 2022",
    endDate: "May 2025",
    focus: "Computer Science",
  },
];

export const awards: Award[] = [
  {
    id: "oswald",
    title: "2025 John W. Oswald Award",
    organization: "Pennsylvania State University",
    date: "April 2025",
    description: "Awarded for outstanding leadership in social services, religious activities, and student government",
  },
  {
    id: "student-leader",
    title: "Student Leader Scholarship",
    organization: "Pennsylvania State University",
    date: "December 2024",
    description: "Recognition for exceptional leadership and contributions to the university community",
  },
  {
    id: "global-award",
    title: "We Are Global Award",
    organization: "Penn State Global Student Leaders",
    date: "September 2024",
    description: "Honored for promoting global engagement and international student leadership",
  },
  {
    id: "lion-tank",
    title: "Lion Tank Pitch Competition",
    organization: "Pennsylvania State University",
    date: "March 2024",
    description: "Recognized for innovative startup pitch and entrepreneurial excellence",
  },
  {
    id: "deans-list",
    title: "Dean's List",
    organization: "College of Engineering, Penn State",
    date: "Aug 2022 - May 2025",
    description: "Consistent academic excellence throughout undergraduate studies",
  },
];

export const leadership: Leadership[] = [
  {
    id: "cob",
    role: "Community Oversight Board Member",
    organization: "Borough of State College",
    location: "State College, PA",
    startDate: "Oct 2024",
    endDate: "Present",
    description: [
      "Serving on municipal oversight board ensuring community accountability",
    ],
  },
  {
    id: "isc-president",
    role: "President",
    organization: "International Student Council, Penn State",
    location: "University Park, PA",
    startDate: "Apr 2024",
    endDate: "May 2025",
    description: [
      "Led the 60th year of ISC promoting collaboration among diverse student groups",
      "Launched five new campus-wide initiatives",
      "Served on multiple advisory boards including Student Legal Services, Housing and Food Services",
    ],
  },
  {
    id: "isc-finance",
    role: "Finance Director",
    organization: "International Student Council, Penn State",
    location: "University Park, PA",
    startDate: "Mar 2023",
    endDate: "Apr 2024",
    description: [
      "Streamlined nine financial operations benefiting 3,000+ students annually",
      "Cultivated key relationships with Finance Committee",
    ],
  },
  {
    id: "upua",
    role: "Representative",
    organization: "Penn State Student Government (UPUA)",
    location: "University Park, PA",
    startDate: "Oct 2022",
    endDate: "Apr 2023",
    description: [
      "Represented International Student Council in undergraduate student government",
    ],
  },
];

export const stats = [
  { label: "Research Publications", value: "3+" },
  { label: "Students Impacted", value: "3000+" },
  { label: "Projects Completed", value: "15+" },
  { label: "Awards Received", value: "5" },
];

export const newsArticles: NewsArticle[] = [
  {
    id: "engr-oswald",
    title: "Computer science major named 2025 Oswald Award winner",
    source: "Penn State Engineering",
    date: "April 2025",
    description: "Parth Gosar honored with the 2025 John W. Oswald Award for his leadership in social services, religious activities, and student government. The award recognizes his work as ISC President and Library Ambassador.",
    url: "https://news.engr.psu.edu/2025/gosar-parth-oswald-award-winner.aspx",
  },
  {
    id: "psu-oswald",
    title: "Four student leaders named 2025 Oswald Award winners",
    source: "Penn State University",
    date: "April 2025",
    description: "Parth Gosar recognized alongside three other exceptional student leaders for the prestigious John W. Oswald Award, Penn State's highest student leadership honor.",
    url: "https://www.psu.edu/news/academics/story/four-student-leaders-named-2025-oswald-award-winners",
  },
  {
    id: "collegian-watw",
    title: "International Student Council hosts 60th We Are The World showcase",
    source: "The Daily Collegian",
    date: "March 2025",
    description: "ISC President Parth Gosar led the 60th annual cultural showcase at Alumni Hall, bringing together international cultures and emphasizing ISC as a 'home away from home' for students.",
    url: "https://www.psucollegian.com/news/campus/making-culture-accessible-international-student-council-hosts-60th-we-are-the-world-showcase/article_ba7bbe08-f7e2-11ef-883d-bf684639fe4a.html",
  },
  {
    id: "south-asian-times",
    title: "Indian student wins PSU's prestigious 2025 John W Oswald Award",
    source: "The South Asian Times",
    date: "April 2025",
    description: "Featured coverage of Parth Gosar's Oswald Award recognition, highlighting his achievements as an Indian international student leader at Penn State.",
    url: "https://thesouthasiantimes.info/Indian-Community/news/indian-student-wins-psus-prestigious-john-w-oswald-award-/3987",
  },
  {
    id: "onward-state-upua",
    title: "UPUA Passes Resolution Supporting 'Know Your Rights'",
    source: "Onward State",
    date: "October 2022",
    description: "Parth Gosar sworn in as the International Student Council representative to UPUA during the 17th Assembly meeting, marking the beginning of his student government journey.",
    url: "https://onwardstate.com/2022/10/06/upua-passes-resolution-supporting-know-your-rights/",
  },
  {
    id: "cob-appointment",
    title: "Community Oversight Board Appointment",
    source: "Borough of State College",
    date: "October 2024",
    description: "Appointed to serve on the State College Borough Council's Community Oversight Board, providing civilian oversight of the State College Police Department.",
    url: "https://www.statecollegepa.us/745/Community-Oversight-Board",
  },
  {
    id: "psu-undergrad-awards",
    title: "Penn State announces 2025 university-wide undergraduate student awards",
    source: "Penn State University",
    date: "April 2025",
    description: "Parth Gosar recognized among the 2025 university-wide undergraduate student award recipients for outstanding academic and leadership achievements.",
    url: "https://www.psu.edu/news/academics/story/penn-state-announces-2025-university-wide-undergraduate-student-awards",
  },
  {
    id: "isc-instagram",
    title: "ISC Leadership Feature",
    source: "ISC Penn State Instagram",
    date: "2025",
    description: "Featured on the International Student Council's official Instagram page highlighting leadership contributions and achievements.",
    url: "https://www.instagram.com/p/DJF7gHFtqA-/",
  },
  {
    id: "collegian-elections",
    title: "Politics in America impacts the world: International students discuss upcoming U.S. elections",
    source: "The Daily Collegian",
    date: "October 2024",
    description: "International students, including ISC President Parth Gosar, discuss the impact of U.S. elections on the global community.",
    url: "https://www.psucollegian.com/news/campus/politics-in-america-impacts-the-world-international-students-discuss-upcoming-u-s-elections/article_03bb5a92-919a-11ef-9563-1b09971e4eee.html",
  },
  {
    id: "collegian-upua-sworn",
    title: "Penn State UPUA swears in new International Student Council representative",
    source: "The Daily Collegian",
    date: "October 2022",
    description: "Parth Gosar officially sworn in as the ISC representative to the University Park Undergraduate Association.",
    url: "https://www.instagram.com/p/CjWhEolIYy1/",
  },
  {
    id: "isc-website",
    title: "International Student Council at Penn State",
    source: "ISC Penn State",
    date: "2024",
    description: "Official website of the International Student Council at Penn State, showcasing events, leadership, and resources for international students.",
    url: "https://iscpennstate.psu.edu/",
  },
  {
    id: "cob-member-bio",
    title: "Community Oversight Board Member Bios",
    source: "Borough of State College",
    date: "2025",
    description: "Official bio as a member of the State College Community Oversight Board, providing civilian oversight of local law enforcement.",
    url: "https://content.civicplus.com/api/assets/pa-statecollege/e9ebbb4c-1b5f-4380-a796-10354cbf71ca/2025-cob-member-bios.pdf",
  },
];

export const iscJourney: ISCJourneyStep[] = [
  {
    id: "advisor",
    role: "Student Advisor to ISC",
    period: "May 2025 - Present",
    description: "Continuing to guide and mentor the next generation of ISC leadership, ensuring continuity of initiatives and institutional knowledge transfer.",
  },
  {
    id: "president",
    role: "60th President of ISC",
    period: "Apr 2024 - May 2025",
    description: "Led the historic 60th year of ISC, launching five new campus-wide initiatives. Served on multiple advisory boards including Student Legal Services, Housing and Food Services, HUB, Student Insurance, and University Libraries Board.",
    highlight: true,
  },
  {
    id: "finance-director",
    role: "Financial Director",
    period: "Mar 2023 - Apr 2024",
    description: "Served as Financial Director on the Executive Board. Streamlined nine financial operations benefiting 3,000+ students annually and cultivated key relationships with the Finance Committee.",
  },
  {
    id: "upua-rep",
    role: "ISC Representative to UPUA",
    period: "Oct 2022 - Mar 2023",
    description: "Sworn in as ISC representative to the University Park Undergraduate Association, serving as the voice of international students in student government.",
  },
  {
    id: "eboard-member",
    role: "Executive Board Member",
    period: "Nov 2022 - Apr 2023",
    description: "Elevated to Executive Board, contributing to strategic decisions and organizational leadership.",
  },
  {
    id: "programming",
    role: "Programming Committee Member",
    period: "Aug 2022 - Nov 2022",
    description: "Started ISC journey as a Programming Committee member, helping organize cultural events and student activities.",
  },
];

export const additionalLeadership = [
  {
    id: "library-ambassador",
    role: "Library Ambassador",
    organization: "University Libraries, Penn State",
    period: "2023 - 2025",
    description: "Promoted library resources and services to students, gathered valuable feedback to inform improvements, and served in various leadership roles within the Library Ambassador program.",
  },
];

export const publications: Publication[] = [
  {
    id: "medical-imaging-ai",
    title: "The Integration of Big Data, Machine Learning, and Artificial Intelligence in Medical Imaging and Diagnostics",
    authors: "Sahil Pardasani, Parth Gosar",
    venue: "Journal of Critical Care Research and Emergency Medicine",
    date: "2025",
    status: "published",
  },
  {
    id: "crossmodal-hemanet",
    title: "CrossModal-HemaNet: Multi-Modal Deep Learning for Blood Cancer Diagnosis Under Class Imbalance",
    authors: "Parth Gosar et al.",
    venue: "Under Review",
    date: "2025",
    status: "under_review",
  },
  {
    id: "jain-ai",
    title: "Jain AI: A Hybrid Retrieval-Augmented Generation System for Ancient Prakrit Text Analysis and Interpretation",
    authors: "Parth Gosar et al.",
    venue: "Under Review",
    date: "2025",
    status: "under_review",
  },
  {
    id: "stylometric-fingerprinting",
    title: "Stylometric Fingerprinting with Contextual Anomaly Detection for Sentence-Level AI Authorship Detection",
    authors: "Parth Gosar",
    venue: "Preprints.org",
    date: "March 2025",
    status: "preprint",
    doi: "10.20944/preprints202503.1770.v1",
    url: "https://www.preprints.org/manuscript/202503.1770/v1",
  },
  {
    id: "semantic-echo-analysis",
    title: "Detecting Pretraining Text Usage in Large Language Models Using Semantic Echo Analysis",
    authors: "Parth Gosar",
    venue: "Preprints.org",
    date: "March 2025",
    status: "preprint",
    doi: "10.20944/preprints202503.1735.v1",
    url: "https://www.preprints.org/manuscript/202503.1735/v1",
  },
  {
    id: "goldbach-conjecture",
    title: "Empirical Verification of Goldbach's Conjecture Beyond Four Quintillion",
    authors: "Parth Gosar",
    venue: "Preprints.org",
    date: "March 2025",
    status: "preprint",
    doi: "10.20944/preprints202503.0949.v1",
    url: "https://www.preprints.org/manuscript/202503.0949/v1",
  },
];
