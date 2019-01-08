import React, { Component } from "react";
 import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";
import { PROFILE_LOADING } from "../../actions/types";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
    console.log(this.state);
  }


  render() {
    return <div >
     <h1>welcome to Dashboard</h1>
    </div>;
  }
}

Dashboard.propTypes={
  getCurrentProfile:PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
} 

const mapStateToProps = state =>({
  profile: state.profile,
  auth: state.auth
})
export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard);
