"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import css from "./SidebarNotes.module.css";

const TAGS = ["All", "Work", "Personal", "Ideas", "Learning"];

export default function SidebarNotes() {
  const pathname = usePathname();
  
  return (
    <ul className={css.menuList}>
      {TAGS.map((tag) => {
        const href = tag === "All" ? "/notes/filter/All" : `/notes/filter/${encodeURIComponent(tag)}`;
        const isActive = pathname === href;
        return (
          <li key={tag} className={css.menuItem}>
            <Link 
              href={href} 
              className={`${css.menuLink} ${isActive ? css.active : ''}`}
            >
              {tag === "All" ? "All notes" : tag}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}