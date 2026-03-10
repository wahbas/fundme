import { motion } from 'framer-motion'

export default function FloatingHelpButton() {
  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.05, boxShadow: '0 6px 24px rgba(37, 99, 235, 0.4)' }}
      whileTap={{ scale: 0.95 }}
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        width: 48,
        height: 48,
        borderRadius: '50%',
        background: '#2563EB',
        border: 'none',
        boxShadow: '0 4px 16px rgba(37, 99, 235, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 100,
      }}
    >
      {/* Pulse ring */}
      <motion.div
        animate={{ scale: [1, 1.5], opacity: [0.3, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          border: '2px solid #2563EB',
        }}
      />
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <text x="12" y="17" textAnchor="middle" fill="white" fontSize="16" fontWeight="700" fontFamily="DM Sans, sans-serif">?</text>
      </svg>
    </motion.button>
  )
}
