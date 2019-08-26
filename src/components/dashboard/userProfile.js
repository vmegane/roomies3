import React from 'react';
import { Link } from 'react-router-dom';
import { signOut } from '../../store/actions/authActions'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';


class UserProfile extends React.Component {
    constructor(props) {
        super(props);
    }
        render() {
            console.log('home w prfifule', this.props)
            const { auth, profile, home } = this.props;
            if (!auth.uid) return <Redirect to='/' />

        //let homeName = this.props.homeData[this.props.user.home] ? this.props.homeData[this.props.user.home].name : null;
        //let homeId = this.props.homeData[this.props.user.home] ? this.props.homeData[this.props.user.home].homeid : null;
        //let roommates = this.props.homeData[this.props.user.home].roommates.name;
            return (
                <>
                    <h2>Your Profile</h2>
                    <div className="avatar">{profile.initials} </div>
                   <h2 className="user-name"> {profile.firstName} {profile.lastName}</h2>
                   <p className="user-email">{auth.email}</p>
                   <h2>Your Home</h2>
                   <p><Link to={`/home/${profile.home}`}>{home ? home.homeName : null}</Link></p>

                </>
            )
        }
}


const mapStateToProps = (state) => {
    console.log('myprofile, state', state)
    const id = state.firebase.profile.home
    const allhomes = state.firestore.data.homes
    const home = allhomes ? allhomes[id] : null
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        home: home   
     }
}

// const matchDispatchToProps = (dispatch) => {
//     return {
//         signOut: () => (dispatch(signOut()))
//     }
// }

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'homes'}
    ])
)(UserProfile);