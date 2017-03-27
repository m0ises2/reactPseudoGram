import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import firebase from 'firebase';

firebase.initializeApp({
    apiKey: "AIzaSyB5xW69DPd4jALgTx31sSxjWEfUmz3b9xI",
    authDomain: "pseudogram-d77a9.firebaseapp.com",
    databaseURL: "https://pseudogram-d77a9.firebaseio.com",
    storageBucket: "pseudogram-d77a9.appspot.com",
    messagingSenderId: "186660002424"
});

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
