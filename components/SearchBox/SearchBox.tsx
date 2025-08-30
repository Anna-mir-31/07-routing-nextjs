"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import css from "./SearchBox.module.css";

interface SearchBoxProps {
  placeholder?: string;
}

export default function SearchBox({ placeholder = "Search notes..." }: SearchBoxProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      const currentSearch = searchParams.get("search") || "";
      
      // Only update if search actually changed
      if (search.trim() !== currentSearch) {
        if (search.trim()) {
          params.set("search", search.trim());
        } else {
          params.delete("search");
        }
        
        // Reset to first page only when search changes
        params.set("page", "1");
        
        router.push(`?${params.toString()}`);
      }
    }, 300); // Debounce search

    return () => clearTimeout(delayedSearch);
  }, [search, router, searchParams]);

  return (
    <div className={css.searchBox}>
      <input
        type="text"
        className={css.input}
        placeholder={placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
