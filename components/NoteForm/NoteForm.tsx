"use client";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../../lib/api/notes";
import css from "./NoteForm.module.css";

const TAGS = ["Personal", "Work", "Ideas", "Learning", "Shopping", "Todo"];

interface NoteFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function NoteForm({ onSuccess, onCancel }: NoteFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");
  
  const queryClient = useQueryClient();
  
  const createNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      // Оновлюємо кеш для всіх запитів notes
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      // Очищаємо форму
      setTitle("");
      setContent("");
      setTag("");
      // Викликаємо callback
      onSuccess?.();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    
    createNoteMutation.mutate({
      title: title.trim(),
      content: content.trim(),
      tag: tag || undefined,
    });
  };  return (
    <div>
      <h2 className={css.title}>Create New Note</h2>
      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.field}>
          <label className={css.label}>Title</label>
          <input 
            className={css.input} 
            placeholder="Enter title" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        
        <div className={css.field}>
          <label className={css.label}>Tag (optional)</label>
          <select 
            className={css.select} 
            value={tag} 
            onChange={(e) => setTag(e.target.value)}
          >
            <option value="">Select tag</option>
            {TAGS.map(tagOption => (
              <option key={tagOption} value={tagOption}>{tagOption}</option>
            ))}
          </select>
        </div>
        
        <div className={css.field}>
          <label className={css.label}>Content</label>
          <textarea 
            className={css.textarea} 
            placeholder="Enter content" 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            required
          />
        </div>
        
        <div className={css.actions}>
          <button 
            className={css.submitButton} 
            type="submit" 
            disabled={createNoteMutation.isPending || !title.trim() || !content.trim()}
          >
            {createNoteMutation.isPending ? "Saving..." : "Save"}
          </button>
          
          {onCancel && (
            <button 
              className={css.cancelButton} 
              type="button" 
              onClick={onCancel}
            >
              Cancel
            </button>
          )}
        </div>
        
        {createNoteMutation.isError && (
          <div className={css.error}>
            Failed to create note. Please try again.
          </div>
        )}
      </form>
    </div>
  );
}