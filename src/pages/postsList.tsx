import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

//UI
import Pagination from "@material-ui/lab/Pagination";

//Interfaces
import { Blog } from "../interfaces/Blog";

export interface PostsListProps {}

const PostsList: React.SFC<PostsListProps> = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  //Pagination
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const pageSize = 10;

  const handlePageChange = (event: object, value: number) => {
    setPage(value);
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
      <h1>PostsList</h1>

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
