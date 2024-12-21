import React, { Component } from 'react';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import './styles.css'; 

class App extends Component {
  render() {
    return (
      <div className="body">
        <Header />
        <Main />
      </div>
    );
  }
}

export default App;