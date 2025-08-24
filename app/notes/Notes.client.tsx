"use client";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import { getNotes } from "@/lib/api/notes";
import css from "./Notes.module.css";

export default function NotesClient() {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const search = searchParams.get("search") || "";

  const { data, isLoading, error } = useQuery({
    queryKey: ['notes', { page, search }],
    queryFn: () => getNotes({ page, search: search || undefined }),
  });

  if (isLoading) {
    return (
      <div className={css.container}>
        <div className={css.loading}>Loading notes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={css.container}>
        <div className={css.error}>
          <h2>Error loading notes</h2>
          <p>Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={css.container}>
      <div className={css.header}>
        <h1 className={css.title}>My Notes</h1>
        <SearchBox />
      </div>

      <div className={css.content}>
        <NoteList notes={data?.notes || []} />
        
        {data && data.totalPages > 1 && (
          <Pagination 
            currentPage={page}
            totalPages={data.totalPages}
          />
        )}
      </div>
    </div>
  );
}
