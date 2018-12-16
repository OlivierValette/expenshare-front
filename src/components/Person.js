import React, {Component} from 'react';
import CardPerson from "./CardPerson";

class Person extends Component {

    constructor(props) {
        super(props);
        this.state = {
            persons: [],
        }
    }

    componentDidMount() {
        // get list of persons in state through API (https://127.0.0.1/php/expenshare-front/public/person/{slug})
        // TODO : get the right parameter instead of the slug value used here
        fetch ('http://127.0.0.1/php/expenshare/public/person/voyage-a-venise-2018', {
            method: 'GET',
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
            .then(response => response.json())
            .then(data => this.setState({persons: data}));
    }

    render() {
        // First render, before componentDidMount()
        if (this.state.persons.length === 0) {
            return <div>Chargement en cours...</div>
        }

        const items = this.state.persons.map( person => <CardPerson key={person.id} person={person} /> );

        return (
            <div>
                {items}
            </div>
        );
    }
}

export default Person;