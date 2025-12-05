import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Utensils, Building2, Hotel, Bus } from "lucide-react";

interface TimelineEvent {
  time: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  highlight?: boolean;
}

interface DayData {
  day: number;
  date: string;
  title: string;
  events: TimelineEvent[];
}

const journeyData: DayData[] = [
  {
    day: 1,
    date: "Day One",
    title: "Arrival & First Impressions",
    events: [
      {
        time: "Morning",
        title: "Meet and Greet",
        description: "Welcomed by our tour guides, setting the tone for an exciting educational journey ahead.",
        icon: <MapPin className="w-5 h-5" />,
      },
      {
        time: "Noon",
        title: "Lunch at Somac Korean Restaurant",
        description: "Delightful Korean buffet experience to fuel our first day of exploration.",
        icon: <Utensils className="w-5 h-5" />,
      },
      {
        time: "Afternoon",
        title: "WorldTech Information Solutions, Inc.",
        description: "Explored IT consultancy, cybersecurity solutions, and professional certification programs.",
        icon: <Building2 className="w-5 h-5" />,
        highlight: true,
      },
      {
        time: "Evening",
        title: "Check-in at BAI Hotel",
        description: "Settled into our comfortable accommodations for the journey ahead.",
        icon: <Hotel className="w-5 h-5" />,
      },
    ],
  },
  {
    day: 2,
    date: "Day Two",
    title: "Deep Dive into Tech Education",
    events: [
      {
        time: "Morning",
        title: "CodeChum Company Visit",
        description: "Discovered how this EdTech platform makes programming accessible and engaging for students and teachers.",
        icon: <Building2 className="w-5 h-5" />,
        highlight: true,
      },
      {
        time: "Noon",
        title: "Buffet 101 International Cuisine",
        description: "World-class international buffet experience with an incredible variety of dishes.",
        icon: <Utensils className="w-5 h-5" />,
      },
      {
        time: "Afternoon",
        title: "RIVAN IT CEBU",
        description: "Learned about IT and networking certification courses at this specialized training center.",
        icon: <Building2 className="w-5 h-5" />,
        highlight: true,
      },
    ],
  },
  {
    day: 3,
    date: "Day Three",
    title: "Innovation & Island Crossing",
    events: [
      {
        time: "Morning",
        title: "MATA Technologies, Inc.",
        description: "Explored virtual reality tours for real estate and tourist destinations across the Philippines.",
        icon: <Building2 className="w-5 h-5" />,
        highlight: true,
      },
      {
        time: "Noon",
        title: "Viking's SM City",
        description: "Premium buffet experience before our island crossing adventure.",
        icon: <Utensils className="w-5 h-5" />,
      },
      {
        time: "Afternoon",
        title: "Journey to Bohol",
        description: "Scenic ferry crossing to the beautiful island of Bohol, home of the famous Chocolate Hills.",
        icon: <Bus className="w-5 h-5" />,
      },
    ],
  },
  {
    day: 4,
    date: "Day Four",
    title: "Emergency Response & Farewell",
    events: [
      {
        time: "Morning",
        title: "TARSIER 117 Emergency Response HQ",
        description: "Visited the integrated emergency response and disaster management unit established in Bohol.",
        icon: <Building2 className="w-5 h-5" />,
        highlight: true,
      },
      {
        time: "Noon",
        title: "Floating Restaurant at Loboc River",
        description: "Unforgettable fiesta buffet cruise with traditional harana serenades on the scenic river.",
        icon: <Utensils className="w-5 h-5" />,
      },
      {
        time: "Afternoon",
        title: "Journey Back to Davao",
        description: "Departed Bohol with hearts full of memories and minds enriched with knowledge.",
        icon: <Bus className="w-5 h-5" />,
      },
    ],
  },
];

const TimelineCard = ({ event, index }: { event: TimelineEvent; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative pl-12 pb-8 ${event.highlight ? "group" : ""}`}
    >
      {/* Timeline Line */}
      <div className="absolute left-[18px] top-0 bottom-0 w-px bg-border" />
      
      {/* Timeline Dot */}
      <div
        className={`absolute left-0 top-1 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
          event.highlight
            ? "bg-gold text-primary-foreground shadow-lg"
            : "bg-secondary text-muted-foreground"
        }`}
      >
        {event.icon}
      </div>

      {/* Content */}
      <div
        className={`rounded-xl p-5 transition-all duration-300 ${
          event.highlight
            ? "bg-card border border-gold/20 hover:border-gold/40"
            : "bg-secondary/30 hover:bg-secondary/50"
        }`}
      >
        <span className="text-xs font-sans tracking-wider uppercase text-muted-foreground">
          {event.time}
        </span>
        <h4 className={`font-serif text-xl mt-1 mb-2 ${event.highlight ? "text-gold" : "text-foreground"}`}>
          {event.title}
        </h4>
        <p className="font-sans text-sm text-muted-foreground leading-relaxed">
          {event.description}
        </p>
      </div>
    </motion.div>
  );
};

const DaySection = ({ dayData, dayIndex }: { dayData: DayData; dayIndex: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: dayIndex * 0.2 }}
      className="mb-16 last:mb-0"
    >
      {/* Day Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-full bg-gradient-gold flex items-center justify-center">
          <span className="font-serif text-2xl font-semibold text-primary-foreground">
            {dayData.day}
          </span>
        </div>
        <div>
          <span className="text-xs font-sans tracking-[0.2em] uppercase text-gold">
            {dayData.date}
          </span>
          <h3 className="font-serif text-2xl md:text-3xl text-foreground">
            {dayData.title}
          </h3>
        </div>
      </div>

      {/* Timeline Events */}
      <div className="ml-4">
        {dayData.events.map((event, index) => (
          <TimelineCard key={index} event={event} index={index} />
        ))}
      </div>
    </motion.div>
  );
};

export const JourneyTimeline = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <section id="journey" className="section-padding bg-background">
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
            The Adventure
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            Our Journey
          </h2>
          <p className="font-sans text-muted-foreground max-w-2xl mx-auto">
            Four transformative days exploring the intersection of technology, 
            culture, and natural beauty in the heart of Visayas.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto">
          {journeyData.map((day, index) => (
            <DaySection key={day.day} dayData={day} dayIndex={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
