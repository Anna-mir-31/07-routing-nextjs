// types/note.ts
export type NoteTag = 'Todo' | 'Work' | 'Personal' | 'Shopping' | string;

export interface Note {
  id: string;        
  title: string;
  content: string;
  tag: NoteTag;

  createdAt: string;
  updatedAt: string;
}
