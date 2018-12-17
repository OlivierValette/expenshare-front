import React, {Component} from 'react';
import FormExpense from "./FormExpense";
import CardExpense from "./CardExpense";

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
        // TODO : get the right parameter instead of the slug value used here
        fetch ('http://127.0.0.1/php/expenshare/public/person/weekend-a-saint-malo-entre-amis', {
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

                <FormExpense handleNewExpense={newExpense => this.handleNewExpense(newExpense)} />

                {items}
            </div>
        );
    }
}

export default Expense;