import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CLICKABLE = [
  'button', 'a', 'input', 'select', 'textarea', 'label',
  '[data-cursor]', '.nav-item', '.stat-card', '.glass-card.clickable',
  '.customer-card', '.kanban-card', '.task-item', '.report-card',
  '.insight-card', '.activity-item', '.navbar-icon-btn', '.avatar',
  '.chart-filter-btn', '.settings-tab', '.toggle', '.btn',
];

export default function CustomCursor() {
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [visible, setVisible] = useState(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // Main dot — tight spring for responsiveness
  const dotX = useSpring(rawX, { stiffness: 800, damping: 50 });
  const dotY = useSpring(rawY, { stiffness: 800, damping: 50 });

  // Ring — looser spring for trailing effect
  const ringX = useSpring(rawX, { stiffness: 200, damping: 28 });
  const ringY = useSpring(rawY, { stiffness: 200, damping: 28 });

  useEffect(() => {
    const onMove = (e) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!visible) setVisible(true);

      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (el) {
        const isClickable = CLICKABLE.some(sel => {
          try { return el.closest(sel) !== null; } catch { return false; }
        });
        setHovering(isClickable);
      }
    };

    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
    };
  }, [visible, rawX, rawY]);

  if (!visible) return null;

  return (
    <>
      {/* Outer trailing ring */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0, left: 0,
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          pointerEvents: 'none',
          zIndex: 99998,
          mixBlendMode: 'normal',
        }}
      >
        <motion.div
          animate={{
            width: clicking ? 28 : hovering ? 44 : 32,
            height: clicking ? 28 : hovering ? 44 : 32,
            opacity: clicking ? 0.6 : hovering ? 0.7 : 0.5,
            borderColor: hovering ? 'rgba(139,92,246,0.8)' : 'rgba(34,211,238,0.5)',
            boxShadow: hovering
              ? '0 0 16px rgba(139,92,246,0.4), inset 0 0 8px rgba(139,92,246,0.1)'
              : '0 0 8px rgba(34,211,238,0.25)',
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          style={{
            borderRadius: '50%',
            border: '1.5px solid rgba(34,211,238,0.5)',
            background: hovering ? 'rgba(139,92,246,0.06)' : 'transparent',
          }}
        />
      </motion.div>

      {/* Inner dot */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0, left: 0,
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          pointerEvents: 'none',
          zIndex: 99999,
        }}
      >
        <motion.div
          animate={{
            width: clicking ? 5 : hovering ? 7 : 6,
            height: clicking ? 5 : hovering ? 7 : 6,
            scale: clicking ? 0.6 : 1,
            background: hovering
              ? 'radial-gradient(circle, #C4B5FD, #8B5CF6)'
              : 'radial-gradient(circle, #67E8F9, #22D3EE)',
            boxShadow: hovering
              ? '0 0 10px rgba(139,92,246,0.9), 0 0 20px rgba(139,92,246,0.4)'
              : '0 0 8px rgba(34,211,238,0.9), 0 0 16px rgba(34,211,238,0.4)',
          }}
          transition={{ type: 'spring', stiffness: 600, damping: 30 }}
          style={{ borderRadius: '50%' }}
        />
      </motion.div>

      {/* Click ripple */}
      {clicking && (
        <motion.div
          style={{
            position: 'fixed',
            top: 0, left: 0,
            x: dotX,
            y: dotY,
            translateX: '-50%',
            translateY: '-50%',
            pointerEvents: 'none',
            zIndex: 99997,
          }}
        >
          <motion.div
            initial={{ width: 6, height: 6, opacity: 0.8 }}
            animate={{ width: 48, height: 48, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(139,92,246,0.3), transparent)',
              border: '1px solid rgba(139,92,246,0.4)',
            }}
          />
        </motion.div>
      )}
    </>
  );
}
