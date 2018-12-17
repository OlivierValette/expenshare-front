import React, {Component} from 'react';
import CardPerson from "./CardPerson";
import FormPerson from "./FormPerson";

class Person extends Component {

    constructor(props) {
        super(props);
        this.state = {
            persons: [],
            newPerson: {},
        }
    }

    componentDidMount() {
        // get list of persons in state through API (https://127.0.0.1/php/expenshare/public/person/{slug})
        // TODO : get the right parameter instead of the slug value used here
        console.log(this.props);
        fetch ('http://127.0.0.1/php/expenshare/public/person/weekend-a-saint-malo-entre-amis', {
            method: 'GET',
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
            .then(response => response.json())
            .then(data => this.setState({persons: data}));
    }

    handleNewPerson (newPerson) {
        this.setState({ newPerson: newPerson });
        console.log(this.state.newPerson);
    }

    render() {
        // First render, before componentDidMount()
        if (this.state.persons.length === 0) {
            return <div>Chargement en cours...</div>
        }

        const items = this.state.persons.map( person => <CardPerson key={person.id} person={person} /> );

        return (
            <div>

                <FormPerson handleNewPerson={newPerson => this.handleNewPerson(newPerson)} />

                {items}
            </div>
        );
    }
}

export default Person;