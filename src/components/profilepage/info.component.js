import React, { Component } from "react";
import axios from "axios";

export default class Profile_Info extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { username: "" },
      user_positiveComment: [],
      user_history: [{}],
    };
    this.positiveComment = this.positiveComment.bind(this);
    this.history = this.history.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/user/" + localStorage.getItem("user"))
      .then((res) => {
        this.setState({
          user: res.data,
        });
      });

    axios
      .get(
        "http://localhost:4000/post/find/sellerOrBuyer/" +
          localStorage.getItem("user")
      )
      .then((res) => {
        this.setState({
          user_history: res.data,
        });
      });
  }

  positiveComment() {
    return this.state.user_positiveComment.map((data, index) => {
      return (
        <p>
          {data},{index}
        </p>
      );
    });
  }

  history() {
    return this.state.user_history.map((data, index) => {
      return (
        <tr>
          <td>{data.title}</td>
          <td>{data.type}</td>
          <td>{data.price}</td>
          <td>{data.author}</td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div>
        <div className="profile-profile-info">
          <hr />
          username:
          <br />
          {this.state.user.username}
          <hr />
          email:
          <br />
          {this.state.user.email}
          <hr />
          address:
          <br />
          {this.state.user.address}
          <hr />
          phone:
          <br />
          {this.state.user.phone}
          <hr />
          neighborhood:
          <br />
          {this.state.user.neighborhood}
          <hr />
        </div>
        <div>
          <h6>Trade history</h6>
          <table>
            <tr>
              <th>Item</th>
              <th>Type</th>
              <th>Price</th>
              <th>Seller</th>
            </tr>
            {this.history()}
          </table>
        </div>
      </div>
    );
  }
}
