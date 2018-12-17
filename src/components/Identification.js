import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'animate.css';
import FormShareGroup from "./FormShareGroup";

class Identification extends Component {

    constructor(props) {
        super(props);
        this.state = {
            groupId: 0,
        };
    }

    handleGroupId (groupId) {
        this.setState({ groupId: groupId });
        console.log(this.state.groupId);
    }

    render() {

    return (
        <div className="container">
            <div className="jumbotron ">
                <div className="row">
                    <div className="col-4 text-center">
                        <img className="rounded" src="ES-small.png" alt="logo"/>
                    </div>
                    <div className="col-8">
                        <h1 className="display-2">Expenshare</h1>
                        <p className="lead">Les comptes faciles font les bons amis...</p>
                    </div>
                </div>
            </div>
            <div className="jumbotron">
                <h1 className="display-4">Saisissez l'identifiant du groupe</h1>
                <FormShareGroup handleGroupId={groupId => this.handleGroupId(groupId)}/>
            </div>
        </div>
    );
    }
}

export default Identification;
