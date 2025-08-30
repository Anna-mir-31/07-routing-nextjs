"use client";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Modal from "../../../../../../components/Modal/Modal";
import NotePreview from "../../../../../../components/NotePreview/NotePreview";
import { getNoteById } from "../../../../../../lib/api/notes";

interface Props {
  params: {
    id: string;
  };
}

export default function InterceptedNotePage({ params }: Props) {
  const router = useRouter();
  
  const { data: note, isLoading, error } = useQuery({
    queryKey: ['note', params.id],
    queryFn: () => getNoteById(params.id),
  });

  const handleClose = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <Modal onClose={handleClose}>
        <div>Loading...</div>
      </Modal>
    );
  }

  if (error || !note) {
    return (
      <Modal onClose={handleClose}>
        <div>Error loading note</div>
      </Modal>
    );
  }

  return (
    <Modal onClose={handleClose}>
      <NotePreview note={note} />
    </Modal>
  );
}
