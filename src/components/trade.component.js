import axios from "axios";
import React, { Component } from "react";

export default class Trade extends Component {
  constructor(props) {
    super(props);
    this.state = {
      creator_post_buy: [{ title: "" }],
      creator_post_sell: [{ title: "" }],
      recipient_post_buy: [{ title: "" }],
      recipient_post_sell: [{ title: "" }],
      creator_offer_item: [],
      recipient_offer_item: [],
      popup1_class: "popup-hide",
      popup2_class: "popup-hide",
      tr_class_creator: [],
      tr_class_recipient: [],
      div_class_creator: [],
      div_class_recipient: [],
      currency_creator: 0,
      currency_recipient: 0,
      totalValue_creator: 0,
      totalValue_recipient: 0,
      message: "",
      class_message: "hide",
    };
    this.popup1_open = this.popup1_open.bind(this);
    this.popup1_close = this.popup1_close.bind(this);
    this.popup2_open = this.popup2_open.bind(this);
    this.popup2_close = this.popup2_close.bind(this);
    this.addToOffer_creator = this.addToOffer_creator.bind(this);
    this.removeFromOffer_creator = this.removeFromOffer_creator.bind(this);
    this.displayAddedItem_creator = this.displayAddedItem_creator.bind(this);
    this.addToOffer_recipient = this.addToOffer_recipient.bind(this);
    this.removeFromOffer_recipient = this.removeFromOffer_recipient.bind(this);
    this.displayAddedItem_recipient = this.displayAddedItem_recipient.bind(
      this
    );
    this.define_tr_creator = this.define_tr_creator.bind(this);
    this.define_tr_recipient = this.define_tr_recipient.bind(this);
    this.onChangeCurrencyCreator = this.onChangeCurrencyCreator.bind(this);
    this.onChangeCurrencyRecipient = this.onChangeCurrencyRecipient.bind(this);
    this.onChangeMessage = this.onChangeMessage.bind(this);
    this.sendOffer = this.sendOffer.bind(this);
    this.closeMessage = this.closeMessage.bind(this);
  }

  componentDidMount() {
    this.retriveData();
  }

  retriveData() {
    // axios
    //   .post("http://localhost:4000/post/find", {
    //     author: localStorage.getItem("user"),
    //     type: "buy",
    //   })
    //   .then((res) => {
    //     this.setState({
    //       creator_post_buy: res.data,
    //     });
    //   });

    // axios
    // .post("http://localhost:4000/post/find", {
    //   author: this.props.match.params.username,
    //   type: "buy",
    // })
    // .then((res) => {
    //   this.setState({
    //     recipient_post_buy: res.data,
    //   });
    // });

    axios
      .post("http://localhost:4000/post/find/status", {
        author: localStorage.getItem("user"),
        type: "sell",
        status: "available",
      })
      .then((res) => {
        this.setState({
          creator_post_sell: res.data,
        });
      })
      //add index to array
      .then(() => {
        let tempCreatorSell = this.state.creator_post_sell;
        tempCreatorSell.map((data, index) => {
          data.No = index;
        });
        this.setState({
          creator_post_sell: tempCreatorSell,
        });
      });

    axios
      .post("http://localhost:4000/post/find/status", {
        author: this.props.match.params.username,
        type: "sell",
        status: "available",
      })
      .then((res) => {
        this.setState({
          recipient_post_sell: res.data,
        });
      })
      .then(() => {
        let tempRecipientSell = this.state.recipient_post_sell;
        tempRecipientSell.map((data, index) => {
          data.No = index;
        });
        this.setState({
          recipient_post_sell: tempRecipientSell,
        });
      });
  }

  popup1_open() {
    if (this.state.popup1_class == "popup-hide") {
      this.setState({
        popup1_class: "popup",
      });
    }
  }

  popup2_open() {
    if (this.state.popup2_class == "popup-hide") {
      this.setState({
        popup2_class: "popup",
      });
    }
  }

  popup1_close() {
    this.setState({
      popup1_class: "popup-hide",
    });
  }

  popup2_close() {
    this.setState({
      popup2_class: "popup-hide",
    });
  }

  addToOffer_creator(data, index) {
    //Create a temperary variable to push new elements to array in React
    let tempItem = this.state.creator_offer_item;
    tempItem.push(this.state.creator_post_sell[index]);
    let tempTrClass = this.state.tr_class_creator;
    tempTrClass[index] = "hide";
    let tempDivClass = this.state.div_class_creator;
    tempDivClass[index] = "";
    let tempTotalValue = this.state.totalValue_creator;
    tempTotalValue = tempTotalValue + data.price;
    this.setState({
      creator_offer_item: tempItem,
      tr_class_creator: tempTrClass,
      div_class_creator: tempDivClass,
      totalValue_creator: tempTotalValue,
    });
  }

  addToOffer_recipient(data, index) {
    let tempItem = this.state.recipient_offer_item;
    tempItem.push(this.state.recipient_post_sell[index]);
    let tempTrClass = this.state.tr_class_recipient;
    tempTrClass[index] = "hide";
    let tempDivClass = this.state.div_class_recipient;
    tempDivClass[index] = "";
    let tempTotalValue = this.state.totalValue_recipient;
    tempTotalValue = tempTotalValue + data.price;
    this.setState({
      recipient_offer_item: tempItem,
      tr_class_recipient: tempTrClass,
      div_class_recipient: tempDivClass,
      totalValue_recipient: tempTotalValue,
    });
  }

  removeFromOffer_creator(data, index) {
    let tempDivClass = this.state.div_class_creator;
    tempDivClass.splice(index, 1);
    let tempItem = this.state.creator_offer_item;
    tempItem.splice(index, 1);
    let tempTrClass = this.state.tr_class_creator;
    tempTrClass[data.No] = "";
    let tempTotalValue = this.state.totalValue_creator;
    tempTotalValue = tempTotalValue - data.price;
    this.setState({
      creator_offer_item: tempItem,
      div_class_creator: tempDivClass,
      tr_class_creator: tempTrClass,
      totalValue_creator: tempTotalValue,
    });
  }

  removeFromOffer_recipient(data, index) {
    let tempDivClass = this.state.div_class_recipient;
    tempDivClass.splice(index, 1);
    let tempItem = this.state.recipient_offer_item;
    tempItem.splice(index, 1);
    let tempTrClass = this.state.tr_class_recipient;
    tempTrClass[data.No] = "";
    let tempTotalValue = this.state.totalValue_recipient;
    tempTotalValue = tempTotalValue - data.price;
    this.setState({
      recipient_offer_item: tempItem,
      div_class_recipient: tempDivClass,
      tr_class_recipient: tempTrClass,
      totalValue_recipient: tempTotalValue,
    });
  }

  displayAddedItem_creator() {
    return this.state.creator_offer_item.map((data, index) => {
      return (
        <div className="trade-window-div-add">
          <div className={this.state.div_class_creator[index]}>
            <img className="trade-window-img" src={data.image}></img>
            <p>{data.title}</p>
            <input
              type="button"
              className="trade-window-cancel"
              value="remove"
              onClick={() => this.removeFromOffer_creator(data, index)}
            ></input>
          </div>
        </div>
      );
    });
  }

  displayAddedItem_recipient() {
    return this.state.recipient_offer_item.map((data, index) => {
      return (
        <div className="trade-window-div-add">
          <div className={this.state.div_class_recipient[index]}>
            <img className="trade-window-img" src={data.image}></img>
            <p>{data.title}</p>
            <input
              type="button"
              className="trade-window-cancel"
              value="remove"
              onClick={() => this.removeFromOffer_recipient(data, index)}
            ></input>
          </div>
        </div>
      );
    });
  }

  define_tr_creator() {
    return this.state.creator_post_sell.map((data, index) => {
      return (
        <tr className={this.state.tr_class_creator[index]}>
          <td>{data.title}</td>
          <td>{data.price}</td>
          <td>
            <button onClick={() => this.addToOffer_creator(data, index)}>
              Add to offer
            </button>
          </td>
        </tr>
      );
    });
  }

  define_tr_recipient() {
    return this.state.recipient_post_sell.map((data, index) => {
      return (
        <tr className={this.state.tr_class_recipient[index]}>
          <td>{data.title}</td>
          <td>{data.price}</td>
          <td>
            <button onClick={() => this.addToOffer_recipient(data, index)}>
              Add to offer
            </button>
          </td>
        </tr>
      );
    });
  }

  onChangeCurrencyCreator(e) {
    this.setState({
      currency_creator: e.target.value,
    });
  }

  onChangeCurrencyRecipient(e) {
    this.setState({
      currency_recipient: e.target.value,
    });
  }

  onChangeMessage(e) {
    this.setState({
      message: e.target.value,
    });
  }

  sendOffer() {
    let offer = {
      creator: localStorage.getItem("user"),
      creatorItems: this.state.creator_offer_item,
      creatorCurrency: this.state.currency_creator,
      recipient: this.props.match.params.username,
      recipientItems: this.state.recipient_offer_item,
      recipientCurrency: this.state.currency_recipient,
      status: "in progress",
      message: this.state.message,
    };
    axios.post("http://localhost:4000/offer/add", offer).then((res) => {});
    for (let i = 0; i < this.state.creator_offer_item.length; i++) {
      axios.post(
        "http://localhost:4000/post/update/status/" +
          this.state.creator_offer_item[i]._id,
        { status: "temporarily unavailable" }
      );
    }

    this.setState({
      class_message: "popup",
    });
  }

  closeMessage() {
    this.setState({
      class_message: "hide",
      creator_offer_item: [],
      recipient_offer_item: [],
      currency_creator: 0,
      currency_recipient: 0,
      totalValue_creator: 0,
      totalValue_recipient: 0,
      message: "",
    });
  }

  render() {
    return (
      <div className="trade">
        <div className="trade-window1">
          <h6>Your items</h6>
          <hr />
          {this.displayAddedItem_creator()}

          <div className="trade-window-div-add">
            <div className="trade-window-div">
              <button onClick={this.popup1_open} className="trade-window-add">
                <span>+</span>
              </button>
            </div>
          </div>
          <h6 className="totalValue">
            Total value: ${this.state.totalValue_creator}
          </h6>
          <hr />
          <h6>Your currency</h6>
          <span>$</span>
          <input
            type="number"
            min="0"
            value={this.state.currency_creator}
            onChange={this.onChangeCurrencyCreator}
          />
          <hr />
          <h6>Include a message in your request</h6>
          <textarea
            rows="4"
            cols="40"
            value={this.state.message}
            onChange={this.onChangeMessage}
          />
        </div>

        <div className={this.state.popup1_class}>
          <div className="popup-content">
            <h6>You are selling:</h6>
            <table>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
              {this.define_tr_creator()}
            </table>
          </div>
          <button onClick={this.popup1_close}> Close </button>
        </div>

        <div className="trade-middle">
          <img></img>
          <input type="button" value="send offer" onClick={this.sendOffer} />
        </div>

        <div className="trade-window2">
          <h6>Their items</h6>
          <hr />
          {this.displayAddedItem_recipient()}
          <div className="trade-window-div-add">
            <div className="trade-window-div">
              <button onClick={this.popup2_open} className="trade-window-add">
                <span>+</span>
              </button>
            </div>
          </div>
          <h6 className="totalValue">
            Total value: ${this.state.totalValue_recipient}
          </h6>
          <hr />
          <h6>Their currency</h6>
          <span>$</span>
          <input
            type="number"
            min="0"
            value={this.state.currency_recipient}
            onChange={this.onChangeCurrencyRecipient}
          />
        </div>

        <div className={this.state.popup2_class}>
          <div className="popup-content">
            <h6>They are selling:</h6>
            <table>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
              {this.define_tr_recipient()}
            </table>
          </div>
          <button onClick={this.popup2_close}> Close </button>
        </div>

        <div className={this.state.class_message}>
          <div className="popup-content">
            <h6>Offer sent!</h6>
            <input
              type="button"
              value="close"
              onClick={this.closeMessage}
            ></input>
          </div>
        </div>
      </div>
    );
  }
}
