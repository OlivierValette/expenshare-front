import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'animate.css';
import './App.css';
import { Route } from 'react-router-dom';
import Menu from "./components/Menu";
import Identification from "./components/Identification";
import Person from "./components/Person";
import Expense from "./components/Expense";
import Balance from "./components/Balance";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            gSlug: 'weekend-a-saint-malo-entre-amis',
        }
    }

    render() {

        const rootpath = "/" + this.state.gSlug;

        return (
            <div className="container">
                <Route exact path="/" component={Identification} />
                <Route path={rootpath} component={Menu}/>
                <Route path={rootpath + "/person"} component={Person} />
                <Route path={rootpath + "/expense"} component={Expense} />
                <Route path={rootpath + "/balance"} component={Balance} />
            </div>
        );
    }
}

export default App;
