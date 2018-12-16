import React, {Component} from 'react';

class CardPerson extends Component {

    render() {
        const { person } = this.props;
        const item = person.map(per => <p key={per.id}> <strong>{per.firstname} {per.lastname}</strong> </p>);

        return (
            <div className="row">
                <div className="col-9">
                    <div className="alert alert-secondary" role="alert">
                        {item}
                    </div>
                </div>
                <div className="col-3">
                    <button type = "button" className = "btn btn-outline-danger">Supprimer</button>
                </div>
            </div>
        );
    }
}

export default CardPerson;