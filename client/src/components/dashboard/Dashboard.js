import React, { Component } from "react";
 import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import { PROFILE_LOADING } from "../../actions/types";
import Spinner from '../../common/spinner'
import {Link} from 'react-router-dom';
import ProfileActions from './ProfileActions';
import Experience from './Experience'

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
    
  }

 onDeleteClick= (e)=>{
    this.props.deleteAccount();
  }


  render() {

    const {user} = this.props.auth;
    const {profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />  
    } else {
      //check if login user has profile data
      if (Object.keys(profile).length >0){
        dashboardContent = (    
        <div>
          <p className="lead"> Romani ite Domum</p>
          <p className="lead text-muted">Welcome <Link to= {`/profile/${profile.handle}`}> {user.name}</Link></p>
          <ProfileActions></ProfileActions>
          {/* todo experience and educations */}
          <Experience experience = {profile.experience}></Experience>
          
          <div style ={{marginBottom: '60px'}}>
          </div>
          <button onClick={this.onDeleteClick} className='btn btn-danger'>delete my account</button>
         
        </div>);
        
      }else{
        dashboardContent=(
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p> You have not setup a profile, please add some info</p>
            <Link to="/create-profile" className= "btn btn-lg btn-info">Create Profile</Link>
          </div>
        );

      }
    }
    return <div >
      <div className='container'>
        <div className="row">
          <div className="col-md12">
            <h1 className="display-4">
                {dashboardContent}
            </h1>
          </div>
        </div>
        
      </div>
    </div>;
  }
}

Dashboard.propTypes={
  getCurrentProfile:PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount :PropTypes.func.isRequired
} 

const mapStateToProps = state =>({
  profile: state.profile,
  auth: state.auth
})
export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
