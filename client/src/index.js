import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux'
import store from './store/store'
import Theme from './Theme/DarkMode'


ReactDOM.render(
  <Provider store={store}>
    <Theme />
  </Provider>,
  document.getElementById('root')
);

