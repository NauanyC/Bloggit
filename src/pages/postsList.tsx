import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

//UI
import Pagination from "@material-ui/lab/Pagination";
import Box from "@material-ui/core/Box";

//Interfaces
import { Blog } from "../interfaces/Blog";
import { User } from "../interfaces/User";

export interface PostsListProps {}

const useStyles = makeStyles((theme) => ({
  hero: {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1616435209037-c4eada11b3f9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')`,
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
    color: "#F7F7F7",
  },
}));

const PostsList: React.SFC<PostsListProps> = () => {
  const classes = useStyles();

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  //Pagination
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const pageSize = 10;
  const offset = (page - 1) * pageSize;

  const currentPageData = blogs.slice(offset, offset + pageSize);

  const handlePageChange = (event: object, value: number) => {
    setPage(value);
  };

  const renderBlogs = () => {
    if (error) {
      return <h1>Sorry, something weird happened...</h1>;
    }
    if (loading) {
      return <h1>Wow, loading!</h1>;
    }
    if (blogs.length < 1) {
      return <h1>No blogs found!</h1>;
    }

    return (
      <ul>
        {currentPageData.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    );
  };

  useEffect(() => {
    setError("");
    setLoading(true);

    axios
      .get<Blog[]>("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        setBlogs(response.data);
        setLoading(false);
        setCount(Math.ceil(response.data.length / pageSize));
      })
      .catch((ex) => {
        const error =
          ex.response.status === 404
            ? "Resource not found"
            : "An unexpected error has occurred";
        setError(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="PostsList">
      <Box className={classes.hero}>
        <Box className={classes.heroTitle}>Bloggit</Box>
      </Box>
      <ul>{renderBlogs()}</ul>

      <Pagination
        className="my-3"
        count={count}
        page={page}
        siblingCount={1}
        boundaryCount={1}
        variant="outlined"
        shape="rounded"
        onChange={handlePageChange}
      />
    </div>
  );
};

export default PostsList;
