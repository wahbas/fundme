import { FileText } from 'lucide-react'
import { motion } from 'framer-motion'

export default function LoadingOverlay() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(8px)',
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Spinning ring */}
      <div style={{ position: 'relative', width: 80, height: 80 }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            border: '4px solid #E5E7EB',
            borderTopColor: '#0D82F9',
          }}
        />
        {/* Pulsing center */}
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          style={{
            position: 'absolute',
            inset: 0,
            margin: 'auto',
            width: 40,
            height: 40,
            background: 'rgba(13,130,249,0.15)',
            borderRadius: '50%',
          }}
        />
        {/* Center icon */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <FileText size={24} color="#0D82F9" />
        </div>
      </div>

      {/* Loading text */}
      <motion.p
        style={{ marginTop: 32, fontSize: 20, fontWeight: 600, color: '#111827' }}
      >
        Submitting your application
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          ...
        </motion.span>
      </motion.p>

      <p style={{ marginTop: 8, color: '#6B7280', fontSize: 14 }}>Please don't close this page</p>

      {/* Progress dots */}
      <div style={{ display: 'flex', gap: 8, marginTop: 24 }}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
            style={{ width: 8, height: 8, background: '#0D82F9', borderRadius: '50%' }}
          />
        ))}
      </div>
    </motion.div>
  )
}
