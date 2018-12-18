import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'animate.css';
import {Redirect} from "react-router-dom";

class Identification extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            sharegroups: [],
        }
    }

    componentDidMount() {
        // get list of sharegroups in state through API (https://http://127.0.0.1/php/exepenshare/public/sharegroup)
        fetch ('http://127.0.0.1/php/expenshare/public/sharegroup',{
            method: 'GET',
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
            .then(response => response.json())
            .then(data => this.setState({sharegroups: data}))
        ;
    }

    slugify(string) {
        const a = 'àáäâãåèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;';
        const b = 'aaaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------';
        const p = new RegExp(a.split('').join('|'), 'g');

        return string.toString().toLowerCase()
            .replace(/\s+/g, '-')           // Replace spaces with -
            .replace(p, c => b.charAt(a.indexOf(c)))      // Replace special characters
            .replace(/&/g, '-and-')         // Replace & with 'and'
            .replace(/[^\w\-]+/g, '')       // Remove all non-word characters
            .replace(/\-\-+/g, '-')         // Replace multiple - with single -
            .replace(/^-+/, '')             // Trim - from start of text
            .replace(/-+$/, '')             // Trim - from end of text
    }

    handleChange(event) {
        event.preventDefault();
        this.setState({
            value: event.target.value,
        });
    }

    handleSubmit(event, origin) {
        event.preventDefault();
        // Get list of existing slugs
        const sharegroups = this.state.sharegroups.map(sgroup => sgroup.slug);
        // Slugify given name
        const slug = this.slugify(this.state.value);
        // See if already used
        const used = sharegroups.includes(slug);

        if (origin === 'create') {
            if (used) {
                alert('Le groupe ' + slug + ' existe déjà, modifiez votre saisie');
            } else {
                // sharegroup creation in database
                fetch('http://127.0.0.1/php/expenshare/public/sharegroup/', {
                    method: 'POST',
                    body: JSON.stringify({ slug: this.state.value })
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        alert('Nouveau groupe créé avec succès !');
                    })
                    .catch(err => alert('Erreur lors de la création du groupe'))
                ;
            }
        } else {
            if (!used) {
                alert( "Le groupe " + slug + " n'existe pas, modifiez votre saisie");
            } else {
                // get sharegroup info
                fetch('http://127.0.0.1/php/expenshare/public/sharegroup/' + slug)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        this.setState({ sharegroup: JSON.parse(data) });
                    })
                    .catch(err => alert('Erreur API'))
                ;
            }
        }
    }

    render() {

    if (this.state.sharegroup) {
        return <Redirect to={'/' + this.state.sharegroup.slug}/>
    }

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

                <div className="form-group text-center">
                    <input type="text" className="form-control form-control-lg" id="groupid"
                           placeholder="Entrez votre identifiant"
                           value={this.state.value}
                           onChange={e => this.handleChange(e)} />
                    <input type="submit" className="btn btn-primary btn-lg m-2"  value="Créer"
                           onClick={e => this.handleSubmit(e, 'create')} />
                    <input type="submit" className="btn btn-dark btn-lg m-2" value="Ouvrir"
                           onClick={e => this.handleSubmit(e, 'open')} />
                </div>

            </div>
        </div>
    );
    }
}

export default Identification;
