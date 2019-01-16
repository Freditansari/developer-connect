import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../../../common/TextFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextAreaFieldGroup from "../../../common/textAreaFieldGroup";

import {addExperience} from '../../../actions/profileActions'

class AddExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: "",
      title: "",
      location: "",
      from: "",
      to: "",
      current: false,
      description: "",
      errors: {},
      disabled: false
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onCheck = e =>{
      this.setState({
        disabled : !this.state.disabled,
        current: ! this.state.current
    })
  }

  onSubmit = e =>{
      e.preventDefault();
      const expData = { 
        company: this.state.company, 
        title: this.state.title,
        location: this.state.location, 
        from : this.state.from, 
        to: this.state.to,
        current: this.state.current,
        description: this.state.description

      };
      this.props.addExperience(expData, this.props.history);
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                {" "}
                go back
              </Link>
              <h1 className="display-4 text-center">Add Experience</h1>
              <p className="lead text-center">
                {" "}
                Add any job or position that you have had in the past or current
              </p>
              <small className="d-block pb3">* = required field</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                />
                <TextFieldGroup
                  placeholder="* Job Title"
                  name="jobTitle"
                  value={this.state.jobTitle}
                  onChange={this.onChange}
                  error={errors.jobTitle}
                />
                <h6>From Date</h6>
                <TextFieldGroup
                  placeholder="From Date"
                  name="fromDate"
                  type="date"
                  value={this.state.from}
                  onChange={this.onChange}
                  error={errors.from}
                />
                <h6>To Date</h6>
                <TextFieldGroup
                  placeholder="To Date"
                  name="toDate"
                  type="date"
                  value={this.state.to}
                  onChange={this.onChange}
                  error={errors.to}
                  disabled={this.state.disabled ? "disabled" : ""}
                />
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check.input"
                    name="current"
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={this.onCheck}
                    id="current"
                  />
                  <label htmlFor="current" className="form-check-label">
                    Is this your current job
                  </label>
                </div>
                <TextAreaFieldGroup
                  placeholder="Job Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                  info="tell us about the position"
                />

                <input type="submit" value="Submit" className="btn btn-info btn-block mt4"/>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
AddExperience.propTypes = {

  addExperience : PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, {addExperience})(withRouter(AddExperience));
