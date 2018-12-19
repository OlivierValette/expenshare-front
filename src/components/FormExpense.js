import React, { Component } from 'react';

class FormExpense extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            persons: [],
            title: '',
            amount: '',
            categoryId: '',
            personId: '',
        }
    }

    componentDidMount() {

        // get list of categories through API (https://127.0.0.1/php/expenshare/public/category)
        fetch ('http://127.0.0.1/php/expenshare/public/category/', {
                method: 'GET',
                headers: {'X-Requested-With': 'XMLHttpRequest'}
            })
            .then(response => response.json())
            .then(data => this.setState({categories: data}));

        // get list of persons through API (https://127.0.0.1/php/expenshare/public/person/{slug})
        fetch ('http://127.0.0.1/php/expenshare/public/person/'+this.props.slug, {
                method: 'GET',
                headers: {'X-Requested-With': 'XMLHttpRequest'}
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
        // expense creation in database via API
        fetch('http://127.0.0.1/php/expenshare/public/expense', {
                method: 'POST',
                body: JSON.stringify({
                    title: this.state.title,
                    amount: this.state.amount,
                    categoryId: this.state.categoryId,
                    personId: this.state.personId,
                })
            })
            .then(response => response.json())
            .then( () => {
                alert('Nouvelle dépense créée avec succès !');
                // this.props.callback(data);
            })
            .catch(err => alert('Erreur lors de la création de la dépense'))
        ;
    }

    render() {

        // First render, before componentDidMount()
        if (this.state.persons.length === 0) {
            return (
                <div className="text-center text-black-50">
                    <i className={"fas fa-spinner fa-2x fa-pulse "}></i>
                </div>
            )
        }

        const categories = this.state.categories.map(
            category => <option key={category.id} value={category.id}>{category.label}</option> );
        const persons = this.state.persons.map(
            person => <option key={person.id} value={person.id}>{person.firstname} {person.lastname}</option> );

        return (
            <form className="form-group row mt-3" onSubmit={e => this.handleSubmit(e)}>
                <label className="col-2 col-form-label">Libellé : </label>
                <div className="col-10">
                    <input type="text" className="form-control"
                           placeholder="Libellé"
                           value={this.state.value}
                           name="title"
                           onChange={e => this.handleChange(e)} />
                </div>
                <label className="col-2 col-form-label">Montant : </label>
                <div className="col-10">
                    <input type="" className="form-control"
                           placeholder="Montant"
                           value={this.state.value}
                           name="amount"
                           onChange={e => this.handleChange(e)} />
                </div>
                <label className="col-2 col-form-label">Choisissez la catégorie</label>
                <div className="col-10">
                    <select className="form-control" value={this.state.value} defaultValue="disabled"
                            name="categoryId" onChange={e => this.handleChange(e)}>
                        <option value="disabled" disabled>Catégorie...</option>
                        {categories}
                    </select>
                </div>
                <label className="col-2 col-form-label">Choisissez la personne</label>
                <div className="col-10">
                    <select className="form-control" value={this.state.value} defaultValue="disabled"
                            name="personId" onChange={e => this.handleChange(e)}>
                        <option value="disabled" disabled>Personne...</option>
                        {persons}
                    </select>
                </div>
                <input type="submit" value="Ajouter" className="btn btn-outline-warning btn-lg m-2"/>
            </form>
        )
    }
}

export default FormExpense;