"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import TestimonialCard from "./TestimonialCard";
import styles from "./Testimonials.module.css";

const testimonialsData = [
  {
    name: "Savannah",
    role: "COO, JUST LEADZ",
    avatar: "/Clients/7.png",
    stars: 5,
    text: "We were running Google Ads before but not seeing consistent results. After working with Ikhtiyaar, everything became more structured and we started getting regular inbound calls without increasing our budget. It finally feels predictable."
  },
  {
    name: "Samantha Shakira Clarke",
    role: "PERSONAL TRAINER",
    avatar: "/Clients/6.png",
    stars: 5,
    text: "Before this, most of our work came from referrals and word of mouth. Now we're actually showing up on Google and getting calls weekly. It's helped us stay busy even during slower months, which wasn't the case before."
  },
  {
    name: "Micheal Swisher",
    role: "OWNER, SWISHER CAPITAL",
    avatar: "/Clients/5.jpeg",
    stars: 5,
    text: "We had tried cold email before with very little success. The approach here was completely different — better targeting and messaging. We're now getting replies from the right people and booking qualified calls regularly."
  },
  {
    name: "Isiah Mccullum",
    role: "OWNER, PRISTINECLEAN PROS",
    avatar: "/Clients/4.png",
    stars: 4,
    text: "Our Meta ads used to get engagement but not many sales. The team reworked our strategy and creatives, and now we're seeing better conversions and more consistent performance across campaigns."
  },
  {
    name: "Isabeau Miller",
    role: "OWNER, BECKON HOMES",
    avatar: "/Clients/3.png",
    stars: 5,
    text: "We didn't realize how much opportunity we were missing on search. After the SEO work, we started ranking for important keywords and saw a steady increase in inquiries. It's been a solid long-term investment."
  },
  {
    name: "Dallin Cottle",
    role: "OWNER, ROAR MEDIA",
    avatar: "/Clients/2.png",
    stars: 5,
    text: "The biggest change for us wasn't just more leads, but how those leads were handled. The follow-up system made everything smoother, and we're now converting more of the inquiries we get into actual clients."
  }
];

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  // Softer Container Scroll Calculations
  const containerRotateX = useTransform(scrollYProgress, [0, 1], [15, 0]);
  const containerScale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const headerY = useTransform(scrollYProgress, [0, 1], [100, 0]);

  // Extraordinary Per-Card 3D Fly-In Variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      }
    }
  };

  const cardVariants = {
    hidden: (idx: number) => ({
      opacity: 0,
      rotateX: 60,
      rotateY: (idx % 3 === 0) ? -45 : (idx % 3 === 2) ? 45 : 0, 
      rotateZ: (idx % 2 === 0) ? -10 : 10,
      z: -1200,
      y: 400,
      scale: 0.5,
    }),
    visible: (idx: number) => ({
      opacity: 1,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      z: 0,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 85,
        damping: 14,
        mass: 1.1,
      }
    })
  };

  return (
    <section className={styles.section} ref={containerRef} id="results">
      <div className={styles.ambientBlob1}></div>
      <div className={styles.ambientBlob2}></div>

      <motion.div 
        className={styles.headerContainer}
        style={{ opacity: headerOpacity, y: headerY }}
      >
        <div className={styles.starsTop}>
          {[...Array(5)].map((_, i) => (
             <svg key={i} width="28" height="28" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
               <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
             </svg>
          ))}
        </div>
        <h2 className={styles.title}>Real Businesses. Real<br/>Growth. Real Results.</h2>
        <p className={styles.subtitle}>With our services</p>
      </motion.div>

      <motion.div 
        className={styles.gridContainer}
        style={{
          rotateX: containerRotateX,
          scale: containerScale,
        }}
      >
        <motion.div 
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {testimonialsData.map((t, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              variants={cardVariants}
              style={{ transformStyle: "preserve-3d" }}
            >
              <TestimonialCard {...t} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
