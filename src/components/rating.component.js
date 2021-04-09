import axios from "axios";
import React, { Component } from "react";
import "./style.css";

export default class Rating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //dont define Json object as an empty array especially it contains arrays
      //render() excecuted first, if arrays inside a Json object is not defined as an array, this.state.array.length will throw errors
      user: {
        createdAt: "",
        updatedAt: "",
        negativeComments: [{ createdAt: "" }],
        positiveComments: [{ createdAt: "" }],
      },
      dealtPost: [],
      offerMade: [],
      sellPosts: [],
      buyPosts: [],
      class_positiveComment: "",
      class_negativeComment: "",
    };
    this.displayPositiveComments = this.displayPositiveComments.bind(this);
    this.displayNegativeComments = this.displayNegativeComments.bind(this);
    this.handleChangeRadio = this.handleChangeRadio.bind(this);
  }

  componentDidMount() {
    this.retriveData();
  }

  retriveData() {
    axios
      .get("http://localhost:4000/user/" + this.props.match.params.username)
      .then((res) => {
        this.setState({
          user: res.data,
        });
      });
    axios
      .get(
        "http://localhost:4000/post/get/dealtPost/" +
          this.props.match.params.username
      )
      .then((res) => {
        this.setState({
          dealtPost: res.data,
        });
      });
    axios
      .get(
        "http://localhost:4000/offer/get/offerMade/" +
          this.props.match.params.username
      )
      .then((res) => {
        this.setState({
          offerMade: res.data,
        });
      });
  }

  displayPositiveComments() {
    return this.state.user.positiveComments.map((comment) => {
      return (
        <div className="rating-tradeHistory-comments">
          <p>positive</p>
          <img
            className="rating-tradeHistory-comments-profile"
            src="https://shuminye.neocities.org/thesis/post/profile.png"
          />
          <h6>{comment.user}</h6>
          <p>{comment.postType}</p>
          <p>{comment.postTitle}</p>
          <p>
            <b>{comment.comment}</b>
          </p>
          {/* <p>{comment.createdAt.slice(0, 10)}</p> */}
        </div>
      );
    });
  }

  displayNegativeComments() {
    return this.state.user.negativeComments.map((comment) => {
      return (
        <div className="rating-tradeHistory-comments">
          <p>negative</p>
          <img
            className="rating-tradeHistory-comments-profile"
            src="https://shuminye.neocities.org/thesis/post/profile.png"
          />
          <h6>{comment.user}</h6>
          <p>{comment.postType}</p>
          <p>{comment.postTitle}</p>
          <p>
            <b>{comment.comment}</b>
          </p>
          {/* <p>{comment.createdAt.slice(0, 10)}</p> */}
        </div>
      );
    });
  }

  handleChangeRadio(e) {
    switch (e.target.value) {
      case "all":
        this.setState({
          class_positiveComment: "",
          class_negativeComment: "",
        });
        break;

      case "positive":
        this.setState({
          class_positiveComment: "",
          class_negativeComment: "hide",
        });
        break;

      case "negative":
        this.setState({
          class_positiveComment: "hide",
          class_negativeComment: "",
        });
        break;
    }
  }

  render() {
    return (
      <div className="rating">
        <div className="rating-profile">
          <img
            className="rating-profile-image"
            src="https://shuminye.neocities.org/thesis/post/profile.png"
          />
          <div className="rating-profile-info">
            <h5>username: {this.state.user.username}</h5>
            <h5>
              reputation points:{" "}
              {this.state.user.positiveComments.length -
                this.state.user.negativeComments.length * 5}
            </h5>
          </div>
        </div>
        <div className="rating-userInfo">
          <div className="rating-userInfo-div1">
            <h6>
              Account created date <br></br>{" "}
              {this.state.user.createdAt.slice(0, 10)}
            </h6>
            <h6>
              Positive comments received <br></br>{" "}
              {this.state.user.positiveComments.length}
            </h6>
            <h6>
              Negative comments received<br></br>
              {this.state.user.negativeComments.length}
            </h6>
          </div>

          <div className="rating-userInfo-div2">
            <h6>
              Last activity date <br></br>{" "}
              {this.state.user.updatedAt.slice(0, 10)}
            </h6>
            <h6>
              Items traded <br></br>
              {this.state.dealtPost.length}
            </h6>
            <h6>
              Offers made<br></br>
              {this.state.offerMade.length}
            </h6>
          </div>
        </div>
        <div className="rating-tradeHistory">
          <div className="rating-tradeHistory-radio">
            <input
              type="radio"
              value="all"
              className="rating-radio"
              name="comment"
              id="all"
              onChange={this.handleChangeRadio}
              defaultChecked
            />
            <label for="all">All</label>
            <input
              type="radio"
              value="positive"
              className="rating-radio"
              name="comment"
              id="positive"
              onChange={this.handleChangeRadio}
            />
            <label for="positive">Postive</label>
            <input
              type="radio"
              value="negative"
              className="rating-radio"
              name="comment"
              id="negative"
              onChange={this.handleChangeRadio}
            />
            <label for="negative">Negative</label>
          </div>
        </div>
        <div className="rating-tradeHistory-comments">
          <p>
            <b>Attitude</b>
          </p>
          <p>
            <b>User</b>
          </p>
          <p>
            <b>Trade type</b>
          </p>
          <p>
            <b>Item</b>
          </p>
          <p>
            <b>Comment</b>
          </p>
          {/* <p>{comment.createdAt.slice(0, 10)}</p> */}
        </div>
        <div className={this.state.class_positiveComment}>
          {this.displayPositiveComments()}
        </div>
        <div className={this.state.class_negativeComment}>
          {this.displayNegativeComments()}
        </div>
      </div>
    );
  }
}
