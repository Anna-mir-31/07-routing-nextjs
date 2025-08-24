"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { getNotes, deleteNote } from "../../../../lib/api/notes";
import type { Note, NotesResponse } from "../../../../types/note";
import NoteForm from "../../../../components/NoteForm/NoteForm";
import Modal from "../../../../components/Modal/Modal";
import css from "./NotesPage.module.css";

interface NotesClientProps {
  tag?: string;
  selectedTag: string;
}

export default function NotesClient({ tag, selectedTag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery<NotesResponse>({
    queryKey: ["notes", { page, tag, search }],
    queryFn: () => getNotes({ page, perPage: 12, tag, search: search || undefined }),
    placeholderData: (prev) => prev,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
  
  const handleDeleteNote = (id: string) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      deleteMutation.mutate(id);
    }
  };

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

  if (isLoading) {
    return <div className={css.loader}>Loading notes...</div>;
  }

  if (isError) {
    return <div className={css.error}>Error loading notes. Please try again.</div>;
  }

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <h1>{selectedTag === "All" ? "All notes" : `Tag: ${selectedTag}`}</h1>
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <input
            type="text"
            placeholder="Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
          <button className={css.button} onClick={() => setIsCreateModalOpen(true)}>
            Create note +
          </button>
        </div>
      </div>

      {notes.length === 0 ? (
        <div className={css.emptyState}>
          <p>No notes found</p>
        </div>
      ) : (
        <ul className={css.list}>
          {notes.map((note: Note) => (
            <li key={note.id} className={css.listItem}>
              <h3 className={css.title}>{note.title}</h3>
              {note.tag && <div className={css.tag}>#{note.tag}</div>}
              <p className={css.content}>{note.content}</p>
              <div className={css.footer}>
                <Link href={`/notes/${note.id}`} className={css.link}>
                  View details
                </Link>
                <button 
                  className={css.deleteButton}
                  onClick={() => handleDeleteNote(note.id)}
                  disabled={deleteMutation.isPending}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {totalPages > 1 && (
        <div className={css.pagination}>
          <button 
            className={css.pageButton}
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <span>Page {page} of {totalPages}</span>
          <button 
            className={css.pageButton}
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}

      {/* Create Note Modal */}
      {isCreateModalOpen && (
        <Modal onClose={() => setIsCreateModalOpen(false)}>
          <NoteForm 
            onClose={() => {
              setIsCreateModalOpen(false);
              queryClient.invalidateQueries({ queryKey: ["notes"] });
            }}
          />
        </Modal>
      )}
    </div>
  );
}
