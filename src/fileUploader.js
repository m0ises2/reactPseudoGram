import React, { Component } from 'react';
//import firebase from 'firebase';

class FileUploader extends Component {
  constructor() {
    super();
    this.filesArray = [];
    this.state = {
      uploadValue: 0,
      picture: null
    };
  }

  pictureDOMElement (downloadURL) {
    return (<li key={downloadURL}>
      <img src={downloadURL} width="150" alt="" />
    </li>);
  }

  render() {
    return (
      <div>
        <br/>
        <input type="file" onChange={this.props.onUpload} />
        <br/>
        {/*<ul> {this.filesArray} </ul>*/}
      </div>
    );
  }
}

export default FileUploader;
