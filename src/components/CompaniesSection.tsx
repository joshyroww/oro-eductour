import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Shield, GraduationCap, Eye, Phone } from "lucide-react";

interface Company {
  name: string;
  shortName: string;
  description: string;
  expertise: string[];
  icon: React.ReactNode;
  day: number;
}

const companies: Company[] = [
  {
    name: "WorldTech Information Solutions, Inc.",
    shortName: "WorldTech",
    description: "A Philippine-based IT consultancy and training company specializing in IT consulting, cybersecurity solutions, and professional training, including authorized certification programs.",
    expertise: ["IT Consulting", "Cybersecurity", "Professional Training", "Certifications"],
    icon: <Shield className="w-8 h-8" />,
    day: 1,
  },
  {
    name: "CodeChum",
    shortName: "CodeChum",
    description: "An educational technology platform designed to make learning programming accessible and engaging for students and teachers alike.",
    expertise: ["EdTech", "Programming Education", "Interactive Learning", "Student Assessment"],
    icon: <GraduationCap className="w-8 h-8" />,
    day: 2,
  },
  {
    name: "RIVAN IT CEBU",
    shortName: "RIVAN IT",
    description: "A specialized training center focusing on IT and networking certification courses, preparing professionals for industry-standard qualifications.",
    expertise: ["IT Training", "Networking", "Certifications", "Career Development"],
    icon: <Shield className="w-8 h-8" />,
    day: 2,
  },
  {
    name: "MATA Technologies, Inc.",
    shortName: "MATA Tech",
    description: "A homegrown provider of virtual tours for real estate in the Philippines and virtual reality maps of tourist destinations across the country.",
    expertise: ["Virtual Reality", "Real Estate Tech", "Tourism Tech", "3D Mapping"],
    icon: <Eye className="w-8 h-8" />,
    day: 3,
  },
  {
    name: "TARSIER 117",
    shortName: "TARSIER 117",
    description: "The Telephone and Radio System Integrated Emergency Response (TARSIER) 117 is an emergency response and disaster management unit established in Bohol.",
    expertise: ["Emergency Response", "Disaster Management", "Public Safety", "Integrated Systems"],
    icon: <Phone className="w-8 h-8" />,
    day: 4,
  },
];

const CompanyCard = ({ company, index }: { company: Company; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="relative h-full bg-card rounded-2xl border border-border/50 p-8 transition-all duration-500 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5">
        {/* Day Badge */}
        <div className="absolute top-6 right-6">
          <span className="text-xs font-sans tracking-wider uppercase text-muted-foreground">
            Day {company.day}
          </span>
        </div>

        {/* Icon */}
        <div className="w-16 h-16 rounded-xl bg-gradient-gold flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110">
          <div className="text-primary-foreground">{company.icon}</div>
        </div>

        {/* Content */}
        <h3 className="font-serif text-2xl text-foreground mb-2 group-hover:text-gold transition-colors duration-300">
          {company.shortName}
        </h3>
        <p className="font-sans text-xs tracking-wider uppercase text-muted-foreground mb-4">
          {company.name}
        </p>
        <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-6">
          {company.description}
        </p>

        {/* Expertise Tags */}
        <div className="flex flex-wrap gap-2">
          {company.expertise.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-sans bg-secondary rounded-full text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Hover Accent Line */}
        <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-gold/0 to-transparent group-hover:via-gold transition-all duration-500" />
      </div>
    </motion.div>
  );
};

export const CompaniesSection = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <section id="companies" className="section-padding bg-charcoal-light">
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
            Industry Partners
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            Companies Visited
          </h2>
          <p className="font-sans text-muted-foreground max-w-2xl mx-auto">
            Gaining firsthand insights from leading technology companies and 
            institutions shaping the Philippine IT landscape.
          </p>
        </motion.div>

        {/* Company Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company, index) => (
            <CompanyCard key={company.name} company={company} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
