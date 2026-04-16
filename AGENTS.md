# AGENTS.md

## 1. Core Mission

This project is a high conversion lead generation platform for service based businesses.

The UI must feel premium, trustworthy, and modern while maintaining strict consistency through CSS Modules only.

All UI must optimize for clarity, conversion, and professional trust.

---

## 2. Styling System Rules

### 2.1 Styling Method

- DO NOT use Tailwind CSS
- DO NOT use inline styles for layout or design
- USE CSS Modules exclusively for all styling
- Each component must have its own scoped module file
- Shared design patterns must be replicated through consistent class conventions, not utility frameworks

---

### 2.2 Global Design Language

The visual identity is WHITE + BLUE.

Core palette rules:

- Background: white and soft off white layers
- Primary: clean professional blue tones
- Accent: blue gradients for highlights and CTAs
- Text: slate and deep gray hierarchy

Rules:

- No random colors
- No neon or overly saturated tones
- Blue must communicate trust, stability, and professionalism

---

## 3. Visual Style Direction

The UI must feel layered, soft, and slightly futuristic while staying professional.

Required design techniques:

### Glassmorphism

- Use semi transparent backgrounds
- Apply backdrop blur on cards and modals
- Use subtle borders with opacity
- Avoid heavy opacity that reduces readability

### Gradients

- Use blue based gradients only
- Example direction: blue to cyan or blue to soft indigo
- Gradients should be subtle, not loud

### Depth and 3D Feel

- Soft shadows with layered elevation
- Hover lift effects using translateY
- Cards should feel like floating physical surfaces
- Use blurred background blobs for spatial depth

---

## 4. CSS Module Structure Rules

Each component must follow this structure:

- ComponentName.jsx
- ComponentName.module.css

Rules:

- Class names must be meaningful and semantic
- Avoid generic names like container1 or box2
- Keep styles tightly scoped to components
- Shared styles must be duplicated intentionally or abstracted into global CSS only when absolutely necessary

---

## 5. Animation and Micro Interactions

Every interactive element must feel alive.

Required:

- Smooth transitions (200ms to 350ms)
- Hover lift effects on cards and buttons
- Slight scaling on interactive elements
- Fade in on mount for sections
- Soft glow or shadow intensification on hover

Rules:

- No abrupt transitions
- No overly long or distracting animations
- Motion must support usability, not distract from it

---

## 6. Component Design Rules

### Buttons

- Rounded corners (8px to 16px range)
- Primary buttons use blue gradient or solid blue
- Hover state increases brightness and slightly lifts element
- Click state slightly compresses scale

### Cards

- Glassmorphism preferred
- Soft shadow with layered depth
- Hover lift effect
- Subtle border with opacity

### Sections

- Generous spacing between sections
- Never overcrowd layouts
- Always maintain breathing space for readability

---

## 7. Layout Principles

- Mobile first design
- Strong grid hierarchy
- Balanced whitespace usage
- Avoid center empty voids in layouts
- Ensure CTA elements are always visually dominant

---

## 8. Background Design System

To create depth and 3D atmosphere:

- Use blurred gradient blobs in background
- Place soft circular light shapes behind sections
- Layer backgrounds subtly, never aggressively
- Maintain high readability above all visual effects

---

## 10. Performance and Clean UI Code

- Keep CSS Modules lightweight per component
- Avoid duplication of identical visual patterns
- Reuse structure patterns rather than copying entire components
- Keep UI modular and maintainable

---

## 11. Final Design Principle

If a UI decision is uncertain, choose:

- Clean over complex
- Trustworthy over flashy
- Consistent over experimental
- Readable over decorative
- Conversion focused over purely aesthetic
