import React, {Component} from 'react';
import {Redirect} from "react-router-dom";

class Index extends Component {

  constructor(props) {
    super(props);
    this.state = { slug: "", sharegroup: null };
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ slug: event.target.value });
  }

  handleCreate(event) {
    event.preventDefault();
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
  }

  handleOpen(event) {
    event.preventDefault();
    fetch('http://127.0.0.1/dcdev/js/expenshare/public/sharegroup/' + this.state.slug)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({ sharegroup: JSON.parse(data) });
      })
      .catch(err => alert('Ce groupe n\'existe pas !'))
    ;
  }

  render() {

    if (this.state.sharegroup) {
      return <Redirect to={'/group/' + this.state.sharegroup.slug}/>
    }

    return (
      <div>
        <input type="text" value={this.state.slug} onChange={e => this.handleChange(e)} placeholder="Group ID"/>
        <button onClick={e => this.handleCreate(e)}>Creér</button>
        <button onClick={e => this.handleOpen(e)}>Ouvrir</button>
      </div>
    );
  }
}

export default Index;