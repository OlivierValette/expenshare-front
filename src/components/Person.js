import React, {Component} from 'react';
import CardPerson from "./CardPerson";

class Person extends Component {

    constructor(props) {
        super(props);
        this.state = {
            persons: [],
            firstname: '',
            lastname: '',
        }
    }

    componentDidMount() {
        // get list of persons through API (https://127.0.0.1/php/expenshare/public/person/{slug})
        fetch ('http://127.0.0.1/php/expenshare/public/person/'+this.props.slug, {
            method: 'GET',
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
            .then(response => response.json())
            .then(data => this.setState({persons: data}));
    }

    handleChange(event) {
        event.preventDefault();
        const column = event.target.name;
        // use of the ES6 computed property name syntax to update the state key corresponding to the given input name
        this.setState({
            [column]: event.target.value,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        // person creation in database via API
        fetch('http://127.0.0.1/php/expenshare/public/person', {
            method: 'POST',
            body: JSON.stringify({
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                slug: this.props.slug,
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                alert('Nouvelle personne créée avec succès !');
            })
            .catch(err => alert('Erreur lors de la création de la personne'))
        ;
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
                           name="firstname"
                           value={this.state.value}
                           onChange={e => this.handleChange(e)} />
                    <input type="text" className="form-control form-control-lg"
                           placeholder="Nom"
                           name="lastname"
                           value={this.state.value}
                           onChange={e => this.handleChange(e)} />
                    <input type="submit" value="Ajouter" className="btn btn-outline-warning btn-lg m-2"/>
                </form>

                {items}

            </div>
        );
    }
}

export default Person;