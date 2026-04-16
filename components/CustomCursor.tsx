"use client";

import React, { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useVelocity,
  useTransform,
} from "framer-motion";

const SEGMENTS = 10;

const CustomCursor = () => {
  const [mounted, setMounted] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // The "head" follows the mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Create chained springs with higher stiffness and lower mass for faster response
  const points = [];
  let prevX = mouseX;
  let prevY = mouseY;

  for (let i = 0; i < SEGMENTS; i++) {
    // Increased stiffness and lower mass = faster response, shorter "feeling" trail
    const stiffness = 1200 - i * 60;
    const damping = 50 + i * 2;
    const mass = 0.2 + i * 0.05;

    const x = useSpring(prevX, { stiffness, damping, mass });
    const y = useSpring(prevY, { stiffness, damping, mass });

    points.push({ x, y });
    prevX = x;
    prevY = y;
  }

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      if (!target) return;

      const isInteractive =
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".interactive-cursor") ||
        window.getComputedStyle(target).cursor === "pointer";

      setIsPointer(!!isInteractive);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[999999]"
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      <svg className="w-full h-full overflow-visible">
        <defs>
          <filter id="softGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* The "Physics Chain" Trail */}
        {points.map((_, i) => {
          if (i === 0) return null;
          const prev = points[i - 1];
          const curr = points[i];

          return (
            <motion.line
              key={i}
              x1={prev.x}
              y1={prev.y}
              x2={curr.x}
              y2={curr.y}
              stroke={isPointer ? "#3B82F6" : "#60A5FA"}
              strokeWidth={Math.max(1, (SEGMENTS - i) * 1.2)}
              strokeOpacity={Math.max(0, 0.5 - i * (0.5 / SEGMENTS))}
              strokeLinecap="round"
              filter="url(#softGlow)"
              style={{
                mixBlendMode: "screen",
              }}
              animate={{
                strokeWidth: isPointer
                  ? (SEGMENTS - i) * 2
                  : (SEGMENTS - i) * 1.2,
                strokeOpacity: isPointer ? 0.35 : 0.5 - i * (0.5 / SEGMENTS),
              }}
              transition={{ type: "spring", stiffness: 400, damping: 40 }}
            />
          );
        })}
      </svg>

      {/* Modern Exploration Label */}
      {isPointer && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          style={{
            position: "absolute",
            left: mouseX,
            top: mouseY,
            x: "24px",
            y: "-50%",
          }}
          className="flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 px-4 py-2 rounded-2xl shadow-2xl"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-blue-700 animate-pulse" />
          <span className="text-[13px] font-medium tracking-wide text-black whitespace-nowrap">
            View Case
          </span>
        </motion.div>
      )}

      {/* Head Light Blobs */}
      <motion.div
        style={{
          position: "absolute",
          left: mouseX,
          top: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isPointer ? 1.8 : 1,
        }}
        className="w-3 h-3 bg-white/85 rounded-full blur-[2px] z-10"
      />
      <motion.div
        style={{
          position: "absolute",
          left: points[0].x,
          top: points[0].y,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="w-12 h-12 bg-blue-500/10 rounded-full blur-[10px]"
      />
    </div>
  );
};

export default CustomCursor;
