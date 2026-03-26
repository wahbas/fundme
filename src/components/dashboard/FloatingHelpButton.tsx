import { useState } from 'react'
import { motion } from 'framer-motion'
import ContactSupportModal from './ContactSupportModal'

export default function FloatingHelpButton() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.05, boxShadow: '0 6px 24px rgba(37, 99, 235, 0.4)' }}
        whileTap={{ scale: 0.95 }}
        className="floating-help-btn"
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
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <text x="12" y="17" textAnchor="middle" fill="white" fontSize="16" fontWeight="700" fontFamily="DM Sans, sans-serif">?</text>
        </svg>
      </motion.button>
      <ContactSupportModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
