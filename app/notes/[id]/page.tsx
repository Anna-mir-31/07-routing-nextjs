// app/notes/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import NotePreview from "@/components/NotePreview/NotePreview";
import { getNoteById } from "@/lib/api/notes";
import type { Note } from "@/types/note";
import css from "./NoteDetails.module.css";

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
    return <div className={css.error}>{err}</div>;
  }

  if (!note) {
    return <div className={css.loading}>Loading…</div>;
  }

  return (
    <div className={css.container}>
      <NotePreview note={note} />
    </div>
  );
}
