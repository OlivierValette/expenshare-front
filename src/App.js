import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'animate.css';
import './App.css';
import FormShareGroup from "./Components/FormShareGroup";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            groupId: []
        };
    }

    handleSearch (groupId) {
        this.setState({ groupId: groupId });
    }

    render() {

    return (
        <div className="container">
            <div className="jumbotron">
                <h1 className="display-4">Saisissez l'identifiant du groupe</h1>
                <FormShareGroup search={groupId => this.handleSearch(groupId)}/>
            </div>
        </div>
    );
    }
}

export default App;
