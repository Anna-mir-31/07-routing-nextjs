export default function Loading() {
  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <div style={{ 
        width: '40px', 
        height: '40px', 
        border: '4px solid #f3f3f3',
        borderTop: '4px solid #0d6efd',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        margin: '0 auto 16px'
      }}></div>
      <p style={{ color: '#6c757d' }}>Loading notes...</p>
    </div>
  );
}
