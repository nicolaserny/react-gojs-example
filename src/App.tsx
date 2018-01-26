import * as React from 'react';
import './App.css';
import GraphButtons from './GraphButtons';
import GraphContainer from './GraphContainer';

const logo = require('./logo.svg');

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React + Redux + Gojs Example</h1>
        </header>
        <GraphButtons />
        <GraphContainer />
      </div>
    );
  }
}

export default App;
