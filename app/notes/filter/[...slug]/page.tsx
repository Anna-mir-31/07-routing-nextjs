// app/notes/filter/[...slug]/page.tsx
import NotesClient from "./Notes.client";

function getTagFromParams(params: { slug?: string[] }) {
  const slugArr = params.slug ?? [];
  return slugArr[0] ?? "All";
}

export default async function NotesFilterPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const resolvedParams = await params;
  const tag = getTagFromParams(resolvedParams);
  const normalized = tag === "All" ? undefined : tag;
  return <NotesClient tag={normalized} selectedTag={tag} />;
}
