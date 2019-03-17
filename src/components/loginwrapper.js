import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom'
import * as firebase from 'firebase';

class LoginWrapper extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '@',
            password: ''
        }
        console.log('login wrapper', this.props)
    }
    fillEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }
    fillPassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    login = (event) => {
        event.preventDefault();
        console.log('event')
        const email = this.state.email;
        const password = this.state.password;
        console.log('state', this.state)

        const promise = firebase.auth().signInWithEmailAndPassword(email, password)
        promise
            .then((resp) => {
                console.log('resp',resp)
                this.props.manageLogin(true);
            })
            .catch(error => console.log(error.message))
    }


    render() {
        return (
            <div className="login-form-wrapper">
               <form className="form">
                    <input type="email" placeholder="type your email" value={this.props.email} onChange={this.fillEmail} />
                    <input type="password" placeholder="type your password" value={this.props.password} onChange={this.fillPassword} />
                    <input type="submit"   className="input-submit-login" value="login" onClick={this.login} />
                </form>

            </div>
        )
    }
}

export default LoginWrapper;
