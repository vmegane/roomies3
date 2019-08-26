import React from 'react';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { signUp } from '../../store/actions/authActions';
import { Redirect } from 'react-router-dom';

class SignupWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: ''
        }
    }



    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }
     completeSignup = (e) => {
         e.preventDefault();
        this.props.signUp(this.state)
     }



    render() {

        const { authError, auth } = this.props
         if (auth.uid) return <Redirect exact to='/homes'/>

        return (

            <div className="page-center-height">
                <h2>Create Account</h2>

                <form className="form">

                    <input type="text" id="firstName" value={this.state.name} placeholder="type your name" onChange={this.handleChange} />
                    <input type="text" id="lastName" value={this.state.name} placeholder="type your name" onChange={this.handleChange} />

                    <input type="email" id="email" value={this.state.email} placeholder="type your email" onChange={this.handleChange} />
                    <input type="password" id="password" value={this.state.password} placeholder="type your password" onChange={this.handleChange} />
                    
                    <input type="submit" className="input-submit-login" value="sign up" onClick={this.completeSignup} />

                </form>
                <span> { authError ? authError : null }</span>

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
        signUp: (newUser) => (dispatch(signUp(newUser)))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupWrapper);