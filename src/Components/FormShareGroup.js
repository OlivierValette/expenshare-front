import React, { Component } from 'react';

class FormShareGroup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sharegroups: [],
        }
    }

    componentDidMount() {
        // get list of sharegroups in state through API (https://http://127.0.0.1/php/exepenshare/public/category/)
        fetch ('http://127.0.0.1/php/exepenshare/public/category',{
            method: 'GET',
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
            .then(response => response.json())
            .then(data => this.setState({sharegroups: data}))
        ;
    }

    render() {

        const sharegroup = this.state.sharegroups.map( sg => <li key={sg.id} value={sg.id}>{sg.slug}</li>);

        return (
            <div className="form-group">
                <label htmlFor="filter">Saisir un identifiant</label>
                <select name="sharegroup" onChange={e => this.props.search({sharegroups: e.target.value} )}>
                    {sharegroup}
                </select>
            </div>
        )
    }
}

export default FormShareGroup;