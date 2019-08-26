import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { signIn } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom';


class LoginWrapper extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '@',
            password: ''
        }
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
        this.props.signIn(this.state)
    }


    render() {
        const { authError, auth } = this.props
         if (auth.uid) return <Redirect exact to='/'/>

        return (
            <div className="login-form-wrapper">
               <form className="form">
                    <input type="email" placeholder="type your email" value={this.props.email} onChange={this.fillEmail} />
                    <input type="password" placeholder="type your password" value={this.props.password} onChange={this.fillPassword} />
                    <input type="submit"   className="input-submit-login" value="login" onClick={this.login} />
                    <span> { authError ? authError : null }</span>
                </form>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (credentials) => (dispatch(signIn(credentials)))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginWrapper);
