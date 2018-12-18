import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import 'animate.css';
import 'moment';
import './App.css';
import { Route } from 'react-router-dom';
import Group from "./components/Group";
import Identification from "./components/Identification";

class App extends Component {

    render() {

        return (
            <div className="container">
                <Route exact path="/" component={Identification} />
                <Route path="/:slug" component={Group}/>
            </div>
        );
    }
}

export default App;
