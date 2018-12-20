import React, {Component} from 'react';

class Balance extends Component {

    // TODO : give stats on group expenses and balance debts

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
        // get list of expenses of person through API (https://127.0.0.1/php/expenshare/public/expense/show/{id})
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
        this.setState({totalNumber: persons.length});
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
    addTransaction(transactions, amount, fromId, toId) {
        // if negative amount swap from and to
        if (amount < 0) { [fromId, toId] = [toId, fromId]; }
        transactions.push({
            indexT: transactions.length,
            transacAmount: amount,
            fromId: fromId,
            toId: toId,
        });
        return transactions;
    }

    // Balancing debts
    balances() {
        let per = this.state.persons;
        let transactions = [];
        let toBeDone = per.length-2;
        // process is to be done until there is 2 persons left
        if (toBeDone < 0) {
            // less than 2 person in group... come on, be serious
            return false;
        }
        if (toBeDone === 0) {
            // 2 person in group... easy
            this.setState.transactions = this.addTransaction(transactions, per[0].debt, per.id[0], per.id[1]);
            per[0].debt = 0;
            per[1].debt = 0;
            return true;
        }
        // do {
            // First, check if two debts exactly compensate
            let isMatch = false;
            for (let i=0; i<per.length-2; i++) {
                for (let j=i+1; j<per.length-2; j++) {
                    if (per[i].debt !== 0 && per[j].debt !== 0) {
                        if (per[i].debt + per[j].debt === 0) {
                            this.setState.transactions = this.addTransaction(transactions, per[i].debt, per.id[i], per.id[j]);
                            per[i].debt = 0;
                            per[j].debt = 0;
                            isMatch = true;
                            toBeDone += -2;
                        }
                    }
                }
            }
            // Otherwise, compensate between extreme debts
            if (!isMatch) {
                let indexOfMinValue = per.reduce((iMin, p, i, per) => p.totalAmount < per[iMin].totalAmount ? i : iMin, 0);
                let indexOfMaxValue = per.reduce((iMax, p, i, per) => p.totalAmount > per[iMax].totalAmount ? i : iMax, 0);
                console.log('Index min: ', indexOfMinValue, ' - Index max: ', indexOfMaxValue);
                this.setState.transactions = this.addTransaction(
                    transactions,
                    per[indexOfMinValue].debt,
                    per[indexOfMinValue].id,
                    per[indexOfMaxValue].id
                );
                // reduce debs of transaction amount
                // TODO : bug!
                debugger;
                per[indexOfMinValue].debt += - Math.abs(per[indexOfMinValue].debt);
                per[indexOfMaxValue].debt += Math.abs(per[indexOfMinValue].debt);
                console.log(transactions);
                this.setState({transactions: transactions});
                // count again what is to be done
                toBeDone = -2;
                for (let i=0; i<per.length; i++) {
                    toBeDone = toBeDone + (per[i].debt === 0 ? 0 : 1 )
                }
                console.log(toBeDone);
                console.log(per);
            }

        // } while (toBeDone > 0);
        return true;
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
        const bals = this.state.persons.map( person => {
            return (
                <div key={person.id}>
                    {person.firstname + ' a dépensé ' + person.totalAmount + ' € et doit ' + ( (person.debt > 0) ? 'donner ' : 'recevoir ' ) + Math.abs(person.debt) + ' €'}
                </div>
            )
        });

        const transacs = this.state.transactions.map( transaction => {
            return (
                <ol key={transaction.indexT}>
                    <li>
                        {transaction.transacAmount + ' € à payer par ' +
                        this.state.persons.find(o => o.id === transaction.fromId).firstname +
                        ' à ' +
                        this.state.persons.find(o => o.id === transaction.toId).firstname }
                    </li>
                </ol>
            )
        });

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
                            { this.state.totalNumber > 0 && <p>{this.state.totalAmount} €</p> }
                        </div>
                    </div>
                </div>
                <h3>Équilibre des dépenses du groupe</h3>
                <div className="mt-1">
                    {bals}
                </div>
                <div className="mt-1">
                    <h4>Opérations suggérées</h4>
                    {transacs}
                </div>
            </div>
        );
    }
}

export default Balance;