"use client";
import css from "./NotePreview.module.css";
import type { Note } from "@/types/note";

export default function NotePreview({ note }: { note: Note }) {
  return (
    <article className={css.note}>
      <h2 className={css.title}>{note.title}</h2>
      {note.tag && <div className={css.tag}>#{note.tag}</div>}
      <p className={css.content}>{note.content}</p>
      <div className={css.meta}>
        <span>Created: {new Date(note.createdAt).toLocaleString()}</span>
        <span>Updated: {new Date(note.updatedAt).toLocaleString()}</span>
      </div>
    </article>
  );
}