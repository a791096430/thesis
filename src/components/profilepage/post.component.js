import React, { Component } from "react";
import axios from "axios";

export default class Profile_Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      type: "sell",
      price: 0,
      condition: "brand new",
      description: "",
      category: "electronic",
      image: "",
      post_sell: [],
      post_buy: [],
      class_edit: "hide",
      class_delete: "hide",
      class_new: "hide",
      post_beingEdited: {},
      post_beingDeleted: {},
      post_beingReviewed: {},
      post_beingCommented: {},
      edit_title: "",
      edit_type: "sell",
      edit_price: 0,
      edit_condition: "brand new",
      edit_description: "",
      edit_id: "",
      edit_image: "",
      edit_category: "electronic",
      class_message_edit: "hide",
      class_message_delete: "hide",
      class_message_new: "hide",
      class_message_comment: "hide",
      class_div_selling: "profile-post-selling",
      class_div_buying: "profile-post-buying",
      class_div_new: "profile-post-new",
      class_review: "hide",
      class_comment: "hide",
      comment: "",
      comment_attitude: "positive",
    };
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeType = this.handleChangeType.bind(this);
    this.handleChangePrice = this.handleChangePrice.bind(this);
    this.handleChangeCondition = this.handleChangeCondition.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleChangeImage = this.handleChangeImage.bind(this);
    this.handleSubmitNewPost = this.handleSubmitNewPost.bind(this);
    this.displaySellPosts = this.displaySellPosts.bind(this);
    this.displayBuyPosts = this.displayBuyPosts.bind(this);
    this.openEdit = this.openEdit.bind(this);
    this.closeEdit = this.closeEdit.bind(this);
    this.openDelete = this.openDelete.bind(this);
    this.closeDelete = this.closeDelete.bind(this);

    this.handleChangeEditTitle = this.handleChangeEditTitle.bind(this);
    this.handleChangeEditType = this.handleChangeEditType.bind(this);
    this.handleChangeEditPrice = this.handleChangeEditPrice.bind(this);
    this.handleChangeEditCondition = this.handleChangeEditCondition.bind(this);
    this.handleChangeEditImage = this.handleChangeEditImage.bind(this);
    this.handleChangeEditDescription = this.handleChangeEditDescription.bind(
      this
    );
    this.handleSubmitEditPost = this.handleSubmitEditPost.bind(this);
    this.openNewPost = this.openNewPost.bind(this);
    this.closeNew = this.closeNew.bind(this);
    this.EditPost = this.EditPost.bind(this);
    this.closeMessageEdit = this.closeMessageEdit.bind(this);
    this.delete = this.delete.bind(this);
    this.closeMessageDelete = this.closeMessageDelete.bind(this);
    this.closeMessageNew = this.closeMessageNew.bind(this);
    this.openDetail = this.openDetail.bind(this);
    this.closeDetail = this.closeDetail.bind(this);
    this.openComment = this.openComment.bind(this);
    this.closeComment = this.closeComment.bind(this);
    this.handleChangeComment = this.handleChangeComment.bind(this);
    this.handleSubmitComment = this.handleSubmitComment.bind(this);
    this.handleChangeAttitude = this.handleChangeAttitude.bind(this);
    this.closeMessageComment = this.closeMessageComment.bind(this);
    this.handleChangeCategory = this.handleChangeCategory.bind(this);
    this.handleChangeEditCategory = this.handleChangeEditCategory.bind(this);
  }

  componentDidMount() {
    this.retriveData();
  }

  retriveData() {
    axios
      .post("http://localhost:4000/post/find/type", {
        author: localStorage.getItem("user"),
        type: "sell",
      })
      .then((res) => {
        this.setState({
          post_sell: res.data,
        });
      });
    axios
      .post("http://localhost:4000/post/find/type", {
        author: localStorage.getItem("user"),
        type: "buy",
      })
      .then((res) => {
        this.setState({
          post_buy: res.data,
        });
      });
  }

  handleChangeTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }

  handleChangeEditTitle(e) {
    this.setState({
      edit_title: e.target.value,
    });
  }

  handleChangeType(e) {
    this.setState({
      type: e.target.value,
    });
  }

  handleChangeEditType(e) {
    this.setState({
      edit_type: e.target.value,
    });
  }

  handleChangeImage(e) {
    this.setState({
      image: e.target.value,
    });
  }

  handleChangeEditImage(e) {
    this.setState({
      edit_image: e.target.value,
    });
  }

  handleChangeCategory(e) {
    this.setState({
      category: e.target.value,
    });
  }

  handleChangeEditCategory(e) {
    this.setState({
      edit_category: e.target.value,
    });
  }

  handleChangePrice(e) {
    this.setState({
      price: e.target.value,
    });
  }

  handleChangeEditPrice(e) {
    this.setState({
      edit_price: e.target.value,
    });
  }

  handleChangeCondition(e) {
    this.setState({
      condition: e.target.value,
    });
  }

  handleChangeEditCondition(e) {
    this.setState({
      edit_condition: e.target.value,
    });
  }

  handleChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  handleChangeEditDescription(e) {
    this.setState({
      edit_description: e.target.value,
    });
  }

  handleChangeComment(e) {
    this.setState({
      comment: e.target.value,
    });
  }

  handleChangeAttitude(e) {
    this.setState({
      comment_attitude: e.target.value,
    });
  }

  handleSubmitNewPost(e) {
    e.preventDefault();
    let status = "available";
    let post = {
      title: this.state.title,
      author: localStorage.getItem("user"),
      type: this.state.type,
      price: this.state.price,
      status: status,
      condition: this.state.condition,
      description: this.state.description,
      category: this.state.category,
      image: this.state.image,
    };
    axios.post("http://localhost:4000/post/add", post).then(() => {
      this.setState({
        class_message_new: "",
        class_div_selling: "hide",
        class_div_buying: "hide",
        class_div_new: "hide",
        class_new: "hide",
      });
    });
    console.log(post);
  }

  handleSubmitEditPost(e) {
    e.preventDefault();
    let post = {
      title: this.state.edit_title,
      type: this.state.edit_type,
      price: this.state.edit_price,
      condition: this.state.edit_condition,
      description: this.state.edit_description,
      category: this.state.edit_category,
      image: this.state.edit_image,
    };
    axios
      .post(
        "http://localhost:4000/post/update/info/" + this.state.edit_id,
        post
      )
      .then(() => {
        this.setState({
          class_message_edit: "",
          class_div_selling: "hide",
          class_div_buying: "hide",
          class_div_new: "hide",
          class_edit: "hide",
        });
      });
    console.log(post);
  }

  handleSubmitComment(e) {
    e.preventDefault();
    let attitude = this.state.comment_attitude;
    let user = this.state.post_beingCommented.sellerOrBuyer;
    let comment = {
      user: localStorage.getItem("user"),
      postTitle: this.state.post_beingCommented.title,
      postId: this.state.post_beingCommented._id,
      comment: this.state.comment,
      postType: this.state.post_beingCommented.type,
    };
    if (attitude == "positive") {
      axios
        .post("http://localhost:4000/user/update/positiveComment/" + user, {
          comment: comment,
        })
        .then((res) => {
          console.log(res);
        })
        .then(() => {
          axios.post(
            "http://localhost:4000/post/update/status/" +
              this.state.post_beingCommented._id,
            { status: "commented" }
          );
        });

      this.setState({
        class_message_comment: "",
        class_div_selling: "hide",
        class_div_buying: "hide",
        class_div_new: "hide",
        class_comment: "hide",
      });
    } else {
      axios
        .post("http://localhost:4000/user/update/negativeComment/" + user, {
          comment: comment,
        })
        .then(() => {
          axios.post(
            "http://localhost:4000/post/update/status/" +
              this.state.post_beingCommented._id,
            { status: "commented" }
          );
        });

      this.setState({
        class_message_comment: "",
        class_div_selling: "hide",
        class_div_buying: "hide",
        class_div_new: "hide",
        class_comment: "hide",
      });
    }
  }

  displaySellPosts() {
    return this.state.post_sell.map((data) => {
      return (
        <tr>
          <td>{data.title}</td>
          <td>{data.price}</td>
          <td>{data.status}</td>
          {this.actions(data)}
        </tr>
      );
    });
  }

  displayBuyPosts() {
    return this.state.post_buy.map((data) => {
      return (
        <tr>
          <td>{data.title}</td>
          <td>{data.price}</td>
          <td>{data.status}</td>
          {this.actions(data)}
        </tr>
      );
    });
  }

  actions(data) {
    if (data.status == "available") {
      return (
        <td>
          <input
            type="button"
            onClick={() => this.openEdit(data)}
            value="Edit"
          ></input>
          <input
            type="button"
            onClick={() => this.openDelete(data)}
            value="Delete"
          ></input>
        </td>
      );
    } else if (data.status == "temporarily unavailable") {
      return (
        <tr>
          <input
            type="button"
            onClick={() => this.openDetail(data)}
            value="Detail"
          ></input>
        </tr>
      );
    } else if (data.status == "dealt") {
      return (
        <tr>
          <input
            type="button"
            onClick={() => this.openDetail(data)}
            value="Detail"
          ></input>
          <input
            type="button"
            onClick={() => this.openComment(data)}
            value="Comment"
          ></input>
        </tr>
      );
    } else if (data.status == "commented") {
      return (
        <tr>
          <input
            type="button"
            onClick={() => this.openDetail(data)}
            value="Detail"
          ></input>
        </tr>
      );
    }
  }

  openEdit(data) {
    this.setState({
      class_edit: "popup-edit",
      edit_title: data.title,
      edit_type: data.type,
      edit_price: data.price,
      edit_condition: data.condition,
      edit_description: data.description,
      edit_id: data._id,
      edit_image: data.image,
    });
  }

  openDetail(data) {
    this.setState({
      post_beingReviewed: data,
      class_review: "popup-edit",
    });
  }

  openComment(data) {
    this.setState({
      post_beingCommented: data,
      class_comment: "popup-edit",
    });
  }

  EditPost() {
    return (
      <div className="popup-edit-content">
        <h6>Edit post:</h6>
        <form onSubmit={this.handleSubmitEditPost}>
          <div className="form-group">
            <label for="title">Title: </label>
            <input
              id="title"
              value={this.state.edit_title}
              onChange={this.handleChangeEditTitle}
              required
            ></input>
          </div>

          <div className="form-group">
            <label for="image">Image URL: </label>
            <input
              id="image"
              value={this.state.edit_image}
              onChange={this.handleChangeEditImage}
            ></input>
          </div>

          <div className="form-group">
            <label for="type">Type: </label>
            <select
              id="type"
              value={this.state.edit_type}
              onChange={this.handleChangeEditType}
            >
              <option value="sell">sell</option>
              <option value="buy">buy</option>
            </select>
          </div>

          <div className="form-group">
            <label for="category">category: </label>
            <select
              id="category"
              value={this.state.edit_category}
              onChange={this.handleChangeEditCategory}
            >
              <option value="electronic">electronic</option>
              <option value="kitchen">kitchen</option>
              <option value="furniture">furniture</option>
              <option value="home">home</option>
            </select>
          </div>

          <div className="form-group">
            <label for="price">Price: </label>
            <input
              type="number"
              id="price"
              min="0"
              value={this.state.edit_price}
              onChange={this.handleChangeEditPrice}
            ></input>
          </div>
          <div className="form-group">
            <label for="condition">Condition: </label>
            <select
              id="condition"
              value={this.state.edit_condition}
              onChange={this.handleChangeEditCondition}
            >
              <option value="brand new">Brand New</option>
              <option value="like new">Like New</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="poor">Poor</option>
            </select>
          </div>
          <div className="form-group">
            <label for="description">Description:</label>
            <textarea
              id="description"
              value={this.state.edit_description}
              onChange={this.handleChangeEditDescription}
              required
            ></textarea>
          </div>
          <input type="submit" value="submit"></input>
        </form>
      </div>
    );
  }

  reviewDetail() {
    return (
      <div className={this.state.class_review}>
        <div className="popup-edit-content">
          <h6>item</h6>
          {this.state.post_beingReviewed.title}
          <hr />
          <h6>price</h6>
          {this.state.post_beingReviewed.price}
          <hr />
          <h6>condition</h6>
          {this.state.post_beingReviewed.condition}
          <hr />
          <h6>description</h6>
          {this.state.post_beingReviewed.description}
          <hr />
          <h6>buyer/seller</h6>
          {this.state.post_beingReviewed.sellerOrBuyer}
          <hr />
        </div>
        <input type="button" value="close" onClick={this.closeDetail}></input>
      </div>
    );
  }

  closeDetail() {
    this.setState({
      class_review: "hide",
    });
  }

  closeEdit() {
    this.setState({
      class_edit: "hide",
    });
  }

  openDelete(data) {
    this.setState({
      class_delete: "popup-delete",
      post_beingDeleted: data,
    });
  }

  deletePost() {
    return (
      <div className="popup-content">
        <h6>Do you really want to delete the post below permanently?</h6>
        <hr />
        {this.state.post_beingDeleted.title}
        <br />
        <input type="button" value="yes" onClick={this.delete}></input>
        <input type="button" value="no" onClick={this.closeDelete}></input>
      </div>
    );
  }

  delete() {
    axios
      .delete(
        "http://localhost:4000/post/delete/" + this.state.post_beingDeleted._id
      )
      .then(() => {
        this.setState({
          class_message_delete: "",
          class_div_selling: "hide",
          class_div_buying: "hide",
          class_div_new: "hide",
          class_delete: "hide",
        });
      });
  }

  closeDelete() {
    this.setState({
      class_delete: "hide",
    });
  }

  openNewPost() {
    this.setState({
      class_new: "popup-edit",
    });
  }

  closeNew() {
    this.setState({
      class_new: "hide",
    });
  }

  closeComment() {
    this.setState({
      class_comment: "hide",
    });
  }

  closeMessageEdit() {
    this.retriveData();
    this.setState({
      class_message_edit: "hide",
      class_div_selling: "profile-post-selling",
      class_div_buying: "profile-post-buying",
      class_div_new: "profile-post-new",
      class_edit: "hide",
    });
  }

  closeMessageDelete() {
    this.retriveData();
    this.setState({
      class_message_delete: "hide",
      class_div_selling: "profile-post-selling",
      class_div_buying: "profile-post-buying",
      class_div_new: "profile-post-new",
      class_delete: "hide",
    });
  }

  closeMessageNew() {
    this.retriveData();
    this.setState({
      class_message_new: "hide",
      class_div_selling: "profile-post-selling",
      class_div_buying: "profile-post-buying",
      class_div_new: "profile-post-new",
      class_new: "hide",
    });
  }

  closeMessageComment() {
    this.retriveData();
    this.setState({
      class_message_comment: "hide",
      class_div_selling: "profile-post-selling",
      class_div_buying: "profile-post-buying",
      class_div_new: "profile-post-new",
      class_comment: "hide",
    });
  }

  render() {
    return (
      <div className="profile-post">
        <div className={this.state.class_div_selling}>
          <h5>Your selling posts</h5>
          <table>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
            {this.displaySellPosts()}
          </table>
          <hr />
        </div>

        <div className={this.state.class_div_buying}>
          <h5>Your buying posts</h5>
          <table>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
            {this.displayBuyPosts()}
          </table>
          <hr />
        </div>

        {this.reviewDetail()}
        <div className={this.state.class_edit}>
          {this.EditPost()}
          <input onClick={this.closeEdit} type="button" value="close"></input>
        </div>
        <div className={this.state.class_delete}>
          <div>{this.deletePost()}</div>
        </div>
        <div className={this.state.class_div_new}>
          <input
            onClick={this.openNewPost}
            type="button"
            value="create a new post"
          ></input>
          <div className={this.state.class_new}>
            <div className="popup-edit-content">
              <form onSubmit={this.handleSubmitNewPost}>
                <div className="form-group">
                  <label for="title">Title: </label>
                  <input
                    id="title"
                    value={this.state.title}
                    onChange={this.handleChangeTitle}
                    required
                  ></input>
                </div>

                <div className="form-group">
                  <label for="image">Image URL: </label>
                  <input
                    id="image"
                    value={this.state.image}
                    onChange={this.handleChangeImage}
                    required
                  ></input>
                </div>

                <div className="form-group">
                  <label for="type">Type: </label>
                  <select
                    id="type"
                    value={this.state.type}
                    onChange={this.handleChangeType}
                  >
                    <option value="sell">sell</option>
                    <option value="buy">buy</option>
                  </select>
                </div>
                <div className="form-group">
                  <label for="category">category: </label>
                  <select
                    id="category"
                    value={this.state.category}
                    onChange={this.handleChangeCategory}
                  >
                    <option value="electronic">electronic</option>
                    <option value="kitchen">kitchen</option>
                    <option value="furniture">furniture</option>
                    <option value="home">home</option>
                  </select>
                </div>

                <div className="form-group">
                  <label for="price">Price: </label>
                  <input
                    type="number"
                    id="price"
                    min="0"
                    value={this.state.price}
                    onChange={this.handleChangePrice}
                  ></input>
                </div>
                <div className="form-group">
                  <label for="condition">Condition: </label>
                  <select
                    id="condition"
                    value={this.state.condition}
                    onChange={this.handleChangeCondition}
                  >
                    <option value="brand new">Brand New</option>
                    <option value="like new">Like New</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                    <option value="poor">Poor</option>
                  </select>
                </div>
                <div className="form-group">
                  <label for="description">Description:</label>
                  <textarea
                    id="description"
                    value={this.state.description}
                    onChange={this.handleChangeDescription}
                    required
                  ></textarea>
                </div>
                <input type="submit" value="submit"></input>
              </form>
            </div>
            <input onClick={this.closeNew} type="button" value="close"></input>
          </div>
        </div>
        <div className={this.state.class_message_edit}>
          Post updated!
          <input
            type="button"
            value="Back"
            onClick={this.closeMessageEdit}
          ></input>
        </div>
        <div className={this.state.class_message_delete}>
          Post deleted!
          <input
            type="button"
            value="Back"
            onClick={this.closeMessageDelete}
          ></input>
        </div>
        <div className={this.state.class_message_new}>
          Post createded!
          <input
            type="button"
            value="Back"
            onClick={this.closeMessageNew}
          ></input>
        </div>
        <div className={this.state.class_comment}>
          <div className="popup-edit-content">
            <form onSubmit={this.handleSubmitComment}>
              <h6>leave your comment below</h6>
              <hr />
              <select
                value={this.state.comment_attitude}
                onChange={this.handleChangeAttitude}
              >
                <option>positive</option>
                <option>negative</option>
              </select>
              <hr />
              <textarea
                value={this.state.comment}
                onChange={this.handleChangeComment}
              ></textarea>
              <br />
              <input type="submit" value="submit"></input>
            </form>
          </div>
          <input
            type="button"
            value="close"
            onClick={this.closeComment}
          ></input>
        </div>

        <div className={this.state.class_message_comment}>
          Comment added!
          <input
            type="button"
            value="Back"
            onClick={this.closeMessageComment}
          ></input>
        </div>
      </div>
    );
  }
}
