import * as React from "react";
import {Post} from './post';

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

