import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Award, X, ZoomIn } from "lucide-react";
import certificateCompletion from "@/assets/certificates/certificate-completion.jpg";

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  description: string;
  image: string;
}

const certificates: Certificate[] = [
  {
    id: 1,
    title: "Certificate of Completion",
    issuer: "World of Adventures Travel and Tours",
    date: "November 22, 2025",
    description: "Educational Tour in Cebu and Bohol - Awarded for active participation, sincere effort, and meaningful attendance",
    image: certificateCompletion,
  },
];

const CertificateCard = ({ cert, index, onView }: { cert: Certificate; index: number; onView: (cert: Certificate) => void }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, rotateX: -10 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group cursor-pointer"
      onClick={() => onView(cert)}
    >
      <div className="relative bg-card rounded-2xl border border-border/50 overflow-hidden transition-all duration-500 hover:border-gold/40 hover:shadow-xl hover:shadow-gold/10">
        {/* Certificate Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={cert.image}
            alt={cert.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
            <div className="flex items-center gap-2 text-gold">
              <ZoomIn size={24} />
              <span className="font-sans">View Certificate</span>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-4 h-4 text-gold" />
            <span className="text-xs font-sans tracking-wider uppercase text-gold">
              {cert.date}
            </span>
          </div>
          <h3 className="font-serif text-lg text-foreground mb-1">{cert.title}</h3>
          <p className="text-sm text-muted-foreground">{cert.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export const CertificatesSection = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  return (
    <section id="certificates" className="section-padding bg-charcoal-light">
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
            Achievements
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            Certificate of Completion
          </h2>
          <p className="font-sans text-muted-foreground max-w-2xl mx-auto">
            Official recognition for successfully completing the Cebu-Bohol Educational Tour, 
            awarded by World of Adventures Travel and Tours (WATT).
          </p>
        </motion.div>

        {/* Certificates Grid */}
        <div className="flex justify-center">
          <div className="max-w-lg w-full">
            {certificates.map((cert, index) => (
              <CertificateCard key={cert.id} cert={cert} index={index} onView={setSelectedCert} />
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {selectedCert && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-lg flex items-center justify-center p-4"
        >
          <button
            onClick={() => setSelectedCert(null)}
            className="absolute top-6 right-6 p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={24} />
          </button>

          <div className="max-w-5xl max-h-[90vh] overflow-hidden">
            <img
              src={selectedCert.image}
              alt={selectedCert.title}
              className="w-full h-full object-contain rounded-lg"
            />
            <div className="text-center mt-4">
              <h3 className="font-serif text-xl text-foreground">
                {selectedCert.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {selectedCert.issuer} • {selectedCert.date}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
};
