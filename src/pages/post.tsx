import * as React from "react";

export interface PostProps {
  match: {
    params: {
      id: string;
    };
  };
}

const Post: React.SFC<PostProps> = ({ match }) => {
  return (
    <div className="Post">
      <h1>{match.params.id} </h1>
    </div>
  );
};

export default Post;
