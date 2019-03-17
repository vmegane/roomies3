import React from 'react';
import { Link } from 'react-router-dom'

class Homes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            homeData: this.props.homeData,
            pickedHome: ''
        }
    }



    joinHome = (event) => {
        let homeId = event.target.dataset.id;
        let roommates = {
            name: this.props.user.name,
            id: this.props.user.userID
        };
        // console.log('event target', event.target.dataset.id)
        // console.log('id', this.props.user.userID)
        fetch(`https://roomies-80535.firebaseio.com/homes/${homeId}/roommates.json`,
            {
                method: "POST",
                body: JSON.stringify(roommates)
            }).then(() => {
                fetch(`https://roomies-80535.firebaseio.com/users/${this.props.user.userID}/home.json`,
                    {
                        method: "PUT",
                        body: JSON.stringify(homeId)
                    })
            }).then(() => {
                this.setState({
                    pickedHome: homeId
                })
            }).then(() => {
                this.props.history.push(`/home/${this.state.pickedHome}`)
            })
    }


    render() {
        let homeNames = [];
        let objectKeys = Object.keys(this.state.homeData);
        for (var key in this.state.homeData) {
            homeNames.push(this.state.homeData[key].name);
            
        }
        return (
            <div className="homes-content-wrapper">

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
                    {homeNames.map((elem, index) => {
                        return <li key={`home-${index + 1}`}>
                            <div className="single-home-wrapper">
                                <div className="single-home-wrapper-inner">
                                    <span className="home-name"><Link to={`/home/home${index + 1}`}>{elem}</Link></span>
                                    {/* <span className="roommates-number">roommates:<span>3</span></span> */}
                                </div>

                                <input type="submit" data-id={`home${index + 1}`} value="Join" className="button-join-home" onClick={this.joinHome} />
                            </div>

                        </li>
                    })}
                    
                </ul>

            </div>
        )
    }
}

export default Homes;