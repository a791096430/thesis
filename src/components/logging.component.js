import React, { Component } from "react";
import axios from "axios";
// import "./user.css";

export default class Logging extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: false,
      classname: "container",

      username: "",
      email: "",
      password: "",
      confirmedpwd: "",
      confirmedpwd_alert: "hide",

      login_username: "",
      login_password: "",

      username_alert: "hide",
      password_alert: "hide",
      login_alert: "hide",
    };
    this.changeUsername = this.changeUsername.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.changeConfirmedpwd = this.changeConfirmedpwd.bind(this);
    this.signupSubmit = this.signupSubmit.bind(this);

    this.handleLoginUsername = this.handleLoginUsername.bind(this);
    this.handleLoginPassword = this.handleLoginPassword.bind(this);
    this.loginSubmit = this.loginSubmit.bind(this);

    this.handleClick = this.handleClick.bind(this);
  }

  changeUsername(event) {
    this.setState(
      {
        username: event.target.value,
      },
      () => {
        axios
          .get("http://localhost:4000/user/" + this.state.username)
          .then((res) => {
            if (res.data) {
              this.setState({
                username_alert: "",
              });
            } else {
              this.setState({
                username_alert: "hide",
              });
            }
          });
      }
    );
  }

  changeEmail(evnet) {
    this.setState({
      email: evnet.target.value,
    });
  }

  changePassword(event) {
    this.setState(
      {
        password: event.target.value,
      },
      () => {
        if (this.state.password.length < 6 && this.state.password.length > 0) {
          this.setState({
            password_alert: "",
          });
        } else {
          this.setState({
            password_alert: "hide",
          });
        }

        if (
          this.state.password === this.state.confirmedpwd ||
          this.state.confirmedpwd.length == 0
        ) {
          this.setState({
            confirmedpwd_alert: "hide",
          });
        } else {
          this.setState({
            confirmedpwd_alert: "",
          });
        }
      }
    );
  }

  changeConfirmedpwd(event) {
    this.setState(
      {
        confirmedpwd: event.target.value,
      },
      () => {
        if (this.state.password === this.state.confirmedpwd) {
          this.setState({
            confirmedpwd_alert: "hide",
          });
        } else {
          this.setState({
            confirmedpwd_alert: "",
          });
        }
      }
    );
  }

  signupSubmit(e) {
    e.preventDefault();
    if (
      this.state.password === this.state.confirmedpwd &&
      this.state.username_alert === "hide"
    ) {
      const newUser = {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
      };
      axios.post("http://localhost:4000/user/add", newUser);
      localStorage.setItem("user", this.state.username);
      window.location.replace("http://localhost:3000/");
    }
  }

  handleLoginUsername(event) {
    this.setState({
      login_username: event.target.value,
    });
  }

  handleLoginPassword(event) {
    this.setState({
      login_password: event.target.value,
    });
  }

  loginSubmit(event) {
    event.preventDefault();
    const newLogin = {
      username: this.state.login_username,
      password: this.state.login_password,
    };
    axios.post("http://localhost:4000/user/login", newLogin).then((res) => {
      if (res.data.length > 0) {
        localStorage.setItem("user", res.data[0].username);
        this.setState({
          login_alert: "hide",
        });
        window.location.replace("http://localhost:3000/");
      } else {
        this.setState({
          login_alert: "",
        });
      }
    });
  }

  handleClick(e) {
    e.preventDefault();
    if (!this.state.isToggleOn) {
      this.setState({
        isToggleOn: true,
        classname: "container active",
      });
    } else {
      this.setState({
        isToggleOn: false,
        classname: "container",
      });
    }
  }

  render() {
    return (
      <section>
        <div className={this.state.classname} id="container">
          <div className="user signinBx">
            <div className="imgBx">
              {/* <img src="https://shuminye.neocities.org/programming-final/login.png"></img> */}
            </div>
            <div className="formBx">
              <form onSubmit={this.loginSubmit}>
                <h2>Sign In</h2>
                <input
                  type="text"
                  name=""
                  placeholder="Username"
                  value={this.state.login_username}
                  onChange={this.handleLoginUsername}
                ></input>
                <input
                  type="password"
                  name=""
                  placeholder="Password"
                  value={this.state.login_password}
                  onChange={this.handleLoginPassword}
                ></input>
                <p className={this.state.login_alert}>
                  *Wrong username or password!
                </p>
                <input type="submit" name="" value="Login"></input>
                <p class="signup">
                  Don't have an account?{" "}
                  <a href="" onClick={this.handleClick}>
                    Sign up
                  </a>
                </p>
              </form>
            </div>
          </div>

          <div className="user signupBx">
            <div className="formBx">
              <form onSubmit={this.signupSubmit}>
                <h2>Create a new account</h2>
                <input
                  type="text"
                  name=""
                  placeholder="Username"
                  value={this.state.username}
                  onChange={this.changeUsername}
                ></input>
                <p className={this.state.username_alert}>*Username occupied!</p>
                <input
                  type="email"
                  name=""
                  placeholder="Email Address"
                  value={this.state.email}
                  onChange={this.changeEmail}
                ></input>
                <input
                  type="password"
                  name=""
                  placeholder="Create password"
                  value={this.state.password}
                  onChange={this.changePassword}
                ></input>
                <p className={this.state.password_alert}>
                  *Require 6 or more characters!
                </p>
                <input
                  type="password"
                  name=""
                  placeholder="Confirm password"
                  value={this.state.confirmedpwd}
                  onChange={this.changeConfirmedpwd}
                ></input>
                <p className={this.state.confirmedpwd_alert}>
                  *Please input the same password
                </p>
                <input type="submit" name="" value="Sign Up"></input>
                <p class="signup">
                  Already have an account?{" "}
                  <a href="" onClick={this.handleClick}>
                    Sign in
                  </a>
                </p>
              </form>
            </div>
            <div className="imgBx">
              <img></img>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
