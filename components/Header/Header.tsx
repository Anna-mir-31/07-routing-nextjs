import Link from "next/link";
import css from "./Header.module.css";
import TagsMenu from "../TagsMenu/TagsMenu";

export default function Header() {
  return (
    <header 
      className={css.header}
      style={{ backgroundColor: '#333', color: 'white', padding: '1rem 2rem' }}
    >
      <div 
        className={css.container}
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}
      >
        <Link 
          href="/" 
          className={css.logo}
          style={{ color: 'white', textDecoration: 'none', fontSize: '1.8rem', fontWeight: 'bold' }}
        >
          NoteHub
        </Link>
        <nav 
          className={css.nav}
          style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}
        >
          <TagsMenu />
          <Link 
            href="/about" 
            className={css.navLink}
            style={{ color: 'white', textDecoration: 'none', fontSize: '1rem' }}
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}