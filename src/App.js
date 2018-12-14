import React, { Component } from 'react';
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
        <div className="jumbotron">
          <FormShareGroup search={groupId => this.handleSearch(groupId)}/>/>
        </div>
    );
    }
}

export default App;
