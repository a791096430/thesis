import React, { Component } from "react";
import axios from "axios";

export default class Profile_Offer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offer_sent: [{ creator: "", createdAt: "" }],
      offer_received: [{ creator: "", createdAt: "" }],
      offer_sent_displayed: {
        creatorItems: [],
        recipientItems: [],
        status: "",
      },
      offer_received_displayed: { creatorItems: [], recipientItems: [] },
      class_popup_sent: "hide",
      class_popup_received: "hide",
      class_offer_sent: "offer-sent",
      class_offer_received: "offer-received",
      class_message_accept: "hide",
      class_message_refuse: "hide",
    };
    this.displayCreatorItemsSent = this.displayCreatorItemsSent.bind(this);
    this.displayRecipientItemsSent = this.displayRecipientItemsSent.bind(this);
    this.closeSent = this.closeSent.bind(this);
    this.closeReceived = this.closeReceived.bind(this);
    this.acceptOffer = this.acceptOffer.bind(this);
    this.closeMessageAccept = this.closeMessageAccept.bind(this);
    this.refuseOffer = this.refuseOffer.bind(this);
    this.closeMessageRefuse = this.closeMessageRefuse.bind(this);
  }

  componentDidMount() {
    this.retriveData();
  }

  retriveData() {
    axios
      .post("http://localhost:4000/offer/search/creator", {
        user: localStorage.getItem("user"),
      })
      .then((res) => {
        this.setState({
          offer_sent: res.data,
        });
      });

    axios
      .post("http://localhost:4000/offer/search/recipient", {
        user: localStorage.getItem("user"),
      })
      .then((res) => {
        this.setState({
          offer_received: res.data,
        });
      });
  }

  displayOfferSent() {
    return this.state.offer_sent.map((data) => {
      return (
        <tr>
          <td>{data.recipient}</td>
          <td>{data.createdAt.substring(0, 10)}</td>
          <td>{data.createdAt.substring(11, 16)}</td>
          <td>{data.status}</td>
          <td>
            <input
              onClick={() => this.checkMoreSent(data)}
              type="button"
              value="More Info"
            ></input>
          </td>
        </tr>
      );
    });
  }

  displayOfferReceived() {
    return this.state.offer_received.map((data) => {
      return (
        <tr>
          <td>{data.creator}</td>
          <td>{data.createdAt.substring(0, 10)}</td>
          <td>{data.createdAt.substring(11, 16)}</td>
          <td>{data.status}</td>
          <td>
            <input
              onClick={() => this.response(data)}
              type="button"
              value="Response"
            ></input>
          </td>
        </tr>
      );
    });
  }

  checkMoreSent(data) {
    this.setState({
      class_popup_sent: "popup-edit",
      offer_sent_displayed: data,
    });
  }

  response(data) {
    this.setState({
      class_popup_received: "popup-edit",
      offer_received_displayed: data,
    });
  }

  displayCreatorItemsSent() {
    return this.state.offer_sent_displayed.creatorItems.map((data) => {
      return (
        <div className="trade-window-div-add">
          <img className="trade-window-img" src={data.image}></img>
          <p>{data.title}</p>
        </div>
      );
    });
  }

  displayCreatorItemsReceived() {
    return this.state.offer_received_displayed.creatorItems.map((data) => {
      return (
        <div className="trade-window-div-add">
          <img className="trade-window-img" src={data.image}></img>
          <p>{data.title}</p>
        </div>
      );
    });
  }

  displayRecipientItemsSent() {
    return this.state.offer_sent_displayed.recipientItems.map((data) => {
      return (
        <div className="trade-window-div-add">
          <img className="trade-window-img" src={data.image}></img>
          <p>{data.title}</p>
        </div>
      );
    });
  }

  displayRecipientItemsReceived() {
    return this.state.offer_received_displayed.recipientItems.map((data) => {
      return (
        <div className="trade-window-div-add">
          <img className="trade-window-img" src={data.image}></img>
          <p>{data.title}</p>
        </div>
      );
    });
  }

  closeSent() {
    this.setState({
      class_popup_sent: "hide",
    });
  }

  closeReceived() {
    this.setState({
      class_popup_received: "hide",
    });
  }

  acceptOffer() {
    let offer = this.state.offer_received_displayed;
    axios.post("http://localhost:4000/offer/updateStatus/" + offer._id, {
      status: "accepted",
    });
    for (let i = 0; i < offer.creatorItems.length; i++) {
      axios.post(
        "http://localhost:4000/post/update/status/" + offer.creatorItems[i]._id,
        { status: "dealt" }
      );
      axios.post(
        "http://localhost:4000/post/update/sellerOrBuyer/" +
          offer.creatorItems[i]._id,
        {
          sellerOrBuyer: offer.recipient,
        }
      );
    }
    for (let i = 0; i < offer.recipientItems.length; i++) {
      axios.post(
        "http://localhost:4000/post/update/status/" +
          offer.recipientItems[i]._id,
        { status: "dealt" }
      );
      axios.post(
        "http://localhost:4000/post/update/sellerOrBuyer/" +
          offer.recipientItems[i]._id,
        {
          sellerOrBuyer: offer.creator,
        }
      );
    }
    this.setState({
      class_offer_sent: "hide",
      class_offer_received: "hide",
      class_popup_received: "hide",
      class_message_accept: "",
    });
  }

  refuseOffer() {
    let offer = this.state.offer_received_displayed;
    axios.post("http://localhost:4000/offer/updateStatus/" + offer._id, {
      status: "refused",
    });
    for (let i = 0; i < offer.creatorItems.length; i++) {
      axios.post(
        "http://localhost:4000/post/update/status/" + offer.creatorItems[i]._id,
        { status: "available" }
      );
    }
    this.setState({
      class_offer_sent: "hide",
      class_offer_received: "hide",
      class_popup_received: "hide",
      class_message_refuse: "",
    });
  }

  closeMessageAccept() {
    this.retriveData();
    this.setState({
      class_offer_sent: "offer-sent",
      class_offer_received: "offer-received",
      class_message_accept: "hide",
    });
  }

  closeMessageRefuse() {
    this.retriveData();
    this.setState({
      class_offer_sent: "offer-sent",
      class_offer_received: "offer-received",
      class_message_refuse: "hide",
    });
  }

  displayOptions() {
    if (this.state.offer_received_displayed.status == "in progress") {
      return (
        <div>
          <hr />
          <h6>What is your decision?</h6>
          <input
            type="button"
            value="Accept"
            onClick={this.acceptOffer}
          ></input>
          <input
            type="button"
            value="Refuse"
            onClick={this.refuseOffer}
          ></input>
        </div>
      );
    } else {
      return (
        <div>
          <hr />
          <h6>You already responsed!</h6>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <div className={this.state.class_offer_sent}>
          <br />
          <h6>offer sent</h6>
          <hr />
          <table>
            <tr>
              <th>recipient</th>
              <th>date</th>
              <th>time</th>
              <th>status</th>
              <th>action</th>
            </tr>
            {this.displayOfferSent()}
          </table>
        </div>
        <div className={this.state.class_popup_sent}>
          <div className="popup-edit-content">
            <div className="trade-window-div-add">
              <h6>You get</h6>
              {this.displayRecipientItemsSent()}
            </div>
            <h6>currency $</h6>
            {this.state.offer_sent_displayed.recipientCurrency}
            <hr />
            <div className="trade-window-div-add">
              <h6>They get</h6>
              {this.displayCreatorItemsSent()}
            </div>
            <h6>currency $</h6>
            {this.state.offer_sent_displayed.creatorCurrency}
            <hr />
            <h6>Message you sent</h6>
            {this.state.offer_sent_displayed.message}
          </div>
          <input onClick={this.closeSent} type="button" value="Close"></input>
        </div>

        <div className={this.state.class_offer_received}>
          <br />
          <h6>offer received</h6>
          <hr />
          <table>
            <tr>
              <th>creator</th>
              <th>date</th>
              <th>time</th>
              <th>status</th>
              <th>action</th>
            </tr>
            {this.displayOfferReceived()}
          </table>
        </div>

        <div className={this.state.class_popup_received}>
          <div className="popup-edit-content">
            <div className="trade-window-div-add">
              <h6>You get</h6>
              {this.displayCreatorItemsReceived()}
            </div>
            <h6>currency $</h6>
            {this.state.offer_received_displayed.creatorCurrency}
            <hr />
            <div className="trade-window-div-add">
              <h6>They get</h6>
              {this.displayRecipientItemsReceived()}
            </div>
            <h6>currency $</h6>
            {this.state.offer_received_displayed.recipientCurrency}
            <hr />
            <h6>Message you received</h6>
            {this.state.offer_received_displayed.message}
            {this.displayOptions()}
          </div>
          <input
            onClick={this.closeReceived}
            type="button"
            value="Close"
          ></input>
        </div>

        <div className={this.state.class_message_accept}>
          offer accepted!
          <input
            type="button"
            value="back"
            onClick={this.closeMessageAccept}
          ></input>
        </div>
        <div className={this.state.class_message_refuse}>
          offer refused!
          <input
            type="button"
            value="back"
            onClick={this.closeMessageRefuse}
          ></input>
        </div>
      </div>
    );
  }
}
