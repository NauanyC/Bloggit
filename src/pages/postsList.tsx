import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

//UI
import Pagination from "@material-ui/lab/Pagination";

//Interfaces
import { Blog } from "../interfaces/Blog";
import { User } from "../interfaces/User";

export interface PostsListProps {}

const PostsList: React.SFC<PostsListProps> = () => {
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
          <li>{blog.title}</li>
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

  useEffect(() => {
    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUsers(response.data);
      });
  }, []);

  return (
    <div className="PostsList">
      <h1>PostsList</h1>

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
