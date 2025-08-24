"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";
import css from "./Pagination.module.css";

interface PaginationProps {
  totalPages: number;
}

export default function PaginationSelfContained({ 
  totalPages,
}: PaginationProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  
  // Read currentPage directly from searchParams
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  if (totalPages <= 1) {
    return null;
  }

  const navigateToPage = useCallback((page: number) => {
    if (page === currentPage) {
      return;
    }
    
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    const newUrl = `${pathname}?${params.toString()}`;
    
    router.push(newUrl, { scroll: false });
  }, [searchParams, pathname, router, currentPage]);

  const handlePageClick = (page: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    navigateToPage(page);
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
          onClick={handlePageClick(currentPage - 1)}
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
            onClick={handlePageClick(1)} 
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
          onClick={handlePageClick(page)}
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
            onClick={handlePageClick(totalPages)} 
            className={css.pageButton}
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next button */}
      {currentPage < totalPages ? (
        <button
          onClick={handlePageClick(currentPage + 1)}
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
