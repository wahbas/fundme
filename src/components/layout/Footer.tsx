export default function Footer() {
  return (
    <footer
      style={{
        padding: '20px 32px',
        borderTop: '1px solid #E5E7EB',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: 13,
        color: '#999',
      }}
    >
      <span>&copy; 2025 FundMe. All rights reserved.</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <a href="#" style={{ color: '#666', textDecoration: 'none' }}>Terms and Conditions</a>
        <span style={{ color: '#D1D5DB' }}>|</span>
        <a href="#" style={{ color: '#666', textDecoration: 'none' }}>Privacy Policy</a>
        <span style={{ color: '#D1D5DB' }}>|</span>
        <a href="#" style={{ color: '#666', textDecoration: 'none' }}>Support</a>
      </div>
    </footer>
  )
}
