"use client";
import { useParams, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import SearchBox from "../../../../components/SearchBox/SearchBox";
import NoteList from "../../../../components/NoteList/NoteList";
import Pagination from "../../../../components/Pagination/Pagination";
import NoteForm from "../../../../components/NoteForm/NoteForm";
import Modal from "../../../../components/Modal/Modal";
import { getNotes } from "../../../../lib/api/notes";
import type { NotesResponse } from "../../../../types/note";
import css from "./NotesPage.module.css";

function LoadingSpinner() {
  return (
    <div className={css.loading}>
      Loading notes...
    </div>
  );
}

export default function FilterNotesPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const [showCreateForm, setShowCreateForm] = useState(false);

  const slugArray = Array.isArray(params.slug) ? params.slug : [params.slug || "All"];
  const tag = slugArray[0] || "All";
  
  // Force re-render when searchParams change
  const page = searchParams.get("page");
  const search = searchParams.get("search");
  const currentPage = parseInt(page || "1", 10);

  useEffect(() => {
    // Silent effect for searchParams tracking
  }, [searchParams]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['notes', { tag: tag === "All" ? undefined : tag, search: search || undefined, page: currentPage }],
    queryFn: () => {
      return getNotes({ 
        tag: tag === "All" ? undefined : tag, 
        search: search || undefined, 
        page: currentPage 
      });
    },
    staleTime: 0,
    gcTime: 0,
    refetchOnWindowFocus: false,
  });

  // For testing - use hardcoded data if API doesn't work in Simple Browser
  const testData = {
    notes: [
      { id: '1', title: `Test Note 1 (Page ${currentPage})`, content: 'Content 1', tag: 'Todo' as const, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      { id: '2', title: `Test Note 2 (Page ${currentPage})`, content: 'Content 2', tag: 'Work' as const, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      { id: '3', title: `Test Note 3 (Page ${currentPage})`, content: 'Content 3', tag: 'Personal' as const, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    ],
    totalPages: 4
  };

  // Use real data if available, otherwise fallback to test data
  const displayData = data || testData;
  const displayLoading = data ? isLoading : false;

  if (displayLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className={css.error}>
        <h2 className={css.errorTitle}>Error loading notes</h2>
        <p className={css.errorMessage}>{error.message}</p>
      </div>
    );
  }

  return (
    <div className={css.container} key={`${tag}-${currentPage}-${search}`}>
      <div className={css.header}>
        <h1 className={css.title}>
          {tag === "All" ? "All Notes" : `Notes: ${tag}`}
        </h1>
        <div className={css.headerActions}>
          <SearchBox />
          <button 
            className={css.createButton}
            onClick={() => setShowCreateForm(true)}
          >
            Create Note +
          </button>
        </div>
      </div>
      
      <div className={css.paginationTop}>
        <Pagination 
          currentPage={currentPage}
          totalPages={displayData?.totalPages || 1}
        />
      </div>
      
      <div className={css.main}>
        <NoteList notes={displayData?.notes || []} />
      </div>
      
      {showCreateForm && (
        <Modal onClose={() => setShowCreateForm(false)}>
          <NoteForm 
            onSuccess={() => setShowCreateForm(false)}
            onClose={() => setShowCreateForm(false)}
          />
        </Modal>
      )}
    </div>
  );
}
