import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import buffet from "@/assets/gallery/buffet.jpg";
import worldtech from "@/assets/gallery/worldtech.jpg";
import codechum from "@/assets/gallery/codechum.jpg";
import rivan from "@/assets/gallery/rivan.jpg";
import rivan2 from "@/assets/gallery/rivan2.jpg";
import rivan3 from "@/assets/gallery/rivan3.jpg";
import mata from "@/assets/gallery/mata.jpg";
import mirror from "@/assets/gallery/mirror.jpg";
import tarsier from "@/assets/gallery/tarsier.jpg";
import tagbilaran from "@/assets/gallery/tagbilaran.jpg";
import cityhall from "@/assets/gallery/cityhall.jpg";
import cityhall2 from "@/assets/gallery/cityhall2.jpg";
import chocolatehills from "@/assets/gallery/chocolatehills.jpg";


interface GalleryImage {
  id: number;
  src?: string;
  category: string;
  title: string;
  description?: string;
}

const galleryImages: GalleryImage[] = [
  { id: 1, src: worldtech, category: "Company Visit", title: "WorldTech Presentation", description: "Learning about cybersecurity solutions" },
  { id: 2, src: codechum, category: "Company Visit", title: "CodeChum Office", description: "Exploring the EdTech platform" },
  { id: 3, src: buffet, category: "Dining", title: "Buffet 101", description: "Buffet 101 International Cuisin" },
  { id: 4, src: rivan, category: "Company Visit", title: "RIVAN IT Training", description: "IT certification programs" },
  { id: 5, src: rivan2, category: "Company Visit", title: "RIVAN IT", },
  { id: 6, src: rivan3, category: "Company Visit", title: "RIVAN IT", },
  { id: 7, src: mata, category: "Company Visit", title: "MATA Technologies, Inc.", description: "Virtual reality demonstrations" },
  { id: 8, src: mirror, category: "Travel", title: "Mirror of the World", },
  { id: 9, src: tarsier, category: "Company Visit", title: "TARSIER 117 HQ", description: "Emergency response center" },
  { id: 10, src: tagbilaran, category: "Travel", title: "Tagbilaran Airport", description: "Touchdown Bohol" },
  { id: 11, src: cityhall, category: "Experience", title: "Donations", description: "Donating to the less fortunate" },
  { id: 12, src: cityhall2, category: "Experience", title: "Donations", description: "Donating to the less fortunate" },
  {id: 13, src: chocolatehills, category: "Travel", title: "Chocolate Hills", description: "Iconic geological formations" },
];

const categories = ["All", "Company Visit", "Dining", "Travel", "Experience", "Group"];

export const GallerySection = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  const filteredImages = selectedCategory === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const currentIndex = lightboxImage ? filteredImages.findIndex(img => img.id === lightboxImage.id) : -1;

  const navigateLightbox = (direction: "prev" | "next") => {
    if (!lightboxImage) return;
    const newIndex = direction === "prev" 
      ? (currentIndex - 1 + filteredImages.length) % filteredImages.length
      : (currentIndex + 1) % filteredImages.length;
    setLightboxImage(filteredImages[newIndex]);
  };

  return (
    <section id="gallery" className="section-padding bg-background">
      <div className="container-narrow">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="inline-block font-sans text-sm tracking-[0.3em] uppercase text-gold mb-4">
            Captured Moments
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            Photo Gallery
          </h2>
          <p className="font-sans text-muted-foreground max-w-2xl mx-auto mb-8">
            A visual journey through our educational tour, capturing the essence 
            of learning, exploration, and camaraderie.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full font-sans text-sm transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-gold text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div 
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              onClick={() => setLightboxImage(image)}
              className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer bg-secondary"
            >
              <img
                src={image.src || buffet}
                alt={image.title}
                className="w-full h-full object-cover"
              />


              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <span className="text-xs font-sans tracking-wider uppercase text-gold">
                  {image.category}
                </span>
                <h4 className="font-serif text-lg text-foreground">{image.title}</h4>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Upload Placeholder */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
        </motion.div>
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-6 right-6 p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={32} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); navigateLightbox("prev"); }}
            className="absolute left-4 md:left-8 p-3 rounded-full bg-secondary/50 text-foreground hover:bg-secondary transition-colors"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="aspect-video bg-secondary rounded-2xl flex items-center justify-center mb-6">
              <img
                src={lightboxImage.src}
                alt={lightboxImage.title}
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
            <div className="text-center">
              <span className="text-sm font-sans tracking-wider uppercase text-gold">
                {lightboxImage.category}
              </span>
              <h3 className="font-serif text-3xl text-foreground mt-2">{lightboxImage.title}</h3>
              <p className="text-muted-foreground mt-2">{lightboxImage.description}</p>
            </div>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); navigateLightbox("next"); }}
            className="absolute right-4 md:right-8 p-3 rounded-full bg-secondary/50 text-foreground hover:bg-secondary transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        </motion.div>
      )}
    </section>
  );
};
