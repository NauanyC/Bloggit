import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

//Interfaces
import { Blog } from "../interfaces/Blog";

export interface PostsListProps {}

const PostsList: React.SFC<PostsListProps> = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setError("");
    setLoading(true);

    axios
      .get<Blog[]>("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        setBlogs(response.data);
        setLoading(false);
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
    </div>
  );
};

export default PostsList;
