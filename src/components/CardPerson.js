import React, {Component} from 'react';

class CardPerson extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expenses: [],
            totalAmount: 0,
        }
    }

    componentDidMount() {
        // get list of expenses in state through API (https://127.0.0.1/php/expenshare/public/person/show/{id})
        fetch ('http://127.0.0.1/php/expenshare/public/person/show/'+this.props.person.id, {
            method: 'GET',
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
            .then(response => response.json())
            .then(data => this.setState({expenses: data}))
            .then(() => {
                // get number and total amount of expenses for this user
                let totalAmount = 0;
                for (let i = 0; i < this.state.expenses.length; i++) {
                    totalAmount += parseFloat(this.state.expenses[i].amount);
                }
                this.setState({totalAmount});
            });
    }

    render() {

        // First render, before componentDidMount()
        if (this.state.expenses.length === 0) {
            return <div>...</div>
        }

        // TODO : activer button

        return (

            <div className="row mt-1">
                <div className="col-10">
                    <div className="alert alert-secondary" role="alert">
                        <p> <strong>{this.props.person.firstname} {this.props.person.lastname} &nbsp;</strong>
                            ({this.state.expenses.length} paiement{this.state.expenses.length>1 ? 's' : ''} d'un montant total de {this.state.totalAmount} €)
                        </p>
                    </div>
                </div>
                <div className="col-2 text-center">
                    <button type = "button" className = "btn btn-outline-danger">Supprimer</button>
                </div>
            </div>
        );
    }
}

export default CardPerson;