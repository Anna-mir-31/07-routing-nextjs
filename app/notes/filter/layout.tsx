"use client";
import css from "./layout.module.css";

export default function Layout({ 
  children, 
  sidebar 
}: { 
  children: React.ReactNode; 
  sidebar: React.ReactNode; 
}) {
  return (
    <section className={css.container}>
      <aside className={css.sidebar}>
        {sidebar}
      </aside>
      <main className={css.notesWrapper}>{children}</main>
    </section>
  );
}