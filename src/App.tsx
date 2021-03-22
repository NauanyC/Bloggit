import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Pages
import Post from "./pages/post";
import PostList from "./pages/postsList";

//Components
import AppBar from "./components/AppBar";

export const App = () => (
  <div className="App">
    <Router>
      <AppBar></AppBar>
      <Switch>
        <Route path="/:id" component={Post}></Route>
        <Route exact path="/" component={PostList}></Route>
      </Switch>
    </Router>
  </div>
);
