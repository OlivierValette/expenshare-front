import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import Index from "./Components/Index";
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/" exact component={Index} />
      </BrowserRouter>
    );
  }
}

export default App;
