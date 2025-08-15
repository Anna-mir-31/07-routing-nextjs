// app/notes/Notes.client.tsx
'use client';

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchNotes, deleteNote } from '@/lib/api';
import type { Note } from '@/types/note';

import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';
import NoteForm from '@/components/NoteForm/NoteForm';
import Modal from '@/components/Modal/Modal';

import css from './Notes.module.css';

type ListData = { results?: Note[]; notes?: Note[]; totalPages?: number };

export default function NotesClient() {
  const qc = useQueryClient();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError, error } = useQuery<ListData>({
    queryKey: ['notes', page, search],
    queryFn: () => fetchNotes(search, page, 12),
    staleTime: 15_000,
  });

  const notes: Note[] = (data?.results ?? data?.notes ?? []) as Note[];
  const totalPages = data?.totalPages ?? 1;

  const { mutate: removeNote } = useMutation<void, Error, string>({
    mutationFn: deleteNote, 
    onSuccess: () => qc.invalidateQueries({ queryKey: ['notes'] }),
  });

  const handleDelete = (id: string) => {
    removeNote(id);
  };

  if (isLoading) return <p className={css.loading}>Loading, please wait...</p>;
  if (isError)
    return (
      <p className={css.error}>
        Could not fetch the list of notes. {(error as Error)?.message}
      </p>
    );

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onSearch={setSearch} />

        <div className={css.pagerWrap}>
          {totalPages > 1 && (
            <Pagination
              pageCount={totalPages}
              forcePage={page - 1}
              onPageChange={({ selected }: { selected: number }) => setPage(selected + 1)}
            />
          )}
        </div>

        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {notes.length > 0 ? (
        <NoteList notes={notes} onDelete={handleDelete} />
      ) : (
        <p>No notes yet.</p>
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
