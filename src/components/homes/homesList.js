import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import HomeListElement from './homeListElement';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { joinHome } from '../../store/actions/homesActions';

class HomesList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
    
        const { homes, auth } = this.props;
        if (!auth.uid) return <Redirect to='/'/>
        
        return (
            <>
                <h2>Homes</h2>
                <div className="create-home-wrapper">
                    <p>Join one of the homes or create your own
                    </p>
                    <p>
                        <Link to='/createhome'>
                            <button className="button create-home-button">Create home</button></Link>
                    </p>
                </div>
                <ul className="homes-list">
                    <div>
                    { homes && homes.map((home) => {
                        return  <HomeListElement home={home} key={home.id} history={this.props.history} joinHome={this.props.joinHome}/>

                    })}  
                    </div>    
                </ul>
            </>
        )
    }
}


const mapStateToProps = (state) => {
    //console.log(state)
    return {
        homes: state.firestore.ordered.homes,
        auth: state.firebase.auth
    }
}

const matchDispatchToProps = (dispatch) => {
    return {
        joinHome: (roommate) => dispatch(joinHome(roommate))
    }
}

export default compose(
    connect(mapStateToProps, matchDispatchToProps),
    firestoreConnect([
        { collection: 'homes'}
    ])
)(HomesList);