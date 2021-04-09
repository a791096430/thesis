import React, { Component } from "react";
import axios from "axios";

export default class Profile_Update extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      state: "massachusetts",
      city: "boston",
      neighborhood: "allston",
      address: "",
      phoneNumber: "",
      class_success_message: "hide",
      class_update_profile: "",
    };
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeConfirmPassword = this.handleChangeConfirmPassword.bind(
      this
    );
    this.handleChangeState = this.handleChangeState.bind(this);
    this.handleChangeCity = this.handleChangeCity.bind(this);
    this.handeChangeNeighborhood = this.handeChangeNeighborhood.bind(this);
    this.handleChangeAddress = this.handleChangeAddress.bind(this);
    this.handleChangePhoneNumber = this.handleChangePhoneNumber.bind(this);
    this.handleSubmitUpdate = this.handleSubmitUpdate.bind(this);
    this.closeMessage = this.closeMessage.bind(this);
  }

  handleChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  handleChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleChangeConfirmPassword(e) {
    this.setState({
      confirmPassword: e.target.value,
    });
  }

  handleChangeState(e) {
    this.setState({
      state: e.target.value,
    });
  }

  handleChangeCity(e) {
    this.setState({
      city: e.target.value,
    });
  }

  handeChangeNeighborhood(e) {
    this.setState({
      neighborhood: e.target.value,
    });
  }

  handleChangeAddress(e) {
    this.setState({
      address: e.target.value,
    });
  }

  handleChangePhoneNumber(e) {
    this.setState({
      phoneNumber: e.target.value,
    });
  }

  handleSubmitUpdate(e) {
    e.preventDefault();
    let update = {
      email: this.state.email,
      state: this.state.state,
      city: this.state.city,
      neighborhood: this.state.neighborhood,
      address: this.state.address,
      phone: this.state.phoneNumber,
    };
    axios
      .post(
        "http://localhost:4000/user/update/profile/" +
          localStorage.getItem("user"),
        update
      )
      .then((res) => {
        console.log(res);
      })
      .then(() => {
        this.setState({
          class_success_message: "",
          class_update_profile: "hide",
        });
      });
  }

  closeMessage() {
    this.setState({
      class_success_message: "hide",
      class_update_profile: "",
      email: "",
      state: "massachusetts",
      city: "boston",
      neighborhood: "allston",
      address: "",
      phoneNumber: "",
    });
  }

  render() {
    return (
      <div>
        <form
          onSubmit={this.handleSubmitUpdate}
          className={this.state.class_update_profile}
        >
          <table>
            <tr>
              <td>E-mail</td>
              <td>
                <input
                  type="email"
                  placeholder="exp: thesis@gmail.com"
                  value={this.state.email}
                  onChange={this.handleChangeEmail}
                  required
                ></input>
              </td>
            </tr>
            {/* <tr>
            <td>New password</td>
            <td>
              <input
                value={this.state.password}
                onChange={this.handleChangePassword}
                required
              ></input>
            </td>
          </tr>
          <tr>
            <td>Confirm password</td>
            <td>
              <input
                value={this.state.confirmPassword}
                onChange={this.handleChangeConfirmPassword}
                required
              ></input>
            </td>
          </tr> */}
            <tr>
              <td>State</td>
              <td>
                <select
                  value={this.state.state}
                  onChange={this.handleChangeState}
                >
                  <option>Massachusetts</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>City</td>
              <td>
                <select
                  value={this.state.city}
                  onChange={this.handleChangeCity}
                >
                  <option>Boston</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Neighborhood</td>
              <td>
                <select
                  value={this.state.neighborhood}
                  onChange={this.handeChangeNeighborhood}
                >
                  <option value="allston">Allston</option>
                  <option value="back bay">Back Bay</option>
                  <option value="downtown"> Downtown</option>
                  <option value="fenway">Fenway</option>
                  <option value="south end">South End</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Address</td>
              <td>
                <input
                  value={this.state.address}
                  onChange={this.handleChangeAddress}
                  required
                ></input>
              </td>
            </tr>
            <tr>
              <td>Phone Number</td>
              <td>
                <input
                  placeholder="123-456-7890"
                  value={this.state.phoneNumber}
                  onChange={this.handleChangePhoneNumber}
                  required
                ></input>
              </td>
            </tr>
          </table>
          <input type="submit" value="submit"></input>
        </form>
        <div className={this.state.class_success_message}>
          Profile updated!
          <input
            onClick={this.closeMessage}
            type="button"
            value="Go back"
          ></input>
        </div>
      </div>
    );
  }
}
