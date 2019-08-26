import React from 'react';
import { Router, Route, Link, Switch } from 'react-router-dom';
import './App.scss';
import LoginWrapper from './components/auth/loginwrapper';
import Nav from './components/layout/navigation';
import Header from './components/layout/header';
import SignupWrapper from './components/auth/signupwrapper';
import HomesList from './components/homes/homesList';
import Dashboard from './components/dashboard/dashboard';
import Home from './components/dashboard/home';
import CreateHome from './components/dashboard/createhome';
import { StickyContainer, Sticky } from 'react-sticky';
import UserProfile from './components/dashboard/userProfile';
import { createBrowserHistory } from 'history';
import { connect } from 'react-redux';

const history = createBrowserHistory();


class App extends React.Component {
    constructor(props) {
        super(props);

    }

    



    render() {
        const { auth } = this.props
        return (
            <Router history={history}>
                <div className="main-wrapper">
                    <Header />
                    <Nav />
                    <div className="content-wrapper">
                        <Switch>
                            <Route exact path='/' render={props => <Dashboard
                                {...props}
                                history={history}
                            />} />
                            {/* <Route path='/homes' render={props => <HomesList
                                {...props}
                                history={history}
                            />} /> */}
                            <Route path='/homes' component={HomesList} />
                            <Route path='/createhome' render={props => <CreateHome
                                {...props}
                                history={history}
                            />} />
                            <Route path='/home/:home_id' render={props => <Home
                                {...props}
                                history={history}
                            />} />
                            <Route path='/user/:user_id' render={props => <UserProfile
                                {...props}
                                history={history}
                            />} />
                            <Route path='/login' render={() => <LoginWrapper
                            />} />
                            <Route path='/signup' render={() => <SignupWrapper
                            />} />
                        </Switch>

                    </div>
                </div>
            </Router>

        )
    }
}

const mapStateToProps = (state) => {
    // console.log('app map state to props', state)
    return {
        auth: state.firebase.auth
    }

}
export default connect(mapStateToProps)(App);