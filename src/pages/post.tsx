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
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1616503451125-2513edf2291f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')`,
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
}));

const Post: React.SFC<PostProps> = ({ match }) => {
  const classes = useStyles();
  const [post, setPost] = useState({} as Blog);
  const [writer, setWriter] = useState({} as User);
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
    if (!post) {
      return <Typography color="secondary">No blogs found!</Typography>;
    } else {
      return <BlogView author={writer} post={post} />;
    }
  };

  useEffect(() => {
    async function setPostData() {
      setLoading(true);
      const post = await fetchPost();
      const user = await fetchUser(post?.userId || 1);

      post && setPost(post);
      user && setWriter(user);

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
        <Container maxWidth="md">
          <Paper elevation={4}>{renderBlog()}</Paper>
        </Container>
      </Box>
    </div>
  );
};

export default Post;
