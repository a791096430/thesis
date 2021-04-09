import "./App.css";
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import Home from "./components/home.component";
import Search from "./components/search.component";
import Rating from "./components/rating.component";
import Trade from "./components/trade.component";
import Logging from "./components/logging.component";
import Post from "./components/post.component";
import Profile from "./components/profile.component";

export default function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Route path="/thesis" exact component={Home} />
        <Route path="/search/:keyword" component={Search} />
        <Route path="/rating/:username" component={Rating} />
        <Route path="/trade/:username" component={Trade} />
        <Route path="/log" component={Logging} />
        <Route path="/detail/:id" component={Post} />
        <Route path="/profile" component={Profile} />
      </div>
    </Router>
  );
}
