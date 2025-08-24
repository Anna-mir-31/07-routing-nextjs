"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";
import css from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl?: string;
}

export default function Pagination({ 
  currentPage, 
  totalPages,
}: PaginationProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  if (totalPages <= 1) {
    return null;
  }

  const navigateToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    const newUrl = `${pathname}?${params.toString()}`;
    window.location.href = newUrl;
  };

  const getVisiblePages = () => {
    const pages = [];
    const maxVisible = 5;
    
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className={css.pagination}>
      {/* Previous button */}
      {currentPage > 1 ? (
        <button
          onClick={() => navigateToPage(currentPage - 1)}
          className={css.pageButton}
          aria-label="Previous page"
        >
          ←
        </button>
      ) : (
        <span className={`${css.pageButton} ${css.disabled}`}>←</span>
      )}

      {/* First page */}
      {visiblePages[0] > 1 && (
        <>
          <button 
            onClick={() => navigateToPage(1)} 
            className={css.pageButton}
          >
            1
          </button>
          {visiblePages[0] > 2 && <span className={css.info}>...</span>}
        </>
      )}

      {/* Visible pages */}
      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => navigateToPage(page)}
          className={`${css.pageButton} ${page === currentPage ? css.active : ""}`}
        >
          {page}
        </button>
      ))}

      {/* Last page */}
      {visiblePages[visiblePages.length - 1] < totalPages && (
        <>
          {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
            <span className={css.info}>...</span>
          )}
          <button 
            onClick={() => navigateToPage(totalPages)} 
            className={css.pageButton}
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next button */}
      {currentPage < totalPages ? (
        <button
          onClick={() => navigateToPage(currentPage + 1)}
          className={css.pageButton}
          aria-label="Next page"
        >
          →
        </button>
      ) : (
        <span className={`${css.pageButton} ${css.disabled}`}>→</span>
      )}
    </div>
  );
}
