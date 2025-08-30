"use client";
import { useParams, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { getNotes } from "../../../../lib/api/notes";
import NoteList from "../../../../components/NoteList/NoteList";
import Pagination from "../../../../components/Pagination/Pagination";
import SearchBox from "../../../../components/SearchBox/SearchBox";
import NoteForm from "../../../../components/NoteForm/NoteForm";
import Modal from "../../../../components/Modal/Modal";
import css from "./NotesPage.module.css";
import type { NotesResponse } from "../../../../types/note";

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
  const [data, setData] = useState<NotesResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const slugArray = Array.isArray(params.slug) ? params.slug : [params.slug || "All"];
  const tag = slugArray[0] || "All";
  
  // Get current page from URL
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const searchQuery = searchParams.get("search") || "";

  console.log('📊 FilterNotesPage render:', { 
    tag, 
    currentPage, 
    searchQuery, 
    isLoading, 
    hasData: !!data,
    notesCount: data?.notes?.length,
    totalPages: data?.totalPages
  });

  // Fetch notes when parameters change
  useEffect(() => {
    console.log('🔄 useEffect triggered with:', { tag, searchQuery, currentPage });
    
    const fetchNotes = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        console.log('🔍 Fetching notes with params:', { tag: tag === "All" ? undefined : tag, search: searchQuery || undefined, page: currentPage });
        
        const result = await getNotes({ 
          tag: tag === "All" ? undefined : tag, 
          search: searchQuery || undefined, 
          page: currentPage 
        });
        
        console.log('✅ API Response:', { 
          requestedPage: currentPage,
          totalPages: result.totalPages, 
          notesCount: result.notes.length,
          firstNoteTitle: result.notes[0]?.title 
        });
        
        setData(result);
      } catch (err) {
        console.error('❌ Fetch failed:', err);
        setError(err instanceof Error ? err.message : 'Failed to load notes');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotes();
    console.log('🎯 fetchNotes() called');
  }, [tag, searchQuery, currentPage]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className={css.container}>
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
              Create Note <span style={{color: 'white'}}>+</span>
            </button>
          </div>
        </div>
        
        <div className={css.error}>
          <h2 className={css.errorTitle}>Error loading notes</h2>
          <p className={css.errorMessage}>{error}</p>
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

  return (
    <div className={css.container}>
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
            Create Note <span style={{color: 'white'}}>+</span>
          </button>
        </div>
      </div>
      
      <div className={css.paginationTop}>
        <Pagination 
          currentPage={currentPage}
          totalPages={data?.totalPages || 1}
        />
      </div>
      
      <div className={css.main}>
        {data?.notes && data.notes.length > 0 ? (
          <NoteList notes={data.notes} />
        ) : (
          <div className={css.emptyState}>
            <h3>No notes found</h3>
            <p>
              {searchQuery 
                ? `No notes match your search "${searchQuery}"`
                : tag !== "All" 
                ? `No notes found with tag "${tag}"`
                : "You haven't created any notes yet"
              }
            </p>
          </div>
        )}
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
