import React from 'react';
import { connect } from 'react-redux';
import { createHome } from '../../store/actions/homesActions';
import { Redirect } from 'react-router-dom';

class CreateHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            homeName: ''        }
    }

    
    fillName = (e) => {
        this.setState({
            homeName: e.target.value
        })
    }

    handleClick = (e) => {
        e.preventDefault();
        this.props.createHome(this.state)
        this.props.history.push('/')
    }

    render() {
        const { auth } = this.props;

        if (!auth.uid) return <Redirect to='/'/>

        return (
            <>
                <h2>Creating your home</h2>
                    <form className="create-home-form">
                         <p>Your home name</p>
                         <input value={this.state.homename} type="text" onChange={this.fillName} /> <br />
                        <button onClick={this.handleClick} className="button">Continue</button>
                    </form>
            </>
        )
    }
}

const mapStateToProps = (state) => {
   // console.log('homes list - state to poprs - state', state)
    return {
        homes: state.firestore.ordered.homes,
        auth: state.firebase.auth
    }
}
const matchDispatchToProps = (dispatch) => {
    return {
        createHome: (home) => dispatch(createHome(home))
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(CreateHome);