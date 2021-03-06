import React, {Component} from 'react';
import FormExpense from "./FormExpense";
import CardExpense from "./CardExpense";
import {NavLink, Route} from "react-router-dom";

class Expense extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sharegroup: '',
            persons: [],
        }
    }

    componentDidMount() {
        // get list of persons with expense in state through API (https://127.0.0.1/php/expenshare/public/expense/{slug})
        fetch ('http://127.0.0.1/php/expenshare/public/person/'+this.props.slug, {
            method: 'GET',
            headers: {'X-Requested-With': 'XMLHttpRequest'}
        })
            .then(response => response.json())
            .then(data => this.setState({persons: JSON.parse(data)}))
        ;
        // get sharegroup in state through API (https://127.0.0.1/php/expenshare/public/sharegroup/{slug})
        fetch ('http://127.0.0.1/php/expenshare/public/sharegroup/'+this.props.slug, {
            method: 'GET',
            headers: {'X-Requested-With': 'XMLHttpRequest'}
        })
            .then(response => response.json())
            .then(data => this.setState({sharegroup: JSON.parse(data)}))
        ;
    }

    // trying something to reload page after creating new expense
    addExpense(expense) {
        const persons = this.state.persons;
        for (let i = 0; i < persons.length; i++) {
            if (persons[i].id == expense.person.id) {
                persons[i].expenses = expense;
            }
        }
        this.setState({ persons: persons });
    }

    render() {

        const items = this.state.persons.map( person => <CardExpense key={person.id} person={person} /> );

        // used to test if group closed to avoid adding new expense
        const closed = this.state.sharegroup.closed;

        return (
            <div className="mt-1">
                {this.state.persons.length === 0 &&
                    <div className="alert alert-primary lead" role="alert">
                        <i className={"fas fa-credit-card fa-2x"}></i>&nbsp;
                        Saisisser ici les dépenses des participants...
                    </div>
                }
                {!closed &&
                    <NavLink to={this.props.match.url + '/add'} className="btn btn-outline-primary">
                        Enregistrez une dépense
                    </NavLink>
                }
                <Route path={this.props.match.url + "/add"}
                       render={ props => <FormExpense {...props}
                       slug={this.props.slug}
                       callBack={(expense) => this.addExpense(expense)}/> }/>

                {items}
            </div>
        );
    }
}

export default Expense;