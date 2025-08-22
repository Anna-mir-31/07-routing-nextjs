// app/notes/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import NotePreview from "@/components/NotePreview/NotePreview";
import { getNoteById } from "@/lib/api/notes";
import type { Note } from "@/types/note";

export default function NoteDetailsPage() {
  const params = useParams<{ id: string }>();
  const [note, setNote] = useState<Note | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getNoteById(params.id);
        setNote(data);
      } catch (e: any) {
        setErr(e?.message ?? "Failed to load note");
      }
    })();
  }, [params.id]);

  if (err) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '40px',
        color: '#dc3545',
        backgroundColor: '#f8d7da',
        borderRadius: '8px',
        margin: '20px'
      }}>
        {err}
      </div>
    );
  }

  if (!note) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '40px',
        color: '#6c757d'
      }}>
        Loading…
      </div>
    );
  }

  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '24px' 
    }}>
      <NotePreview note={note} />
    </div>
  );
}
