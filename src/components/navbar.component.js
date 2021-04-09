import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "./style.css";
import axios from "axios";

export default class Navbar extends Component {
  constructor(props) {
    super(props);

    if (localStorage.getItem("user")) {
      var login = "hide";
      var logout = "btn btn-outline-primary log";
      axios
        .get(
          "http://localhost:4000/offer/search/" + localStorage.getItem("user")
        )
        .then((res) => {
          res.data.map((data) => {
            let temp = this.state.notification;
            temp.push(data);
            this.setState({
              notification: temp,
            });
          });
        });
    } else {
      var logout = "hide";
      var login = "btn btn-outline-primary log";
    }
    this.state = {
      loginBtn: login,
      logoutBtn: logout,
      search: "",
      notification: [],
    };
    this.logout = this.logout.bind(this);
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.handleSubmitSearch = this.handleSubmitSearch.bind(this);
  }

  onChangeSearch(e) {
    this.setState({
      search: e.target.value,
    });
  }

  handleSubmitSearch(e) {
    e.preventDefault();
    window.location.replace(
      "http://localhost:3000/search/" + this.state.search
    );
  }

  logout() {
    localStorage.removeItem("user");
    window.location.replace("http://localhost:3000/");
  }

  render() {
    return (
      <div className="navbar">
        <div className="navbar-left">
          <ul className="nav">
            <li className="nav-item">
              <Link to="/thesis">Home</Link>
            </li>
            <p className="seperator"> | </p>
            <li className="nav-item">
              <span>MA - </span>
            </li>
            <li className="nav-item">
              <span>Boston</span>
            </li>
          </ul>
        </div>
        <div className="navbar-search">
          <div className="input-group">
            <form onSubmit={this.handleSubmitSearch}>
              <input
                type="search"
                className="form-control rounded"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="search-addon"
                value={this.state.search}
                onChange={this.onChangeSearch}
                required="true"
              />
              <button type="submit" className="btn btn-outline-primary">
                search
              </button>
            </form>
          </div>
        </div>
        <div className="navbar-right">
          <Link to="/log">
            <button type="button" className={this.state.loginBtn}>
              Login/signup
            </button>
          </Link>
          <Link to="/profile">
            <button className={this.state.logoutBtn}>
              {localStorage.getItem("user")}
            </button>
          </Link>

          <button
            className={this.state.logoutBtn}
            type="button"
            onClick={this.logout}
          >
            Logout
          </button>
        </div>
      </div>
    );
  }
}
