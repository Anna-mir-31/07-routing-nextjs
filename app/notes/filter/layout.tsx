"use client";
import css from "./layout.module.css";

export default function Layout({ 
  children, 
  sidebar,
  modal
}: { 
  children: React.ReactNode; 
  sidebar: React.ReactNode; 
  modal: React.ReactNode;
}) {
  return (
    <section className={css.container}>
      <aside className={css.sidebar}>
        {sidebar}
      </aside>
      <main className={css.notesWrapper}>{children}</main>
      {modal}
    </section>
  );
}