import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronDown, Clock, Wallet, CheckCircle2, ArrowRight, ArrowLeft, Sparkles, Phone, MessageSquare, Mail, FileText, CreditCard, User, Building2 } from 'lucide-react'
import { useTheme } from '../ThemeContext'
import { useI18n } from '../i18n'

interface EarlyPaymentModalProps {
  open: boolean
  onClose: () => void
}

type RepaymentOption = 'finish-earlier' | 'lower-installment'
type ContactMethod = 'call' | 'whatsapp' | 'email'
type ModalState = 'options' | 'confirm' | 'success'

const timingOptions = [
  { value: '3', labelEn: '3 months', labelAr: '3 أشهر', savings: '18,200' },
  { value: '6', labelEn: '6 months', labelAr: '6 أشهر', savings: '12,400' },
  { value: '9', labelEn: '9 months', labelAr: '9 أشهر', savings: '7,800' },
  { value: '12', labelEn: '12 months', labelAr: '12 شهر', savings: '3,100' },
]

const contactTimeOptions = [
  { value: 'morning', labelEn: 'Morning (9 AM – 12 PM)', labelAr: 'صباحاً (9 ص – 12 م)' },
  { value: 'afternoon', labelEn: 'Afternoon (12 PM – 5 PM)', labelAr: 'ظهراً (12 م – 5 م)' },
  { value: 'evening', labelEn: 'Evening (5 PM – 9 PM)', labelAr: 'مساءً (5 م – 9 م)' },
]

// Step indicator dots
function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginBottom: 20 }}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          style={{
            width: i === current ? 24 : 8,
            height: 8,
            borderRadius: 4,
            background: i === current ? '#002E83' : i < current ? '#7CFF01' : '#E2E8F0',
            transition: 'all 0.3s',
          }}
        />
      ))}
    </div>
  )
}

export default function EarlyPaymentModal({ open, onClose }: EarlyPaymentModalProps) {
  const [state, setState] = useState<ModalState>('options')
  const [selected, setSelected] = useState<RepaymentOption>('finish-earlier')
  const [timing, setTiming] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [targetAmount, setTargetAmount] = useState('')
  const [contactMethod, setContactMethod] = useState<ContactMethod>('call')
  const [contactTime, setContactTime] = useState('')
  const [timeDropdownOpen, setTimeDropdownOpen] = useState(false)
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const { theme } = useTheme()
  const { t, lang, isRTL } = useI18n()

  if (!open) return null

  const step1Disabled = (selected === 'finish-earlier' && !timing) || (selected === 'lower-installment' && !targetAmount)
  const selectedTiming = timingOptions.find((o) => o.value === timing)
  const selectedTime = contactTimeOptions.find((o) => o.value === contactTime)

  const handleContinue = () => {
    setState('confirm')
  }

  const handleSubmit = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setState('success')
    }, 1200)
  }

  const handleDone = () => {
    onClose()
    setState('options')
    setSelected('finish-earlier')
    setTiming('')
    setTargetAmount('')
    setContactMethod('call')
    setContactTime('')
    setNotes('')
  }


  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.35)',
        zIndex: 100,
        display: 'flex',
        justifyContent: 'flex-end',
        backdropFilter: 'blur(3px)',
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="side-sheet"
        style={{
          background: theme.cardBg,
          width: 480,
          maxWidth: '100%',
          height: '100vh',
          boxShadow: '-8px 0 40px rgba(0,0,0,0.15)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <AnimatePresence mode="wait">
          {/* ─── STEP 1: Choose Option ─── */}
          {state === 'options' && (
            <motion.div
              key="options"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}
            >
              {/* Hero banner */}
              <div
                style={{
                  background: 'linear-gradient(135deg, #002E83 0%, #0052B9 100%)',
                  padding: '28px 32px 24px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: '50%', background: 'rgba(124,255,1,0.08)' }} />
                <div style={{ position: 'absolute', bottom: -30, right: 40, width: 60, height: 60, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
                <button
                  onClick={onClose}
                  style={{
                    position: 'absolute', top: 16, right: 16,
                    background: 'rgba(255,255,255,0.1)', border: 'none', cursor: 'pointer',
                    padding: 6, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <X size={16} color="rgba(255,255,255,0.7)" />
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(124,255,1,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Sparkles size={20} color="#7CFF01" />
                  </div>
                  <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', margin: 0 }}>
                    {t('modal.earlyRepaymentOptions')}
                  </h2>
                </div>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', margin: 0, lineHeight: 1.6 }}>
                  {t('modal.earlyRepaymentSubtitle')}
                </p>
              </div>

              <div style={{ padding: '24px 32px 32px' }}>
                <StepIndicator current={0} total={3} />

                {/* Option 1: Finish earlier */}
                <motion.div
                  onClick={() => setSelected('finish-earlier')}
                  whileHover={{ y: -1 }}
                  style={{
                    border: `1.5px solid ${selected === 'finish-earlier' ? '#002E83' : theme.border}`,
                    borderRadius: 14, padding: 18, marginBottom: 12, cursor: 'pointer',
                    background: selected === 'finish-earlier' ? 'rgba(0,46,131,0.03)' : theme.cardBg,
                    transition: 'all 0.2s',
                    boxShadow: selected === 'finish-earlier' ? '0 2px 12px rgba(0,46,131,0.08)' : 'none',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                    <div style={{
                      width: 42, height: 42, borderRadius: 12,
                      background: selected === 'finish-earlier' ? 'linear-gradient(135deg, #002E83, #0052B9)' : '#EFF3F8',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.2s',
                    }}>
                      <Clock size={18} color={selected === 'finish-earlier' ? '#fff' : '#94A3B8'} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 15, fontWeight: 600, color: theme.textPrimary, marginBottom: 3 }}>{t('modal.finishLoanEarlier')}</div>
                      <div style={{ fontSize: 12.5, color: theme.textMuted, lineHeight: 1.5 }}>{t('modal.finishLoanEarlierDesc')}</div>
                    </div>
                    <div style={{
                      width: 22, height: 22, borderRadius: '50%',
                      border: `2px solid ${selected === 'finish-earlier' ? '#002E83' : '#CBD5E1'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2,
                    }}>
                      {selected === 'finish-earlier' && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ width: 12, height: 12, borderRadius: '50%', background: '#002E83' }} />}
                    </div>
                  </div>

                  <AnimatePresence>
                    {selected === 'finish-earlier' && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} style={{ overflow: 'hidden' }}>
                        <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${theme.border}` }}>
                          <div style={{ fontSize: 13, fontWeight: 500, color: theme.textSecondary, marginBottom: 8 }}>{t('modal.whenFinishLoan')}</div>
                          <div style={{ position: 'relative' }}>
                            <button
                              onClick={(e) => { e.stopPropagation(); setDropdownOpen(!dropdownOpen) }}
                              style={{
                                width: '100%', padding: '11px 14px',
                                border: `1.5px solid ${dropdownOpen ? '#002E83' : theme.border}`,
                                borderRadius: 10, background: '#fff', display: 'flex', alignItems: 'center',
                                justifyContent: 'space-between', cursor: 'pointer', fontSize: 14,
                                color: selectedTiming ? theme.textPrimary : theme.textMuted,
                                fontWeight: selectedTiming ? 500 : 400,
                              }}
                            >
                              <span>{selectedTiming ? (lang === 'ar' ? selectedTiming.labelAr : selectedTiming.labelEn) : t('modal.selectTiming')}</span>
                              <ChevronDown size={16} color="#94A3B8" style={{ transition: 'transform 0.2s', transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                            </button>
                            <AnimatePresence>
                              {dropdownOpen && (
                                <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                                  style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 4, background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: 10, boxShadow: '0 8px 24px rgba(0,0,0,0.12)', zIndex: 10, overflow: 'hidden' }}
                                >
                                  {timingOptions.map((opt) => (
                                    <div key={opt.value}
                                      onClick={(e) => { e.stopPropagation(); setTiming(opt.value); setDropdownOpen(false) }}
                                      style={{ padding: '10px 14px', fontSize: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: timing === opt.value ? '#002E83' : theme.textPrimary, fontWeight: timing === opt.value ? 600 : 400, background: timing === opt.value ? 'rgba(0,46,131,0.05)' : 'transparent', cursor: 'pointer' }}
                                      onMouseEnter={(e) => { e.currentTarget.style.background = theme.bgPrimary }}
                                      onMouseLeave={(e) => { e.currentTarget.style.background = timing === opt.value ? 'rgba(0,46,131,0.05)' : 'transparent' }}
                                    >
                                      <span>{lang === 'ar' ? opt.labelAr : opt.labelEn}</span>
                                      <span style={{ fontSize: 11, color: '#10B981', fontWeight: 500 }}>SAR {opt.savings} {t('modal.youSave')}</span>
                                    </div>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                          {selectedTiming && (
                            <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                              style={{ marginTop: 10, padding: '8px 12px', borderRadius: 8, background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)', display: 'flex', alignItems: 'center', gap: 6 }}
                            >
                              <CheckCircle2 size={14} color="#10B981" />
                              <span style={{ fontSize: 12, color: '#10B981', fontWeight: 500 }}>{t('modal.youSave')} {selectedTiming.savings} {t('modal.comparedToContinuing')}</span>
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Option 2: Lower installment */}
                <motion.div
                  onClick={() => setSelected('lower-installment')}
                  whileHover={{ y: -1 }}
                  style={{
                    border: `1.5px solid ${selected === 'lower-installment' ? '#002E83' : theme.border}`,
                    borderRadius: 14, padding: 18, cursor: 'pointer',
                    background: selected === 'lower-installment' ? 'rgba(0,46,131,0.03)' : theme.cardBg,
                    transition: 'all 0.2s',
                    boxShadow: selected === 'lower-installment' ? '0 2px 12px rgba(0,46,131,0.08)' : 'none',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                    <div style={{
                      width: 42, height: 42, borderRadius: 12,
                      background: selected === 'lower-installment' ? 'linear-gradient(135deg, #002E83, #0052B9)' : '#EFF3F8',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.2s',
                    }}>
                      <Wallet size={18} color={selected === 'lower-installment' ? '#fff' : '#94A3B8'} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 15, fontWeight: 600, color: theme.textPrimary, marginBottom: 3 }}>{t('modal.lowerInstallment')}</div>
                      <div style={{ fontSize: 12.5, color: theme.textMuted, lineHeight: 1.5 }}>{t('modal.lowerInstallmentDesc')}</div>
                    </div>
                    <div style={{
                      width: 22, height: 22, borderRadius: '50%',
                      border: `2px solid ${selected === 'lower-installment' ? '#002E83' : '#CBD5E1'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2,
                    }}>
                      {selected === 'lower-installment' && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ width: 12, height: 12, borderRadius: '50%', background: '#002E83' }} />}
                    </div>
                  </div>
                  <AnimatePresence>
                    {selected === 'lower-installment' && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} style={{ overflow: 'hidden' }}>
                        <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${theme.border}` }}>
                          <div style={{ fontSize: 13, fontWeight: 500, color: theme.textSecondary, marginBottom: 8 }}>{t('modal.targetInstallment')}</div>
                          <div style={{ display: 'flex', alignItems: 'center', border: `1.5px solid ${theme.border}`, borderRadius: 10, overflow: 'hidden', background: '#fff' }}
                            onFocus={(e) => { e.currentTarget.style.borderColor = '#002E83' }}
                            onBlur={(e) => { e.currentTarget.style.borderColor = theme.border }}
                          >
                            <span style={{ padding: '11px 14px', fontSize: 13, fontWeight: 700, color: '#002E83', background: 'rgba(0,46,131,0.04)', borderRight: `1px solid ${theme.border}`, userSelect: 'none' }}>SAR</span>
                            <input type="number" value={targetAmount} onChange={(e) => setTargetAmount(e.target.value)} onClick={(e) => e.stopPropagation()} placeholder="0"
                              style={{ flex: 1, padding: '11px 14px', border: 'none', outline: 'none', fontSize: 15, fontWeight: 500, color: theme.textPrimary, background: 'transparent' }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Buttons */}
                <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                  <button onClick={onClose} style={{ flex: 1, height: 48, borderRadius: 12, border: `1.5px solid ${theme.border}`, background: theme.cardBg, color: theme.textPrimary, fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>
                    {t('common.cancel')}
                  </button>
                  <button onClick={handleContinue} disabled={step1Disabled}
                    style={{
                      flex: 1.3, height: 48, borderRadius: 12, border: 'none',
                      background: step1Disabled ? 'rgba(124,255,1,0.35)' : '#7CFF01',
                      color: '#0F172A', fontWeight: 600, fontSize: 15,
                      cursor: step1Disabled ? 'not-allowed' : 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    }}
                  >
                    {t('login.continue')} {isRTL ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ─── STEP 2: Confirm & Contact Form ─── */}
          {state === 'confirm' && (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              style={{ overflowY: 'auto', flex: 1 }}
            >
              {/* Header */}
              <div style={{ padding: '24px 32px 0', position: 'sticky', top: 0, background: theme.cardBg, zIndex: 2 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <button onClick={() => setState('options')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, color: theme.textMuted, fontSize: 13, fontWeight: 500, padding: 0 }}>
                    {isRTL ? <ArrowRight size={16} /> : <ArrowLeft size={16} />} {t('common.back')}
                  </button>
                  <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <X size={20} color="#64748B" />
                  </button>
                </div>

                <StepIndicator current={1} total={3} />

                <h2 style={{ fontSize: 20, fontWeight: 700, color: theme.textPrimary, margin: '0 0 6px', textAlign: 'center' }}>
                  {t('modal.confirmRequest')}
                </h2>
                <p style={{ fontSize: 13, color: theme.textMuted, margin: '0 0 20px', lineHeight: 1.6, textAlign: 'center' }}>
                  {t('modal.confirmRequestSubtitle')}
                </p>
              </div>

              <div style={{ padding: '0 32px 32px' }}>
                {/* Selected option summary */}
                <div style={{
                  background: theme.bgPrimary, borderRadius: 12, padding: 16, marginBottom: 24,
                  border: `1px solid ${theme.border}`,
                }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: theme.textMuted, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>
                    {t('modal.youChose')}
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: theme.textPrimary, marginBottom: 4 }}>
                    {selected === 'finish-earlier' ? t('modal.finishLoanEarlier') : t('modal.lowerInstallment')}
                  </div>
                  <div style={{ fontSize: 13, color: '#2563EB', fontWeight: 500 }}>
                    {selected === 'finish-earlier' && selectedTiming
                      ? `${t('modal.target')}: ${lang === 'ar' ? selectedTiming.labelAr : selectedTiming.labelEn}`
                      : targetAmount ? `${t('modal.target')}: ${Number(targetAmount).toLocaleString()}` : ''
                    }
                  </div>
                </div>

                {/* Contact method */}
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: theme.textPrimary, marginBottom: 10 }}>
                    {t('modal.howContacted')} <span style={{ color: '#EF4444' }}>*</span>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {([
                      { id: 'call' as ContactMethod, icon: Phone, label: t('modal.call') },
                      { id: 'whatsapp' as ContactMethod, icon: MessageSquare, label: t('modal.whatsapp') },
                      { id: 'email' as ContactMethod, icon: Mail, label: t('modal.email') },
                    ]).map((m) => {
                      const active = contactMethod === m.id
                      const Icon = m.icon
                      return (
                        <button
                          key={m.id}
                          onClick={() => setContactMethod(m.id)}
                          style={{
                            flex: 1, padding: '10px 8px', borderRadius: 10,
                            border: `1.5px solid ${active ? '#002E83' : theme.border}`,
                            background: active ? 'rgba(0,46,131,0.04)' : theme.cardBg,
                            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                            transition: 'all 0.15s',
                          }}
                        >
                          <div style={{
                            width: 16, height: 16, borderRadius: '50%',
                            border: `2px solid ${active ? '#002E83' : '#CBD5E1'}`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}>
                            {active && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#002E83' }} />}
                          </div>
                          <Icon size={15} color={active ? '#002E83' : '#94A3B8'} />
                          <span style={{ fontSize: 13, fontWeight: active ? 600 : 400, color: active ? '#002E83' : theme.textSecondary }}>
                            {m.label}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Preferred contact time */}
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: theme.textPrimary, marginBottom: 8 }}>
                    {t('modal.preferredContactTime')}
                  </div>
                  <div style={{ position: 'relative' }}>
                    <button
                      onClick={() => setTimeDropdownOpen(!timeDropdownOpen)}
                      style={{
                        width: '100%', padding: '11px 14px',
                        border: `1.5px solid ${timeDropdownOpen ? '#002E83' : theme.border}`,
                        borderRadius: 10, background: theme.bgPrimary, display: 'flex', alignItems: 'center',
                        justifyContent: 'space-between', cursor: 'pointer', fontSize: 14,
                        color: selectedTime ? theme.textPrimary : theme.textMuted,
                        fontWeight: selectedTime ? 500 : 400,
                      }}
                    >
                      <span>{selectedTime ? (lang === 'ar' ? selectedTime.labelAr : selectedTime.labelEn) : t('modal.selectTimePreference')}</span>
                      <ChevronDown size={16} color="#94A3B8" style={{ transition: 'transform 0.2s', transform: timeDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                    </button>
                    <AnimatePresence>
                      {timeDropdownOpen && (
                        <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                          style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 4, background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: 10, boxShadow: '0 8px 24px rgba(0,0,0,0.12)', zIndex: 10, overflow: 'hidden' }}
                        >
                          {contactTimeOptions.map((opt) => (
                            <div key={opt.value}
                              onClick={() => { setContactTime(opt.value); setTimeDropdownOpen(false) }}
                              style={{ padding: '10px 14px', fontSize: 14, color: contactTime === opt.value ? '#002E83' : theme.textPrimary, fontWeight: contactTime === opt.value ? 600 : 400, background: contactTime === opt.value ? 'rgba(0,46,131,0.05)' : 'transparent', cursor: 'pointer' }}
                              onMouseEnter={(e) => { e.currentTarget.style.background = theme.bgPrimary }}
                              onMouseLeave={(e) => { e.currentTarget.style.background = contactTime === opt.value ? 'rgba(0,46,131,0.05)' : 'transparent' }}
                            >
                              {lang === 'ar' ? opt.labelAr : opt.labelEn}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Notes */}
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: theme.textPrimary, marginBottom: 8 }}>
                    {t('modal.additionalNotes')}
                  </div>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={t('modal.notesPlaceholder')}
                    rows={3}
                    style={{
                      width: '100%', padding: '12px 14px', border: `1.5px solid ${theme.border}`,
                      borderRadius: 10, background: '#fff', fontSize: 13, color: theme.textPrimary,
                      resize: 'vertical', outline: 'none', fontFamily: 'inherit', lineHeight: 1.6,
                      boxSizing: 'border-box',
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = '#002E83' }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = theme.border }}
                  />
                </div>

                {/* Loan details summary */}
                <div style={{
                  background: theme.bgPrimary, borderRadius: 12, padding: 16, marginBottom: 24,
                  border: `1px solid ${theme.border}`,
                }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: theme.textMuted, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                    {t('modal.yourLoanDetails')}
                  </div>
                  <div className="early-payment-details-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 20px' }}>
                    {[
                      { icon: FileText, label: t('modal.loanId'), value: 'LOAN-2024-001' },
                      { icon: CreditCard, label: t('modal.outstandingBalance'), value: '350,000' },
                      { icon: Building2, label: t('modal.installmentAmount'), value: '45,208' },
                      { icon: Phone, label: t('modal.phone'), value: '+966 5XX XXX XXXX' },
                      { icon: Mail, label: t('modal.email'), value: 'user@example.com' },
                      { icon: User, label: t('modal.accountManager'), value: 'Ahmed Al-Farsi' },
                    ].map((item) => {
                      const Icon = item.icon
                      return (
                        <div key={item.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                          <Icon size={14} color={theme.textMuted} style={{ marginTop: 2, flexShrink: 0 }} />
                          <div>
                            <div style={{ fontSize: 11, color: theme.textMuted, marginBottom: 2 }}>{item.label}</div>
                            <div style={{ fontSize: 13, fontWeight: 600, color: theme.textPrimary }}>{item.value}</div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Buttons */}
                <div style={{ display: 'flex', gap: 12 }}>
                  <button onClick={() => setState('options')} style={{ flex: 1, height: 48, borderRadius: 12, border: `1.5px solid ${theme.border}`, background: theme.cardBg, color: theme.textPrimary, fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>
                    {t('common.back')}
                  </button>
                  <button onClick={handleSubmit} disabled={loading}
                    style={{
                      flex: 1.3, height: 48, borderRadius: 12, border: 'none',
                      background: loading ? 'rgba(124,255,1,0.5)' : '#7CFF01',
                      color: '#0F172A', fontWeight: 600, fontSize: 15,
                      cursor: loading ? 'not-allowed' : 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    }}
                  >
                    {loading ? (
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        style={{ width: 18, height: 18, border: '2px solid rgba(15,23,42,0.15)', borderTopColor: '#0F172A', borderRadius: '50%' }}
                      />
                    ) : (
                      <>{t('modal.submitRequest')} {isRTL ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}</>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ─── STEP 3: Success ─── */}
          {state === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              style={{ padding: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, overflowY: 'auto', justifyContent: 'center' }}
            >
              <StepIndicator current={2} total={3} />

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                style={{
                  width: 68, height: 68, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #F0FDF4, #DCFCE7)', border: '2px solid #BBF7D0',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <CheckCircle2 size={34} color="#16A34A" />
              </motion.div>

              <h2 style={{ fontSize: 22, fontWeight: 700, color: theme.textPrimary, marginTop: 20, marginBottom: 0 }}>
                {t('modal.requestSubmitted')}
              </h2>
              <p style={{ fontSize: 14, color: theme.textSecondary, textAlign: 'center', marginTop: 8, marginBottom: 0, lineHeight: 1.6, maxWidth: 360 }}>
                {t('modal.earlyRepaymentSuccess')}
              </p>

              <div style={{ background: theme.bgPrimary, borderRadius: 12, padding: 16, width: '100%', marginTop: 20 }}>
                {[
                  { label: t('modal.requestType'), value: selected === 'finish-earlier' ? t('modal.finishLoanEarlier') : t('modal.lowerInstallment') },
                  ...(selected === 'finish-earlier' && selectedTiming ? [{ label: t('modal.targetDuration'), value: lang === 'ar' ? selectedTiming.labelAr : selectedTiming.labelEn }] : []),
                  ...(selected === 'lower-installment' && targetAmount ? [{ label: t('modal.targetInstallment'), value: `${Number(targetAmount).toLocaleString()}` }] : []),
                  { label: t('modal.contactVia'), value: contactMethod === 'call' ? t('modal.call') : contactMethod === 'whatsapp' ? t('modal.whatsapp') : t('modal.email') },
                ].map((row, i, arr) => (
                  <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < arr.length - 1 ? `1px solid ${theme.border}` : 'none' }}>
                    <span style={{ fontSize: 13, color: theme.textMuted }}>{row.label}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: theme.textPrimary }}>{row.value}</span>
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderTop: `1px solid ${theme.border}` }}>
                  <span style={{ fontSize: 13, color: theme.textMuted }}>{t('modal.status')}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#F59E0B', background: 'rgba(245,158,11,0.08)', padding: '2px 10px', borderRadius: 20 }}>
                    {t('modal.underReview')}
                  </span>
                </div>
              </div>

              <button onClick={handleDone}
                style={{ background: '#2563EB', color: '#fff', fontWeight: 600, fontSize: 15, width: '100%', height: 48, borderRadius: 12, marginTop: 20, border: 'none', cursor: 'pointer' }}
              >
                {t('modal.done')}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
