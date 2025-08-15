// components/NoteList/NoteList.tsx
'use client';

import Link from 'next/link';
import React from 'react';
import type { Note } from '@/types/note';
import css from './NoteList.module.css';

type Props = {
  notes: Note[];
  onDelete: (id: string) => void | Promise<void>; // було number
};

const NoteList: React.FC<Props> = ({ notes, onDelete }) => {
  if (!notes || notes.length === 0) {
    return <p>No notes yet.</p>;
  }

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h3 className={css.title}>{note.title}</h3>

          <p className={css.content}>{note.content}</p>

          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>

            <div>
              <Link
                href={`/notes/${note.id}`}
                className={css.link}
                aria-label={`View details of ${note.title}`}
              >
                View details
              </Link>

              {/* Red delete button */}
              <button
                type="button"
                className={css.button}
                onClick={() => onDelete(String(note.id))}
                aria-label={`Delete ${note.title}`}
                style={{ marginLeft: 8 }}
              >
                Delete
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
