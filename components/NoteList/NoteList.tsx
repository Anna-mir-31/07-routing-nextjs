import css from "./NoteList.module.css";
import type { Note } from "@/types/note";
import Link from "next/link";


export default function NoteList({ notes }: { notes: Note[] }) {
return (
<ul className={css.grid}>
{notes.map((n) => (
<li key={n.id} className={css.card}>
<h3 className={css.cardTitle}>{n.title}</h3>
{n.tag && <div className={css.tag}>#{n.tag}</div>}
<p className={css.snippet}>{n.content.slice(0, 140)}…</p>
<Link href={`/notes/${n.id}`} className={css.detailsLink}>Open details</Link>
</li>
))}
</ul>
);
}