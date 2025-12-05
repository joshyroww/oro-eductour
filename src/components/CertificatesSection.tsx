import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Download, ExternalLink } from "lucide-react";

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  description: string;
}

const certificates: Certificate[] = [
  {
    id: 1,
    title: "Certificate of Participation",
    issuer: "WorldTech Information Solutions, Inc.",
    date: "Day 1",
    description: "IT Consultancy & Cybersecurity Workshop",
  },
  {
    id: 2,
    title: "Certificate of Completion",
    issuer: "CodeChum",
    date: "Day 2",
    description: "Educational Technology Platform Orientation",
  },
  {
    id: 3,
    title: "Certificate of Attendance",
    issuer: "RIVAN IT CEBU",
    date: "Day 2",
    description: "IT & Networking Training Overview",
  },
  {
    id: 4,
    title: "Certificate of Participation",
    issuer: "MATA Technologies, Inc.",
    date: "Day 3",
    description: "Virtual Reality Technology Demonstration",
  },
  {
    id: 5,
    title: "Certificate of Recognition",
    issuer: "TARSIER 117",
    date: "Day 4",
    description: "Emergency Response Systems Briefing",
  },
];

const CertificateCard = ({ cert, index }: { cert: Certificate; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, rotateX: -10 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <div className="relative bg-card rounded-2xl border border-border/50 overflow-hidden transition-all duration-500 hover:border-gold/40 hover:shadow-xl hover:shadow-gold/10">
        {/* Certificate Visual */}
        <div className="relative aspect-[4/3] bg-gradient-to-br from-secondary via-muted to-secondary flex items-center justify-center p-8">
          {/* Decorative Border */}
          <div className="absolute inset-4 border-2 border-gold/20 rounded-lg" />
          <div className="absolute inset-6 border border-gold/10 rounded-lg" />
          
          {/* Certificate Content Preview */}
          <div className="text-center z-10">
            <Award className="w-12 h-12 text-gold mx-auto mb-4" />
            <h4 className="font-serif text-xl text-foreground mb-1">{cert.title}</h4>
            <p className="text-sm text-muted-foreground">{cert.issuer}</p>
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
            <button className="p-3 rounded-full bg-gold text-primary-foreground hover:scale-110 transition-transform">
              <Download size={20} />
            </button>
            <button className="p-3 rounded-full bg-secondary text-foreground hover:scale-110 transition-transform">
              <ExternalLink size={20} />
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
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
            Certificates Earned
          </h2>
          <p className="font-sans text-muted-foreground max-w-2xl mx-auto">
            Recognition and certifications obtained from each company visited 
            during our educational tour.
          </p>
        </motion.div>

        {/* Certificates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, index) => (
            <CertificateCard key={cert.id} cert={cert} index={index} />
          ))}
        </div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-muted-foreground italic">
            Click on certificates to download or view full versions. Replace placeholders with actual certificates.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
