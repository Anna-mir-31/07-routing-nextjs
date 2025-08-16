"use client";

import css from "./error.module.css";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className={css.container}>
      <h1 className={css.title}>Something went wrong!</h1>
      <p className={css.message}>{error.message}</p>
      <button className={css.button} onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}
