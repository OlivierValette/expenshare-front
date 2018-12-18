import React, { Component } from 'react';

class FormShareGroup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            slug: '',
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
            slug: event.target.value,
        });
    }

    handleSubmit(event, origin) {
        event.preventDefault();
        // Get list of existing slugs
        const sharegroups = this.state.sharegroups.map(category => category.slug);
        // Slugify given name
        const slug = this.slugify(this.state.value);
        // See if already used
        const used = sharegroups.includes(slug);

        if (origin === 'create') {
            if (used) {
                alert('Le groupe ' + slug + ' existe déjà, modifiez votre saisie');
            } else {
                // sharegroup creation in database
                fetch('http://127.0.0.1/dcdev/js/expenshare/public/sharegroup/', {
                    method: 'POST',
                    body: JSON.stringify({ slug: this.state.slug })
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        alert('Nouveau groupe créé avec succès !');
                    })
                    .catch(err => alert('Erreur lors de la création du groupe'))
                ;

                return this.props.handleGroupId(slug);
            }
        } else {
            if (!used) {
                alert( "Le groupe " + slug + " n'existe pas, modifiez votre saisie");
            } else {
                alert('Aller à /person/' + slug);
                return this.props.handleGroupId(slug);
            }
        }
    }

    render() {

        if (this.state.sharegroups === []) {
            return (
                < div className="container">
                    <div className="alert alert-warning" role="alert">
                        Chargement en cours...
                    </div>
                </div>
            );
        }

        return (
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
        )
    }
}

export default FormShareGroup;