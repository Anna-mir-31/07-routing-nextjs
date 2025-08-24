"use client";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "@/lib/api/notes";
import { formatDate } from "@/lib/utils";
import type { Note } from "@/types/note";
import css from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const { mutate: handleDelete } = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  if (!notes || notes.length === 0) {
    return (
      <div className={css.emptyState}>
        <h3 className={css.emptyTitle}>No notes found</h3>
        <p className={css.emptyMessage}>Start by creating your first note!</p>
      </div>
    );
  }

  return (
    <div className={css.list}>
      {notes.map((note) => (
        <div key={note.id} className={css.item}>
          <div className={css.header}>
            <Link href={`/notes/${note.id}`}>
              <h3 className={css.title}>{note.title}</h3>
            </Link>
            <button
              className={css.deleteButton}
              onClick={() => handleDelete(note.id)}
              aria-label={`Delete note ${note.title}`}
            >
              Delete
            </button>
          </div>
          
          <p className={css.content}>{note.content}</p>
          
          <div className={css.footer}>
            <span className={css.tag}>{note.tag || 'General'}</span>
            <span className={css.date}>
              {formatDate(note.createdAt)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
