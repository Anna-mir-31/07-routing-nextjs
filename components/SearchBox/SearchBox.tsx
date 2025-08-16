"use client";
import css from "./SearchBox.module.css";


export default function SearchBox({ onSearch }: { onSearch: (q: string) => void }) {
return (
<form
className={css.form}
onSubmit={(e) => {
e.preventDefault();
const fd = new FormData(e.currentTarget as HTMLFormElement);
onSearch(String(fd.get("query") || ""));
}}
>
<input name="query" className={css.input} placeholder="Search notes…" />
<button className={css.button} type="submit">Search</button>
</form>
);
}