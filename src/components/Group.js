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
                <Menu url={this.props.match.url} slug={this.props.match.params.slug} />
                {/* Routing with parameters (props) parsing to components */}
                <Route path={this.props.match.url}
                       render={ props => <Person {...props} slug={this.props.match.params.slug}/> }/>
                <Route path={this.props.match.url + "/expense"}
                       render={ props => <Expense {...props} slug={this.props.match.params.slug}/> }/>
                <Route path={this.props.match.url + "/balance"}
                       render={ props => <Balance {...props} slug={this.props.match.params.slug}/> }/>
            </div>
        );
    }
}

export default Group;