import React, { Component } from 'react';
import firebase from 'firebase';

class FileUploader extends Component {
  constructor() {
    super();
    this.filesArray = [];
    this.state = {
      uploadValue: 0,
      picture: null
    };

    // Asignando el binding:
    this.handleUpload = this.handleUpload.bind(this);
  }

  pictureDOMElement (downloadURL) {
    return (<li key={downloadURL}>
      <img src={downloadURL} width="150" />
    </li>);
  }

  handleUpload (event) {
    //console.log("evento del handleUpload: ");
    //console.log(event);
    const file = event.target.files[0];
    const storageRef = firebase.storage().ref(`/fotos/${file.name}`);
    const task = storageRef.put(file);

    task.on('state_changed', snapshot => {
      //console.log("snapshot del storage: ");
      //console.log(snapshot);
      let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      this.setState({
        uploadValue: percentage
      });
    }, error => {
      console.log(error);
    }, () => {

      //this.filesArray.push(this.pictureDOMElement(task.snapshot.downloadURL));
      //console.log(this.filesArray);

      this.setState({
        uploadValue: 100,
        picture: task.snapshot.downloadURL
      });
    });
  }

  render() {
    return (
      <div>
        <progress value={this.state.uploadValue} max="100"></progress>
        <br/>
        <input type="file" onChange={this.handleUpload} />
        <br/>
        <img src={this.state.picture} width="150" alt=""/>
        {/*<ul> {this.filesArray} </ul>*/}
      </div>
    );
  }
}

export default FileUploader;
