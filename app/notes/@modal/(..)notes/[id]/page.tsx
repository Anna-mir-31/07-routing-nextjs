"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Modal from "../../../../../components/Modal/Modal";
import NotePreview from "../../../../../components/NotePreview/NotePreview";
import { getNoteById } from "../../../../../lib/api/notes";
import type { Note } from "../../../../../types/note";

export default function InterceptedNoteModal() {
  const router = useRouter();
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

  const onClose = () => router.back();

  return (
    <Modal onClose={onClose}>
      {err ? <p>{err}</p> : note ? <NotePreview note={note} /> : <p>Loading…</p>}
    </Modal>
  );
}