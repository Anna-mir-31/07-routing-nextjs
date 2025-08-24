"use client";
import { useRouter } from "next/navigation";

export default function CreateNotePage() {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '24px',
        maxWidth: '500px',
        width: '90%',
        maxHeight: '90vh',
        overflow: 'auto'
      }}>
        <h2>Create Note</h2>
        <p>Note form will be here...</p>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
}
