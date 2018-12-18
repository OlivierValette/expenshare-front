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
                <Route path={this.props.match.url} exact component={Person}/>
                {/*<Route path={this.props.match.url + "/expense"} component={Expense}/>*/}
                {/*pour passer des paramètres (props) à un composant :*/}
                <Route path={this.props.match.url + "/expense"}
                       render={ props => <Expense {...props} slug={this.props.match.params.slug}/> }/>

                <Route path={this.props.match.url + "/balance"} component={Balance}/>
            </div>
        );
    }
}

export default Group;