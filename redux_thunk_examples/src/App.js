import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";
import logo from "./logo.svg";
import axios from 'axios';
import * as actionCreator from "./store/actions/actions";
import {sendName} from "./store/actions/actions";

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      address: ""
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });

  };

  onSubmit = e => {
    //send to new https://demo-node-2019.herokuapp.com/api/testPost, 
    //then change the state name, then console log the response. 
    e.preventDefault();
    const newCustomer = {
      name : this.state.name,
      address : this.state.address
    }
   
    this.props.sendName(newCustomer)

  };

  componentDidMount() {
    //how to measure rest call
    // console.time("REST-CAll");
    // this.props.changeName();
    // var end = new Date().getTime();
    // console.timeEnd("REST-CAll");
  }

  render() {
    const prettyJson = JSON.stringify(this.props, null, 4);

    return (
      <div className="App">
        <div className="Age-label">
          your age: <span>{this.props.age}</span>
          <br />
          is a potato?:{" "}
          <span>
            <pre>{prettyJson}</pre>
          </span>
          <form onSubmit={this.onSubmit}>
            <input onChange={this.onChange} name="name" type="text" placeholder="enter name here"/>
            <input onChange={this.onChange} name="address" type="text" placeholder="enter address here"/>
            <input type="submit"/>
          </form>
        </div>
        <button onClick={this.props.onAgeUp}>Age UP</button>
        <button onClick={this.props.onAgeDown}>Age Down</button>
        <button onClick={this.props.changeName}>change name</button>
        {this.props.loading && <img src={logo} className="App-logo" />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    age: state.age,
    loading: state.loading,
    potato: state.potato,
    name: state.name,
    address : state.address
  };
};

const mapDispachToProps = dispatch => {
  return {
    onAgeUp: () => dispatch(actionCreator.ageUp(10)),
    onAgeDown: () => dispatch(actionCreator.ageDown(5)),
    changeName: () => dispatch(actionCreator.changeName("potato")),
   // sendName : () => dispatch(actionCreator.sendName(this.state))
  };
};
export default connect(
  mapStateToProps,
  {sendName}
)(App);
