"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '40px',
      backgroundColor: '#f8d7da',
      borderRadius: '8px',
      margin: '20px 0'
    }}>
      <h1 style={{ color: '#dc3545', marginBottom: '16px' }}>Something went wrong!</h1>
      <p style={{ color: '#721c24', marginBottom: '16px' }}>{error.message}</p>
      <button 
        style={{
          backgroundColor: '#dc3545',
          color: 'white',
          border: 'none',
          padding: '10px 16px',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
