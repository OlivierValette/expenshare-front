import React, {Component} from 'react';

class Balance extends Component {

    // TODO : give stats on group expenses and balance debts

    constructor(props) {
        super(props);
        this.state = {
            debts: [],
            expenses: [],
            persons: [],
        }
    }

    componentDidMount() {
        // get list of persons with expense in state through API (https://127.0.0.1/php/expenshare/public/expense/{slug})
        fetch ('http://127.0.0.1/php/expenshare/public/person/'+this.props.slug, {
            method: 'GET',
            headers: {'X-Requested-With': 'XMLHttpRequest'}
        })
            .then(response => response.json())
            .then(data => this.setState({persons: data}))
            .then(data => console.log(data))
        ;
    }


    render() {
        return (
            <div>
                Équilibre des dépenses du groupe
            </div>
        );
    }
}

export default Balance;