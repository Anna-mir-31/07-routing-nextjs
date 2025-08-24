import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to NoteHub</h1>
      <p>Your personal note-taking app</p>
      <Link href="/notes">Go to Notes</Link>
    </div>
  );
}