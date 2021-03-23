import * as React from "react";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

//Components
import BlogView from "../components/BlogView";

//Interfaces
import { Blog } from "../interfaces/Blog";
import { User } from "../interfaces/User";

//UI
import { Box, Container, Paper, Typography } from "@material-ui/core";

export interface PostProps {
  match: {
    params: {
      id: string;
    };
  };
}

const useStyles = makeStyles((theme) => ({
  hero: {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://cdn.discordapp.com/attachments/410134858623614996/824028967807877213/3b36f9b606fabd4a513d48def6716718.png')`,
    height: "100vh",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontSize: "4rem",
    [theme.breakpoints.down("sm")]: {
      height: "100vh",
      fontSize: "3em",
    },
  },
  blogViewContainer: {
    display: "flex",
    justifyContent: "center",
  },
}));

const Post: React.SFC<PostProps> = ({ match }) => {
  const classes = useStyles();
  const [post, setPost] = useState({} as Blog);
  const [author, setAuthor] = useState({} as User);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  async function fetchUser(userId: number) {
    try {
      let response = await axios.get<User>(
        `https://jsonplaceholder.typicode.com/users/${userId}`
      );
      return response.data;
    } catch (ex) {
      const error =
        ex.response.status === 404
          ? "Resource not found"
          : "An unexpected error has occurred";
      setError(error);
    }
  }

  async function fetchPost() {
    try {
      let response = await axios.get<Blog>(
        `https://jsonplaceholder.typicode.com/posts/${match.params.id}`
      );
      return response.data;
    } catch (ex) {
      const error =
        ex.response.status === 404
          ? "Resource not found"
          : "An unexpected error has occurred";
      setError(error);
    }
  }

  const renderBlog = () => {
    if (error) {
      return <Typography>Sorry, something weird happened...</Typography>;
    }
    if (loading) {
      return <Typography>Loading...</Typography>;
    }
    if (!post || !author) {
      return <Typography color="secondary">No blogs found!</Typography>;
    } else {
      return <BlogView blog={post} author={author} />;
    }
  };

  useEffect(() => {
    async function setPostData() {
      setLoading(true);
      const post = await fetchPost();
      const user = await fetchUser(post?.userId || 1);

      post && setPost({ ...post });
      user && setAuthor(user);

      if (user && post) {
        setLoading(false);
        setError("");
      }
    }
    setPostData();
  }, []);

  return (
    <div className="Post">
      <Box className={classes.hero}>
        <Container maxWidth="md" className={classes.blogViewContainer}>
          {renderBlog()}
        </Container>
      </Box>
    </div>
  );
};

export default Post;
