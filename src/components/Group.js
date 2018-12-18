import React, {Component} from 'react';
import {Route} from "react-router-dom";
import Menu from "./Menu";
import Person from "./Person";
import Expense from "./Expense";
import Balance from "./Balance";

class Group extends Component {
    render() {
        return (
            <div>
                <h1>{this.props.match.params.slug}</h1>
                <Menu url={this.props.match.url} slug={this.props.match.params.slug} />
                <Route path={this.props.match.url} exact component={Person}/>
                <Route path={this.props.match.url + "/expense"} component={Expense}/>
                <Route path={this.props.match.url + "/balance"} component={Balance}/>
            </div>
        );
    }
}

export default Group;