import React, {Component} from 'react';

class CardPerson extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expenses: [],
            totalAmount: -1,
            deletedPerson: '',
        }
    }

    componentDidMount() {
        // get list of expenses in state through API (https://127.0.0.1/php/expenshare/public/person/show/{id})
        fetch ('http://127.0.0.1/php/expenshare/public/person/show/'+this.props.person.id, {
                method: 'GET',
                headers: {'X-Requested-With': 'XMLHttpRequest'}
            })
            .then(response => response.json())
            .then(data => this.setState({expenses: data}))
            .then(() => {
                // get number and total amount of expenses for this user
                /*
                    let totalAmount = 0;
                    for (let i = 0; i < this.state.expenses.length; i++) {
                        totalAmount += parseFloat(this.state.expenses[i].amount);
                    }
                */
                // much cooler way to do this
                const totalAmount = this.state.expenses.reduce( (sum, e) => sum + parseFloat(e.amount) , 0 );
                this.setState({totalAmount});
            });
    }

    handleClick(action) {
        if (action === 'delete') {
            if (window.confirm("Confirmez-vous la suppression ?")) {
                fetch ('http://127.0.0.1/php/expenshare/public/person/delete/' + this.props.person.id, {
                        method: 'DELETE',
                        headers: {'X-Requested-With': 'XMLHttpRequest'}
                    })
                    .then(response => response.json())
                    .then(data => this.setState({deletedPerson: data}))
                ;
            }
        }
    }

    render() {

        // First render, before componentDidMount()
        if (this.state.totalAmount === -1) {
            return (
                <div className="text-center text-black-50">
                    <i className={"fas fa-spinner fa-2x fa-pulse "}></i>
                </div>
            )
        }

        // TODO : activate suppress button with confirmation - mind cascading effect on related expenses

        return (

            <div className="row mt-1">
                <div className="col-10">
                    <div className="alert alert-secondary" role="alert">
                        <p>
                            <strong>{this.props.person.firstname} {this.props.person.lastname} &nbsp;</strong>
                            ({this.state.expenses.length} paiement{this.state.expenses.length>1 ? 's' : ''},&nbsp;
                            d'un montant total de {this.state.totalAmount} €)
                        </p>
                    </div>
                </div>
                <div className="col-2 text-center">
                    <button type = "button" className = "btn btn-outline-danger"
                            onClick = { () => this.handleClick('delete') }>
                        Supprimer
                    </button>
                </div>
            </div>
        );
    }
}

export default CardPerson;