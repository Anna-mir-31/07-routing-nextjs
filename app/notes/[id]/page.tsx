// app/notes/[id]/page.tsx
import { notFound } from 'next/navigation';
import NotePreview from "../../../components/NotePreview/NotePreview";
import { getNoteById } from "../../../lib/api/notes";
import type { Note } from "../../../types/note";

interface NoteDetailsPageProps {
  params: { id: string };
}

export default async function NoteDetailsPage({ params }: NoteDetailsPageProps) {
  let note: Note | null = null;
  
  try {
    note = await getNoteById(params.id);
  } catch (error) {
    notFound();
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
