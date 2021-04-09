import React, { Component } from "react";
import axios from "axios";
import Profile_Post from "./profilepage/post.component.js";
import Profile_Update from "./profilepage/update.component.js";
import Profile_Info from "./profilepage/info.component.js";
import Profile_Offer from "./profilepage/offer.component.js";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      class_profile: "",
      class_post: "hide",
      class_update: "hide",
      class_offer: "hide",
    };
    this.profile = this.profile.bind(this);
    this.post = this.post.bind(this);
    this.update = this.update.bind(this);
    this.offer = this.offer.bind(this);
  }

  profile() {
    this.setState({
      class_profile: "",
      class_post: "hide",
      class_update: "hide",
      class_offer: "hide",
    });
  }

  post() {
    this.setState({
      class_profile: "hide",
      class_post: "",
      class_update: "hide",
      class_offer: "hide",
    });
  }

  update() {
    this.setState({
      class_profile: "hide",
      class_post: "hide",
      class_update: "",
      class_offer: "hide",
    });
  }

  offer() {
    this.setState({
      class_profile: "hide",
      class_post: "hide",
      class_update: "hide",
      class_offer: "",
    });
  }

  render() {
    return (
      <div className="profile">
        <div className="profile-nav">
          <input
            className="profile-nav-btn"
            onClick={this.profile}
            type="button"
            value="profile"
          ></input>
          <input
            className="profile-nav-btn"
            onClick={this.update}
            type="button"
            value="update profile"
          ></input>
          <input
            className="profile-nav-btn"
            onClick={this.post}
            type="button"
            value="post"
          ></input>
          <input
            className="profile-nav-btn"
            onClick={this.offer}
            type="button"
            value="offer"
          ></input>
        </div>

        <div className={this.state.class_profile}>
          <Profile_Info />
        </div>

        <div className={this.state.class_update}>
          <Profile_Update />
        </div>

        <div className={this.state.class_post}>
          <Profile_Post />
        </div>

        <div className={this.state.class_offer}>
          <Profile_Offer />
        </div>
      </div>
    );
  }
}
