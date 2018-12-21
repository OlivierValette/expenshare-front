import React, {Component} from 'react';
import moment from "moment";

class CardExpense extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notReady: true,
            expenses: [],
            deletedExpense: '',
        }
    }

    componentDidMount() {
        // get list of expenses of person through API (https://127.0.0.1/php/expenshare/public/expense/show/{id})
        fetch ('http://127.0.0.1/php/expenshare/public/expense/show/'+this.props.person.id, {
                method: 'GET',
                headers: {'X-Requested-With': 'XMLHttpRequest'}
            })
            .then(response => response.json())
            .then(data => this.setState({expenses: JSON.parse(data)}))
            .then(() => this.setState({notReady: false}))
        ;

        // TODO : see why moment.locale does not work as expected!
        moment.locale('fr');
    }

    handleClick(action, expenseId) {
        if (action === 'delete') {
            if (window.confirm("Confirmez-vous la suppression ?")) {
                console.log('http://127.0.0.1/php/expenshare/public/expense/delete/' + expenseId);
                fetch ('http://127.0.0.1/php/expenshare/public/expense/delete/' + expenseId, {
                    method: 'DELETE',
                    headers: {'X-Requested-With': 'XMLHttpRequest'}
                })
                    .then(response => response.json())
                    .then(data => this.setState({deletedExpense: JSON.parse(data)}))
                ;
            }
        }
    }

    render() {

        // First render, before componentDidMount()
        if (this.state.notReady) {
            return (
                <div className="text-center text-black-50">
                    <i className={"fas fa-spinner fa-2x fa-pulse "}></i>
                </div>
            )
        }

        // TODO : activate correct update button (see where to do it?)
        // TODO : bug fix on date delay of payment

        const item = this.state.expenses.map( expense => {
            return (
                        <div key={expense.id} className="row mt-1">
                            <div className="col-9">
                                <div className="alert alert-secondary" role="alert">
                                    <p>
                                        <i className={"fas " + expense.category.icon + " fa-2x fa-fw"}></i> &nbsp;
                                        <strong>{expense.category.label} ({expense.amount} €) &nbsp;</strong>
                                        payé par {expense.person.firstname} &nbsp;
                                        {moment(expense.createdAt.date).startOf('day').fromNow()}
                                    </p>
                                </div>
                            </div>
                            <div className="col-1 text-center">
                                <button type = "button" className = "btn btn-outline-warning"
                                        onClick = { () => alert('Supprimez la dépense puis recréez la dépense conforme') }>
                                    Modifier
                                </button>
                            </div>
                            <div className="col-2 text-center">
                                <button type = "button" className = "btn btn-outline-danger"
                                        onClick = { () => this.handleClick('delete', expense.id) }>
                                    Supprimer
                                </button>
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
