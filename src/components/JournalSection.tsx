import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import journalCover from "@/assets/journal/journal-cover.jpg";
import worldtechPage from "@/assets/journal/worldtech.jpg";
import rivanPage from "@/assets/journal/rivan.jpg";
import codechumPage from "@/assets/journal/codechum.jpg";
import mataTechPage from "@/assets/journal/mata-tech.jpg";
import tarsierPage from "@/assets/journal/tarsier.jpg";

interface JournalPage {
  id: number;
  image: string;
  company: string;
  date: string;
}

const journalPages: JournalPage[] = [
  { id: 0, image: journalCover, company: "Learning Journal Cover", date: "November 2025" },
  { id: 1, image: worldtechPage, company: "WorldTech Information Solutions", date: "November 19, 2025" },
  { id: 2, image: rivanPage, company: "RIVAN IT Cebu", date: "November 20, 2025" },
  { id: 3, image: codechumPage, company: "CodeChum", date: "November 20, 2025" },
  { id: 4, image: mataTechPage, company: "MATA Technologies, Inc.", date: "November 21, 2025" },
  { id: 5, image: tarsierPage, company: "T.A.R.S.I.E.R. 117", date: "November 22, 2025" },
];

export const JournalSection = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const navigate = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setCurrentIndex((prev) => (prev === 0 ? journalPages.length - 1 : prev - 1));
    } else {
      setCurrentIndex((prev) => (prev === journalPages.length - 1 ? 0 : prev + 1));
    }
  };

  return (
    <section id="journal" className="section-padding bg-background">
      <div className="container-narrow">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block font-sans text-sm tracking-[0.3em] uppercase text-gold mb-4">
            Documentation
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            Learning Journal
          </h2>
          <p className="font-sans text-muted-foreground max-w-2xl mx-auto">
            Handwritten observations and learnings from each company visited during 
            the educational tour, as provided by WATT.
          </p>
        </motion.div>

        {/* Journal Pages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {journalPages.map((page, index) => (
            <motion.div
              key={page.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              <div className="relative bg-card rounded-2xl border border-border/50 overflow-hidden transition-all duration-500 hover:border-gold/40 hover:shadow-xl hover:shadow-gold/10">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={page.image}
                    alt={page.company}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60" />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <div className="flex items-center gap-2 text-gold">
                      <BookOpen size={24} />
                      <span className="font-sans">View Page</span>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <span className="text-xs font-sans tracking-wider uppercase text-gold">
                    {page.date}
                  </span>
                  <h3 className="font-serif text-lg text-foreground mt-1">{page.company}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-lg flex items-center justify-center p-4"
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={24} />
          </button>

          <button
            onClick={() => navigate("prev")}
            className="absolute left-4 md:left-8 p-3 rounded-full bg-secondary/50 text-foreground hover:bg-secondary transition-colors"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="max-w-4xl max-h-[85vh] overflow-hidden">
            <img
              src={journalPages[currentIndex].image}
              alt={journalPages[currentIndex].company}
              className="w-full h-full object-contain rounded-lg"
            />
            <div className="text-center mt-4">
              <h3 className="font-serif text-xl text-foreground">
                {journalPages[currentIndex].company}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {journalPages[currentIndex].date}
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate("next")}
            className="absolute right-4 md:right-8 p-3 rounded-full bg-secondary/50 text-foreground hover:bg-secondary transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        </motion.div>
      )}
    </section>
  );
};
