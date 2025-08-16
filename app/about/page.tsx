// app/about/page.tsx
import css from "./about.module.css";

export default function AboutPage() {
  return (
    <div className={css.container}>
      <div className={css.content}>
        <h1 className={css.title}>About NoteHub</h1>
        
        <div className={css.section}>
          <h2>What is NoteHub?</h2>
          <p>
            NoteHub is a modern note-taking application built with Next.js 15 and the App Router. 
            It demonstrates advanced routing concepts including catch-all routes, parallel routes, 
            and intercepting routes.
          </p>
        </div>

        <div className={css.section}>
          <h2>Features</h2>
          <ul className={css.featureList}>
            <li>📝 Create, edit, and delete notes</li>
            <li>🏷️ Organize notes with tags</li>
            <li>🔍 Search through your notes</li>
            <li>📄 Pagination for large note collections</li>
            <li>🖼️ Modal windows for detailed note views</li>
            <li>🎨 Modern, responsive design</li>
          </ul>
        </div>

        <div className={css.section}>
          <h2>Technologies Used</h2>
          <ul className={css.techList}>
            <li>Next.js 15 with App Router</li>
            <li>TypeScript</li>
            <li>React Query (TanStack Query)</li>
            <li>CSS Modules</li>
            <li>Axios for API calls</li>
          </ul>
        </div>

        <div className={css.section}>
          <h2>Routing Features</h2>
          <ul className={css.routingList}>
            <li><strong>Catch-all Routes:</strong> Dynamic filtering by tags</li>
            <li><strong>Parallel Routes:</strong> Sidebar and main content</li>
            <li><strong>Intercepting Routes:</strong> Modal note details</li>
            <li><strong>Custom 404:</strong> Friendly error pages</li>
          </ul>
        </div>

        <div className={css.footer}>
          <p>Built as part of GoIT Academy homework assignment.</p>
          <p>© 2025 NoteHub</p>
        </div>
      </div>
    </div>
  );
}
