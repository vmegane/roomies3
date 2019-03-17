import React from 'react';
import { Router, Route, Link, Switch } from 'react-router-dom';
import './App.scss';
import LoginWrapper from './components/loginwrapper';
import Nav from './components/navigation';
import Messages from './components/messages';
import Header from './components/header';
import SignupWrapper from './components/signupwrapper';
import Homes from './components/homes';
import Home from './components/home';
import CreateHome from './components/createhome';
import UserProfile from './components/userProfile';
import * as firebase from 'firebase';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();
//const firebase = require('firebase');
const app = firebase.initializeApp({ 
  apiKey: "AIzaSyBx6Mr2h3Dyh-EEDsd8O-g3wqaDsXYNEqA",
  authDomain: "roomies-80535.firebaseapp.com",
  databaseURL: "https://roomies-80535.firebaseio.com",
  projectId: "roomies-80535",
  storageBucket: "roomies-80535.appspot.com",
  messagingSenderId: "766894690619"
});

class AppWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedin: false,
            currentUser: {},
            signupopen: false,
            userData: {},
            homeData: {}
        }

    }

    componentWillMount() {
        fetch(`https://roomies-80535.firebaseio.com/homes.json`)
            .then((response) => response.json())
            .then((response) => {
                console.log(response)
                this.setState({
                    homeData: response
                })
            })
    }
    updateAllData = () => {
        let homeData;
        fetch(`https://roomies-80535.firebaseio.com/homes.json`)
            .then((response) => response.json())
            .then((response) => {
                homeData = response;
                console.log('updating all data', response)
                this.setState({
                    homeData: homeData
                })
                console.log(this.state)
            })
    }

    getUserData() {
        let userData;
        fetch(`https://roomies-80535.firebaseio.com/users/${this.state.currentUser.uid}.json`)
            .then((response) => response.json())
            .then((response) => {
                userData = response;
                this.setState({ userData: userData });
                console.log(userData)
            })

    }

    manageLogin = (loginstate) => {
        this.setState({
            loggedin: loginstate,
            currentUser: firebase.auth().currentUser
        }, () => {
            this.getUserData()
        })
    }

    manageSignup = (issignupopen) => {
        this.setState({
            signupopen: issignupopen
        })
    }

    render() {
        if (this.state.loggedin === true) {
            return (


                <Router history={history}>


                    <div className="main-wrapper">
                        <Header />
                        <Nav manageLogin={this.manageLogin}
                            userData={this.state.userData}
                            userId={this.state.currentUser.uid} />
                        <div className="content-wrapper">
                            <Switch>
                                <Route exact path='/messages' component={Messages} />
                                <Route exact path='/' render={props => <Homes
                                    {...props}
                                    updateAllData={this.updateAllData}
                                    user={this.state.userData}
                                    homeData={this.state.homeData}
                                    history={history}
                                />} />
                                <Route path='/createhome' render={props => <CreateHome
                                    {...props}
                                    user={this.state.userData}
                                    userId={this.state.currentUser.uid}
                                    updateAllData={this.updateAllData}
                                    history={history}
                                />} />
                                <Route path='/home/:home_id' render={props => <Home
                                    {...props}
                                    user={this.state.userData}
                                    userId={this.state.currentUser.uid}
                                    homeData={this.state.homeData}
                                />} />
                                <Route path='/user/:user_id' render={props => <UserProfile
                                    {...props}
                                    user={this.state.userData}
                                    userId={this.state.currentUser.uid}
                                />} />
                            </Switch>

                        </div>
                    </div>
                </Router>

            )
        } else {
            return (
                <Router history={history}>
                    <div className="main-wrapper background-image">
                        {/* <Header /> */}

                        <div className="login-page-wrapper">
                            <div className="logo-begin-wrapper">
                                <div className="logo-main-page"></div>
                                <h1 className="app-description">ROOMMIES</h1>
                               
                            </div>

                            <Switch>
                                <div className="login-page-form-wrapper">

                                    {this.state.signupopen === false && <div> <h2>Sign in or <span className="link"> <Link to='/signup'> create account</Link></span></h2>
                                    </div>}
                                    <Route exact path='/' render={() => <LoginWrapper
                                        manageLogin={this.manageLogin}
                                        isLoggedIn={this.state.loggedin}
                                    // userName={this.state.userData.name}
                                    />} />
                                    <Route path='/signup' render={() => <SignupWrapper
                                        manageLogin={this.manageLogin}
                                        manageSignup={this.manageSignup}
                                        history={history}
                                    />} />
                                </div>

                            </Switch>
                        </div>
                        {/* <Footer /> */}
                    </div>
                </Router>
            )

        }

    }
}

export default AppWrapper;