import React, { Component } from 'react';

class FormPerson extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
        }
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

export default FormPerson;