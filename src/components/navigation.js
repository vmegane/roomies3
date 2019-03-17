import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import LogoutWrapper from './logoutwrapper';

class Nav extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false
        };
    }

    toggleMenu = () => {
        this.setState({
            visible: !this.state.visible
        });
    }

    handleClick = (e) => {
        this.toggleMenu();
        console.log("clicked");
        e.stopPropagation();
    }

    render() {
        let myhome = `/home/${this.props.userData.home}`;
        let myProfile = `/user/${this.props.userId}`;
        // console.log('teścik', myProfile)
        let menuShowHide = !this.state.visible ? "navigation hideMenu" : "navigation showMenu";
         console.log('myhome', myhome)
        // let menuHide = this.state.visible ? "hideMenu" : "hideMenu"
        return (
            <div>
                <div className="burger-menu-icon" onClick={this.handleClick}></div>
                <div className={menuShowHide} onClick={this.handleClick}>
                <div className="navigation-wrapper">
                <ul className="navigation-list">
                        <li>
                            {myhome!=='undefined' && <Link to={myhome}>Your home</Link>}
                        </li>
                        <li>
                            <Link to={myProfile}>Your profile</Link>
                        </li>
                         <li>
                            <Link to="/">All Homes</Link>
                        </li>       
                    </ul>
                    <LogoutWrapper manageLogin={this.props.manageLogin}/>

                </div>
                 
                </div>
            </div>
        )
    }
}

export default Nav;