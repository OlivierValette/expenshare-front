import React, {Component} from 'react';

class CardExpense extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expenses: [],
        }
    }

    componentDidMount() {
        // get list of expenses of person through API (https://127.0.0.1/php/expenshare/public/expense/show/{id})
        fetch ('http://127.0.0.1/php/expenshare/public/expense/show/'+this.props.person.id, {
            method: 'GET',
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
            .then(response => response.json())
            .then(data => this.setState({expenses: data}))
        ;
    }

    render() {

        // First render, before componentDidMount()
        if (this.state.expenses.length === 0) {
            return <div>...</div>
        }

        const item = this.state.expenses.map( expense => { return (
                        <p key={expense.category.id}> <strong>{expense.category.label} ({expense.amount} €) &nbsp;</strong>
                            payé par {expense.person.firstname}nbsp;
                            le {expense.createdAt.date}nbsp;
                            <i className={"fas " + expense.category.icon}></i>
                        </p>
                    )
                }
            );

        // TODO : activer boutons

        return (

            <div className="row mt-1">
                <div className="col-9">
                    <div className="alert alert-secondary" role="alert">
                        {item}
                    </div>
                </div>
                <div className="col-1 text-center">
                    <button type = "button" className = "btn btn-outline-warning">Modifier</button>
                </div>
                <div className="col-2 text-center">
                    <button type = "button" className = "btn btn-outline-danger">Supprimer</button>
                </div>
            </div>
        );
    }
}

export default CardExpense;