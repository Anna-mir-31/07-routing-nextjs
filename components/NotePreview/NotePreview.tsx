"use client";
import type { Note } from "@/types/note";

export default function NotePreview({ note }: { note: Note }) {
  return (
    <article style={{
      backgroundColor: 'white',
      border: '1px solid #e5e5e5',
      borderRadius: '8px',
      padding: '24px',
      margin: '20px 0'
    }}>
      <h2 style={{ 
        margin: '0 0 12px 0', 
        color: '#1a1a1a', 
        fontSize: '24px',
        fontWeight: '600'
      }}>{note.title}</h2>
      {note.tag && (
        <div style={{
          display: 'inline-block',
          backgroundColor: '#e3f2fd',
          color: '#1976d2',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '12px',
          fontWeight: '500',
          marginBottom: '16px'
        }}>
          #{note.tag}
        </div>
      )}
      <p style={{
        color: '#6c757d',
        lineHeight: '1.6',
        margin: '0 0 20px 0'
      }}>{note.content}</p>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '14px',
        color: '#999',
        borderTop: '1px solid #f0f0f0',
        paddingTop: '16px'
      }}>
        <span>Created: {new Date(note.createdAt).toLocaleString()}</span>
        <span>Updated: {new Date(note.updatedAt).toLocaleString()}</span>
      </div>
    </article>
  );
}