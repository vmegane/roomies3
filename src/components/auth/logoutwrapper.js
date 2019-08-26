import React from 'react';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom';


class LogoutWrapper extends React.Component {

    constructor(props) {
        super(props);
      
    }
   

    render() {
        const { auth } = this.props;
        // if (!auth.uid) return <Redirect to='/'/>
        return (
            <div className="logout-form-wrapper">  
               <input type="submit" className="input-submit-logout" value="log out" onClick={this.props.signOut} /> 
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => (dispatch(signOut()))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogoutWrapper);
