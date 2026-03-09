import { useState, useEffect } from 'react'
import {
  Landmark, CheckCircle2, ArrowRight, Shield, Lock, CreditCard,
  Wallet, Search, Zap, XCircle, AlertCircle, RefreshCw,
} from 'lucide-react'
import { motion } from 'framer-motion'
import type { BankConnectionData, SupportedBank } from '../types'
import {
  LeanLogo, AlRajhiLogo, SNBLogo, SABBLogo, RiyadBankLogo, AlinmaLogo,
  BSFLogo, ANBLogo, AlbiladLogo, AlJaziraLogo,
} from '../logos'

interface Props {
  data?: BankConnectionData
  onComplete: (data: BankConnectionData) => void
}

type LeanState =
  | 'intro'
  | 'select-bank'
  | 'connecting'
  | 'fetching-accounts'
  | 'select-account'
  | 'fetching-statements'
  | 'success'
  | 'error'

// ─── Supported Banks ────────────────────────────────────────

const SUPPORTED_BANKS: SupportedBank[] = [
  { id: 'RJHI', name: 'Al Rajhi Bank', nameAr: 'مصرف الراجحي', color: '#00836C', isPopular: true },
  { id: 'NCB', name: 'Al Ahli Bank (SNB)', nameAr: 'البنك الأهلي السعودي', color: '#004B87', isPopular: true },
  { id: 'SABB', name: 'SABB', nameAr: 'ساب', color: '#00A3E0', isPopular: true },
  { id: 'RIBL', name: 'Riyad Bank', nameAr: 'بنك الرياض', color: '#512D6D', isPopular: true },
  { id: 'ALIN', name: 'Alinma Bank', nameAr: 'مصرف الإنماء', color: '#C4960C', isPopular: true },
  { id: 'BSFR', name: 'Banque Saudi Fransi', nameAr: 'البنك السعودي الفرنسي', color: '#003B71', isPopular: false },
  { id: 'ARNB', name: 'Arab National Bank', nameAr: 'البنك العربي الوطني', color: '#1B3A5C', isPopular: false },
  { id: 'ALBI', name: 'Bank Albilad', nameAr: 'بنك البلاد', color: '#8B6914', isPopular: false },
  { id: 'BJAZ', name: 'Bank AlJazira', nameAr: 'بنك الجزيرة', color: '#C8102E', isPopular: false },
]

// ─── Mock Accounts ──────────────────────────────────────────

interface MockAccount {
  id: string
  accountNumber: string
  iban: string
  type: 'current' | 'savings' | 'business'
  holderName: string
  currency: string
  balance: number
}

const MOCK_ACCOUNTS: MockAccount[] = [
  {
    id: 'acc_1',
    accountNumber: '6080101675',
    iban: 'SA0380000000608010167519',
    type: 'current',
    holderName: 'Al-Mansour Trading Co.',
    currency: 'SAR',
    balance: 125000,
  },
  {
    id: 'acc_2',
    accountNumber: '6080101676',
    iban: 'SA0380000000608010167620',
    type: 'savings',
    holderName: 'Al-Mansour Trading Co.',
    currency: 'SAR',
    balance: 48500,
  },
]

// ─── Bank Logo ──────────────────────────────────────────────

const BANK_LOGO_MAP: Record<string, React.FC<{ size?: number }>> = {
  RJHI: AlRajhiLogo,
  NCB: SNBLogo,
  SABB: SABBLogo,
  RIBL: RiyadBankLogo,
  ALIN: AlinmaLogo,
  BSFR: BSFLogo,
  ARNB: ANBLogo,
  ALBI: AlbiladLogo,
  BJAZ: AlJaziraLogo,
}

function BankLogo({ bank, size = 40 }: { bank: SupportedBank; size?: number }) {
  const LogoComponent = BANK_LOGO_MAP[bank.id]
  if (LogoComponent) {
    return <div style={{ flexShrink: 0 }}><LogoComponent size={size} /></div>
  }
  // Fallback to initials
  return (
    <div style={{
      width: size, height: size, borderRadius: size * 0.3, background: bank.color,
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    }}>
      <span style={{ color: '#fff', fontSize: size * 0.42, fontWeight: 700 }}>{bank.name.charAt(0)}</span>
    </div>
  )
}

// ─── Illustration ───────────────────────────────────────────

function BankIllustration() {
  return (
    <svg width="200" height="150" viewBox="0 0 220 170" fill="none">
      {/* Phone body */}
      <rect x="70" y="15" width="80" height="120" rx="12" fill="url(#bPhoneGrad)" />
      <rect x="78" y="27" width="64" height="96" rx="4" fill="#1a365d" />
      {/* Bank building on screen */}
      <rect x="92" y="50" width="36" height="28" rx="2" fill="white" opacity="0.9" />
      <polygon points="110,42 88,54 132,54" fill="white" opacity="0.9" />
      <rect x="98" y="58" width="6" height="14" rx="1" fill="#1a365d" opacity="0.5" />
      <rect x="108" y="58" width="6" height="14" rx="1" fill="#1a365d" opacity="0.5" />
      <rect x="118" y="58" width="6" height="14" rx="1" fill="#1a365d" opacity="0.5" />
      {/* Shield */}
      <g transform="translate(165, 30)">
        <path d="M0,-2 L18,5 L18,20 C18,30 10,38 0,42 C-10,38 -18,30 -18,20 L-18,5 Z" fill="url(#bShieldGrad)" />
        <path d="M-6,18 L-2,22 L8,12" stroke="#80FF00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      {/* Connection dashes */}
      <line x1="150" y1="55" x2="165" y2="50" stroke="#0D82F9" strokeWidth="2" strokeDasharray="4 3" opacity="0.5" />
      <line x1="150" y1="75" x2="170" y2="85" stroke="#0D82F9" strokeWidth="2" strokeDasharray="4 3" opacity="0.5" />
      {/* Lock icon bottom */}
      <g transform="translate(168, 80)">
        <rect x="-8" y="0" width="16" height="12" rx="2" fill="#0D82F9" />
        <path d="M-4,-4 C-4,-8 0,-10 4,-10 C8,-10 12,-8 12,-4 L12,0 L-4,0 Z" stroke="#0D82F9" strokeWidth="2" fill="none" />
      </g>
      {/* Decorative dots */}
      <motion.circle animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ repeat: Infinity, duration: 2 }} cx="40" cy="50" r="4" fill="#80FF00" />
      <motion.circle animate={{ opacity: [0.4, 0.8, 0.4] }} transition={{ repeat: Infinity, duration: 2.5, delay: 0.5 }} cx="30" cy="90" r="3" fill="#0D82F9" />
      <motion.circle animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ repeat: Infinity, duration: 3, delay: 1 }} cx="195" cy="120" r="5" fill="#FBBF24" />
      {/* Sparkle */}
      <motion.path
        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 2 }}
        d="M50 30 L52 36 L58 38 L52 40 L50 46 L48 40 L42 38 L48 36 Z"
        fill="#80FF00"
      />
      <defs>
        <linearGradient id="bPhoneGrad" x1="70" y1="15" x2="150" y2="135">
          <stop offset="0%" stopColor="#0D82F9" />
          <stop offset="100%" stopColor="#002E83" />
        </linearGradient>
        <linearGradient id="bShieldGrad" x1="-18" y1="-2" x2="18" y2="42">
          <stop offset="0%" stopColor="#002E83" />
          <stop offset="100%" stopColor="#0052B9" />
        </linearGradient>
      </defs>
    </svg>
  )
}

// ─── Screens ────────────────────────────────────────────────

function IntroScreen({ onStart }: { onStart: () => void }) {
  const benefits = [
    { icon: Zap, color: '#22C55E', bg: '#F0FDF4', title: 'Instant Verification', desc: 'No need to upload bank statements manually' },
    { icon: Shield, color: '#0D82F9', bg: '#EFF6FF', title: 'Bank-Level Security', desc: 'Your credentials are never shared with us' },
    { icon: CreditCard, color: '#8B5CF6', bg: '#F5F3FF', title: 'Easy Disbursement', desc: 'Receive funds directly to your connected account' },
  ]

  return (
    <div style={{ padding: '16px 0' }}>
      <div style={{ textAlign: 'center', marginBottom: 24, display: 'flex', justifyContent: 'center' }}>
        <BankIllustration />
      </div>

      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#111827', marginBottom: 8 }}>Connect Your Business Bank</h2>
        <p style={{ fontSize: 14, color: '#6B7280', maxWidth: 380, margin: '0 auto', lineHeight: 1.6 }}>
          Link your bank account securely via Open Banking to verify your financials and enable direct disbursement
        </p>
      </div>

      {/* Benefits */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        {benefits.map((b) => (
          <div key={b.title} style={{
            display: 'flex', alignItems: 'center', gap: 14,
            padding: 14, borderRadius: 12, border: '1px solid #E5E7EB', background: '#fff',
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10, background: b.bg,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <b.icon size={20} color={b.color} />
            </div>
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: '#111827', marginBottom: 2 }}>{b.title}</p>
              <p style={{ fontSize: 12, color: '#9CA3AF' }}>{b.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Security badge */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        padding: '10px 0', marginBottom: 24,
      }}>
        <Lock size={14} color="#9CA3AF" />
        <span style={{ fontSize: 12, color: '#9CA3AF' }}>Powered by</span>
        <LeanLogo size={18} />
        <span style={{ fontSize: 12, color: '#9CA3AF' }}>• Licensed by SAMA</span>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
        onClick={onStart}
        style={{
          width: '100%', padding: '14px 0', background: '#002E83', color: '#fff', fontWeight: 600,
          fontSize: 15, borderRadius: 12, border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}
      >
        <Landmark size={20} />
        Connect Bank Account
      </motion.button>
    </div>
  )
}

function SelectBankScreen({ onSelect }: { onSelect: (bank: SupportedBank) => void }) {
  const [search, setSearch] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const filtered = SUPPORTED_BANKS.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    b.nameAr.includes(search)
  )
  const popular = filtered.filter((b) => b.isPopular)
  const others = filtered.filter((b) => !b.isPopular)

  return (
    <div style={{ padding: '16px 0' }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#111827', marginBottom: 6 }}>Select Your Bank</h2>
        <p style={{ fontSize: 14, color: '#6B7280' }}>Choose your business bank account provider</p>
      </div>

      {/* Search */}
      <div style={{ position: 'relative', marginBottom: 24 }}>
        <Search size={18} color="#9CA3AF" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
        <input
          type="text" value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search banks..."
          style={{
            width: '100%', padding: '12px 16px 12px 42px', fontSize: 14, borderRadius: 10,
            border: '1.5px solid #E5E7EB', outline: 'none', background: '#FAFAFA',
            boxSizing: 'border-box',
          }}
        />
      </div>

      {/* Popular Banks - 2x grid */}
      {popular.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10 }}>Popular Banks</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
            {popular.map((bank) => {
              const active = selectedId === bank.id
              return (
                <motion.button
                  key={bank.id}
                  whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                  onClick={() => setSelectedId(bank.id)}
                  style={{
                    padding: 14, borderRadius: 12, cursor: 'pointer', textAlign: 'left',
                    border: `2px solid ${active ? '#0D82F9' : '#E5E7EB'}`,
                    background: active ? '#EFF6FF' : '#fff',
                    display: 'flex', alignItems: 'center', gap: 10,
                    transition: 'border-color 0.2s, background 0.2s',
                  }}
                >
                  <BankLogo bank={bank} size={36} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#111827', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{bank.name}</p>
                    <p style={{ fontSize: 11, color: '#9CA3AF' }}>{bank.nameAr}</p>
                  </div>
                </motion.button>
              )
            })}
          </div>
        </div>
      )}

      {/* Other Banks - list */}
      {others.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10 }}>All Banks</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {others.map((bank) => {
              const active = selectedId === bank.id
              return (
                <motion.button
                  key={bank.id}
                  whileHover={{ scale: 1.005 }} whileTap={{ scale: 0.995 }}
                  onClick={() => setSelectedId(bank.id)}
                  style={{
                    padding: '12px 14px', borderRadius: 10, cursor: 'pointer',
                    border: `1.5px solid ${active ? '#0D82F9' : '#E5E7EB'}`,
                    background: active ? '#EFF6FF' : '#fff',
                    display: 'flex', alignItems: 'center', gap: 12,
                    transition: 'border-color 0.2s, background 0.2s',
                  }}
                >
                  <BankLogo bank={bank} size={32} />
                  <div style={{ flex: 1, textAlign: 'left' }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>{bank.name}</p>
                    <p style={{ fontSize: 11, color: '#9CA3AF' }}>{bank.nameAr}</p>
                  </div>
                  <div style={{
                    width: 20, height: 20, borderRadius: '50%',
                    border: `2px solid ${active ? '#0D82F9' : '#D1D5DB'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {active && <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#0D82F9' }} />}
                  </div>
                </motion.button>
              )
            })}
          </div>
        </div>
      )}

      <motion.button
        whileHover={selectedId ? { scale: 1.02 } : undefined}
        whileTap={selectedId ? { scale: 0.98 } : undefined}
        onClick={() => { const b = SUPPORTED_BANKS.find((x) => x.id === selectedId); if (b) onSelect(b) }}
        disabled={!selectedId}
        style={{
          width: '100%', padding: '14px 0', fontWeight: 600, fontSize: 15, borderRadius: 12,
          border: 'none', cursor: selectedId ? 'pointer' : 'not-allowed',
          background: selectedId ? '#002E83' : '#D1D5DB', color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}
      >
        {selectedId
          ? `Continue with ${SUPPORTED_BANKS.find((x) => x.id === selectedId)?.name}`
          : 'Select a bank to continue'}
      </motion.button>
    </div>
  )
}

function ConnectingScreen({ bank }: { bank: SupportedBank }) {
  return (
    <div style={{ textAlign: 'center', padding: '48px 0' }}>
      {/* Bank logo with pulsing ring */}
      <div style={{ position: 'relative', width: 96, height: 96, margin: '0 auto 28px' }}>
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.1, 0.3] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          style={{
            position: 'absolute', inset: -12, borderRadius: '50%',
            border: `3px solid ${bank.color}`,
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.2, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
          style={{
            position: 'absolute', inset: -4, borderRadius: '50%',
            border: `2px solid ${bank.color}`,
          }}
        />
        <div style={{
          width: 96, height: 96, borderRadius: '50%', background: bank.color,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ color: '#fff', fontSize: 36, fontWeight: 700 }}>{bank.name.charAt(0)}</span>
        </div>
        {/* Small spinner */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          style={{
            position: 'absolute', bottom: -2, right: -2,
            width: 28, height: 28, borderRadius: '50%', background: '#fff',
            border: '3px solid #E5E7EB', borderTopColor: '#0D82F9',
          }}
        />
      </div>

      <h3 style={{ fontSize: 20, fontWeight: 700, color: '#111827', marginBottom: 6 }}>
        Connecting to {bank.name}
      </h3>
      <p style={{ fontSize: 14, color: '#9CA3AF', marginBottom: 28 }}>
        Please wait while we establish a secure connection...
      </p>

      {/* Security badge */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '8px 16px', background: '#F0F4FF', borderRadius: 20, marginBottom: 20,
      }}>
        <Lock size={14} color="#0D82F9" />
        <span style={{ fontSize: 12, fontWeight: 500, color: '#374151' }}>256-bit encrypted connection</span>
      </div>

      {/* Info tip */}
      <div style={{
        background: '#EFF6FF', borderRadius: 10, padding: 12,
        display: 'flex', alignItems: 'flex-start', gap: 8, textAlign: 'left',
      }}>
        <AlertCircle size={16} color="#0D82F9" style={{ flexShrink: 0, marginTop: 1 }} />
        <p style={{ fontSize: 12, color: '#374151', lineHeight: 1.5 }}>
          A new window may open for bank authentication. Please ensure your popup blocker is disabled.
        </p>
      </div>
    </div>
  )
}

function SelectAccountScreen({
  bank, accounts, onSelect,
}: {
  bank: SupportedBank
  accounts: MockAccount[]
  onSelect: (account: MockAccount) => void
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  function maskIban(iban: string) {
    return 'SA** **** **** ****' + iban.slice(-4)
  }

  return (
    <div style={{ padding: '16px 0' }}>
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <motion.div
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          style={{
            width: 64, height: 64, borderRadius: '50%', background: '#D1FAE5', margin: '0 auto 16px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <CheckCircle2 size={32} color="#047857" />
        </motion.div>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#111827', marginBottom: 6 }}>Bank Connected!</h2>
        <p style={{ fontSize: 14, color: '#6B7280' }}>Select the account you want to use for financing</p>
      </div>

      {/* Account cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
        {accounts.map((acc) => {
          const active = selectedId === acc.id
          const Icon = acc.type === 'savings' ? Wallet : CreditCard
          return (
            <motion.button
              key={acc.id}
              whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
              onClick={() => setSelectedId(acc.id)}
              style={{
                padding: 18, borderRadius: 14, cursor: 'pointer', textAlign: 'left', width: '100%',
                border: `2px solid ${active ? '#0D82F9' : '#E5E7EB'}`,
                background: active ? '#EFF6FF' : '#fff',
                transition: 'border-color 0.2s, background 0.2s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: acc.type === 'savings' ? '#FEF3C7' : '#EFF6FF',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={18} color={acc.type === 'savings' ? '#D97706' : '#0D82F9'} />
                  </div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{acc.holderName}</p>
                    <span style={{
                      fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 10,
                      background: acc.type === 'current' ? '#EFF6FF' : '#FEF3C7',
                      color: acc.type === 'current' ? '#0D82F9' : '#D97706',
                      textTransform: 'uppercase',
                    }}>
                      {acc.type}
                    </span>
                  </div>
                </div>
                <div style={{
                  width: 20, height: 20, borderRadius: '50%',
                  border: `2px solid ${active ? '#0D82F9' : '#D1D5DB'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  {active && <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#0D82F9' }} />}
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 12, color: '#9CA3AF', fontFamily: 'monospace' }}>{maskIban(acc.iban)}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>
                  {acc.balance.toLocaleString()} <span style={{ fontSize: 11, fontWeight: 400, color: '#9CA3AF' }}>SAR</span>
                </span>
              </div>
            </motion.button>
          )
        })}
      </div>

      <motion.button
        whileHover={selectedId ? { scale: 1.02 } : undefined}
        whileTap={selectedId ? { scale: 0.98 } : undefined}
        onClick={() => { const a = accounts.find((x) => x.id === selectedId); if (a) onSelect(a) }}
        disabled={!selectedId}
        style={{
          width: '100%', padding: '14px 0', fontWeight: 600, fontSize: 15, borderRadius: 12,
          border: 'none', cursor: selectedId ? 'pointer' : 'not-allowed',
          background: selectedId ? '#002E83' : '#D1D5DB', color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}
      >
        Use Selected Account
        <ArrowRight size={18} />
      </motion.button>
    </div>
  )
}

function FetchingStatementsScreen({ bank }: { bank: SupportedBank }) {
  return (
    <div style={{ textAlign: 'center', padding: '56px 0' }}>
      <div style={{ position: 'relative', width: 64, height: 64, margin: '0 auto 24px' }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
          style={{
            width: 64, height: 64, borderRadius: '50%',
            border: '4px solid #E5E7EB', borderTopColor: '#0D82F9',
          }}
        />
      </div>
      <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 6 }}>Retrieving Statements...</h3>
      <p style={{ fontSize: 13, color: '#9CA3AF', marginBottom: 8 }}>
        Fetching your bank statements from {bank.name}
      </p>
      <p style={{ fontSize: 12, color: '#D1D5DB' }}>This may take a moment</p>
    </div>
  )
}

function SuccessScreen({
  bank, account, onContinue,
}: {
  bank: SupportedBank
  account: MockAccount
  onContinue: () => void
}) {
  function maskIban(iban: string) {
    return 'SA** **** **** ****' + iban.slice(-4)
  }

  return (
    <div style={{ textAlign: 'center', padding: '24px 0' }}>
      <motion.div
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{
          width: 80, height: 80, borderRadius: '50%', background: '#80FF00', margin: '0 auto 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <CheckCircle2 size={40} color="#002E83" />
      </motion.div>

      <h2 style={{ fontSize: 22, fontWeight: 700, color: '#111827', marginBottom: 6 }}>Bank Connected!</h2>
      <p style={{ fontSize: 14, color: '#6B7280', marginBottom: 28 }}>Your bank account has been successfully linked</p>

      {/* Connected account card */}
      <div style={{ background: '#F9FAFB', borderRadius: 16, padding: 20, marginBottom: 20, textAlign: 'left' }}>
        {/* Bank header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <BankLogo bank={bank} size={36} />
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{bank.name}</p>
              <p style={{ fontSize: 11, color: '#9CA3AF' }}>{bank.nameAr}</p>
            </div>
          </div>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            padding: '4px 10px', background: '#D1FAE5', color: '#047857',
            borderRadius: 20, fontSize: 11, fontWeight: 600,
          }}>
            <CheckCircle2 size={12} />
            Connected
          </span>
        </div>
        {/* Account details */}
        {[
          ['Account Holder', account.holderName],
          ['IBAN', maskIban(account.iban)],
          ['Account Type', account.type.charAt(0).toUpperCase() + account.type.slice(1)],
          ['Balance', `${account.balance.toLocaleString()} SAR`],
        ].map(([label, value]) => (
          <div key={label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13 }}>
            <span style={{ color: '#9CA3AF' }}>{label}</span>
            <span style={{ fontWeight: 500, color: '#111827' }}>{value}</span>
          </div>
        ))}
      </div>

      {/* Status badges */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 28 }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 12px',
          background: '#D1FAE5', color: '#047857', borderRadius: 20, fontSize: 12, fontWeight: 600,
        }}>
          <CheckCircle2 size={14} />
          Account Verified
        </span>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 12px',
          background: '#D1FAE5', color: '#047857', borderRadius: 20, fontSize: 12, fontWeight: 600,
        }}>
          <CheckCircle2 size={14} />
          Statements Retrieved
        </span>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
        onClick={onContinue}
        style={{
          width: '100%', padding: '14px 0', background: '#80FF00', color: '#002E83', fontWeight: 700,
          fontSize: 15, borderRadius: 12, border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}
      >
        Continue to Document Upload
        <ArrowRight size={18} />
      </motion.button>
    </div>
  )
}

function ErrorScreen({
  bank, onRetry, onSelectDifferent,
}: {
  bank: SupportedBank
  onRetry: () => void
  onSelectDifferent: () => void
}) {
  return (
    <div style={{ textAlign: 'center', padding: '32px 0' }}>
      <div style={{
        width: 72, height: 72, borderRadius: '50%', background: '#FEE2E2',
        margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <XCircle size={36} color="#EF4444" />
      </div>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: '#111827', marginBottom: 6 }}>Connection Failed</h2>
      <p style={{ fontSize: 14, color: '#6B7280', marginBottom: 24 }}>
        We couldn't connect to {bank.name}. Please try again.
      </p>

      <div style={{
        background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 12,
        padding: 16, marginBottom: 28, textAlign: 'left',
      }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: '#92400E', marginBottom: 8 }}>Possible reasons:</p>
        {[
          'Bank service may be temporarily unavailable',
          'Authentication was cancelled or timed out',
          'Popup blocker may have blocked the bank window',
          'Internet connection issue',
        ].map((t) => (
          <p key={t} style={{ fontSize: 12, color: '#A16207', marginBottom: 4 }}>• {t}</p>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
        onClick={onRetry}
        style={{
          width: '100%', padding: '14px 0', background: '#002E83', color: '#fff', fontWeight: 600,
          fontSize: 15, borderRadius: 12, border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 12,
        }}
      >
        <RefreshCw size={18} />
        Try Again
      </motion.button>
      <button onClick={onSelectDifferent} style={{
        width: '100%', padding: '12px 0', background: '#fff', color: '#374151', fontWeight: 600,
        fontSize: 14, borderRadius: 12, border: '1px solid #D1D5DB', cursor: 'pointer',
      }}>
        Select Different Bank
      </button>
    </div>
  )
}

// ─── Main Component ──────────────────────────────────────────

export default function BankConnection({ data, onComplete }: Props) {
  const [leanState, setLeanState] = useState<LeanState>(data ? 'success' : 'intro')
  const [selectedBank, setSelectedBank] = useState<SupportedBank | null>(null)
  const [selectedAccount, setSelectedAccount] = useState<MockAccount | null>(null)

  // Connecting → fetching accounts auto-transition
  useEffect(() => {
    if (leanState !== 'connecting') return
    const t = setTimeout(() => setLeanState('fetching-accounts'), 2000)
    return () => clearTimeout(t)
  }, [leanState])

  // Fetching accounts → select account / success
  useEffect(() => {
    if (leanState !== 'fetching-accounts') return
    const t = setTimeout(() => {
      if (MOCK_ACCOUNTS.length > 1) {
        setLeanState('select-account')
      } else {
        setSelectedAccount(MOCK_ACCOUNTS[0])
        setLeanState('fetching-statements')
      }
    }, 2000)
    return () => clearTimeout(t)
  }, [leanState])

  // Fetching statements → success
  useEffect(() => {
    if (leanState !== 'fetching-statements') return
    const t = setTimeout(() => setLeanState('success'), 2500)
    return () => clearTimeout(t)
  }, [leanState])

  function handleBankSelected(bank: SupportedBank) {
    setSelectedBank(bank)
    setLeanState('connecting')
  }

  function handleAccountSelected(account: MockAccount) {
    setSelectedAccount(account)
    setLeanState('fetching-statements')
  }

  function handleContinue() {
    if (!selectedBank || !selectedAccount) return
    const result: BankConnectionData = {
      leanConnectionId: 'LEAN-' + Date.now(),
      leanCustomerId: 'cust_' + Date.now(),
      bankId: selectedBank.id,
      bankName: selectedBank.name,
      bankNameAr: selectedBank.nameAr,
      accountId: selectedAccount.id,
      accountNumber: selectedAccount.accountNumber,
      iban: selectedAccount.iban,
      accountType: selectedAccount.type,
      accountHolderName: selectedAccount.holderName,
      currency: selectedAccount.currency,
      availableBalance: selectedAccount.balance,
      statementsRetrieved: true,
      statementsPeriod: { from: '2025-09-01', to: '2026-03-01' },
      connectedAt: new Date(),
    }
    onComplete(result)
  }

  switch (leanState) {
    case 'intro':
      return <IntroScreen onStart={() => setLeanState('select-bank')} />
    case 'select-bank':
      return <SelectBankScreen onSelect={handleBankSelected} />
    case 'connecting':
      return selectedBank ? <ConnectingScreen bank={selectedBank} /> : null
    case 'fetching-accounts':
      return selectedBank ? <ConnectingScreen bank={selectedBank} /> : null
    case 'select-account':
      return selectedBank ? (
        <SelectAccountScreen bank={selectedBank} accounts={MOCK_ACCOUNTS} onSelect={handleAccountSelected} />
      ) : null
    case 'fetching-statements':
      return selectedBank ? <FetchingStatementsScreen bank={selectedBank} /> : null
    case 'success':
      return selectedBank && selectedAccount ? (
        <SuccessScreen bank={selectedBank} account={selectedAccount} onContinue={handleContinue} />
      ) : (data ? (
        // Returning user with existing data
        <div style={{ textAlign: 'center', padding: '24px 0' }}>
          <motion.div
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            style={{ width: 80, height: 80, borderRadius: '50%', background: '#80FF00', margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <CheckCircle2 size={40} color="#002E83" />
          </motion.div>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#111827', marginBottom: 6 }}>Bank Connected!</h2>
          <p style={{ fontSize: 14, color: '#6B7280', marginBottom: 28 }}>Your bank account is already linked</p>
          <div style={{ background: '#F9FAFB', borderRadius: 16, padding: 20, marginBottom: 28, textAlign: 'left' }}>
            {[
              ['Bank', data.bankName],
              ['Account Holder', data.accountHolderName],
              ['Account Type', data.accountType],
            ].map(([label, value]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13 }}>
                <span style={{ color: '#9CA3AF' }}>{label}</span>
                <span style={{ fontWeight: 500, color: '#111827' }}>{value}</span>
              </div>
            ))}
          </div>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => onComplete(data)}
            style={{ width: '100%', padding: '14px 0', background: '#80FF00', color: '#002E83', fontWeight: 700, fontSize: 15, borderRadius: 12, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            Continue to Document Upload <ArrowRight size={18} />
          </motion.button>
        </div>
      ) : null)
    case 'error':
      return selectedBank ? (
        <ErrorScreen
          bank={selectedBank}
          onRetry={() => setLeanState('connecting')}
          onSelectDifferent={() => { setSelectedBank(null); setLeanState('select-bank') }}
        />
      ) : null
    default:
      return null
  }
}
