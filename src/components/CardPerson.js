import React, {Component} from 'react';

class CardPerson extends Component {

    render() {

        // TODO: nombre de règlemens et montant global à calculer
        // TODO : activer button
        console.log(this.props);

        return (
            <div className="row mt-1">
                <div className="col-10">
                    <div className="alert alert-secondary" role="alert">
                        <p> <strong>{this.props.person.firstname} {this.props.person.lastname}</strong> (xx paiements d'un montant total de xxx €)</p>
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