import * as React from 'react';
import './App.css';
import AppButtons from './AppButtons';
import GraphContainer from './GraphContainer';
import SelectionDetails from './SelectionDetails';

const logo = require('./logo.svg');

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React + Redux + Gojs Example</h1>
        </header>
        <AppButtons />
        <SelectionDetails />
        <GraphContainer />
      </div>
    );
  }
}

export default App;
