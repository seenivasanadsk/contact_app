import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers/index.js';
import data from './data.json';
import DB from './Dexie'
import { FETCH_CONTACT } from './types/index.js';

const store = createStore(rootReducer)

let res = data
let contactDb = new DB;
contactDb.viewData(data => {  
  if (data.length > 0) {
    store.dispatch({ type: FETCH_CONTACT, payload: data })
  } else {
    contactDb.setData(res);
    contactDb.viewData(data => {
      store.dispatch({ type: FETCH_CONTACT, payload: data })
    })
  }
})


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);