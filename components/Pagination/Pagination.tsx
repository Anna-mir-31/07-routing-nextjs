// components/Pagination/Pagination.tsx
'use client';

import React from 'react';
import css from './Pagination.module.css';

type Props = {
  pageCount: number;
  forcePage: number; // 0-based
  onPageChange: (arg: { selected: number }) => void;
};

const Pagination: React.FC<Props> = ({ pageCount, forcePage, onPageChange }) => {
  const pages = Array.from({ length: pageCount }, (_, i) => i);

  const goPrev = () => {
    if (forcePage > 0) {
      onPageChange({ selected: forcePage - 1 });
    }
  };

  const goNext = () => {
    if (forcePage < pageCount - 1) {
      onPageChange({ selected: forcePage + 1 });
    }
  };

  return (
    <ul className={css.pagination}>
      {/* Prev arrow */}
      <li
        className={forcePage === 0 ? css.disabled : undefined}
        onClick={goPrev}
        aria-disabled={forcePage === 0}
      >
        <a>←</a>
      </li>

      {pages.map((p) => {
        const active = p === forcePage;
        return (
          <li
            key={p}
            className={active ? css.active : undefined}
            onClick={() => onPageChange({ selected: p })}
            aria-current={active ? 'page' : undefined}
          >
            <a>{p + 1}</a>
          </li>
        );
      })}

      {/* Next arrow */}
      <li
        className={forcePage === pageCount - 1 ? css.disabled : undefined}
        onClick={goNext}
        aria-disabled={forcePage === pageCount - 1}
      >
        <a>→</a>
      </li>
    </ul>
  );
};

export default Pagination;
