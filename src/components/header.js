import React from 'react';
import ReactDOM from 'react-dom';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="main-header">
                <h1>Welcome</h1>
            </div>
        )
    }
}

export default Header;