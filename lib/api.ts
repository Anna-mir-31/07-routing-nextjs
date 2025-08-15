import axios from 'axios';
import type { Note, NoteTag } from '@/types/note';

axios.defaults.baseURL =
  process.env.NEXT_PUBLIC_API_URL || 'https://notehub-public.goit.study/api';

axios.defaults.headers.common.Authorization = `Bearer ${
  process.env.NEXT_PUBLIC_NOTEHUB_TOKEN || ''
}`;

export type NewNoteData = { title: string; content: string; tag: NoteTag };
export type ListOk = { notes?: Note[]; results?: Note[]; totalPages: number };

export async function fetchNotes(
  search = '',
  page = 1,
  perPage = 12
): Promise<ListOk> {
  const params: Record<string, string | number> = { page, perPage };
  if (search && search.trim()) params.search = search.trim();
  const { data } = await axios.get<ListOk>('/notes', { params });
  return data;
}

export async function fetchNoteById(id: string | number): Promise<Note> {
  const { data } = await axios.get<Note>(`/notes/${id}`);
  return data;
}

export async function createNote(payload: NewNoteData): Promise<Note> {
  const { data } = await axios.post<Note>('/notes', payload);
  return data;
}

export async function deleteNote(id: string | number): Promise<void> {
  await axios.delete(`/notes/${id}`);
}
