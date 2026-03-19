import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  User, Phone, Mail, Shield, FileText, Building2,
  Eye, Upload, Download, Edit3, ExternalLink, CheckCircle2,
} from 'lucide-react'
import Sidebar from '../components/layout/Sidebar'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import FloatingHelpButton from '../components/dashboard/FloatingHelpButton'

/* ─── Helpers ─── */

function SectionCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: 'easeOut' }}
      style={{
        background: '#fff',
        border: '1px solid #E2E8F0',
        borderRadius: 12,
        padding: 28,
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
      }}
    >
      {children}
    </motion.div>
  )
}

function ReadOnlyField({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ flex: 1 }}>
      <p style={{ fontSize: 12, fontWeight: 600, color: '#64748B', marginBottom: 8 }}>{label}</p>
      <div style={{
        padding: '12px 14px', background: '#F8FAFC', borderRadius: 8, border: '1px solid #F1F5F9',
        fontSize: 14, color: '#0F172A',
      }}>
        {value}
      </div>
    </div>
  )
}

function EditableField({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ flex: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <p style={{ fontSize: 12, fontWeight: 600, color: '#64748B' }}>{label}</p>
        <Edit3 size={14} color="#94A3B8" style={{ cursor: 'pointer' }} />
      </div>
      <div style={{
        padding: '12px 14px', background: '#F8FAFC', borderRadius: 8, border: '1px solid #F1F5F9',
        fontSize: 14, color: '#0F172A',
      }}>
        {value}
      </div>
    </div>
  )
}

/* ─── Page ─── */

export default function MyProfile() {
  const [searchParams] = useSearchParams()
  const stateParam = searchParams.get('state')
  const verified = stateParam === 'verified' || searchParams.get('verified') === 'true'
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar verified={verified} collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(c => !c)} activeTab="profile" />
      <main style={{
        marginLeft: sidebarCollapsed ? 72 : 240,
        transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        flex: 1, minWidth: 0, overflow: 'hidden', minHeight: '100vh', background: '#F8FAFC', padding: 0,
      }}>
        <div style={{ background: '#F8FAFC', minHeight: '100vh', padding: '28px 32px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <Header />

            {/* Two-column layout */}
            <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: 20, alignItems: 'start' }}>

              {/* ── Left Column ── */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

                {/* Verification Card */}
                <SectionCard delay={0.05}>
                  <div style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
                    padding: '12px 0',
                  }}>
                    {/* Shield icon */}
                    <div style={{
                      width: 72, height: 72, borderRadius: '50%', background: '#EFF6FF',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16,
                      border: '2px solid #BFDBFE',
                    }}>
                      <Shield size={32} color="#2563EB" />
                    </div>

                    <span style={{
                      padding: '6px 16px', borderRadius: 20, fontSize: 13, fontWeight: 600,
                      background: '#2563EB', color: '#fff', marginBottom: 12,
                    }}>
                      Verified Account
                    </span>

                    <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.5, marginBottom: 12 }}>
                      Your account has been successfully verified. You can now apply for financing
                    </p>

                    <p style={{ fontSize: 12, color: '#94A3B8' }}>Member since November 14, 2025</p>
                  </div>
                </SectionCard>

                {/* SIMAH Consent */}
                <SectionCard delay={0.12}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                    <Shield size={20} color="#0F172A" />
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0F172A' }}>SIMAH Consent</h3>
                  </div>
                  <p style={{ fontSize: 13, color: '#94A3B8', marginBottom: 20 }}>
                    Your SIMAH consent is approved and ready to download.
                  </p>
                  <button style={{
                    width: '100%', padding: '12px 0', background: '#2563EB', color: '#fff',
                    fontWeight: 600, fontSize: 14, borderRadius: 10, border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  }}>
                    <Download size={16} />
                    Download Document
                  </button>
                </SectionCard>

                {/* Important Links */}
                <SectionCard delay={0.19}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0F172A', marginBottom: 16 }}>Important Links</h3>
                  {[
                    { icon: FileText, label: 'Terms & Conditions' },
                    { icon: Shield, label: 'Privacy Policy' },
                    { icon: Shield, label: 'Customer Protection' },
                  ].map((link, i) => (
                    <div key={link.label} style={{
                      display: 'flex', alignItems: 'center', gap: 12, padding: '14px 0',
                      borderTop: i > 0 ? '1px solid #F1F5F9' : 'none', cursor: 'pointer',
                    }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: 8, background: '#F8FAFC',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <link.icon size={16} color="#64748B" />
                      </div>
                      <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: '#0F172A' }}>{link.label}</span>
                      <ExternalLink size={16} color="#94A3B8" />
                    </div>
                  ))}
                </SectionCard>
              </div>

              {/* ── Right Column ── */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

                {/* Personal Information */}
                <SectionCard delay={0.08}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <User size={20} color="#0F172A" />
                      <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0F172A' }}>Personal Information</h3>
                    </div>
                    <span style={{
                      padding: '4px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600,
                      background: '#2563EB', color: '#fff',
                    }}>
                      Verified
                    </span>
                  </div>

                  {/* Row 1: Name, NID, DOB */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 20 }}>
                    <ReadOnlyField label="Full Name" value="Ahmed Mohammed Al-Rashid" />
                    <ReadOnlyField label="National ID Number" value="1234567890" />
                    <ReadOnlyField label="Date of Birth" value="15/03/1985" />
                  </div>

                  {/* Row 2: Phone, Email */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
                    <EditableField label="Phone Number" value="+966 50 123 4567" />
                    <EditableField label="Email Address" value="ahmed.alrashid@email.com" />
                  </div>

                  {/* Authorization Document */}
                  <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: 20 }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#64748B', marginBottom: 12 }}>Authorization Document</p>
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 12, padding: 16,
                      background: '#F8FAFC', borderRadius: 10, border: '1px solid #F1F5F9',
                    }}>
                      <div style={{
                        width: 40, height: 40, borderRadius: 8, background: '#EFF6FF',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <FileText size={18} color="#3B82F6" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <p style={{ fontSize: 14, fontWeight: 600, color: '#0F172A' }}>authorization-letter.pdf</p>
                          <CheckCircle2 size={16} color="#2563EB" />
                        </div>
                        <p style={{ fontSize: 12, color: '#94A3B8' }}>Uploaded: Nov 14, 2025</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
                      <button style={{
                        padding: '8px 16px', background: '#fff', border: '1px solid #E2E8F0',
                        borderRadius: 8, fontSize: 13, fontWeight: 600, color: '#475569', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: 6,
                      }}>
                        <Eye size={14} />
                        View Document
                      </button>
                      <button style={{
                        padding: '8px 16px', background: '#fff', border: '1px solid #E2E8F0',
                        borderRadius: 8, fontSize: 13, fontWeight: 600, color: '#475569', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: 6,
                      }}>
                        <Upload size={14} />
                        Reupload
                      </button>
                    </div>
                  </div>
                </SectionCard>

                {/* Company Information */}
                <SectionCard delay={0.15}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <Building2 size={20} color="#0F172A" />
                      <div>
                        <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0F172A' }}>Company Information</h3>
                        <p style={{ fontSize: 12, color: '#94A3B8' }}>Source: Wathiq</p>
                      </div>
                    </div>
                    <span style={{
                      padding: '4px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600,
                      background: '#2563EB', color: '#fff',
                    }}>
                      Linked
                    </span>
                  </div>

                  {/* Row 1 */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                    <ReadOnlyField label="Company Name" value="Al-Majd Trading Company LLC" />
                    <ReadOnlyField label="Commercial Registration (CR)" value="1010123456" />
                  </div>

                  {/* Row 2 */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                    <ReadOnlyField label="Industry" value="Retail & Trading" />
                    <ReadOnlyField label="Business Activity" value="General Trading & Import/Export" />
                  </div>

                  <p style={{ fontSize: 12, color: '#94A3B8', fontStyle: 'italic' }}>
                    Company information is automatically fetched from Wathiq and cannot be edited manually.
                  </p>
                </SectionCard>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </main>
      <FloatingHelpButton />
    </div>
  )
}
