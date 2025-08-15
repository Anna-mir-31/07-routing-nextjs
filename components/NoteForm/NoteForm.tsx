'use client';

import { useState, FormEvent } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';
import type { NoteTag } from '@/types/note';
import css from './NoteForm.module.css';

type Props = {
  onClose: () => void;
};

const TAGS: NoteTag[] = ['Todo', 'Work', 'Personal', 'Shopping'];

export default function NoteForm({ onClose }: Props) {
  const qc = useQueryClient();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState<NoteTag>('Todo');

  const [titleErr, setTitleErr] = useState('');
  const [contentErr, setContentErr] = useState('');

  const { mutate, isPending, error } = useMutation({
    mutationFn: () => createNote({ title: title.trim(), content: content.trim(), tag }),
    onSuccess: () => {
      // оновлюємо список нотаток і закриваємо модалку
      qc.invalidateQueries({ queryKey: ['notes'] });
      onClose();
    },
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    let valid = true;
    if (!title.trim()) {
      setTitleErr('Title is required');
      valid = false;
    } else setTitleErr('');

    if (!content.trim()) {
      setContentErr('Content is required');
      valid = false;
    } else setContentErr('');

    if (!valid) return;

    mutate();
  };

  return (
    <form className={css.form} onSubmit={onSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          className={css.input}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isPending}
        />
        {titleErr && <span className={css.error}>{titleErr}</span>}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          className={css.textarea}
          rows={6}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={isPending}
        />
        {contentErr && <span className={css.error}>{contentErr}</span>}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          className={css.select}
          value={tag}
          onChange={(e) => setTag(e.target.value as NoteTag)}
          disabled={isPending}
        >
          {TAGS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={onClose}
          disabled={isPending}
        >
          Cancel
        </button>
        
        <button type="submit" className={css.submitButton} disabled={isPending}>
          {isPending ? 'Creating…' : 'Create note'}
        </button>
      </div>

      {error && (
        <p className={css.error} role="alert">
          {(error as Error).message || 'Something went wrong'}
        </p>
      )}
    </form>
  );
}
