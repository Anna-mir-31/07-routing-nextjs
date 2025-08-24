'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createNote } from '../../lib/api/notes';
import type { NoteTag } from '../../types/note';
import css from './NoteForm.module.css';

interface NoteFormProps {
  onClose: () => void;
  onSuccess?: () => void;
}

const TAGS: NoteTag[] = ['Todo', 'Work', 'Personal', 'Shopping', 'Meeting'];

const validationSchema = Yup.object({
  title: Yup.string()
    .trim()
    .required('Title is required'),
  content: Yup.string()
    .trim()
    .required('Content is required'),
  tag: Yup.string()
    .oneOf(TAGS, 'Invalid tag')
    .required('Tag is required'),
});

interface FormValues {
  title: string;
  content: string;
  tag: NoteTag;
}

export default function NoteForm({ onClose, onSuccess }: NoteFormProps) {
  const qc = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: (values: FormValues) => createNote({ 
      title: values.title.trim(), 
      content: values.content.trim(), 
      tag: values.tag 
    }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['notes'] });
      onClose();
      onSuccess?.();
    },
  });

  const initialValues: FormValues = {
    title: '',
    content: '',
    tag: 'Todo',
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values: FormValues) => mutate(values)}
    >
      {() => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field
              id="title"
              name="title"
              className={css.input}
              type="text"
              disabled={isPending}
            />
            <ErrorMessage name="title" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <Field
              id="content"
              name="content"
              as="textarea"
              className={css.textarea}
              rows={6}
              disabled={isPending}
            />
            <ErrorMessage name="content" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field
              id="tag"
              name="tag"
              as="select"
              className={css.select}
              disabled={isPending}
            >
              {TAGS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </Field>
            <ErrorMessage name="tag" component="span" className={css.error} />
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
        </Form>
      )}
    </Formik>
  );
}