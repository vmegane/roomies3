import React from 'react';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { addMessage } from '../../store/actions/homesActions';
import { Link, Redirect } from 'react-router-dom';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';
import Message from './message'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        }
    }

    fillNewMessage = (event) => {
        event.preventDefault();
        this.setState({
            message: event.target.value
        })
    }
    postMessage = (event) => {
        event.preventDefault();
        const homeId = this.props.match.params.home_id;
        this.props.addMessage(homeId, this.state.message);
        this.setState({ message: '' });
    }

    render() {
        //console.log('render auth', this.props.auth.uid)
        //const id = this.props.match.params.home_id
        const { home, messages, auth, profile } = this.props
        if (!auth.uid) return <Redirect to='/' />

        if (home) {
            return (
                <>
                    <div className="home-info">
                    <h2> {home.homeName}</h2>
                    <h1><i className="material-icons"> face </i> Roomates</h1>
                    <ul className="roommates-list">
                        {home.roommates.map(roommate => <li key={roommate.userId}>  {roommate.user} {roommate.isOwner ? '- Owner' : null}</li>)}
                    </ul>
                </div>
                <h2>Messages </h2>
                <div className="add-message-wrapper">
                    <form className="add-message-form">
                        <textarea className="add-message-area" value={this.state.newMessage} onChange={this.fillNewMessage} />
                        <input type="submit" value="Post" className="button post-button" onClick={this.postMessage} />
                    </form>
                </div>
                    {
                messages ? (
                    <ul className="messages-list">
                        {messages.map((message) => {
                            return (
                                <Message
                                    messageId={message.id}
                                    authorId={message.authorId}
                                    authorInitials={message.authorInitials}
                                    messageAuthor={message.author}
                                    userId={auth.uid}
                                    message={message.message}
                                    timeStamp={message.timeStamp}
                                    key={message.id}
                                />
                            )
                        })
                        }
                    </ul>

                ) : (<Loader
                    type="Hearts"
                    color="#ef5350"
                    height={50}
                    width={50} />)
            }
                </>)
        } else {
            return (
                <Loader
                    type="Hearts"
                    color="#ef5350"
                    height={50}
                    width={50}
                />
            )
        }

    }
}

const mapStateToProps = (state, ownProps) => {
    //console.log('state to props home', state)

    const id = ownProps.match.params.home_id
    const allhomes = state.firestore.data.homes
    const home = allhomes ? allhomes[id] : null
    const messages = state.firestore.ordered.messages || []

    return {
        home: home,
        messages: messages,
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        homes: allhomes

    }
}

const matchDispatchToProps = (dispatch) => {
    return {
        addMessage: (home, message) => dispatch(addMessage(home, message))
    }
}
export default compose(
    connect(mapStateToProps, matchDispatchToProps),
    firestoreConnect((props) => {
        return [{
            collection: 'homes',
            doc: props.match.params.home_id,
            subcollections: [{ collection: 'messages', orderBy: ['timeStamp', 'desc'] }],
            storeAs: 'messages'
        }, { collection: 'homes' }
        ]
    })
)(Home);