import css from "./page.module.css";

export default function HomePage() {
  return (
    <main className={css.home}>
      <h1 className={css.title}>Welcome to NoteHub</h1>
      <p className={css.description}>
        Filter notes by tags, open details in a modal, and explore parallel routes.
      </p>
    </main>
  );
}