import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code, GraduationCap, MapPin } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.jpg";

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding bg-secondary/30">
      <div className="container-narrow">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Photo */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <img
                src={profilePhoto}
                alt="Joshua Oro"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
            </div>
            {/* Decorative frame */}
            <div className="absolute -inset-4 border border-gold/20 rounded-2xl -z-10" />
            <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-gold/10 rounded-full blur-2xl" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <span className="inline-block font-sans text-sm tracking-[0.3em] uppercase text-gold mb-4">
                About Me
              </span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
                Joshua Oro
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Code className="w-5 h-5 text-gold" />
                <span className="font-sans text-lg">System Developer</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <GraduationCap className="w-5 h-5 text-gold" />
                <span className="font-sans text-lg">3rd Year BS Information Technology</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-gold" />
                <span className="font-sans text-lg">Holy Cross of Davao College</span>
              </div>
            </div>

            <p className="font-sans text-muted-foreground leading-relaxed">
              This portfolio documents my educational journey through Cebu and Bohol as part of 
              the BSIT program. Through company visits and cultural immersion, I gained valuable 
              insights into the Philippine tech industry and its diverse applications.
            </p>

            <div className="pt-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 border border-gold/30 rounded-full text-gold text-sm">
                <span>November 19-22, 2025</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
