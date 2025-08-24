// types/note.ts
export type NoteTag = 'Todo' | 'Work' | 'Personal' | 'Shopping' | 'Meeting' | 'Ideas' | 'Learning';

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag?: string;
}

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}
