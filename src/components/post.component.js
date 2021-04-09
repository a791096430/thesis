import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: { comments: [] },
      comment: "",
      class_buy: "hide",
      class_message: "hide",
      class_alert: "hide",
      class_popup_barter: "hide",
      class_alert_barter: "hide",
    };
    this.displayComments = this.displayComments.bind(this);
    this.onChangeComment = this.onChangeComment.bind(this);
    this.handleSubmitComment = this.handleSubmitComment.bind(this);
    this.back_alert = this.back_alert.bind(this);
    this.barter = this.barter.bind(this);
    this.buy = this.buy.bind(this);
    this.yes = this.yes.bind(this);
    this.no = this.no.bind(this);
    this.barter_yes = this.barter_yes.bind(this);
    this.barter_no = this.barter_no.bind(this);
    this.barter_back_alert = this.barter_back_alert.bind(this);
  }
  componentDidMount() {
    this.retriveData();
  }

  retriveData() {
    axios
      .post("http://localhost:4000/post/get/" + this.props.match.params.id)
      .then((res) => {
        this.setState({
          post: res.data,
        });
      });
  }

  displayComments() {
    let comments = this.state.post.comments;
    return comments.map((comment) => {
      return (
        <div className="detail-display-comment">
          <h6>{comment.user}</h6>
          <h6>{comment.date}</h6>
          <p>{comment.comment}</p>
          <hr />
        </div>
      );
    });
  }

  onChangeComment(e) {
    this.setState({
      comment: e.target.value,
    });
  }

  handleSubmitComment(e) {
    e.preventDefault();
    let user = localStorage.getItem("user");
    let d = new Date();
    let date = d.toString().slice(4, 24);
    let comment = this.state.comment;
    let Comment = {
      user: user,
      date: date,
      comment: comment,
    };
    axios
      .post(
        "http://localhost:4000/post/update/comment/" + this.state.post._id,
        {
          comment: Comment,
        }
      )
      .then(() => {
        this.setState({
          comment: "",
        });
      })
      .then(() => {
        this.retriveData();
      });
  }

  buy() {
    if (this.state.post.author !== localStorage.getItem("user")) {
      this.setState({
        class_buy: "popup-edit",
      });
    } else {
      this.setState({
        class_alert: "popup-edit",
      });
    }
  }

  yes() {
    axios.post(
      "http://localhost:4000/post/update/status/" + this.state.post._id,
      {
        status: "dealt",
      }
    );
    axios.post(
      "http://localhost:4000/post/update/sellerOrBuyer/" + this.state.post._id,
      {
        sellerOrBuyer: localStorage.getItem("user"),
      }
    );
    this.setState({
      class_message: "popup-edit",
    });
  }

  no() {
    this.setState({
      class_buy: "hide",
    });
  }

  back() {
    window.location.replace("http://localhost:3000/profile");
  }

  back_alert() {
    this.setState({
      class_alert: "hide",
    });
  }

  barter() {
    if (this.state.post.author !== localStorage.getItem("user")) {
      this.setState({
        class_popup_barter: "popup-edit",
      });
    } else {
      this.setState({
        class_alert_barter: "popup-edit",
      });
    }
  }

  barter_yes() {
    window.location.replace(
      "http://localhost:3000/trade/" + this.state.post.author
    );
  }

  barter_no() {
    this.setState({
      class_popup_barter: "hide",
    });
  }

  barter_back_alert() {
    this.setState({
      class_popup_barter: "hide",
      class_alert_barter: "hide",
    });
  }

  render() {
    return (
      <div className="detail">
        <div className="detail-info">
          <div className="detail-info-post">
            <img
              width="250"
              height="250"
              className="detail-image"
              src={this.state.post.image}
            ></img>
            <div className="detail-information">
              <h5>Item: {this.state.post.title}</h5>
              <h6>Condition: {this.state.post.condition}</h6>
              <h6>Author: {this.state.post.author}</h6>
              <h6>Category: {this.state.post.category}</h6>
              <h6>Status: {this.state.post.status}</h6>
              <h6>Type: {this.state.post.type}</h6>
              <h6>Price: ${this.state.post.price}</h6>
              <input type="button" value="Buy" onClick={this.buy}></input>
              <input type="button" value="Barter" onClick={this.barter}></input>
            </div>
          </div>
        </div>
        <div className="detail-description">
          <br />
          <h6>Description:</h6>
          <p> {this.state.post.description}</p>
          <hr />
        </div>
        <div>
          <h6>Comments: </h6>
          {this.displayComments()}
        </div>
        <div className="detail-comment">
          <form onSubmit={this.handleSubmitComment}>
            <textarea
              className="comment_input"
              placeholder="Leave a comment!"
              onChange={this.onChangeComment}
              required
            ></textarea>
            <input type="submit" value="submit"></input>
          </form>
        </div>

        <div className={this.state.class_buy}>
          <div className="popup-content">
            Do you want buy {this.state.post.title} at ${this.state.post.price}
            <br />
            <input type="button" value="yes" onClick={this.yes}></input>
            <input type="button" value="no" onClick={this.no}></input>
          </div>
        </div>
        <div className={this.state.class_message}>
          <div className="popup-content">
            Already purchased {this.state.title}
            <br />
            <input type="button" value="back" onClick={this.back}></input>
          </div>
        </div>
        <div className={this.state.class_alert}>
          <div className="popup-content">
            This is your own item!
            <br />
            <input type="button" value="back" onClick={this.back_alert}></input>
          </div>
        </div>

        <div className={this.state.class_popup_barter}>
          <div className="popup-content">
            Do you want to send a barter offer to {this.state.post.author}
            <br />
            <input type="button" value="yes" onClick={this.barter_yes}></input>
            <input type="button" value="no" onClick={this.barter_no}></input>
          </div>
        </div>
        <div className={this.state.class_alert_barter}>
          <div className="popup-content">
            Can't barter with yourself!
            <br />
            <input
              type="button"
              value="back"
              onClick={this.barter_back_alert}
            ></input>
          </div>
        </div>
      </div>
    );
  }
}
