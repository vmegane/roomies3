import React from 'react';
import { Link } from 'react-router-dom';
import { signOut } from '../../store/actions/authActions'
import { connect } from 'react-redux';


class Nav extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
        };
    }
    
    toggleMenu = () => {
        this.setState({
            visible: !this.state.visible
        });
    }
   

    handleClick = (e) => {
        this.toggleMenu();
        e.stopPropagation();
    }

    render() {
        const {auth, profile} = this.props
     console.log('profile home', profile.home)
        const myProfile = auth.uid ? `/user/${auth.uid}` : null;
        const myHome = profile.home ? `/home/${profile.home}` : '/';
        const menuShowHide = !this.state.visible ? "navigation hideMenu" : "navigation showMenu";
        const loggedinLinks = (
            <>

            <div className="user-info">
                <div className="welcome">Hi, {profile.firstName}</div>
                <div className="email">
                    {auth.email}
                </div>
            </div>
            <ul className="navigation-list">
                <li>
                <Link to='/'><i className="material-icons"> home </i></Link>
                </li>
           
            <li>
                <Link to={myHome}>My home</Link>
            </li>
            <li>
                <Link to={myProfile}> Your profile</Link>
            </li>
            { !profile.home &&  <li>
                <Link to="/homes">All Homes</Link>
            </li> }
             
        <li>
        <a onClick={this.props.signOut}> Log out</a>
        </li>
        <li>
        <Link to={myProfile} > <div className="avatar"> {profile.initials} </div></Link>
        </li>
        
</ul>
</>
        )

        const loggedoutLinks = (
            
            <ul className="navigation-list">
            
             <li>
                <Link to="/login">Sign in</Link>
            </li>       
            <li>
                <Link to="/signup">Sign up</Link>
            </li>   
            
        
</ul>
        )
        
        
        
        return (
            <div>
                <div className="burger-menu-icon" onClick={this.handleClick}></div>
                <div className={menuShowHide} onClick={this.handleClick}>
                <div className="navigation-wrapper">
                
            { this.props.auth.uid ? loggedinLinks : loggedoutLinks }

                </div>
                 
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => (dispatch(signOut()))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);