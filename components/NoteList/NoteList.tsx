"use client";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "../../lib/api/notes";
import { formatDate } from "../../lib/utils";
import type { Note } from "../../types/note";
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
        <p className={css.emptyMessage}>Create your first note to get started!</p>
      </div>
    );
  }

  return (
    <div className={css.list}>
      {notes.map((note) => (
        <div key={note.id} className={css.item}>
          <div className={css.header}>
            <Link href={`/notes/${note.id}`} className={css.title}>
              {note.title}
            </Link>
            {note.tag && <span className={css.tag}>#{note.tag}</span>}
            <button 
              onClick={() => handleDelete(note.id)}
              className={css.deleteButton}
            >
              Delete
            </button>
          </div>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <div className={css.date}>
              <div>Created: {formatDate(note.createdAt)}</div>
              <div>Updated: {formatDate(note.updatedAt)}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}