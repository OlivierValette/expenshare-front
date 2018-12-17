import React, { Component } from 'react';

class FormExpense extends Component {

    constructor(props) {
        super(props);
        this.state = {
            person: '',
            title: '',
            amount: '',
            date: '',
        }
    }

    handleChange(event) {
        event.preventDefault();
        this.setState({
            title: event.target.title,
            amount: event.target.amount,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const newExpense = this.state;
        return this.props.handleNewExpense(newExpense);
    }

    render() {

        return (
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
        )
    }
}

export default FormExpense;