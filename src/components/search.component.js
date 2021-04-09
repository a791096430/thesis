import React, { Component } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

var Authors = [];

const Results = (props) => (
  <div className="Post">
    <h6>
      {props.result.type}
      &ensp;&ensp;
      <Link to={"/detail/" + props.result._id}>{props.result.title}</Link>
      &ensp;&ensp;{props.result.condition}
      &ensp;&ensp;&ensp;&ensp;
      {props.result.createdAt.slice(0, 10) +
        " " +
        props.result.createdAt.slice(11, 16)}
    </h6>
    <div className="post-gallery">
      <div className="post-gallery-images">
        <img width="150" height="150" src={props.result.image} />
      </div>
      <div className="post-gallery-info">
        <img
          className="search-author"
          src="https://shuminye.neocities.org/thesis/post/profile.png"
        />
        <Link to={"/rating/" + props.result.author}>{props.result.author}</Link>
      </div>
    </div>
    <h6 className="post-geoprice-info">
      {props.result.address} {props.result.address} &ensp; &ensp; &ensp; $
      {props.result.price}
    </h6>
  </div>
);

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //two results one store all results one store results filtered out
      shownResults: [],
      results: [],
      authors: [],
      value_type: "",
      filter_type: "",
      filters: { status: "available" },
    };
    this.onChangeFilterType = this.onChangeFilterType.bind(this);
    this.onChangeFilterCondition = this.onChangeFilterCondition.bind(this);
    this.onChangeFilterStatus = this.onChangeFilterStatus.bind(this);
    this.onChangeFilterPriceMin = this.onChangeFilterPriceMin.bind(this);
    this.onChangeFilterPriceMax = this.onChangeFilterPriceMax.bind(this);
    this.onChangeFilterCategory = this.onChangeFilterCategory.bind(this);
    this.typeFilter = this.typeFilter.bind(this);
    this.applyFilters = this.applyFilters.bind(this);
  }

  componentDidMount() {
    axios
      .post(
        "http://localhost:4000/post/search/" + this.props.match.params.keyword
      )
      .then((res) => {
        this.setState({
          shownResults: res.data,
          results: res.data,
        });
      })
      .then(() => {
        this.applyFilters();
        this.state.results.map((result) => {
          axios
            .get("http://localhost:4000/user/" + result.author)
            .then((res) => {
              Authors.push(res.data);
            });
        });
      });
  }

  result() {
    return this.state.shownResults.map((currentResult, index) => {
      return <Results result={currentResult} author={Authors[index]} />;
    });
  }

  typeFilter(result, filter) {
    if (filter !== "all" && result.type === filter) {
      return result;
    } else if (filter === "all") {
      return result;
    }
  }

  onChangeFilterType(e) {
    let tempFilter = this.state.filters;
    tempFilter.type = e.target.value;
    this.applyFilters();
  }

  onChangeFilterCondition(e) {
    let tempFilter = this.state.filters;
    tempFilter.condition = e.target.value;
    this.applyFilters();
  }

  onChangeFilterStatus(e) {
    let tempFilter = this.state.filters;
    tempFilter.status = e.target.value;
    this.applyFilters();
  }

  onChangeFilterCategory(e) {
    let tempFilter = this.state.filters;
    tempFilter.category = e.target.value;
    this.applyFilters();
  }

  onChangeFilterPriceMin(e) {
    let tempFilter = this.state.filters;
    if (e.target.value >= 0) {
      tempFilter.minPrice = e.target.value;
    }
    this.applyFilters();
  }

  onChangeFilterPriceMax(e) {
    let tempFilter = this.state.filters;
    if (e.target.value > 0) {
      tempFilter.maxPrice = e.target.value;
    }
    if (!e.target.value) {
      tempFilter.maxPrice = 999999;
    }
    console.log(e.target.value);
    this.applyFilters();
  }

  applyFilters() {
    let tempFilter = this.state.filters;
    let filteredResult = this.state.results;
    //apply multiple filters at one time
    if (tempFilter.condition) {
      filteredResult = filteredResult.filter((result) => {
        if (result.condition === tempFilter.condition) {
          return result;
        }
      });
    }

    if (tempFilter.category) {
      filteredResult = filteredResult.filter((result) => {
        if (result.category === tempFilter.category) {
          return result;
        }
      });
    }

    if (tempFilter.status) {
      filteredResult = filteredResult.filter((result) => {
        if (result.status === tempFilter.status) {
          return result;
        }
      });
    }

    if (tempFilter.type) {
      filteredResult = filteredResult.filter((result) => {
        if (result.type === tempFilter.type) {
          return result;
        }
      });
    }

    if (tempFilter.minPrice >= 0) {
      filteredResult = filteredResult.filter((result) => {
        if (result.price >= tempFilter.minPrice) {
          return result;
        }
      });
    }

    if (tempFilter.maxPrice >= 0) {
      filteredResult = filteredResult.filter((result) => {
        if (result.price <= tempFilter.maxPrice) {
          return result;
        }
      });
    }

    this.setState({
      shownResults: filteredResult,
    });
  }

  render() {
    return (
      <div className="search">
        <div className="container-fluid">
          <div className="row" id="fs_app">
            <div className="contents">
              <form>
                <span className="heading">By Price</span>
                <br />
                <label for="min">min</label>
                <input
                  type="number"
                  id="min"
                  name="type"
                  onChange={this.onChangeFilterPriceMin}
                  min="0"
                  className="filter_price"
                />
                <br />
                <label for="max">max</label>
                <input
                  type="number"
                  id="max"
                  name="type"
                  onChange={this.onChangeFilterPriceMax}
                  max="999999"
                  className="filter_price"
                />
              </form>
              <hr />
            </div>

            <div className="contents">
              <form>
                <span className="heading">By Type &nbsp;&nbsp;</span>
                <br />
                <input
                  type="radio"
                  id="all"
                  name="type"
                  value=""
                  onChange={this.onChangeFilterType}
                  defaultChecked
                />
                <label for="all">all</label>
                <br />
                <input
                  type="radio"
                  id="buy"
                  name="type"
                  value="buy"
                  onChange={this.onChangeFilterType}
                />
                <label for="buy">buy</label>
                <br />
                <input
                  type="radio"
                  id="sell"
                  name="type"
                  value="sell"
                  onChange={this.onChangeFilterType}
                />
                <label for="sell">sell</label>
              </form>
              <hr />
            </div>

            <div className="contents">
              <form>
                <span className="heading">By Category</span>
                <br />
                <input
                  type="radio"
                  id="all"
                  name="category"
                  value=""
                  onChange={this.onChangeFilterCategory}
                  defaultChecked
                />
                <label for="all">all</label>
                <br />
                <input
                  type="radio"
                  id="electronic"
                  name="category"
                  value="electronic"
                  onChange={this.onChangeFilterCategory}
                />
                <label for="electronic">electronic</label>
                <br />
                <input
                  type="radio"
                  id="kitchen"
                  name="category"
                  value="kitchen"
                  onChange={this.onChangeFilterCategory}
                />
                <label for="kitchen">kitchen</label>
                <br />
                <input
                  type="radio"
                  id="furniture"
                  name="category"
                  value="furniture"
                  onChange={this.onChangeFilterCategory}
                />
                <label for="furniture">furniture</label>
                <br />
                <input
                  type="radio"
                  id="home"
                  name="category"
                  value="home"
                  onChange={this.onChangeFilterCategory}
                />
                <label for="home">home</label>
              </form>
              <hr />
            </div>

            <div className="contents">
              <form>
                <span className="heading">By Condition</span>
                <br />
                <input
                  type="radio"
                  id="all"
                  name="condition"
                  value=""
                  onChange={this.onChangeFilterCondition}
                  defaultChecked
                />
                <label for="all">all</label>
                <br />
                <input
                  type="radio"
                  id="brand new"
                  name="condition"
                  value="brand new"
                  onChange={this.onChangeFilterCondition}
                />
                <label for="brand new">brand new</label>
                <br />
                <input
                  type="radio"
                  id="like new"
                  name="condition"
                  value="like new"
                  onChange={this.onChangeFilterCondition}
                />
                <label for="like new">like new</label>
                <br />
                <input
                  type="radio"
                  id="good"
                  name="condition"
                  value="good"
                  onChange={this.onChangeFilterCondition}
                />
                <label for="good">good</label>
                <br />
                <input
                  type="radio"
                  id="fair"
                  name="condition"
                  value="fair"
                  onChange={this.onChangeFilterCondition}
                />
                <label for="fair">fair</label>
                <br />
                <input
                  type="radio"
                  id="poor"
                  name="condition"
                  value="poor"
                  onChange={this.onChangeFilterCondition}
                />
                <label for="poor">poor</label>
              </form>
              <hr />
            </div>
          </div>
        </div>
        {this.result()}
      </div>
    );
  }
}
