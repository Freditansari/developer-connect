/***
 * note: we need a package named classnames in npm for error handling
 *  in order to change the className in html portion of this module
 */

import React, { Component } from "react";
// import Axios from "axios";
// import classnames from "classnames";

import PropTypes from "prop-types";

import { withRouter } from "react-router-dom";

//redux compnents
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

import TextFieldGroup from "../../common/TextFieldGroup";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: ""
    };
    // this.onChange = this.onChange.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    //if the state is authenticated then go to /dashboard

    if (this.props.auth.isAuthenticated) {
      // this.props.history("/dashboard");
      window.location.href='/dashboard'
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div>
        <div className="register">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Sign Up</h1>
                <p className="lead text-center">
                  Create your DevConnector account
                </p>
                <form onSubmit={this.onSubmit}>
                  <TextFieldGroup
                    placeholder="enter name here"
                    name="name"
                    type="text"
                    onChange={this.onChange}
                    value={this.state.name}
                    error={errors.name}
                  />
                  {/* { <div className="form-group">
                    <input
                      type="text" */}

                  {/* className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.name
                      })}
                      placeholder="Name"
                      name="name"
                      //linking form to state
                      value={this.state.name}
                      onChange={this.onChange}
                    />
                    {errors.name && (
                      <div className="invalid-feedback"> {errors.name}</div>
                    )}
                  </div> */}
                  <TextFieldGroup
                    placeholder="enter an email address"
                    name="email"
                    type="email"
                    onChange={this.onChange}
                    value={this.state.email}
                    error={errors.email}
                    info="This site uses Gravatar so if you want a profile image, use
                    a Gravatar email"
                  />
                  {/* <small className="form-text text-muted">
                    This site uses Gravatar so if you want a profile image, use
                    a Gravatar email
                  </small> */}

                  {/* <div className="form-group">
                    <input
                      type="email"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.email
                      })}
                      placeholder="Email Address"
                      name="email"
                      value={this.state.email}
                      onChange={this.onChange}
                    />
                    {errors.email && (
                      <div className="invalid-feedback"> {errors.email}</div>
                    )}
                    <small className="form-text text-muted">
                      This site uses Gravatar so if you want a profile image,
                      use a Gravatar email
                    </small>
                  </div> */}

                  <TextFieldGroup
                    placeholder="Enter password here"
                    name="password"
                    type="password"
                    onChange={this.onChange}
                    value={this.state.password}
                    error={errors.password}
                  />
                  {/* <div className="form-group">
                    <input
                      type="password"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.password
                      })}
                      placeholder="Password"
                      name="password"
                      value={this.state.password}
                      onChange={this.onChange}
                    />
                    {errors.password && (
                      <div className="invalid-feedback"> {errors.password}</div>
                    )}
                  </div> */}

                  <TextFieldGroup
                    placeholder="Enter password here"
                    name="password2"
                    type="password"
                    onChange={this.onChange}
                    value={this.state.password2}
                    error={errors.password2}
                  />
                  {/* <div className="form-group">
                    <input
                      type="password"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.password2
                      })}
                      placeholder="Confirm Password"
                      name="password2"
                      value={this.state.password2}
                      onChange={this.onChange}
                    />
                    {errors.password2 && (
                      <div className="invalid-feedback">
                        {" "}
                        {errors.password2}
                      </div>
                    )}
                  </div> */}
                  <input
                    type="submit"
                    className="btn btn-info btn-block mt-4"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//This proptypes is used to validate whether the state is required or not
Register.PropTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

//change this to line below : export default Register;
export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
