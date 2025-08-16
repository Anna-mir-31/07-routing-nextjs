"use client";
import Link from "next/link";
import { useState } from "react";
import css from "./TagsMenu.module.css";


const TAGS = ["All", "Work", "Personal", "Ideas", "Learning"];


export default function TagsMenu() {
const [open, setOpen] = useState(false);
return (
<div className={css.menuContainer}>
<button className={css.menuButton} aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen((s) => !s)}>
Notes ▾
</button>
{open && (
<ul className={css.menuList} role="menu">
{TAGS.map((tag) => {
const href = tag === "All" ? "/notes/filter/All" : `/notes/filter/${encodeURIComponent(tag)}`;
return (
<li key={tag} className={css.menuItem} role="none">
<Link href={href} className={css.menuLink} role="menuitem" onClick={() => setOpen(false)}>
{tag}
</Link>
</li>
);
})}
</ul>
)}
</div>
);
}