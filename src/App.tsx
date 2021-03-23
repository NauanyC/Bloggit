import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Pages
import Post from "./pages/post";
import PostList from "./pages/postsList";
import NewPost from "./pages/newPost";

//Components
import AppBar from "./components/AppBar";

export const App = () => (
  <div className="App">
    <Router>
      <AppBar></AppBar>
      <Switch>
        <Route exact path="/write" component={NewPost}></Route>
        <Route exact path="/" component={PostList}></Route>
        <Route path="/:id" component={Post}></Route>
      </Switch>
    </Router>
  </div>
);
