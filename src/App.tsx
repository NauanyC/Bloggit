import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Post from "./pages/post";
import PostList from "./pages/postsList";

export const App = () => (
  <div className="App">
    <Router>
      <Switch>
        <Route path="/:id" component={Post}></Route>
        <Route exact path="/" component={PostList}></Route>
      </Switch>
    </Router>
  </div>
);
