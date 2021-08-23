import * as React from "react";
import { FaThumbsUp, FaComment } from "react-icons/fa";
import styles from "./feed.module.css";

interface IFeedProps {
  posts: any;
  onLike: (index: number) => void;
}

export default function Feed(props: IFeedProps) {
  var posts = [];

  for (const [index, post] of props.posts.entries()) {
    posts.push(
      <Post key={index} index={index} post={post} onLike={props.onLike} />
    );
  }

  return <div>{posts.reverse()}</div>;
}

interface IPost {
  index: number;
  comment: boolean;
  post: {
    title: string;
    body: string;
    likesCount: number;
    isLiked: boolean;
  };
  onLike: (index: number) => void;
}

export const Post: React.FC<IPost> = (props) => {
  const valueRef = React.useRef<HTMLInputElement>(null);

  const focusInput = () => {
    valueRef.current?.focus()
  }

  return (
    <div className={styles.post}>
      <p className={styles.postTitle}>{props.post.title}</p>

      <p className={styles.postBody}>{props.post.body}</p>
      <input ref={valueRef} className={styles.valueInput} />

      <div className={styles.stats}>
        {!!props.post.likesCount && (
          <div className={styles.statsItem}>
            <FaThumbsUp /> <span>{props.post.likesCount}</span>
          </div>
        )}
      </div>

      <div className={styles.actionBar}>
        <div
          className={`${styles.actionBarItem} ${props.post.isLiked ? "active" : ""
            }`}
          role="button"
          onClick={() => {
            props.onLike(props.index);
          }}
        >
          <FaThumbsUp /> <span className={styles.actionBarItemLabel}>Like</span>
        </div>

        <div className={styles.actionBarItem} role="button" onClick={focusInput}>
          <FaComment />{" "}
          <span className={styles.actionBarItemLabel}>
            Post a Comment
          </span>
        </div>
      </div>
    </div>
  );
};
