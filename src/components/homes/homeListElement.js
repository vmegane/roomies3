import React from 'react';
import { Link } from 'react-router-dom'


class HomeListElement extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick = (e) => {
    e.preventDefault();
        this.props.joinHome(this.props.home.id)
        this.props.history.push('/')
    }

    render() {
    
    return (
        <li>
            <div className="single-home-wrapper">
               
                    <Link to={`/home/${this.props.home.id}`}><h1 className="home-name"> {this.props.home.homeName}</h1></Link>
                
                <div className="single-home-wrapper-inner">
                
                <input type="submit" data-id={this.props.home.id} value="Join" className="button-join-home" onClick={this.handleClick}/>
                </div>
            </div>
        </li>
    )
    }
}



export default HomeListElement;