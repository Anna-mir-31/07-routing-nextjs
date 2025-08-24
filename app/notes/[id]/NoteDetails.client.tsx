'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { getNoteById } from '@/lib/api/notes';
import type { Note } from '@/types/note';
import css from './NoteDetails.module.css';

type Props = { id: string };

// Temporary local formatDate function
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export default function NoteDetailsClient({ id }: Props) {
  const { data, isLoading, isError } = useQuery<Note>({
    queryKey: ['note', id],
    queryFn: () => getNoteById(id),
    enabled: !!id,
    retry: false,
    staleTime: 60_000,
    refetchOnMount: false,
  });

  if (isLoading) {
    return (
      <div className={css.container}>
        <div className={css.loading}>Loading note...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={css.container}>
        <div className={css.error}>
          <h2>Something went wrong</h2>
          <p>Unable to load this note. Please try again later.</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className={css.container}>
        <div className={css.notFound}>
          <h2>Note not found</h2>
          <p>The note you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={css.container}>
      <Link href="/notes" className={css.backButton}>
        ← Back to Notes
      </Link>
      
      <div className={css.item}>
        <div className={css.header}>
          <h2>{data.title}</h2>
        </div>
        
        <p className={css.content}>{data.content}</p>
        
        <div className={css.footer}>
          <span className={css.tag}>{data.tag || 'General'}</span>
          <span className={css.date}>
            Created: {formatDate(data.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
}
