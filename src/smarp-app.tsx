import * as React from "react";
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";
import { Button } from "./components/button";
import PostList from "./components/feed";
import { Form } from "./components/form";
import logo from "./images/smarp-logo.png";
import styles from "./smarp-app.module.css";

export class SmarpApp extends React.Component<
  {},
  { posts: any[]; isOpen: boolean }
> {
  constructor(props: any) {
    super(props);

    this.onLike = this.onLike.bind(this);
    this.state = { posts: [], isOpen: false };

  }

  async componentDidMount(){
    try {
      const url = 'https://jsonplaceholder.typicode.com/posts';
      const res = await fetch(url);
      console.log(res.status);
      const data = await res.json();
      this.setState({posts: data});
    } catch (err) {
      console.error(err);
    }
  }

  onLike(index: number) {
    const {posts} = this.state;
    const post = posts[index];

    post.likesCount = post.isLiked ? post.likesCount - 1 : post.likesCount + 1;
    post.isLiked = post.isLiked ? false : true;

    this.setState({ posts });
  }

  onSubmit = (payload: { title: string; body: string })  => {
    const updatedPosts = this.state.posts.slice();

    updatedPosts.push({
      title: payload.title,
      body: payload.body,
      likesCount: 0,
    });

    this.setState({
      posts: updatedPosts,
      isOpen: false,
    });
  }

  render() {
    const { posts, isOpen } = this.state;

    return (
      <div>
        <header className={styles.header}>
          <div className={`container ${styles.headerImageWrapper}`}>
            <img src={logo} className={styles.headerImage} alt="logo" />
          </div>
        </header>

        <div className={`container ${styles.main}`}>
          <div className={styles.buttonWrapper}>
            <Button onClick={() => this.setState({isOpen: true})}>
              Create a post
            </Button>
          </div>

          <PostList posts={posts} onLike={this.onLike} />
        </div>

        <Modal
          isOpen={isOpen}
          className={styles.reactModalContent}
          overlayClassName={styles.reactModalOverlay}
        >
          <div className={styles.modalContentHelper}>
            <div
              className={styles.modalClose}
              onClick={() => this.setState({isOpen: false})}
            >
              <FaTimes />
            </div>

            <Form on-submit={this.onSubmit} />
          </div>
        </Modal>
      </div>
    );
  }
}
