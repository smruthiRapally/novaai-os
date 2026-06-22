import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useToast } from '../../context/ToastContext';
import { MdCheckCircle, MdError, MdInfo } from 'react-icons/md';

const icons = {
  success: <MdCheckCircle size={18} color="var(--green)" />,
  error: <MdError size={18} color="var(--red)" />,
  info: <MdInfo size={18} color="var(--info)" />,
};

export default function Toast() {
  const { toasts } = useToast();

  return (
    <div className="toast-container">
      <AnimatePresence>
        {toasts.map(t => (
          <motion.div
            key={t.id}
            className={`toast toast-${t.type}`}
            initial={{ opacity: 0, x: 60, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 60, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          >
            {icons[t.type] || icons.success}
            <span>{t.message}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
