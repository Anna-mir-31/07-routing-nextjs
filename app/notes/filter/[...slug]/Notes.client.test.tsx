"use client";

import css from "./NotesPage.module.css";

interface NotesClientProps {
  tag?: string;
  selectedTag: string;
}

export default function NotesClient({ tag, selectedTag }: NotesClientProps) {
  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <h1>Test Notes Page with CSS Modules</h1>
        <p>Selected tag: {selectedTag}</p>
        <p>Tag for filter: {tag || "All"}</p>
      </div>
      <div className={css.emptyState}>
        <p>Testing CSS modules import...</p>
      </div>
    </div>
  );
}
