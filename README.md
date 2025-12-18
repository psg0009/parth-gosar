# Parth Gosar - Medical AI Portfolio

A modern, cyberpunk-themed personal portfolio website with a focus on Medical AI and Healthcare research. Built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

![Portfolio Preview](preview.png)

## ✨ Features

- **🏥 Medical AI Focus** - Dedicated research section highlighting MRI, Cancer, and Healthcare AI work
- **🎨 Cyberpunk Design** - Dark theme with cyan/emerald medical accents
- **⚡ Animated Preloader** - Medical-themed loading animation with heartbeat pulse
- **🎭 Smooth Animations** - Scroll-triggered animations using Framer Motion
- **📱 Fully Responsive** - Mobile-first design with breakpoints for all devices
- **🧩 Modular Components** - Reusable UI components (Button, Card, Badge)
- **🔍 SEO Optimized** - Proper meta tags and semantic HTML
- **♿ Accessible** - Keyboard navigation and ARIA labels

## 🏥 Medical AI Sections

| Section | Description |
|---------|-------------|
| **Research** | Dedicated section for MRI Lab, Cancer Therapy Lab, and medical AI projects |
| **Medical Domains** | Visual grid of expertise: Medical Imaging, Oncology AI, Genomics, etc. |
| **Skills** | Highlights medical-specific tools: MONAI, VarNet, U-Net, DICOM |
| **Projects** | Filtered by category including "Medical AI" |

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn or pnpm

### Installation

```bash
# Extract and navigate to project
cd parth-portfolio

# Install dependencies
npm install

# Start dev server
npm run dev

# Open http://localhost:3000
```

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
parth-portfolio/
├── app/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx          # Nav with Research link
│   │   │   └── Footer.tsx          # Footer with social links
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx     # Medical AI focused hero
│   │   │   ├── AboutSection.tsx    # Bio with medical highlights
│   │   │   ├── ResearchSection.tsx # NEW: Dedicated medical research
│   │   │   ├── ExperienceSection.tsx # Timeline with research tabs
│   │   │   ├── ProjectsSection.tsx # Projects with Medical AI filter
│   │   │   ├── SkillsSection.tsx   # Skills with medical domains
│   │   │   └── ContactSection.tsx  # Contact form & info
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   └── Badge.tsx
│   │   └── Preloader.tsx           # Medical-themed loader
│   ├── constants/
│   │   ├── projects.ts             # Medical AI projects + categories
│   │   ├── skills.ts               # Medical domains & skills
│   │   └── experience.ts           # Research positions & awards
│   ├── hooks/useIntersection.ts
│   ├── lib/utils.ts
│   ├── globals.css                 # Cyan/emerald medical theme
│   ├── layout.tsx
│   └── page.tsx
├── tailwind.config.ts
├── package.json
└── README.md
```

## 🎨 Color Scheme

| Color | Hex | Usage |
|-------|-----|-------|
| Cyan (Medical Primary) | `#22D3EE` | MRI research, medical elements |
| Emerald (Medical Secondary) | `#34D399` | Cancer research, bioinformatics |
| Amber | `#F59E0B` | Awards, achievements |
| Green (Primary) | `#00FF88` | General accents |
| Blue (Secondary) | `#0066FF` | Links, buttons |

## 🏥 Research Highlights

The portfolio emphasizes your medical AI research:

1. **Fan MRI Lab, USC** - Deep learning for accelerated MRI reconstruction
2. **Epigenetics & Cancer Therapy Lab, USC** - Biomarker discovery
3. **Cancer Prediction Model** - Multi-modal framework (12% accuracy improvement)
4. **Influenza Predictive Analysis** - NLP-powered epidemiology

## 🛠️ Customization

### Update Research Content

Edit `app/constants/projects.ts`:
- Add new medical projects
- Update `researchHighlights` array

Edit `app/components/sections/ResearchSection.tsx`:
- Modify current research positions
- Add publications

### Colors

Edit CSS variables in `app/globals.css`:
```css
:root {
  --medical: #22D3EE;
  --medical-secondary: #34D399;
}
```

## 📦 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import at [vercel.com/new](https://vercel.com/new)
3. Deploy automatically

## 📝 License

MIT License

## 🙏 Credits

- Design inspired by Sentinel AI Firewall
- Icons by Lucide
- Medical domain expertise by Parth Gosar

---

**Built with 🧠 for Medical AI Innovation**
