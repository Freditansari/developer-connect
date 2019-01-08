import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";
import logo from "./logo.svg";
import * as actionCreator from "./store/actions/actions";

class App extends Component {
   
  componentDidMount(){

    //how to measure rest call
    console.time("REST-CAll");

    this.props.changeName();
    var end = new Date().getTime();

    console.timeEnd("REST-CAll");


  }

  
  render() {
    
    const prettyJson =JSON.stringify(this.props.name, null, 4);  

    return (
      
      
      <div className="App">
        <div className="Age-label">
          your age: <span>{this.props.age}</span><br/>
          is a potato?: <span><pre>{prettyJson }</pre></span>
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
    name: state.name
  };
};

const mapDispachToProps = dispatch => {
  return {
    onAgeUp: () => dispatch(actionCreator.ageUp(10)),
    onAgeDown: () => dispatch(actionCreator.ageDown(5)),
    changeName: () => dispatch(actionCreator.changeName('potato'))
  };
};
export default connect(
  mapStateToProps,
  mapDispachToProps
)(App);
