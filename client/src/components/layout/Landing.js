import React, { Component } from "react";
import { Link } from "react-router-dom";

//bring in redux
//step 1
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

import videoSrc from "../../img/meeting.mp4";

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      window.location.href = "/dashboard";
      // this.props.history("/dashboard");
    }
  }

 
  render() {
    return (
      <div className="landing">
        <div className="video-container">
          <video
            autoPlay
            loop
            muted
            className="landingVideo dark-overlay landing-inner text-light"
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">DevHub</h1>

                <p className="lead">
                  {" "}
                  Create a developer profile/portfolio, share posts and get help
                  from other developers
                </p>
                <hr />
                <Link to="/register" className="btn btn-lg btn-info mr-2">
                  Sign Up
                </Link>
                <Link to="/login" className="btn btn-lg btn-light">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//step 2:
Landing.PropTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
