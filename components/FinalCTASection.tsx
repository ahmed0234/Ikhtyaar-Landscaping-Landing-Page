"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import styles from "./FinalCTASection.module.css";
import { TrendingUp, Ban, CheckCircle, ArrowRight } from "lucide-react";

const revealChild = {
  hidden: { opacity: 0, y: 30, rotateX: -90, transformPerspective: 600 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { type: "spring", damping: 14, stiffness: 200 },
  },
};

const SplitText = ({ children }: { children: any }) => {
  const childrenString = Array.isArray(children)
    ? children.join("")
    : typeof children === "string"
      ? children
      : "";
  const parts = childrenString.match(/\S+|\s+/g) || [];
  let charIndex = 0;
  return (
    <>
      {parts.map((part, i) => {
        if (/\s+/.test(part)) {
          return (
            <span key={`space-${i}`} style={{ display: "inline" }}>
              {part}
            </span>
          );
        }
        return (
          <span
            key={`word-${i}`}
            style={{ display: "inline-block", whiteSpace: "nowrap" }}
          >
            {part.split("").map((char) => {
              const currentKey = charIndex;
              charIndex++;
              return (
                <motion.span
                  key={currentKey}
                  variants={revealChild}
                  style={{ display: "inline-block" }}
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        );
      })}
    </>
  );
};

const subtextWord = {
  hidden: { opacity: 0, y: 15, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const SplitSubtext = ({ text }: { text: string }) => {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <span key={i} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
          <motion.span
            variants={subtextWord}
            style={{ display: "inline-block" }}
          >
            {word}
          </motion.span>
          {i !== words.length - 1 && (
            <span style={{ display: "inline" }}>&nbsp;</span>
          )}
        </span>
      ))}
    </>
  );
};

function Hover3DCard({
  children,
  glowClass,
}: {
  children: React.ReactNode;
  glowClass: string;
}) {
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
      className={styles.card}
      style={{ rotateX, rotateY }}
    >
      <div className={glowClass}></div>
      {children}
    </motion.div>
  );
}

export default function FinalCTASection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  return (
    <section className={styles.section} id="services">
      <div className={styles.blob1}></div>
      <div className={styles.blob2}></div>
      <div className={styles.bgGrid}></div>

      <motion.div
        className={styles.container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        {/* QUALIFICATION CARDS */}
        <div className={styles.cardsGrid}>
          {/* Card 1 */}
          <Hover3DCard glowClass={styles.glowGreen}>
            <div className={styles.cardIconWrapper}>
              <TrendingUp size={32} color="#10B981" />
            </div>
            <h3 className={styles.cardTitle}>What this typically turns into</h3>
            <p className={styles.cardSubtitle}>
              When implemented correctly, this turns into:
            </p>

            <div className={styles.checklist}>
              <div className={styles.checkItem}>
                <CheckCircle className={styles.checkIconGreen} size={24} />
                <span className={styles.checkText}>
                  Consistent inbound leads every week
                </span>
              </div>
              <div className={styles.checkItem}>
                <CheckCircle className={styles.checkIconGreen} size={24} />
                <span className={styles.checkText}>
                  Appointments getting booked without chasing
                </span>
              </div>
              <div className={styles.checkItem}>
                <CheckCircle className={styles.checkIconGreen} size={24} />
                <span className={styles.checkText}>
                  A pipeline you can actually rely on
                </span>
              </div>
            </div>

            <div className={styles.cardFooterText}>
              Not overnight. Not magic. But controlled, predictable growth.
            </div>
          </Hover3DCard>

          {/* Card 2 */}
          <Hover3DCard glowClass={styles.glowRed}>
            <div className={styles.cardIconWrapper}>
              <Ban size={32} color="#EF4444" />
            </div>
            <h3 className={styles.cardTitle}>This Is Not for Everyone</h3>
            <p className={styles.cardSubtitle}>This works best if:</p>

            <div className={styles.checklist}>
              <div className={styles.checkItem}>
                <CheckCircle className={styles.checkIconGreen} size={24} />
                <span className={styles.checkText}>
                  You’re already closing deals
                </span>
              </div>
              <div className={styles.checkItem}>
                <CheckCircle className={styles.checkIconGreen} size={24} />
                <span className={styles.checkText}>
                  You want consistency — not quick wins
                </span>
              </div>
              <div className={styles.checkItem}>
                <CheckCircle className={styles.checkIconGreen} size={24} />
                <span className={styles.checkText}>
                  You can handle more inbound leads
                </span>
              </div>
            </div>

            <div className={styles.cardFooterText}>
              If that’s you — this will make sense.
            </div>
          </Hover3DCard>
        </div>

        {/* MIDDLE PITCH */}
        <motion.div
          className={styles.pitchSection}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.05, delayChildren: 0.4 },
            },
          }}
        >
          <motion.h2 className={styles.pitchHeadline}>
            <SplitText>
              Look, People Are Already Searching for Insurance in Your Area
            </SplitText>
          </motion.h2>
          <motion.p
            className={styles.pitchSub}
            whileHover={{
              scale: 1.02,
              y: -5,
            }}
            whileTap={{ scale: 0.98 }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.04, delayChildren: 1.2 },
              },
            }}
          >
            <SplitSubtext text="The only question is — do they find you... or your competitor?" />
          </motion.p>
        </motion.div>

        {/* ULTIMATE BANNER */}
        <a href="https://zcal.co/ikhtiyaar/discoverycall" target="_blank">
        <motion.div
          className={styles.ultimateBanner}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <svg
            className={styles.bannerBgSvg}
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="cubes"
                width="60"
                height="60"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M30 0 L60 15 L60 45 L30 60 L0 45 L0 15 Z"
                  fill="none"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="1"
                />
                <path
                  d="M30 30 L60 15 M30 30 L30 60 M30 30 L0 15"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cubes)" />
          </svg>
          <a href="https://zcal.co/ikhtiyaar/discoverycall" target="_blank">
            <h2 className={styles.bannerText}>
              Book a call and I’ll show you exactly what’s happening in your
              market
            </h2>
          </a>

          <button className={styles.bannerButton}>
            BOOK A CALL <ArrowRight size={20} />
          </button>
        </motion.div>
        </a>

        <motion.p
          className={styles.bannerFooter}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          I’ll literally pull up your city, show you who’s getting the leads
          right now, and where you’re missing out. No pitch. Just clarity.
        </motion.p>
      </motion.div>
    </section>
  );
}
