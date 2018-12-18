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
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
            .then(response => response.json())
            .then(data => this.setState({categories: data}));

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
        const newExpense = this.state;
        return this.props.handleNewExpense(newExpense);
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

        // TODO : finish expense form
        const categories = this.state.categories.map( category => <option value={category.id}>{category.name}</option> );
        const persons = this.state.persons.map( person => <option value={person.id}>{}</option> );


        return (
            <form className="form-group text-center mt-3" onSubmit={e => this.handleSubmit(e)}>
                <input type="text" className="form-control"
                       placeholder="Libellé"
                       value={this.state.value}
                       name="title"
                       onChange={e => this.handleChange(e)} />
                <input type="" className="form-control"
                       placeholder="Montant"
                       value={this.state.value}
                       name="amount"
                       onChange={e => this.handleChange(e)} />
                <label>
                    Choisissez la catégorie :
                    <select value={this.state.value} name="categryId" onChange={e => this.handleChange(e)}>
                        {categories}
                    </select>
                </label>
                <label>
                    Choisissez la personne :
                    <select value={this.state.value} name="categryId" onChange={e => this.handleChange(e)}>
                        {persons}
                    </select>
                </label>
                <input type="submit" value="Ajouter" className="btn btn-outline-warning btn-lg m-2"/>
            </form>
        )
    }
}

export default FormExpense;