"use client";
import { formatDate } from "../../lib/utils";
import type { Note } from "../../types/note";
import css from "./NotePreview.module.css";

export default function NotePreview({ note }: { note: Note }) {
  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
          {note.tag && <span className={css.tag}>#{note.tag}</span>}
        </div>
        <p className={css.content}>{note.content}</p>
        <div className={css.date}>
          Created: {formatDate(note.createdAt)} | Updated: {formatDate(note.updatedAt)}
        </div>
      </div>
    </div>
  );
}