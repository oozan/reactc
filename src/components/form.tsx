import * as React from "react";
import { Button } from "./button";
import styles from "./form.module.css";

interface IFormProps {
  "on-submit": (payload: { title: string; body: string }) => void;
}

export const Form: React.FC<IFormProps> = (props) => {
  const titleRef = React.useRef<HTMLInputElement>(null);
  const bodyRef = React.useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!titleRef.current?.value) return alert("Your post needs a title");

    if (!bodyRef.current?.value) return alert("Your post needs some content");

    props["on-submit"]({
      title: titleRef.current?.value,
      body: bodyRef.current?.value,
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label}>Post title: *</label>

      <input
        ref={titleRef}
        placeholder="Title..."
        defaultValue=""
        className={styles.input}
      />

      <label className={styles.label}>Post content: *</label>

      <textarea
        ref={bodyRef}
        placeholder="Start typing post content here..."
        defaultValue=""
        className={styles.textarea}
      />

      <Button>Create a post</Button>
    </form>
  );
};
