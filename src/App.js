/*
  { Component } tiene que ser con el object destructuring.
  Básicamente significa que se importe únicamente la propiedad component del objeto react,
  de esta manera JS no tiene que importar todo el objeto, sino solo una parte de él.
  si colocaramos import React from 'react'; tendríamos entonces que colocar en las herencias
  de las clases React.Component
  Minuto 11:07 del video de la clase 1.
  https://carlosazaustre.es/react-firebase/crea-tu-webapp-con-react-js#
*/
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from 'firebase';
import FileUploader from './fileUploader';

class App extends Component {
  constructor () {
      super();

      //Objeto state, default en los componentes de React:
      this.state = {
        user: null
      };
      /*
        Se setea el contexto this a las funciones ajenas a React,
        es decir, las funciones que nosotros creamos.
      */
      this.handleAuth = this.handleAuth.bind(this);
      this.handleLogOut = this.handleLogOut.bind(this);
  }

  componentWillMount() {
    console.log("Aquí voy.");
    firebase.auth().onAuthStateChanged(user => {
      /*
        ECMASCRIPT6 indica que si la clave y el valor son iguales
        entonces se puede dejar la clave y automáticamente se interpreta
        como <key>: <value>
      */
      this.setState({ user });
    });
  }

  handleAuth () {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then(result => console.log(`${result.user.email} ha iniciado sesion`))
      .catch(error => console.log(`${error.code}: ${error.message}`));
  }

  handleLogOut () {
    firebase.auth().signOut()
      .then(result => console.log(`${result.user.email} ha cerrado sesión.`))
      .catch(error => console.log(`${error.code}: ${error.message}`));
  }

  renderLoginButton () {
      //si el usuario está loggeado, entonces no mostramos el botón.:
      if (this.state.user) {
        return (
          <div>
            <img width="200" src={this.state.user.photoURL} alt={this.state.user.displayName} />
            <p> Hola, {this.state.user.displayName} aka m0ises2. </p>
            <button onClick={this.handleLogOut}> LogOut </button>
            <FileUploader />
          </div>
        );
      } else {
        //Sino lo está:
        return (
          <button onClick={this.handleAuth}>Login con Google</button>
        );
      }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to m0ises2 PseudoGram</h2>
        </div>
        <div className="App-intro">
          {this.renderLoginButton()}
        </div>
        <br/>
      </div>
    );
  }
}

export default App;
