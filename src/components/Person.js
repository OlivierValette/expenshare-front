import React, {Component} from 'react';
import CardPerson from "./CardPerson";

class Person extends Component {

    constructor(props) {
        super(props);
        this.state = {
            slug: '',
            persons: [],
            newPerson: {},
        }
    }

    componentDidMount() {
        // get sharegroup slug from url
        let slug = this.props.match.url.split('/')[1];
        this.setState({slug: slug});

        // get list of persons in state through API (https://127.0.0.1/php/expenshare/public/person/{slug})
        fetch ('http://127.0.0.1/php/expenshare/public/person/'+slug, {
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

    handleChange(event) {
        event.preventDefault();
        this.setState({
            firstname: event.target.firstname,
            lastname: event.target.lastname,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const newPerson = this.state;
        return this.props.handleNewPerson(newPerson);
    }

    render() {
        // First render, before componentDidMount()
        if (this.state.persons.length === 0) {
            return <div>Chargement en cours...</div>
        }

        const items = this.state.persons.map( person => <CardPerson key={person.id} person={person} /> );

        return (
            <div>

                <form className="form-group text-center mt-3" onSubmit={e => this.handleSubmit(e)}>
                    <input type="text" className="form-control form-control-lg"
                           placeholder="Prénom"
                           value={this.state.firstname}
                           onChange={e => this.handleChange(e)} />
                    <input type="text" className="form-control form-control-lg"
                           placeholder="Nom"
                           value={this.state.lastname}
                           onChange={e => this.handleChange(e)} />
                    <input type="submit" value="Ajouter" className="btn btn-outline-warning btn-lg m-2"/>
                </form>

                {items}

            </div>
        );
    }
}

export default Person;