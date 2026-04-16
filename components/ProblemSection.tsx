"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { SearchX, Clock, LineChart, TrendingUp } from "lucide-react";
import styles from "./ProblemSection.module.css";

const problems = [
  {
    icon: SearchX,
    title: "They're not visible when clients are actively searching",
  },
  {
    icon: Clock,
    title: "There's no system to follow up quickly",
  },
  {
    icon: LineChart,
    title: "Their pipeline isn't predictable",
  },
];

// Interactive 3D Card
function Hover3DCard({ item, index }: any) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={styles.cardOuter}
      style={{ rotateX, rotateY }}
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <div className={styles.cardInner}>
        <div className={styles.iconWrapper}>
          <item.icon size={28} strokeWidth={2.5} />
        </div>
        <div className={styles.cardTextContainer}>
          <h4 className={styles.cardTitle}>{item.title}</h4>
        </div>
      </div>
    </motion.div>
  );
}

// Interactive 3D Portal for the Right Column
function Hover3DPortal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={styles.rightColumn}
      style={{ rotateX, rotateY }}
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.8,
        type: "spring",
        stiffness: 100,
        damping: 20,
      }}
    >
      {children}
    </motion.div>
  );
}

export default function ProblemSection() {
  return (
    <section className={styles.section} id="problem">
      <div className={styles.ambientGlow}></div>
      <div className={styles.container}>
        {/* Left Interactive Column */}
        <div className={styles.leftColumn}>
          <motion.h2
            className={styles.headline}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Spending More on Ads, But Seeing{" "}
            <span style={{ color: "#F97316" }}>Less Return?</span>
          </motion.h2>

          <motion.p
            className={styles.subheadline}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Most landscaping companies struggle because:
          </motion.p>

          <div className={styles.cardsWrapper}>
            {problems.map((item, idx) => (
              <Hover3DCard key={idx} item={item} index={idx} />
            ))}
          </div>

          <motion.div
            className={styles.summaryContainer}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <p className={styles.summaryText}>
              So even when leads come in... <br />
              <span style={{ color: "#2563EB" }}>
                They don't convert consistently.
              </span>
            </p>
          </motion.div>
        </div>

        {/* Right Portal Graph Column */}
        <Hover3DPortal>
          <div className={styles.graphPortal}>
            {/* Deep Background Grid */}
            <div className={styles.graphBackdrop}></div>

            {/* Simulated 3D SVG Line Chart built-in */}
            <svg
              className={styles.growthLineContainer}
              viewBox="0 0 500 300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              {/* Grid Lines */}
              <path
                d="M0 250 L500 250"
                stroke="rgba(37, 99, 235, 0.1)"
                strokeWidth="2"
                strokeDasharray="5 5"
              />
              <path
                d="M0 150 L500 150"
                stroke="rgba(37, 99, 235, 0.1)"
                strokeWidth="2"
                strokeDasharray="5 5"
              />
              <path
                d="M0 50 L500 50"
                stroke="rgba(37, 99, 235, 0.1)"
                strokeWidth="2"
                strokeDasharray="5 5"
              />

              {/* Growth Curve */}
              <path
                className={styles.growthLinePath}
                d="M 10 280 C 100 280, 150 180, 250 160 C 350 140, 400 80, 490 20"
                stroke="url(#gradientOrange)"
                strokeWidth="12"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradientOrange" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#2563EB" />
                  <stop offset="100%" stopColor="#F97316" />
                </linearGradient>
              </defs>
            </svg>

            {/* Added Bars for visual hierarchy */}
            <div className={styles.barGraphContainer}>
              <div className={`${styles.bar} ${styles.bar1}`}></div>
              <div className={`${styles.bar} ${styles.bar2}`}></div>
              <div className={`${styles.bar} ${styles.bar3}`}></div>
              <div className={`${styles.bar} ${styles.bar4}`}></div>
            </div>

            {/* Floating 3D Pills */}
            <div className={`${styles.floatingPill} ${styles.pillOrange}`}>
              <TrendingUp color="#F97316" size={20} strokeWidth={3} />
              <span>
                <span className={styles.revenueText}>+240%</span> Google ROI
              </span>
            </div>

            <div className={`${styles.floatingPill} ${styles.pillBlue}`}>
              <span style={{ color: "#2563EB", transform: "translateY(-1px)" }}>
                ●
              </span>
              <span>Automated Pipeline</span>
            </div>
          </div>
        </Hover3DPortal>
      </div>
    </section>
  );
}
