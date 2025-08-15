'use client';

import Link from 'next/link';
import { Note } from '@/types/note';
import css from './NoteItem.module.css';

interface NoteItemProps {
  note: Note;
  onDelete: (id: number) => void;
}

export const NoteItem = ({ note, onDelete }: NoteItemProps) => {
  return (
    <li className={css.item}>
      <h2 className={css.title}>{note.title}</h2>
      <p className={css.content}>{note.content}</p>
      <div className={css.footer}>
        <span className={css.tag}>{note.tag}</span>
        <div className={css.buttons}>
          <Link href={`/notes/${note.id}`} className={css.link}>
            View details
          </Link>
          <button
            type="button"
            className={css.button}
            onClick={() => onDelete(Number(note.id))}
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
};
