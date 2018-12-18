import React, {Component} from 'react';
import FormExpense from "./FormExpense";
import CardExpense from "./CardExpense";
import {NavLink, Route} from "react-router-dom";

class Expense extends Component {

    constructor(props) {
        super(props);
        this.state = {
            persons: [],
            expenses: [],
            newExpense: {},
        }
    }

    componentDidMount() {
        // get list of persons with expense in state through API (https://127.0.0.1/php/expenshare/public/expense/{slug})
        fetch ('http://127.0.0.1/php/expenshare/public/person/'+this.props.slug, {
            method: 'GET',
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
            .then(response => response.json())
            .then(data => this.setState({persons: data}))
        ;
    }

    handleNewExpense (newExpense) {
        this.setState({ newExpense: newExpense });
        console.log(this.state.newExpense);
    }

    render() {

        const items = this.state.persons.map( person => <CardExpense key={person.id} person={person} /> );

        return (
            <div>
                <NavLink to={this.props.match.url + '/add'} className="btn btn-outline-primary mt-1">Enregistrez une dépense</NavLink>
                <Route path={this.props.match.url + '/add'} component={FormExpense}/>

                {items}
            </div>
        );
    }
}

export default Expense;