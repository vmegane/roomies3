import React, { Component } from 'react';
import * as firebase from 'firebase';

class LogoutWrapper extends React.Component {

    constructor(props) {
        super(props);
      
    }
   

    logout = (event) => {
        event.preventDefault();
       // firebase.auth().signOut;
        this.setState({
            email: '@',
            password: '',
            userID: '',
            loggedin: false,
            currentUser: null
        });
        this.props.manageLogin(false);
    }

    render() {
        return (
            <div className="logout-form-wrapper">  
               <input type="submit" className="input-submit-logout" value="log out" onClick={this.logout} /> 
            </div>
        )
    }
}

export default LogoutWrapper;
