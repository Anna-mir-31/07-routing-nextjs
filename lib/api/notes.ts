// lib/api/notes.ts
import axios from "axios";
import type { Note, NotesResponse } from "@/types/note";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "https://notehub-public.goit.study/api",
  headers: {
    "Content-Type": "application/json",
    ...(process.env.NEXT_PUBLIC_NOTEHUB_TOKEN ? { Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}` } : {}),
  },
});

export async function getNotes(params?: { page?: number; perPage?: number; tag?: string; search?: string }) {
  const { page = 1, perPage = 12, tag, search } = params ?? {};
  const { data } = await api.get<NotesResponse>("/notes", {
    params: { page, perPage, ...(tag ? { tag } : {}), ...(search ? { search } : {}) },
  });
  return data;
}

export async function getNoteById(id: string) {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
}

export async function createNote(noteData: { title: string; content: string; tag?: string }) {
  const { data } = await api.post<Note>("/notes", noteData);
  return data;
}

export async function deleteNote(id: string) {
  await api.delete(`/notes/${id}`);
}
