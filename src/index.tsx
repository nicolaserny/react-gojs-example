import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { Provider } from 'react-redux';
import { create } from './store';
import { diagramReducer } from './reducers/diagramReducer';

ReactDOM.render(
  (
    <Provider store={create(diagramReducer)} >
      <App />
    </Provider>
  ),
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
