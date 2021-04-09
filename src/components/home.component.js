import React, { Component } from "react";
import "./style.css";
export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  Category_electronic(e) {
    window.location.replace("http://localhost:3000/search/electronic");
  }

  Category_kitchenUtensils(e) {
    window.location.replace("http://localhost:3000/search/kitchen");
  }

  Category_furniture(e) {
    window.location.replace("http://localhost:3000/search/furniture");
  }

  Category_home(e) {
    window.location.replace("http://localhost:3000/search/home");
  }

  render() {
    return (
      <div className="home">
        <div className="catFirstRow">
          <div className="responsive">
            <div className="categories">
              <a onClick={this.Category_electronic}>
                <img
                  className="home-category"
                  src="https://shuminye.neocities.org/thesis/electronic.png"
                />
              </a>
              <br />
              <h5 className="home-category">Electronic</h5>
            </div>
          </div>
          <div className="responsive">
            <div className="categories">
              <a onClick={this.Category_kitchenUtensils}>
                <img src="https://shuminye.neocities.org/thesis/kitchen%20utensils.jpg" />
              </a>
              <br />
              <h5 className="home-category">Kitchen</h5>
            </div>
          </div>
        </div>

        <div className="catSecondRow">
          <div className="responsive">
            <div className="categories">
              <a onClick={this.Category_furniture}>
                <img src="https://shuminye.neocities.org/thesis/furniture.jpg" />
              </a>
              <br />
              <h5 className="home-category">Furniture</h5>
            </div>
          </div>
          <div className="responsive">
            <div className="categories">
              <a onClick={this.Category_home}>
                <img src="https://shuminye.neocities.org/thesis/home.jpg" />
              </a>
              <br />
              <h5 className="home-category">Home</h5>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
