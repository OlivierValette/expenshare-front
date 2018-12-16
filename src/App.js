import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'animate.css';
import './App.css';
import { Route } from 'react-router-dom';
import Balance from "./components/Balance";
import Expense from "./components/Expense";
import Person from "./components/Person";
import Menu from "./components/Menu";
import Identification from "./components/Identification";

class App extends Component {

    render() {
        return (
            <div className="container">
                <Route exact path="/" component={Identification} />
                <Route path="/:id" component={Menu}/>
                <Route path="/person" component={Person} />
                <Route path="/expense" component={Expense} />
                <Route path="/balance" component={Balance} />
            </div>
        );
    }
}

export default App;
