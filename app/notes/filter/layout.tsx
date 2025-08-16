import css from "./layout.module.css";

export default function Layout(props: any) {
  const { children, sidebar, modal } = props;
  
  return (
    <section className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <main className={css.notesWrapper}>{children}</main>
      {modal}
    </section>
  );
}