import { useState, useEffect } from 'react'
import { Building2, Search, CheckCircle2, ArrowRight, ArrowLeft, AlertCircle, ShieldCheck, Upload, FileText, Users, MapPin, Hash, Info } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTheme } from '../../../ThemeContext'
import { useI18n } from '../../../i18n'
import type { BusinessVerificationData, CommercialRegistration, Signatory } from '../types'
import { WathiqLogo } from '../logos'
import CompanyIllustration from '../CompanyIllustration'

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

// ─── Mock Data ──────────────────────────────────────────────

// Arabic translations for mock data
const arData: Record<string, Record<string, string>> = {
  companyType: { 'Limited Liability Company (LLC)': 'شركة ذات مسؤولية محدودة', 'Branch': 'فرع' },
  city: { 'Riyadh': 'الرياض', 'Jeddah': 'جدة', 'Dammam': 'الدمام' },
  district: { 'Al Olaya': 'العليا', 'Al Rawdah': 'الروضة', 'Al Shatie': 'الشاطئ' },
  activity: { 'Wholesale Trade': 'تجارة الجملة', 'Import & Export': 'الاستيراد والتصدير' },
  role: { 'owner': 'مالك', 'partner': 'شريك', 'manager': 'مدير' },
  permission: { 'full': 'كاملة', 'limited': 'محدودة' },
}

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
      buildingNumber: '٤٢٨٠',
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
      buildingNumber: '١١٢٠',
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
  const { theme } = useTheme()
  const { t } = useI18n()
  return (
    <div style={{ textAlign: 'center', padding: '64px 0' }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
        style={{ width: 56, height: 56, borderRadius: '50%', margin: '0 auto 24px', border: '4px solid #E5E7EB', borderTopColor: '#0D82F9' }}
      />
      <h3 style={{ fontSize: 18, fontWeight: 600, color: theme.textPrimary, marginBottom: 6 }}>{t('onboarding.lookingUp')}</h3>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 12 }}>
        <WathiqLogo size={20} />
        <p style={{ fontSize: 13, color: theme.textMuted }}>{t('onboarding.fetchingCRs')}</p>
      </div>
    </div>
  )
}

function NoCRFoundScreen({ onManualLookup }: { onManualLookup: () => void }) {
  const { theme } = useTheme()
  const { t } = useI18n()
  return (
    <div style={{ textAlign: 'center', padding: '32px 0' }}>
      <div style={{
        width: 72, height: 72, borderRadius: '50%', background: '#FEF3C7',
        margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <AlertCircle size={36} color="#F59E0B" />
      </div>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: theme.textPrimary, marginBottom: 8 }}>{t('onboarding.noBusinesses')}</h2>
      <p style={{ fontSize: 14, color: theme.textMuted, maxWidth: 380, margin: '0 auto 28px', lineHeight: 1.6 }}>
        {t('onboarding.noBusinessesDesc')}
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
        {t('onboarding.enterCRManually')}
      </motion.button>
    </div>
  )
}

const RELATIONSHIP_OPTIONS = [
  'Owner',
  'Partner',
  'Authorized Representative',
  'CEO / Managing Director',
  'CFO / Financial Officer',
  'Board Member',
]

function ManualLookupScreen({ onResult, onBack }: { onResult: (cr: CommercialRegistration, relationship: string) => void; onBack?: () => void }) {
  const { theme } = useTheme()
  const { t, isRTL } = useI18n()
  const [crNumber, setCrNumber] = useState('')
  const [relationship, setRelationship] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState('')
  const [verifiedCR, setVerifiedCR] = useState<CommercialRegistration | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploaded, setUploaded] = useState(false)
  const [crFocused, setCrFocused] = useState(false)
  const [relFocused, setRelFocused] = useState(false)

  function handleVerify() {
    const errs: string[] = []
    if (crNumber.length < 8) errs.push('CR number')
    if (!relationship) errs.push('relationship type')
    if (errs.length) {
      setError(`Please enter a valid ${errs.join(' and ')}`)
      return
    }
    setError('')
    setIsSearching(true)
    setTimeout(() => {
      setIsSearching(false)
      setVerifiedCR({ ...MOCK_CRS[0], crNumber, companyNameEn: 'Modern Industries LLC', companyNameAr: 'الصناعات الحديثة ذ.م.م', nationalAddress: { ...MOCK_CRS[0].nationalAddress, city: 'Dammam', district: 'Al Shatie' } })
    }, 1500)
  }

  function handleUpload() {
    setUploading(true)
    setTimeout(() => { setUploading(false); setUploaded(true) }, 1500)
  }

  function handleComplete() {
    if (!verifiedCR) return
    onResult(verifiedCR, relationship)
  }

  const crHasError = !!error && crNumber.length < 8
  const relHasError = !!error && !relationship

  return (
    <div style={{ padding: '16px 0', maxWidth: 480, margin: '0 auto' }}>
      {/* Illustration + Header */}
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <CompanyIllustration size={130} />
        <h2 style={{ fontSize: 22, fontWeight: 700, color: theme.textPrimary, marginTop: 24, marginBottom: 8 }}>{t('onboarding.companyInfo' as any)}</h2>
        <p style={{ fontSize: 14, color: theme.textMuted }}>{t('onboarding.provideDetails' as any)}</p>
      </div>

      {/* Back link */}
      {onBack && (
        <button
          onClick={onBack}
          style={{
            display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 500, color: '#94A3B8',
            cursor: 'pointer', marginBottom: 24, background: 'none', border: 'none', padding: 0,
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#002E83')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
        >
          {isRTL ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
          Back to linked companies
        </button>
      )}

      {/* Verified company card */}
      {verifiedCR && (
        <div style={{
          border: '1.5px solid #E5E7EB', borderRadius: 14, padding: 18, marginBottom: 24,
          display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10, background: '#F0F4FF',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <Building2 size={20} color="#002E83" />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 14, fontWeight: 600, color: theme.textPrimary, marginBottom: 2 }}>{isRTL ? verifiedCR.companyNameAr : verifiedCR.companyNameEn}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 12, color: '#9CA3AF' }}>CR: {verifiedCR.crNumber}</span>
              <span style={{ fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 10, background: '#D1FAE5', color: '#047857' }}>Active</span>
              <span style={{ fontSize: 12, color: '#9CA3AF' }}>City: {verifiedCR.nationalAddress.city}</span>
            </div>
          </div>
        </div>
      )}

      {/* Pre-verification form */}
      {!verifiedCR && (
        <>
          {/* CR Number */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 8 }}>CR Number</label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                <Hash size={18} color="#94A3B8" />
              </div>
              <input
                type="text"
                value={crNumber}
                onChange={(e) => { setCrNumber(e.target.value.replace(/\D/g, '')); setError('') }}
                onFocus={() => setCrFocused(true)}
                onBlur={() => setCrFocused(false)}
                placeholder="e.g. 1010456789"
                style={{
                  width: '100%', height: 50, paddingLeft: 42, paddingRight: 14, fontSize: 14, fontWeight: 500,
                  borderRadius: 12, boxSizing: 'border-box', outline: 'none',
                  border: `1.5px solid ${crHasError ? '#EF4444' : crFocused ? '#0D82F9' : '#E2E8F0'}`,
                  background: crFocused ? '#fff' : '#F9FAFB',
                  boxShadow: crFocused && !crHasError ? '0 0 0 3px rgba(13,130,249,0.1)' : 'none',
                  transition: 'border-color 0.2s, background 0.2s, box-shadow 0.2s',
                }}
                maxLength={12}
              />
            </div>
            {crHasError ? (
              <p style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 6, fontSize: 12, fontWeight: 500, color: '#EF4444' }}>
                <AlertCircle size={13} /> Enter a valid CR number (at least 8 digits)
              </p>
            ) : (
              <p style={{ fontSize: 12, color: '#94A3B8', marginTop: 6 }}>
                Enter the 10-digit Commercial Registration number from your CR certificate
              </p>
            )}
          </div>

          {/* Relationship Type */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 8 }}>Relationship Type</label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', zIndex: 1 }}>
                <Users size={18} color="#94A3B8" />
              </div>
              <select
                value={relationship}
                onChange={(e) => { setRelationship(e.target.value); setError('') }}
                onFocus={() => setRelFocused(true)}
                onBlur={() => setRelFocused(false)}
                style={{
                  width: '100%', height: 50, paddingLeft: 42, paddingRight: 36, fontSize: 14, fontWeight: 500,
                  borderRadius: 12, boxSizing: 'border-box', outline: 'none',
                  border: `1.5px solid ${relHasError ? '#EF4444' : relFocused ? '#0D82F9' : '#E2E8F0'}`,
                  background: relFocused ? '#fff' : '#F9FAFB',
                  boxShadow: relFocused && !relHasError ? '0 0 0 3px rgba(13,130,249,0.1)' : 'none',
                  color: relationship ? '#111827' : '#94A3B8',
                  cursor: 'pointer', appearance: 'none',
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%239CA3AF' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center',
                  transition: 'border-color 0.2s, background 0.2s, box-shadow 0.2s',
                }}
              >
                <option value="" disabled>Select relationship</option>
                {RELATIONSHIP_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            {relHasError && (
              <p style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 6, fontSize: 12, fontWeight: 500, color: '#EF4444' }}>
                <AlertCircle size={13} /> Please select your relationship to the company
              </p>
            )}
          </div>

          {/* Consent text */}
          <p style={{
            fontSize: 12, color: '#6B7280', textAlign: 'center', lineHeight: 1.5,
            margin: '8px 0',
          }}>
            {t('onboarding.consentText' as any)}
          </p>

          {/* Verify CR Button */}
          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={handleVerify} disabled={isSearching}
            style={{
              width: '100%', padding: '14px 0', marginTop: 8,
              background: '#002E83', color: '#fff', fontWeight: 600,
              fontSize: 15, borderRadius: 12, border: 'none', cursor: isSearching ? 'wait' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              opacity: isSearching ? 0.8 : 1,
            }}
          >
            {isSearching ? (
              <>
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                  style={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff' }} />
                Verifying...
              </>
            ) : (
              <>
                <Search size={16} />
                Verify CR
              </>
            )}
          </motion.button>

          {/* Info card */}
          <div style={{
            marginTop: 24, padding: 16, background: 'rgba(239,246,255,0.5)',
            border: '1px solid #DBEAFE', borderRadius: 12,
            display: 'flex', alignItems: 'flex-start', gap: 10,
          }}>
            <Info size={16} color="#0D82F9" style={{ flexShrink: 0, marginTop: 1 }} />
            <p style={{ fontSize: 12, color: '#64748B', lineHeight: 1.6 }}>
              Your CR details will be verified via Wathiq. Make sure the CR number is active and not expired.
            </p>
          </div>
        </>
      )}

      {/* Authorization Document upload (shown after CR verified) */}
      {verifiedCR && (
        <>
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#475569' }}>
              Authorization Document <span style={{ color: '#EF4444' }}>*</span>
            </label>
            <p style={{ fontSize: 12, color: '#94A3B8', marginTop: 4, lineHeight: 1.5 }}>
              Upload a signed authorization letter or power of attorney proving you are allowed to apply on behalf of this company.
            </p>
          </div>

          {!uploaded ? (
            <div style={{
              border: '2px dashed #D1D5DB', borderRadius: 14, padding: 32,
              textAlign: 'center', marginBottom: 24, background: '#FAFAFA',
            }}>
              {uploading ? (
                <div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    style={{ width: 36, height: 36, borderRadius: '50%', margin: '0 auto 12px', border: '3px solid #E5E7EB', borderTopColor: '#0D82F9' }}
                  />
                  <p style={{ fontSize: 13, color: '#6B7280' }}>Uploading...</p>
                </div>
              ) : (
                <div>
                  <Upload size={28} color="#94A3B8" style={{ marginBottom: 10 }} />
                  <p style={{ fontSize: 14, fontWeight: 500, color: '#374151', marginBottom: 4 }}>Upload Authorization Document</p>
                  <p style={{ fontSize: 12, color: '#94A3B8', marginBottom: 14 }}>PDF, JPG, or PNG (Max 10MB)</p>
                  <motion.button
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={handleUpload}
                    style={{
                      padding: '8px 20px', background: '#fff', color: '#374151',
                      fontWeight: 500, fontSize: 13, borderRadius: 8,
                      border: '1px solid #D1D5DB', cursor: 'pointer',
                    }}
                  >
                    Choose File
                  </motion.button>
                </div>
              )}
            </div>
          ) : (
            <div style={{
              border: '1.5px solid #D1FAE5', borderRadius: 14, padding: 16, marginBottom: 24,
              background: '#F0FDF4', display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <CheckCircle2 size={20} color="#047857" />
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>authorization_letter.pdf</p>
                <p style={{ fontSize: 11, color: '#6B7280' }}>1.2 MB · Uploaded just now</p>
              </div>
            </div>
          )}

          <motion.button
            whileHover={uploaded ? { scale: 1.02 } : undefined}
            whileTap={uploaded ? { scale: 0.98 } : undefined}
            onClick={handleComplete}
            disabled={!uploaded}
            style={{
              width: '100%', padding: '14px 0', fontWeight: 700, fontSize: 15, borderRadius: 12,
              border: 'none', cursor: uploaded ? 'pointer' : 'not-allowed',
              background: uploaded ? '#80FF00' : '#D1D5DB', color: uploaded ? '#002E83' : '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}
          >
            Complete & Continue
            {isRTL ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
          </motion.button>
        </>
      )}
    </div>
  )
}

function CRCard({ cr, selected, onSelect }: { cr: CommercialRegistration; selected?: boolean; onSelect: () => void }) {
  const { theme } = useTheme()
  const { t, isRTL } = useI18n()
  const primaryName = isRTL ? cr.companyNameAr : cr.companyNameEn
  const secondaryName = isRTL ? cr.companyNameEn : cr.companyNameAr
  return (
    <motion.button
      whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
      onClick={onSelect}
      style={{
        width: '100%', padding: 20, borderRadius: 14, textAlign: isRTL ? 'right' : 'left', cursor: 'pointer',
        border: `2px solid ${selected ? '#0D82F9' : theme.border}`,
        background: selected ? '#EFF6FF' : theme.cardBg,
        transition: 'border-color 0.2s, background 0.2s',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: theme.textPrimary }}>{primaryName}</span>
            {cr.crType === 'branch' && (
              <span style={{ fontSize: 10, fontWeight: 600, padding: '2px 8px', background: '#F3F4F6', color: '#6B7280', borderRadius: 10 }}>{t('onboarding.branch')}</span>
            )}
          </div>
          <p style={{ fontSize: 13, color: theme.textMuted }}>{secondaryName}</p>
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
        <span style={{ color: theme.textMuted }}>{t('onboarding.cr')} <span style={{ color: theme.textSecondary, fontWeight: 500 }}>{cr.crNumber}</span></span>
        <span style={{ color: theme.textMuted }}>{t('onboarding.type')} <span style={{ color: theme.textSecondary, fontWeight: 500 }}>{isRTL ? (arData.companyType[cr.companyType] || cr.companyType) : cr.companyType}</span></span>
        <span style={{ color: theme.textMuted }}>{t('onboarding.expires')} <span style={{ color: theme.textSecondary, fontWeight: 500 }}>{cr.expiryDate}</span></span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
        <MapPin size={12} color={theme.textMuted} />
        <span style={{ fontSize: 12, color: theme.textMuted }}>
          {isRTL
            ? `${arData.district[cr.nationalAddress.district] || cr.nationalAddress.district}، ${arData.city[cr.nationalAddress.city] || cr.nationalAddress.city}`
            : `${cr.nationalAddress.district}, ${cr.nationalAddress.city}`
          }
        </span>
      </div>
    </motion.button>
  )
}

function SelectCRScreen({ crs, onSelect, onAddManually }: { crs: CommercialRegistration[]; onSelect: (cr: CommercialRegistration) => void; onAddManually: () => void }) {
  const { theme } = useTheme()
  const { t, isRTL } = useI18n()
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
        <h2 style={{ fontSize: 22, fontWeight: 700, color: theme.textPrimary, marginBottom: 8 }}>{t('onboarding.selectBusiness')}</h2>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', background: '#E0F2F1', borderRadius: 20, marginBottom: 12 }}>
          <WathiqLogo size={20} />
          <span style={{ fontSize: 12, fontWeight: 600, color: '#00695C' }}>{t('onboarding.verifiedByWathiq')}</span>
        </div>
        <p style={{ fontSize: 14, color: '#6B7280' }}>
          {t('onboarding.foundCRs')}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
        {crs.map((cr) => (
          <CRCard key={cr.crNumber} cr={cr} selected={selectedId === cr.crNumber} onSelect={() => setSelectedId(cr.crNumber)} />
        ))}
      </div>

      {/* Add another company manually */}
      <button
        onClick={onAddManually}
        style={{
          width: '100%', padding: '14px 0', marginBottom: 16,
          background: '#fff', color: '#0D82F9', fontWeight: 600, fontSize: 14,
          borderRadius: 12, border: '1.5px dashed #0D82F9', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          transition: 'background 0.2s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = '#EFF6FF')}
        onMouseLeave={(e) => (e.currentTarget.style.background = '#fff')}
      >
        <span style={{ fontSize: 18, lineHeight: 1 }}>+</span>
        {t('onboarding.addManually')}
      </button>

      <p style={{
        fontSize: 12, color: '#6B7280', textAlign: 'center', lineHeight: 1.5,
        margin: '0 0 8px 0',
      }}>
        {t('onboarding.consentText' as any)}
      </p>

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
        {t('onboarding.continueSelected' as any)}
        {isRTL ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
      </motion.button>
    </div>
  )
}

// @ts-expect-error -- component is defined for future use
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ConfirmCRScreen({ cr, onConfirm, onBack }: { cr: CommercialRegistration; onConfirm: () => void; onBack: () => void }) {
  const { theme } = useTheme()
  const { t, isRTL } = useI18n()
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
        <h2 style={{ fontSize: 22, fontWeight: 700, color: theme.textPrimary, marginBottom: 6 }}>{t('onboarding.businessFound')}</h2>
        <p style={{ fontSize: 14, color: theme.textMuted }}>{t('onboarding.confirmDetails')}</p>
      </div>

      {/* Business details */}
      <div style={{ background: theme.bgPrimary, borderRadius: 16, padding: 24, marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <Building2 size={16} color="#0D82F9" />
          <span style={{ fontSize: 14, fontWeight: 600, color: theme.textPrimary }}>{t('onboarding.businessInfo')}</span>
        </div>
        {[
          [t('onboarding.crNumber'), cr.crNumber],
          [t('onboarding.companyNameEn'), cr.companyNameEn],
          [t('onboarding.companyNameAr'), cr.companyNameAr],
          [t('onboarding.companyType'), isRTL ? (arData.companyType[cr.companyType] || cr.companyType) : cr.companyType],
          [t('onboarding.crType'), cr.crType === 'main' ? t('onboarding.mainReg') : t('onboarding.branch')],
          [t('onboarding.regDate'), cr.registrationDate],
          [t('onboarding.expiryDate'), cr.expiryDate],
          [t('onboarding.capital'), `${cr.capital.toLocaleString()}`],
          [t('onboarding.activities'), isRTL ? cr.isicActivities.map(a => arData.activity[a] || a).join('، ') : cr.isicActivities.join(', ')],
        ].map(([label, value]) => (
          <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10, fontSize: 13 }}>
            <span style={{ color: theme.textMuted, flexShrink: 0, marginRight: isRTL ? 0 : 16, marginLeft: isRTL ? 16 : 0 }}>{label}</span>
            <span style={{ fontWeight: 500, color: theme.textPrimary, textAlign: isRTL ? 'left' : 'right' }}>{value}</span>
          </div>
        ))}
      </div>

      {/* Address */}
      <div style={{ background: theme.bgPrimary, borderRadius: 16, padding: 24, marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <MapPin size={16} color="#0D82F9" />
          <span style={{ fontSize: 14, fontWeight: 600, color: theme.textPrimary }}>{t('onboarding.nationalAddress')}</span>
        </div>
        <p style={{ fontSize: 13, color: '#374151', lineHeight: 1.6 }}>{fullAddress}</p>
      </div>

      {/* Signatories */}
      <div style={{ background: theme.bgPrimary, borderRadius: 16, padding: 24, marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <Users size={16} color="#0D82F9" />
          <span style={{ fontSize: 14, fontWeight: 600, color: theme.textPrimary }}>{t('onboarding.signatories')} ({cr.signatories.length})</span>
        </div>
        {cr.signatories.map((sig, i) => (
          <div key={sig.nationalId} style={{
            padding: 12, borderRadius: 10, background: '#fff', border: '1px solid #E5E7EB',
            marginBottom: i < cr.signatories.length - 1 ? 8 : 0,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: theme.textPrimary }}>{isRTL ? sig.nameAr : sig.name}</span>
              <span style={{
                fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 10,
                background: sig.permission === 'full' ? '#D1FAE5' : '#FEF3C7',
                color: sig.permission === 'full' ? '#047857' : '#92400E',
              }}>
                {isRTL ? (arData.role[sig.role] || sig.role) : sig.role.replace('-', ' ').toUpperCase()}
              </span>
            </div>
            <div style={{ display: 'flex', gap: 16, fontSize: 11, color: '#9CA3AF' }}>
              <span>{sig.nameAr}</span>
              <span>ID: {sig.nationalId.slice(0, 4)}****{sig.nationalId.slice(-2)}</span>
              <span>{t('onboarding.permission')}: {isRTL ? (arData.permission[sig.permission] || sig.permission) : sig.permission}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        <button onClick={onBack} style={{
          flex: 1, padding: '12px 0', background: '#fff', color: '#374151', fontWeight: 600,
          fontSize: 14, borderRadius: 12, border: '1px solid #D1D5DB', cursor: 'pointer',
        }}>
          {t('onboarding.notMyBusiness')}
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
          {t('onboarding.confirmContinue')}
          {isRTL ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
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
  const { isRTL } = useI18n()
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
          {isRTL ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
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

// ─── Main Component ──────────────────────────────────────────

export default function WathiqVerification({ data, onComplete, nationalId: _nationalId }: Props) {
  const [wathiqState, setWathiqState] = useState<WathiqState>('fetching-crs')
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
        setWathiqState('checking-signatory')
      } else {
        setWathiqState('select-cr')
      }
    }, 2000)
    return () => clearTimeout(t)
  }, [wathiqState])

  function handleCRSelected(cr: CommercialRegistration) {
    setSelectedCR(cr)
    setWathiqState('checking-signatory')
  }

  // Auto-check signatory when entering checking-signatory state
  useEffect(() => {
    if (wathiqState !== 'checking-signatory' || !selectedCR) return
    const t = setTimeout(() => {
      const userSig = selectedCR.signatories.find((s) => s.nationalId === CURRENT_USER_ID)
      if (userSig && userSig.permission === 'full') {
        setIsAuthorized(true)
        setWathiqState('aml-screening')
      } else {
        setIsAuthorized(false)
        setWathiqState('not-authorized')
      }
    }, 1500)
    return () => clearTimeout(t)
  }, [wathiqState, selectedCR])

  function handleLetterUploaded() {
    setLetterUploaded(true)
    setWathiqState('aml-screening')
  }

  // AML auto-completes → skip "complete" screen, go straight to next step
  useEffect(() => {
    if (wathiqState !== 'aml-screening' || !selectedCR) return
    const t = setTimeout(() => {
      const result: BusinessVerificationData = {
        selectedCR,
        isAuthorizedSignatory: isAuthorized,
        authorizationLetterUploaded: letterUploaded || undefined,
        amlScreeningStatus: 'clear',
        amlScreeningId: 'AML-BIZ-' + Date.now(),
        wathiqVerifiedAt: new Date(),
      }
      onComplete(result)
    }, 2500)
    return () => clearTimeout(t)
  }, [wathiqState])

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
      return <ManualLookupScreen
        onResult={(cr, _relationship) => { setSelectedCR(cr); setFetchedCRs((prev) => [...prev, cr]); setWathiqState('checking-signatory') }}
        onBack={fetchedCRs.length > 0 ? () => setWathiqState('select-cr') : undefined}
      />
    case 'select-cr':
      return <SelectCRScreen crs={fetchedCRs} onSelect={handleCRSelected} onAddManually={() => setWathiqState('manual-lookup')} />
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
    default:
      return null
  }
}
