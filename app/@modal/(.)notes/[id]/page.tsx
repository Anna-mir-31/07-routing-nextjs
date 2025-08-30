"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getNoteById } from "../../../../lib/api/notes";
import Modal from "../../../../components/Modal/Modal";
import type { Note } from "../../../../types/note";

interface Props {
  params: {
    id: string;
  };
}

export default function NoteModalPage({ params }: Props) {
  const router = useRouter();
  const [note, setNote] = useState<Note | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        setIsLoading(true);
        const result = await getNoteById(params.id);
        setNote(result);
      } catch (err) {
        console.error('Failed to fetch note:', err);
        setError(err instanceof Error ? err.message : 'Failed to load note');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNote();
  }, [params.id]);

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal onClose={handleClose}>
      <div style={{ padding: '20px', maxWidth: '600px', width: '100%' }}>
        {isLoading ? (
          <div>Loading note...</div>
        ) : error ? (
          <div>
            <h2>Error</h2>
            <p>{error}</p>
          </div>
        ) : note ? (
          <div>
            <h2>{note.title}</h2>
            {note.tag && (
              <span style={{ 
                backgroundColor: '#e3f2fd', 
                color: '#1976d2', 
                padding: '4px 8px', 
                borderRadius: '4px', 
                fontSize: '12px',
                marginBottom: '16px',
                display: 'inline-block'
              }}>
                {note.tag}
              </span>
            )}
            <p style={{ marginTop: '16px', lineHeight: '1.5' }}>
              {note.content}
            </p>
            <div style={{ marginTop: '16px', fontSize: '14px', color: '#666' }}>
              <p>Created: {new Date(note.createdAt).toLocaleDateString()}</p>
              <p>Updated: {new Date(note.updatedAt).toLocaleDateString()}</p>
            </div>
          </div>
        ) : (
          <div>Note not found</div>
        )}
      </div>
    </Modal>
  );
}
