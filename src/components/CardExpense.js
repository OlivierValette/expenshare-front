import React, {Component} from 'react';
import moment from "moment";

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
            .then(console.log(this.state.expenses))
        ;

        // TODO : see why does not work as expected!
        moment.locale('fr');
        console.log(moment.locale());
    }

    render() {

        // First render, before componentDidMount()
        if (this.state.expenses.length === 0) {
            return (
                <div className="text-center text-black-50">
                    <i className={"fas fa-spinner fa-2x fa-pulse "}></i>
                </div>
            )
        }

        // TODO : activate 2 buttons
        // TODO : bug fix on date delay of payment

        const item = this.state.expenses.map( expense => {
            return (
                    <div className="row mt-1">
                        <div className="col-9">
                            <div className="alert alert-secondary" role="alert">
                                <p key={expense.id}>
                                    <i className={"fas " + expense.category.icon + " fa-2x fa-fw"}></i> &nbsp;
                                    <strong>{expense.category.label} ({expense.amount} €) &nbsp;</strong>
                                    payé par {expense.person.firstname} &nbsp;
                                    {moment(expense.createdAt.date).startOf('day').fromNow()}
                                </p>
                            </div>
                        </div>
                        <div className="col-1 text-center">
                            <button type = "button" className = "btn btn-outline-warning">Modifier</button>
                        </div>
                        <div className="col-2 text-center">
                            <button type = "button" className = "btn btn-outline-danger">Supprimer</button>
                        </div>
                    </div>
                    )
                }
            );


        return (
            <div>
                {item}
            </div>
        );
    }
}

export default CardExpense;