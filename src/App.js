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

    constructor(props) {
        super(props);
        this.state = {
            gSlug: 'weekend-a-saint-malo-entre-amis',
        }
    }

    render() {

        return (
            <div className="container">
                <Route exact path="/" component={Identification} />
                <Route path="/" component={Menu}/>
                <Route path={"/person/" + this.state.gSlug} component={Person} />
                <Route path={"/expense/" + this.state.gSlug} component={Expense} />
                <Route path={"/balance/" + this.state.gSlug} component={Balance} />
            </div>
        );
    }
}

export default App;
