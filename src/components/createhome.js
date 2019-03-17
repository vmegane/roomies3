import React from 'react';
import ReactDOM from 'react-dom';

class CreateHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            homename: '',
            homeid: '',
            numberOfHomes: '',
            user: this.props.userId
        }
    }

    componentDidMount() {
        fetch(`https://roomies-80535.firebaseio.com/homes.json`)
            .then(resp => resp.json())
            .then(resp => this.setState({ numberOfHomes: Object.keys(resp).length }))
    }

    fillName = (e) => {
        this.setState({
            homename: e.target.value
        })
    }

    handleClick = (e) => {
        e.preventDefault();
        const newHome = {
            name: this.state.homename,
            roommates: {name: this.props.user.name,
                        id: this.state.user},
            messages: {}
        }
        //console.log('new home', newHome)
        fetch(`https://roomies-80535.firebaseio.com/homes/home${this.state.numberOfHomes + 1}.json`,
            {
                method: "PUT",
                body: JSON.stringify(newHome)
            }
        )
            .then(() => {
                this.setState({
                    homeid: `home${this.state.numberOfHomes + 1}`
                })
            })
            .then(() => {
                const updatedUser = {
                    home: this.state.homeid
                }
                fetch(`https://roomies-80535.firebaseio.com/users/${this.state.user}.json`,
                    {
                        method: "PATCH",
                        body: JSON.stringify(updatedUser)
                    })
            })
            .then(() => {
                console.log('update data', this.props)
                this.props.updateAllData()
            })
            .then(() => {
                this.props.history.push(`/home/${this.state.homeid}`)
            })
    }

    render() {

        return (
            <div className="homes-content-wrapper">
                
                <div className="create-home-wrapper">
                <h2>Creating your home</h2>
                    <form className="create-home-form">
                        {this.state.homeid === '' && <p>Your home name</p>}
                        {this.state.homeid === '' && <input value={this.state.homename} type="text" onChange={this.fillName} />} <br />
                        {this.state.homeid === '' && <button onClick={this.handleClick} className="button">Continue</button>}<br />
                    </form>
                </div>

            </div>
        )
    }
}

export default CreateHome;