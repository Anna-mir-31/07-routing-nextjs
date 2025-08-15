'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import type { Note } from '@/types/note';

type Props = { id: string };

export default function NoteDetailsClient({ id }: Props) {
  const { data, isLoading, isError } = useQuery<Note>({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id,
    retry: false,
    staleTime: 60_000,
  });

  if (isLoading) return <p>Loading…</p>;
  if (isError) return <p>Something went wrong.</p>;
  if (!data) return <p>Note not found.</p>;

  return (
    <div>
      <h2>{data.title}</h2>
      <p style={{ whiteSpace: 'pre-wrap' }}>{data.content}</p>
    </div>
  );
}