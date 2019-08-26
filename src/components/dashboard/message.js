
import React from 'react';
import moment from 'moment';


class Message extends React.Component {
    render() {
        return (
            <li className="message-text" key={`message-${this.props.messageId}`}>
                <div className='message-wrapper'>
                    <div className="message-inner-wrapper">

                        {/* <span className="message-author">{this.props.messageAuthor}</span> */}
                    </div>
                    <p> {this.props.message} </p>
                    <span className="message-timestamp">{moment(this.props.timeStamp.toDate()).calendar()}</span>
                    <div className={this.props.authorId === this.props.userId ? 'message-avatar left' : 'message-avatar right'}>
                        {this.props.authorInitials ? this.props.authorInitials : '??'}
                    </div>
                </div>

            </li>
        )
    }
}



export default Message;