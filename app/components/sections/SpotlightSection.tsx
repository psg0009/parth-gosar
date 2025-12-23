"use client";

import { motion } from "framer-motion";
import { useIntersection } from "@/app/hooks/useIntersection";
import { useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";

// Photo data - ordered from 2025 to 2022
const photos = [
  {
    id: 1,
    src: "/images/spotlight/Spring 2025 Rep Paul Tekac.jpg",
    alt: "With State Representative Paul Takac",
    caption: "With Rep. Paul Takac",
    event: "PA House District 82 | Spring 2025",
  },
  {
    id: 2,
    src: "/images/spotlight/Spring 2025 - Mayor Ezra Nanes at We are the World event ISC.jpg",
    alt: "With Mayor Ezra Nanes",
    caption: "With Mayor Ezra Nanes",
    event: "State College Mayor | We Are The World 2025",
  },
  {
    id: 3,
    src: "/images/spotlight/Penn State President - Neeli Bendapudi at Harrisburg Capital.jpg",
    alt: "With Penn State President Dr. Neeli Bendapudi",
    caption: "With President Dr. Neeli Bendapudi",
    event: "19th Penn State President | Harrisburg Capital",
  },
  {
    id: 4,
    src: "/images/spotlight/Penn State Startup Week.jpg",
    alt: "Penn State Startup Week",
    caption: "Penn State Startup Week",
    event: "Pitching INSURESPECTRE | Entrepreneurship",
  },
  {
    id: 5,
    src: "/images/spotlight/Student Leaders Fall 2024.jpg",
    alt: "Student Leaders",
    caption: "Penn State Student Leaders",
    event: "Campus Leadership Summit | Fall 2024",
  },
  {
    id: 6,
    src: "/images/spotlight/ISC Presidents Cabinet -2025.jpeg",
    alt: "ISC Presidents Cabinet 2025",
    caption: "ISC Presidents Cabinet",
    event: "Leading 3,000+ International Students | Spring 2025",
  },
  {
    id: 7,
    src: "/images/spotlight/International  Student Council  60th Year Photo.png",
    alt: "ISC 60th Year",
    caption: "ISC 60th Anniversary",
    event: "Six Decades of International Student Advocacy",
  },
  {
    id: 8,
    src: "/images/spotlight/ISCs Exec Board.png",
    alt: "ISC Executive Board",
    caption: "ISC Executive Board",
    event: "60th President's Leadership Team | 2024",
  },
  {
    id: 9,
    src: "/images/spotlight/SpRING 2024- Spring Bankquet of International student organozations with President Bendapudi..jpg",
    alt: "Spring Banquet with President Bendapudi",
    caption: "International Organizations Banquet",
    event: "With President Bendapudi | Spring 2024",
  },
  {
    id: 10,
    src: "/images/spotlight/UPUA swearing in for 17th Assembly..jpg",
    alt: "UPUA Swearing In",
    caption: "UPUA 17th Assembly",
    event: "University Park Undergraduate Association",
  },
  {
    id: 11,
    src: "/images/spotlight/With Alan Vernebaec (one of the oldest serving professor at Penn State ).jpg",
    alt: "With Professor Alan Verbanec",
    caption: "With Prof. Alan Verbanec",
    event: "Computer Science Faculty | Penn State",
  },
  {
    id: 12,
    src: "/images/spotlight/Mathias Fonkam - Research Professor at Penn State.jpg",
    alt: "With Dr. Mathias Fonkam",
    caption: "With Dr. Mathias Fonkam",
    event: "College of IST Faculty | Penn State",
  },
];

interface Photo {
  id: number;
  src: string;
  alt: string;
  caption: string;
  event: string;
}

export default function SpotlightSection() {
  const { ref, isVisible } = useIntersection<HTMLElement>({ threshold: 0.1 });
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <>
      <section id="spotlight" ref={ref} className="section relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

        <div className="relative container-custom">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            {/* Section Header */}
            <motion.div variants={itemVariants} className="text-center mb-16">
              <motion.span
                className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-sm font-mono mb-4"
                whileHover={{ scale: 1.02 }}
              >
                <motion.span
                  className="w-2 h-2 rounded-full bg-purple-400"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                SPOTLIGHT
              </motion.span>
              <h2 className="section-title">
                Memorable <span className="text-purple-400">Moments</span>
              </h2>
              <p className="section-subtitle mx-auto">
                Highlights from events, meetings, and milestones along the journey
              </p>
            </motion.div>

            {/* Photo Grid */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {photos.map((photo, index) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  onClick={() => setSelectedPhoto(photo)}
                  className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer"
                  style={{
                    background: "linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 100%)",
                    border: "1px solid rgba(168, 85, 247, 0.2)",
                  }}
                >
                  {/* Image */}
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                  {/* Corner Accents */}
                  <div className="absolute top-0 left-0 w-8 h-8">
                    <motion.div
                      className="absolute top-0 left-0 w-full h-[2px]"
                      style={{ background: "linear-gradient(90deg, #a855f7, transparent)" }}
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.div
                      className="absolute top-0 left-0 h-full w-[2px]"
                      style={{ background: "linear-gradient(180deg, #a855f7, transparent)" }}
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    />
                  </div>
                  <div className="absolute top-0 right-0 w-8 h-8">
                    <motion.div
                      className="absolute top-0 right-0 w-full h-[2px]"
                      style={{ background: "linear-gradient(-90deg, #a855f7, transparent)" }}
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.25 }}
                    />
                    <motion.div
                      className="absolute top-0 right-0 h-full w-[2px]"
                      style={{ background: "linear-gradient(180deg, #a855f7, transparent)" }}
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.75 }}
                    />
                  </div>

                  {/* Caption */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <p className="text-white font-semibold text-sm mb-1">{photo.caption}</p>
                    <p className="text-purple-400 text-xs font-mono">{photo.event}</p>
                  </div>

                  {/* Hover Glow */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    style={{
                      boxShadow: "inset 0 0 30px rgba(168, 85, 247, 0.3), 0 0 30px rgba(168, 85, 247, 0.2)",
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full max-h-[80vh] rounded-2xl overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 100%)",
              border: "1px solid rgba(168, 85, 247, 0.3)",
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 border border-purple-500/30 text-white hover:bg-purple-500/20 transition-colors"
            >
              <X size={20} />
            </button>

            {/* Image Container */}
            <div className="relative aspect-video">
              <Image
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                fill
                className="object-contain"
              />
            </div>

            {/* Caption */}
            <div className="p-6 border-t border-purple-500/20">
              <h3 className="text-white text-xl font-semibold mb-2">{selectedPhoto.caption}</h3>
              <p className="text-purple-400 font-mono text-sm">{selectedPhoto.event}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
