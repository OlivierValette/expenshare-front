import React, {Component} from 'react';

class Balance extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notReady: true,
            debts: [],
            expenses: [],
            persons: [],
            sharegroup: '',
            totalNumber: 0,
            totalAmount: 0,
            transactions: [],
        }
    }

    componentDidMount() {
        // get list of persons in state through API (https://127.0.0.1/php/expenshare/public/expense/{slug})
        fetch ('http://127.0.0.1/php/expenshare/public/person/'+this.props.slug, {
                method: 'GET',
                headers: {'X-Requested-With': 'XMLHttpRequest'}
            })
            .then(response => response.json())
            .then(data => this.setState({persons: JSON.parse(data)}))
        ;
        // get sharegroup in state through API (https://127.0.0.1/php/expenshare/public/sharegroup/{slug})
        fetch ('http://127.0.0.1/php/expenshare/public/sharegroup/'+this.props.slug, {
                method: 'GET',
                headers: {'X-Requested-With': 'XMLHttpRequest'}
            })
            .then(response => response.json())
            .then(data => this.setState({sharegroup: JSON.parse(data)}))
        ;
        // get list of expenses through API (https://127.0.0.1/php/expenshare/public/expense/list)
        fetch ('http://127.0.0.1/php/expenshare/public/expense/list/', {
            method: 'GET',
            headers: {'X-Requested-With': 'XMLHttpRequest'}
        })
            .then(response => response.json())
            .then(data => this.setState({expenses: JSON.parse(data)}))
            .then(() => this.setState({notReady: false}))
            .then(() => this.computations())
            .then(() => this.balances())
        ;
    }

    // Debts calculation
    computations() {
        let expenses = this.state.expenses;
        let persons = this.state.persons;
        let debts = [];
        // First, only keep expenses of sharegroup
        for (let i = expenses.length; i--;) {
            if (expenses[i].person.shareGroup.slug !== this.props.slug) { expenses.splice(i,1); }
        }
        this.setState({expenses: expenses});
        // get clusters on expenses of sharegroup
        this.setState({totalNumber: expenses.length});
        this.setState({totalAmount:
                Math.round(100. * expenses.reduce( (sum, e) => sum + parseFloat(e.amount) , 0 ) ) / 100.
            });
        // get clusters on expenses of persons
        for (let i = 0; i < persons.length; i++) {
            let id = persons[i].id;
            persons[i].totalAmount =  Math.round(100. *
                (expenses.reduce( (sum, e) => sum + ((e.person.id == id) ? parseFloat(e.amount) : 0) , 0 ))
            ) / 100.;
        }
        // compute debt of persons
        let cost = (this.state.totalNumber === 0) ? 0 : this.state.totalAmount/this.state.totalNumber;
        for (let i = 0; i < persons.length; i++) {
            debts[i] = Math.round(100. * (cost - persons[i].totalAmount) ) / 100.;
            persons[i].debt = debts[i];
        }
        this.setState({persons: persons});
        console.log('persons:', persons);
        this.setState({debts: debts});
        console.log('debts:', debts);
    }

    // create a balance transaction between two persons
    // TODO : update database table debt
    addTransaction(transactions, amount, fromId, toId) {
        transactions.push({
            indexT: transactions.length,
            transacAmount: amount,
            fromId: fromId,
            toId: toId,
        });
        return transactions;
    }

    // find index of minimum value in an array of objects person
    // using this function instead of one line solution that causes unexpected results (babel?)
    //  per.reduce((iMin, p, i, per) => p.totalAmount < per[iMin].totalAmount ? i : iMin, 0);
    indexOfMinDebt(arr) {
        if (arr.length === 0) {
            return -1;
        }
        let min = arr[0].debt;
        let minIndex = 0;
        for (let i = 1; i < arr.length; i++) {
            if (arr[i].debt < min) {
                minIndex = i;
                min = arr[i].debt;
            }
        }
        return minIndex;
    }

    // find index of maximum value in an array of objects person
    // using this function instead of one line solution that causes unexpected results (babel?)
    //  per.reduce((iMax, p, i, per) => p.totalAmount > per[iMax].totalAmount ? i : iMax, 0);
    indexOfMaxDebt(arr) {
        if (arr.length === 0) {
            return -1;
        }
        let max = arr[0].debt;
        let maxIndex = 0;
        for (let i = 1; i < arr.length; i++) {
            if (arr[i].debt > max) {
                maxIndex = i;
                max = arr[i].debt;
            }
        }
        return maxIndex;
    }

    // Balancing debts
    balances() {
        let per = this.state.persons;
        let transactions = [];
        let toBeDone = per.length;
        // process is to be done until there is 2 persons left
        if (toBeDone < 2) {
            // less than 2 person in group... come on, be serious
            return false;
        }
        // check if no debt at all
        if (this.state.debts.every( i => i === 0 )) {
            console.log('No debt to compensate');
            return true }
        // special case: only 2 person in group... easy
        if (toBeDone === 2) {
            this.setState.transactions = this.addTransaction(transactions, per[0].debt, per.id[0], per.id[1]);
            per[0].debt = 0;
            per[1].debt = 0;
            return true;
        }
        // security loop counter
        let attempt = 0;
        do {
            // First, check if two debts "exactly" compensate (in fact to the nearest cent)
            let isMatch = false;
            for (let i=0; i<per.length-2; i++) {
                for (let j=i+1; j<per.length-2; j++) {
                    if (per[i].debt !== 0 && per[j].debt !== 0) {
                        if (Math.abs(per[i].debt + per[j].debt) < 0.02) {
                            this.setState.transactions = this.addTransaction(transactions, per[i].debt, per.id[i], per.id[j]);
                            per[i].debt = 0;
                            per[j].debt = 0;
                            isMatch = true;
                            toBeDone += -2;
                        }
                    }
                }
            }
            // Otherwise, compensate between extreme debts, from positive sign to negative
            if (!isMatch) {
                console.log(per);
                let indexOfMinValue = this.indexOfMinDebt(per); // should be of negative sign
                let indexOfMaxValue = this.indexOfMaxDebt(per); // should be of positive sign
                console.log('Index min: ', indexOfMinValue, ' - Index max: ', indexOfMaxValue);
                // the value of the transaction is the smallest debt
                let compensate = Math.min(Math.abs(per[indexOfMinValue].debt), Math.abs(per[indexOfMinValue].debt));
                console.log(compensate);
                this.setState.transactions = this.addTransaction(
                    transactions,
                    compensate,
                    per[indexOfMaxValue].id,
                    per[indexOfMinValue].id
                );
                // reduce debs of transaction amount
                per[indexOfMinValue].debt = Math.round(100.* (per[indexOfMinValue].debt + compensate)) / 100.;
                per[indexOfMaxValue].debt = Math.round(100.* (per[indexOfMaxValue].debt - compensate)) / 100.;
                console.log(transactions);
                this.setState({transactions: transactions});
                // count again what is to be done (again to the nearest cent)
                toBeDone = 0;
                for (let i=0; i<per.length; i++) {
                    toBeDone = toBeDone + (Math.abs(per[i].debt) < 0.02 ? 0 : 1 )
                }
                attempt += 1;
                console.log(toBeDone);
                console.log(per);
            }
        } while (toBeDone > 0 && attempt < 2*per.length);
        return true;
    }

    handleClick(action) {
        if (action === 'delete') {
            if (window.confirm("Confirmez-vous la fermeture du groupe ?")) {
                fetch ('http://127.0.0.1/php/expenshare/public/sharegroup/close/' + this.state.sharegroup.slug, {
                    method: 'PUT',
                    headers: {'X-Requested-With': 'XMLHttpRequest'}
                })
                    .then(response => response.json())
                    .then(data => this.setState({sharegroup: JSON.parse(data)}))
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
        // for balance rendering
        // TODO : understand why state.persons is updated when per is in method balances
        const bals = this.state.persons.map( person => {
            return (
                <div key={person.id}>
                    {person.firstname + ' a dépensé ' + person.totalAmount + ' € et doit ' + ( (person.debt > 0) ? 'donner ' : 'recevoir ' ) + Math.abs(person.debt) + ' €'}
                </div>
            )
        });
        // for transaction suggestions
        const transacs = this.state.transactions.map( transaction => {
            return (
                    <p key={transaction.indexT} className="alert alert-secondary" role="alert">
                        {transaction.transacAmount + ' € à payer par ' +
                        this.state.persons.find(o => o.id === transaction.fromId).firstname +
                        ' à ' +
                        this.state.persons.find(o => o.id === transaction.toId).firstname }
                    </p>
            )
        });
        // used to test if group already closed to avoid close button rendering
        const closed = this.state.sharegroup.closed;

        return (
            <div>
                <h3>Bilan des dépenses du groupe</h3>
                <div className="row mt-1">
                    <div className="col-6">
                        <div className="alert alert-secondary display-4" role="alert">
                            <p>{this.state.totalNumber} paiement{this.state.totalNumber>1 ? 's' : ''}</p>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="alert alert-primary text-right display-4" role="alert">
                            <p>{this.state.totalAmount} €</p>
                        </div>
                    </div>
                </div>
                { this.state.totalNumber > 0 &&
                    <div>
                        <h3>Équilibre des dépenses du groupe</h3>
                        <div className="mt-1">
                            {bals}
                        </div>
                        <div className="mt-1">
                            <h4>Opérations suggérées</h4>
                            {transacs}
                        </div>
                    </div>
                }
                <div className="mt-5 text-center">
                    {!closed &&
                        <button type="button" className="btn btn-outline-primary"
                                onClick={() => this.handleClick('delete')}>
                            Fermer le groupe
                        </button>
                    }
                </div>
            </div>
        );
    }
}

export default Balance;