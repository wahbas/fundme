import { useState, useEffect } from 'react'
import { Building2, Search, CheckCircle2, ArrowRight, AlertCircle, ShieldCheck, Upload, FileText, Users, MapPin, Briefcase } from 'lucide-react'
import { motion } from 'framer-motion'
import type { BusinessVerificationData, CommercialRegistration, Signatory } from '../types'
import { WathiqLogo } from '../logos'

interface Props {
  data?: BusinessVerificationData
  onComplete: (data: BusinessVerificationData) => void
  nationalId?: string // passed from Nafath step
}

type WathiqState =
  | 'fetching-crs'       // auto-fetching CRs by national ID
  | 'no-cr-found'        // no CRs linked to the national ID
  | 'manual-lookup'      // manual CR entry fallback
  | 'select-cr'          // multiple CRs — pick one
  | 'confirm-cr'         // single CR detail confirmation
  | 'checking-signatory' // verifying authorization
  | 'not-authorized'     // user is not an authorized signatory
  | 'upload-letter'      // uploading authorization letter
  | 'aml-screening'      // running AML/compliance check
  | 'complete'           // done

// ─── Mock Data ──────────────────────────────────────────────

const MOCK_CRS: CommercialRegistration[] = [
  {
    crNumber: '1010456789',
    companyNameAr: 'شركة المنصور للتجارة',
    companyNameEn: 'Al-Mansour Trading Co.',
    companyType: 'Limited Liability Company (LLC)',
    crType: 'main',
    registrationDate: '12/06/2018',
    expiryDate: '12/06/2028',
    isicActivities: ['Wholesale Trade', 'Import & Export'],
    nationalAddress: {
      buildingNumber: '4280',
      street: 'King Fahd Road',
      district: 'Al Olaya',
      city: 'Riyadh',
      postalCode: '12211',
      additionalCode: '8575',
    },
    capital: 5000000,
    signatories: [
      { name: 'Ahmed Al-Mansour', nameAr: 'أحمد المنصور', nationalId: '1088765442', role: 'owner', permission: 'full', idExpiryDate: '2029-05-20' },
      { name: 'Mohammed Al-Saud', nameAr: 'محمد آل سعود', nationalId: '1077654321', role: 'partner', permission: 'limited', idExpiryDate: '2028-11-15' },
    ],
    status: 'active',
  },
  {
    crNumber: '1010456790',
    companyNameAr: 'فرع المنصور - جدة',
    companyNameEn: 'Al-Mansour Trading - Jeddah Branch',
    companyType: 'Branch',
    crType: 'branch',
    registrationDate: '03/01/2021',
    expiryDate: '03/01/2031',
    isicActivities: ['Wholesale Trade'],
    nationalAddress: {
      buildingNumber: '1120',
      street: 'Prince Sultan Road',
      district: 'Al Rawdah',
      city: 'Jeddah',
      postalCode: '23432',
      additionalCode: '3321',
    },
    capital: 1000000,
    signatories: [
      { name: 'Ahmed Al-Mansour', nameAr: 'أحمد المنصور', nationalId: '1088765442', role: 'manager', permission: 'full', idExpiryDate: '2029-05-20' },
    ],
    status: 'active',
  },
]

const CURRENT_USER_ID = '1088765442' // matches Nafath mock

// ─── Sub-screens ────────────────────────────────────────────

function FetchingScreen() {
  return (
    <div style={{ textAlign: 'center', padding: '64px 0' }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
        style={{ width: 56, height: 56, borderRadius: '50%', margin: '0 auto 24px', border: '4px solid #E5E7EB', borderTopColor: '#0D82F9' }}
      />
      <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 6 }}>Looking up your businesses...</h3>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 12 }}>
        <WathiqLogo size={20} />
        <p style={{ fontSize: 13, color: '#9CA3AF' }}>Fetching CRs linked to your National ID via Wathiq</p>
      </div>
    </div>
  )
}

function NoCRFoundScreen({ onManualLookup }: { onManualLookup: () => void }) {
  return (
    <div style={{ textAlign: 'center', padding: '32px 0' }}>
      <div style={{
        width: 72, height: 72, borderRadius: '50%', background: '#FEF3C7',
        margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <AlertCircle size={36} color="#F59E0B" />
      </div>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: '#111827', marginBottom: 8 }}>No Businesses Found</h2>
      <p style={{ fontSize: 14, color: '#6B7280', maxWidth: 380, margin: '0 auto 28px', lineHeight: 1.6 }}>
        We couldn't find any commercial registrations linked to your National ID. You can enter a CR number manually.
      </p>
      <motion.button
        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
        onClick={onManualLookup}
        style={{
          width: '100%', padding: '14px 0', background: '#002E83', color: '#fff', fontWeight: 600,
          fontSize: 15, borderRadius: 12, border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}
      >
        <Search size={18} />
        Enter CR Number Manually
      </motion.button>
    </div>
  )
}

function ManualLookupScreen({ onResult }: { onResult: (cr: CommercialRegistration) => void }) {
  const [crNumber, setCrNumber] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState('')

  function handleLookup() {
    if (crNumber.length < 8) {
      setError('Please enter a valid CR number (at least 8 digits)')
      return
    }
    setError('')
    setIsSearching(true)
    setTimeout(() => {
      onResult({ ...MOCK_CRS[0], crNumber })
      setIsSearching(false)
    }, 2000)
  }

  return (
    <div style={{ padding: '16px 0' }}>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div style={{
          width: 64, height: 64, borderRadius: 16, margin: '0 auto 16px',
          background: 'linear-gradient(135deg, #06B6D4, #0D82F9)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(13,130,249,0.25)',
        }}>
          <Building2 size={32} color="#fff" />
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#111827', marginBottom: 8 }}>Manual CR Lookup</h2>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', background: '#E0F2F1', borderRadius: 20, marginBottom: 12 }}>
          <WathiqLogo size={20} />
          <span style={{ fontSize: 12, fontWeight: 600, color: '#00695C' }}>Verified by Wathiq</span>
        </div>
        <p style={{ fontSize: 14, color: '#6B7280', maxWidth: 380, margin: '0 auto' }}>
          Enter your Commercial Registration (CR) number to look up your business
        </p>
      </div>

      <div style={{ marginBottom: 24 }}>
        <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 8 }}>CR Number</label>
        <div style={{ display: 'flex', gap: 12 }}>
          <input
            type="text"
            value={crNumber}
            onChange={(e) => { setCrNumber(e.target.value.replace(/\D/g, '')); setError('') }}
            placeholder="e.g. 1010456789"
            style={{
              flex: 1, padding: '12px 16px', fontSize: 15, borderRadius: 10,
              border: `1.5px solid ${error ? '#EF4444' : '#E5E7EB'}`, outline: 'none',
              fontFamily: 'monospace', letterSpacing: 1,
            }}
            maxLength={12}
          />
          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={handleLookup} disabled={isSearching}
            style={{
              padding: '12px 24px', background: '#002E83', color: '#fff', fontWeight: 600,
              fontSize: 14, borderRadius: 10, border: 'none', cursor: isSearching ? 'wait' : 'pointer',
              display: 'flex', alignItems: 'center', gap: 8, opacity: isSearching ? 0.7 : 1,
            }}
          >
            {isSearching ? (
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                style={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff' }} />
            ) : (
              <Search size={18} />
            )}
            {isSearching ? 'Searching...' : 'Lookup'}
          </motion.button>
        </div>
        {error && (
          <p style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, fontSize: 12, color: '#EF4444' }}>
            <AlertCircle size={14} /> {error}
          </p>
        )}
      </div>

      <div style={{ background: '#E0F2F1', borderRadius: 12, padding: 16, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <div style={{ flexShrink: 0 }}><WathiqLogo size={36} /></div>
        <div>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#00695C', marginBottom: 4 }}>About Wathiq</p>
          <p style={{ fontSize: 12, color: '#00897B', lineHeight: 1.5 }}>
            Wathiq is the Ministry of Commerce's API for verifying commercial registrations.
            We'll automatically retrieve your business details.
          </p>
        </div>
      </div>
    </div>
  )
}

function CRCard({ cr, selected, onSelect }: { cr: CommercialRegistration; selected?: boolean; onSelect: () => void }) {
  return (
    <motion.button
      whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
      onClick={onSelect}
      style={{
        width: '100%', padding: 20, borderRadius: 14, textAlign: 'left', cursor: 'pointer',
        border: `2px solid ${selected ? '#0D82F9' : '#E5E7EB'}`,
        background: selected ? '#EFF6FF' : '#fff',
        transition: 'border-color 0.2s, background 0.2s',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: '#111827' }}>{cr.companyNameEn}</span>
            {cr.crType === 'branch' && (
              <span style={{ fontSize: 10, fontWeight: 600, padding: '2px 8px', background: '#F3F4F6', color: '#6B7280', borderRadius: 10 }}>BRANCH</span>
            )}
          </div>
          <p style={{ fontSize: 13, color: '#6B7280' }}>{cr.companyNameAr}</p>
        </div>
        <div style={{
          width: 22, height: 22, borderRadius: '50%',
          border: `2px solid ${selected ? '#0D82F9' : '#D1D5DB'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          {selected && <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#0D82F9' }} />}
        </div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, fontSize: 12 }}>
        <span style={{ color: '#9CA3AF' }}>CR: <span style={{ color: '#374151', fontWeight: 500 }}>{cr.crNumber}</span></span>
        <span style={{ color: '#9CA3AF' }}>Type: <span style={{ color: '#374151', fontWeight: 500 }}>{cr.companyType}</span></span>
        <span style={{ color: '#9CA3AF' }}>Expires: <span style={{ color: '#374151', fontWeight: 500 }}>{cr.expiryDate}</span></span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
        <MapPin size={12} color="#9CA3AF" />
        <span style={{ fontSize: 12, color: '#9CA3AF' }}>{cr.nationalAddress.district}, {cr.nationalAddress.city}</span>
      </div>
    </motion.button>
  )
}

function SelectCRScreen({ crs, onSelect }: { crs: CommercialRegistration[]; onSelect: (cr: CommercialRegistration) => void }) {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  return (
    <div style={{ padding: '16px 0' }}>
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <div style={{
          width: 64, height: 64, borderRadius: 16, margin: '0 auto 16px',
          background: 'linear-gradient(135deg, #06B6D4, #0D82F9)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(13,130,249,0.25)',
        }}>
          <Building2 size={32} color="#fff" />
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#111827', marginBottom: 8 }}>Select Your Business</h2>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', background: '#E0F2F1', borderRadius: 20, marginBottom: 12 }}>
          <WathiqLogo size={20} />
          <span style={{ fontSize: 12, fontWeight: 600, color: '#00695C' }}>Verified by Wathiq</span>
        </div>
        <p style={{ fontSize: 14, color: '#6B7280' }}>
          We found {crs.length} commercial registration{crs.length > 1 ? 's' : ''} linked to your ID
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        {crs.map((cr) => (
          <CRCard key={cr.crNumber} cr={cr} selected={selectedId === cr.crNumber} onSelect={() => setSelectedId(cr.crNumber)} />
        ))}
      </div>

      <motion.button
        whileHover={selectedId ? { scale: 1.02 } : undefined}
        whileTap={selectedId ? { scale: 0.98 } : undefined}
        onClick={() => { const cr = crs.find((c) => c.crNumber === selectedId); if (cr) onSelect(cr) }}
        disabled={!selectedId}
        style={{
          width: '100%', padding: '14px 0', fontWeight: 600, fontSize: 15, borderRadius: 12,
          border: 'none', cursor: selectedId ? 'pointer' : 'not-allowed',
          background: selectedId ? '#002E83' : '#D1D5DB', color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}
      >
        Continue with Selected Business
        <ArrowRight size={18} />
      </motion.button>
    </div>
  )
}

function ConfirmCRScreen({ cr, onConfirm, onBack }: { cr: CommercialRegistration; onConfirm: () => void; onBack: () => void }) {
  const addr = cr.nationalAddress
  const fullAddress = `${addr.buildingNumber} ${addr.street}, ${addr.district}, ${addr.city} ${addr.postalCode}`

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
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#111827', marginBottom: 6 }}>Business Found</h2>
        <p style={{ fontSize: 14, color: '#6B7280' }}>Please confirm your business details below</p>
      </div>

      {/* Business details */}
      <div style={{ background: '#F9FAFB', borderRadius: 16, padding: 24, marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <Building2 size={16} color="#0D82F9" />
          <span style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>Business Information</span>
        </div>
        {[
          ['CR Number', cr.crNumber],
          ['Company Name (EN)', cr.companyNameEn],
          ['Company Name (AR)', cr.companyNameAr],
          ['Company Type', cr.companyType],
          ['CR Type', cr.crType === 'main' ? 'Main Registration' : 'Branch'],
          ['Registration Date', cr.registrationDate],
          ['Expiry Date', cr.expiryDate],
          ['Capital', `SAR ${cr.capital.toLocaleString()}`],
          ['Activities', cr.isicActivities.join(', ')],
        ].map(([label, value]) => (
          <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10, fontSize: 13 }}>
            <span style={{ color: '#9CA3AF', flexShrink: 0, marginRight: 16 }}>{label}</span>
            <span style={{ fontWeight: 500, color: '#111827', textAlign: 'right' }}>{value}</span>
          </div>
        ))}
      </div>

      {/* Address */}
      <div style={{ background: '#F9FAFB', borderRadius: 16, padding: 24, marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <MapPin size={16} color="#0D82F9" />
          <span style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>National Address</span>
        </div>
        <p style={{ fontSize: 13, color: '#374151', lineHeight: 1.6 }}>{fullAddress}</p>
      </div>

      {/* Signatories */}
      <div style={{ background: '#F9FAFB', borderRadius: 16, padding: 24, marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <Users size={16} color="#0D82F9" />
          <span style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>Signatories ({cr.signatories.length})</span>
        </div>
        {cr.signatories.map((sig, i) => (
          <div key={sig.nationalId} style={{
            padding: 12, borderRadius: 10, background: '#fff', border: '1px solid #E5E7EB',
            marginBottom: i < cr.signatories.length - 1 ? 8 : 0,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>{sig.name}</span>
              <span style={{
                fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 10,
                background: sig.permission === 'full' ? '#D1FAE5' : '#FEF3C7',
                color: sig.permission === 'full' ? '#047857' : '#92400E',
              }}>
                {sig.role.replace('-', ' ').toUpperCase()}
              </span>
            </div>
            <div style={{ display: 'flex', gap: 16, fontSize: 11, color: '#9CA3AF' }}>
              <span>{sig.nameAr}</span>
              <span>ID: {sig.nationalId.slice(0, 4)}****{sig.nationalId.slice(-2)}</span>
              <span>Permission: {sig.permission}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        <button onClick={onBack} style={{
          flex: 1, padding: '12px 0', background: '#fff', color: '#374151', fontWeight: 600,
          fontSize: 14, borderRadius: 12, border: '1px solid #D1D5DB', cursor: 'pointer',
        }}>
          Not My Business
        </button>
        <motion.button
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          onClick={onConfirm}
          style={{
            flex: 2, padding: '12px 0', background: '#80FF00', color: '#002E83', fontWeight: 700,
            fontSize: 15, borderRadius: 12, border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}
        >
          Confirm & Continue
          <ArrowRight size={18} />
        </motion.button>
      </div>
    </div>
  )
}

function CheckingSignatoryScreen() {
  return (
    <div style={{ textAlign: 'center', padding: '64px 0' }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
        style={{ width: 56, height: 56, borderRadius: '50%', margin: '0 auto 24px', border: '4px solid #E5E7EB', borderTopColor: '#0D82F9' }}
      />
      <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 6 }}>Checking Authorization...</h3>
      <p style={{ fontSize: 13, color: '#9CA3AF' }}>Verifying you're an authorized signatory for this business</p>
    </div>
  )
}

function NotAuthorizedScreen({ signatory, onUploadLetter, onBack }: { signatory?: Signatory; onUploadLetter: () => void; onBack: () => void }) {
  return (
    <div style={{ textAlign: 'center', padding: '24px 0' }}>
      <div style={{
        width: 72, height: 72, borderRadius: '50%', background: '#FEF3C7',
        margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <AlertCircle size={36} color="#F59E0B" />
      </div>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: '#111827', marginBottom: 8 }}>Authorization Required</h2>
      <p style={{ fontSize: 14, color: '#6B7280', maxWidth: 400, margin: '0 auto 24px', lineHeight: 1.6 }}>
        {signatory
          ? `You are listed as "${signatory.role.replace('-', ' ')}" with "${signatory.permission}" permission. Full authorization is required to proceed.`
          : 'You are not listed as an authorized signatory for this business.'
        }
      </p>

      <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 14, padding: 20, marginBottom: 28, textAlign: 'left' }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: '#92400E', marginBottom: 10 }}>What you can do:</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            'Upload an authorization letter signed by an authorized signatory',
            'The letter should authorize you to apply for financing on behalf of the company',
            'Include company stamp and signatory details',
          ].map((t, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
              <span style={{ fontSize: 12, color: '#A16207', lineHeight: 1.5 }}>•</span>
              <p style={{ fontSize: 12, color: '#A16207', lineHeight: 1.5 }}>{t}</p>
            </div>
          ))}
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
        onClick={onUploadLetter}
        style={{
          width: '100%', padding: '14px 0', background: '#002E83', color: '#fff', fontWeight: 600,
          fontSize: 15, borderRadius: 12, border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 12,
        }}
      >
        <Upload size={18} />
        Upload Authorization Letter
      </motion.button>
      <button onClick={onBack} style={{ fontSize: 13, color: '#9CA3AF', background: 'none', border: 'none', cursor: 'pointer' }}>
        Select a different business
      </button>
    </div>
  )
}

function UploadLetterScreen({ onUploaded, onBack }: { onUploaded: () => void; onBack: () => void }) {
  const [uploading, setUploading] = useState(false)
  const [uploaded, setUploaded] = useState(false)

  function handleUpload() {
    setUploading(true)
    setTimeout(() => {
      setUploading(false)
      setUploaded(true)
    }, 2000)
  }

  return (
    <div style={{ padding: '16px 0' }}>
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <div style={{
          width: 64, height: 64, borderRadius: 16, margin: '0 auto 16px',
          background: 'linear-gradient(135deg, #F59E0B, #EF4444)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(245,158,11,0.25)',
        }}>
          <FileText size={32} color="#fff" />
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#111827', marginBottom: 6 }}>Authorization Letter</h2>
        <p style={{ fontSize: 14, color: '#6B7280' }}>Upload a signed authorization letter to proceed</p>
      </div>

      {!uploaded ? (
        <div style={{
          border: '2px dashed #D1D5DB', borderRadius: 14, padding: 40,
          textAlign: 'center', marginBottom: 24, background: '#FAFAFA',
        }}>
          {uploading ? (
            <div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                style={{ width: 40, height: 40, borderRadius: '50%', margin: '0 auto 16px', border: '3px solid #E5E7EB', borderTopColor: '#0D82F9' }}
              />
              <p style={{ fontSize: 14, color: '#6B7280' }}>Uploading...</p>
            </div>
          ) : (
            <div>
              <Upload size={32} color="#9CA3AF" style={{ marginBottom: 12 }} />
              <p style={{ fontSize: 14, fontWeight: 500, color: '#374151', marginBottom: 4 }}>Click to upload authorization letter</p>
              <p style={{ fontSize: 12, color: '#9CA3AF' }}>PDF, JPG or PNG • Max 10MB</p>
              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                onClick={handleUpload}
                style={{
                  marginTop: 16, padding: '10px 24px', background: '#0D82F9', color: '#fff',
                  fontWeight: 600, fontSize: 13, borderRadius: 10, border: 'none', cursor: 'pointer',
                }}
              >
                Choose File
              </motion.button>
            </div>
          )}
        </div>
      ) : (
        <div style={{
          border: '1.5px solid #D1FAE5', borderRadius: 14, padding: 18, marginBottom: 24,
          background: '#F0FDF4', display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <CheckCircle2 size={20} color="#047857" />
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>authorization_letter.pdf</p>
            <p style={{ fontSize: 11, color: '#6B7280' }}>1.2 MB • Uploaded just now</p>
          </div>
        </div>
      )}

      <div style={{ background: '#F0F4FF', borderRadius: 12, padding: 14, marginBottom: 24 }}>
        <p style={{ fontSize: 12, color: '#374151', lineHeight: 1.5 }}>
          <strong>Required:</strong> The letter must include the authorized signatory's name, National ID, company stamp, and a statement granting you permission to apply for financing.
        </p>
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        <button onClick={onBack} style={{
          flex: 1, padding: '12px 0', background: '#fff', color: '#374151', fontWeight: 600,
          fontSize: 14, borderRadius: 12, border: '1px solid #D1D5DB', cursor: 'pointer',
        }}>
          Back
        </button>
        <motion.button
          whileHover={uploaded ? { scale: 1.02 } : undefined}
          whileTap={uploaded ? { scale: 0.98 } : undefined}
          onClick={onUploaded} disabled={!uploaded}
          style={{
            flex: 2, padding: '12px 0', fontWeight: 700, fontSize: 15, borderRadius: 12,
            border: 'none', cursor: uploaded ? 'pointer' : 'not-allowed',
            background: uploaded ? '#80FF00' : '#D1D5DB', color: uploaded ? '#002E83' : '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}
        >
          Continue
          <ArrowRight size={18} />
        </motion.button>
      </div>
    </div>
  )
}

function AMLScreeningScreen() {
  return (
    <div style={{ textAlign: 'center', padding: '64px 0' }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
        style={{ width: 56, height: 56, borderRadius: '50%', margin: '0 auto 24px', border: '4px solid #E5E7EB', borderTopColor: '#047857' }}
      />
      <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 6 }}>Running Compliance Check...</h3>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 12 }}>
        <ShieldCheck size={16} color="#047857" />
        <p style={{ fontSize: 13, color: '#9CA3AF' }}>AML & sanctions screening in progress</p>
      </div>
    </div>
  )
}

function CompleteScreen({ cr, isAuthorized, onContinue }: { cr: CommercialRegistration; isAuthorized: boolean; onContinue: () => void }) {
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

      <h2 style={{ fontSize: 22, fontWeight: 700, color: '#111827', marginBottom: 6 }}>Business Verified!</h2>
      <p style={{ fontSize: 14, color: '#6B7280', marginBottom: 28 }}>Your business has been successfully verified via Wathiq</p>

      <div style={{ background: '#F9FAFB', borderRadius: 16, padding: 24, marginBottom: 24, textAlign: 'left' }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: '#111827', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <CheckCircle2 size={16} color="#22C55E" />
          Verified Business
        </h3>
        {[
          ['Company', cr.companyNameEn],
          ['CR Number', cr.crNumber],
          ['Type', cr.companyType],
          ['Activities', cr.isicActivities.join(', ')],
          ['Location', `${cr.nationalAddress.district}, ${cr.nationalAddress.city}`],
        ].map(([label, value]) => (
          <div key={label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontSize: 13 }}>
            <span style={{ color: '#9CA3AF' }}>{label}</span>
            <span style={{ fontWeight: 500, color: '#111827', textAlign: 'right', maxWidth: 240 }}>{value}</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 28 }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 12px',
          background: '#D1FAE5', color: '#047857', borderRadius: 20, fontSize: 12, fontWeight: 600,
        }}>
          <ShieldCheck size={14} />
          AML Screening Passed
        </span>
        {isAuthorized ? (
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 12px',
            background: '#D1FAE5', color: '#047857', borderRadius: 20, fontSize: 12, fontWeight: 600,
          }}>
            <CheckCircle2 size={14} />
            Authorized Signatory
          </span>
        ) : (
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 12px',
            background: '#FEF3C7', color: '#92400E', borderRadius: 20, fontSize: 12, fontWeight: 600,
          }}>
            <FileText size={14} />
            Via Authorization Letter
          </span>
        )}
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
        Continue to Bank Connection
        <ArrowRight size={18} />
      </motion.button>
    </div>
  )
}

// ─── Main Component ──────────────────────────────────────────

export default function WathiqVerification({ data, onComplete, nationalId }: Props) {
  const [wathiqState, setWathiqState] = useState<WathiqState>(data ? 'complete' : 'fetching-crs')
  const [fetchedCRs, setFetchedCRs] = useState<CommercialRegistration[]>([])
  const [selectedCR, setSelectedCR] = useState<CommercialRegistration | null>(data?.selectedCR || null)
  const [isAuthorized, setIsAuthorized] = useState(data?.isAuthorizedSignatory ?? false)
  const [letterUploaded, setLetterUploaded] = useState(false)

  // Auto-fetch CRs on mount
  useEffect(() => {
    if (wathiqState !== 'fetching-crs') return
    const t = setTimeout(() => {
      // Mock: return CRs linked to the national ID
      setFetchedCRs(MOCK_CRS)
      if (MOCK_CRS.length === 0) {
        setWathiqState('no-cr-found')
      } else if (MOCK_CRS.length === 1) {
        setSelectedCR(MOCK_CRS[0])
        setWathiqState('confirm-cr')
      } else {
        setWathiqState('select-cr')
      }
    }, 2000)
    return () => clearTimeout(t)
  }, [wathiqState])

  function handleCRSelected(cr: CommercialRegistration) {
    setSelectedCR(cr)
    setWathiqState('confirm-cr')
  }

  function handleCRConfirmed() {
    if (!selectedCR) return
    setWathiqState('checking-signatory')

    // Mock: check if user is an authorized signatory
    setTimeout(() => {
      const userSig = selectedCR.signatories.find((s) => s.nationalId === CURRENT_USER_ID)
      if (userSig && userSig.permission === 'full') {
        setIsAuthorized(true)
        setWathiqState('aml-screening')
      } else {
        setIsAuthorized(false)
        setWathiqState('not-authorized')
      }
    }, 1500)
  }

  function handleLetterUploaded() {
    setLetterUploaded(true)
    setWathiqState('aml-screening')
  }

  // AML auto-completes
  useEffect(() => {
    if (wathiqState !== 'aml-screening') return
    const t = setTimeout(() => setWathiqState('complete'), 2500)
    return () => clearTimeout(t)
  }, [wathiqState])

  function handleContinue() {
    if (!selectedCR) return
    const result: BusinessVerificationData = {
      selectedCR,
      isAuthorizedSignatory: isAuthorized,
      authorizationLetterUploaded: letterUploaded || undefined,
      amlScreeningStatus: 'clear',
      amlScreeningId: 'AML-BIZ-' + Date.now(),
      wathiqVerifiedAt: new Date(),
    }
    onComplete(result)
  }

  function goBack() {
    if (fetchedCRs.length > 1) {
      setSelectedCR(null)
      setWathiqState('select-cr')
    } else {
      setWathiqState('fetching-crs')
    }
  }

  switch (wathiqState) {
    case 'fetching-crs':
      return <FetchingScreen />
    case 'no-cr-found':
      return <NoCRFoundScreen onManualLookup={() => setWathiqState('manual-lookup')} />
    case 'manual-lookup':
      return <ManualLookupScreen onResult={(cr) => { setSelectedCR(cr); setFetchedCRs([cr]); setWathiqState('confirm-cr') }} />
    case 'select-cr':
      return <SelectCRScreen crs={fetchedCRs} onSelect={handleCRSelected} />
    case 'confirm-cr':
      return selectedCR ? <ConfirmCRScreen cr={selectedCR} onConfirm={handleCRConfirmed} onBack={goBack} /> : null
    case 'checking-signatory':
      return <CheckingSignatoryScreen />
    case 'not-authorized':
      return <NotAuthorizedScreen
        signatory={selectedCR?.signatories.find((s) => s.nationalId === CURRENT_USER_ID)}
        onUploadLetter={() => setWathiqState('upload-letter')}
        onBack={goBack}
      />
    case 'upload-letter':
      return <UploadLetterScreen onUploaded={handleLetterUploaded} onBack={() => setWathiqState('not-authorized')} />
    case 'aml-screening':
      return <AMLScreeningScreen />
    case 'complete':
      return selectedCR ? <CompleteScreen cr={selectedCR} isAuthorized={isAuthorized} onContinue={handleContinue} /> : null
    default:
      return null
  }
}
