import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import moment from 'moment';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { auth, profile, notifications, homes } = this.props;
        console.log('dash', notifications)
        if (!auth.uid) return <Redirect to='/login' />

        return (
            <div className="profile-content-wrapper">
                <h2>What's new</h2>
                <p>Welcome back, {profile.firstName} &#128522; </p>
                <h2> Notifications</h2>
                <ul className="notification-list">
                    {notifications.map((notification) => {
                        return(
                             <li key={notification.id}>
                                <p> {notification.content} </p>
                                <span className="notification-timestamp"> {moment(notification.time.toDate()).calendar()}</span>
                                </li>
                        )
                    })}
            
                </ul> </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.home_id;
    const notifications = state.firestore.ordered.notifications || [];
    const allhomes = state.firestore.data.homes;
    const home = allhomes ? allhomes[id] : null;

    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        notifications: notifications,
        home: home,
        homes: allhomes
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect((props) => {
         const home_id = props.profile ? props.profile.home : null;
         if (home_id) {
            return [{
                collection: 'homes',
                doc: props.profile.home,
                subcollections: [{ collection: 'notifications', orderBy: ['time', 'desc'], limit: 5 }],
                storeAs: 'notifications'
            }, { collection: 'homes' }
            ]
         }
         return [{ collection: 'homes' }]
    })
)(Dashboard);


