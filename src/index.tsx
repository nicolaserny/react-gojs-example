import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { Provider } from 'react-redux';
import { create } from './store';
import { graphReducer } from './reducers/graphReducer';

ReactDOM.render(
  (
    <Provider store={create(graphReducer)} >
      <App />
    </Provider>
  ),
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
