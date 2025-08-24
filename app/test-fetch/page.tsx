"use client";
import { useState, useEffect } from "react";
import { getNotes } from "../../lib/api/notes";
import type { NotesResponse } from "../../types/note";

export default function TestFetchPage() {
  console.log('TestFetchPage component loaded');
  
  const [data, setData] = useState<NotesResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    console.log('useEffect triggered');
    
    const fetchData = async () => {
      try {
        console.log('Starting fetch...');
        setIsLoading(true);
        const result = await getNotes({ page: 1, perPage: 12 });
        console.log('Fetch result:', result);
        setData(result);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log('TestFetchPage render:', { data, isLoading, error });

  return (
    <div>
      <h1>Test Fetch Page</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <p>Total pages: {data.totalPages}, Notes count: {data.notes?.length}</p>}
    </div>
  );
}
