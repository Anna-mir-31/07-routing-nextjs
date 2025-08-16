"use client";
import css from "./Pagination.module.css";


export default function Pagination({ page, totalPages, onChange }: { page: number; totalPages: number; onChange: (p: number) => void }) {
return (
<div className={css.pagination}>
<button className={css.pageBtn} onClick={() => onChange(Math.max(1, page - 1))} disabled={page === 1}>Prev</button>
<span className={css.pageInfo}>{page} / {totalPages}</span>
<button className={css.pageBtn} onClick={() => onChange(Math.min(totalPages, page + 1))} disabled={page === totalPages}>Next</button>
</div>
);
}