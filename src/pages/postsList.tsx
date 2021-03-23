import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

//UI
import Pagination from "@material-ui/lab/Pagination";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

//Components
import BlogItem from "../components/BlogItem";

//Interfaces
import { Blog } from "../interfaces/Blog";
import { User } from "../interfaces/User";

//Utils
import { shuffle } from "../utils/array";

export interface PostsListProps {}

const useStyles = makeStyles((theme) => ({
  hero: {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1508672019048-805c876b67e2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1393&q=80')`,
    height: "500px",
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
      height: 300,
      fontSize: "3em",
    },
  },
  heroTitle: {
    color: "#fcfcfc",
  },
  blogsContainer: {
    padding: theme.spacing(4),
  },
  blogTitle: {
    fontWeight: 800,
    paddingBottom: theme.spacing(8),
  },
  pagination: {
    padding: theme.spacing(10),
    justifyContent: "center",
    display: "flex",
  },
}));

const PostsList: React.SFC<PostsListProps> = () => {
  const classes = useStyles();

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const [users, setUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [usersError, setUsersError] = useState<string>("");

  //Pagination
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const pageSize = 9;
  const offset = (page - 1) * pageSize;

  const currentPageData = blogs.slice(offset, offset + pageSize);

  const handlePageChange = (event: object, value: number) => {
    setPage(value);
  };

  const renderBlogs = () => {
    if (error) {
      return <Typography>Sorry, something weird happened...</Typography>;
    }
    if (loading || loadingUsers) {
      return <Typography>Loading...</Typography>;
    }
    if (blogs.length < 1) {
      return <Typography color="secondary">No blogs found!</Typography>;
    }

    return (
      <>
        {currentPageData.map((blog) => (
          <Grid item xs={12} sm={6} md={4} key={blog.id}>
            <BlogItem
              userId={blog.userId}
              id={blog.id}
              author={blog.author}
              title={blog.title}
              body={blog.body}
            ></BlogItem>
          </Grid>
        ))}
      </>
    );
  };

  async function fetchUsers() {
    try {
      setLoadingUsers(true);
      let response = await axios.get<User[]>(
        "https://jsonplaceholder.typicode.com/users"
      );
      setLoadingUsers(false);
      setUsersError("");
      return response.data;
    } catch (ex) {
      const error =
        ex.response.status === 404
          ? "Resource not found"
          : "An unexpected error has occurred";

      setUsersError(error);
      setLoadingUsers(false);
    }
  }

  async function fetchPosts() {
    try {
      setLoading(true);
      let response = await axios.get<Blog[]>(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setCount(Math.ceil(response.data.length / pageSize));
      setLoading(false);
      setError("");
      return response.data;
    } catch (ex) {
      const error =
        ex.response.status === 404
          ? "Resource not found"
          : "An unexpected error has occurred";

      setError(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    async function setPosts() {
      const users = await fetchUsers();
      const posts = await fetchPosts();

      if (posts && posts.length > 0) {
        posts.map((post, index) => {
          const user = users && users.find((user) => user.id === post.userId);
          posts[index].author = user?.name;
        });
      }

      if (users && !usersError && !loadingUsers) {
        users && setUsers(users);
      }

      if (posts && !error && !loading) {
        posts && setBlogs(shuffle(posts));
      }
    }

    setPosts();
  }, []);

  return (
    <div className="PostsList">
      <Box className={classes.hero}>
        <Box className={classes.heroTitle}>Bloggit</Box>
      </Box>

      <Container maxWidth="lg" className={classes.blogsContainer}>
        <Typography variant="h4" className={classes.blogTitle}>
          Recent Articles
        </Typography>

        <Grid container spacing={6}>
          {renderBlogs()}
        </Grid>
        <Pagination
          className={classes.pagination}
          count={count}
          page={page}
          siblingCount={1}
          boundaryCount={1}
          variant="outlined"
          shape="rounded"
          onChange={handlePageChange}
        />
      </Container>
    </div>
  );
};

export default PostsList;
