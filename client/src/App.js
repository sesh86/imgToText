import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state={text:'',hideAlert:true,file:'Choose Image'}
  }      
  onChange=(e)=>{
    if(this.image.files[0].name.indexOf('.png')>-1 || this.image.files[0].name.indexOf('.jpg')>-1 || this.image.files[0].name.indexOf('.jpeg')>-1)
      this.setState({file:`"${this.image.files[0].name}" Selected`});
    else 
      this.setState({file:`Please select only images`})  
  }  
  onSubmit=(e)=>{
    e.preventDefault();

    if(this.image.files[0].name.indexOf('.png')>-1 || this.image.files[0].name.indexOf('.jpg')>-1 || this.image.files[0].name.indexOf('.jpeg')>-1){
    }
    else {
      console.log('im in else')
      this.setState({alert:'Please select only images'});  
      this.setState({hideAlert:false});
      return false; 
    }


    this.setState({hideAlert:false});
    this.setState({alert:'Hang in there for a moment'});
    this.setState({text:''});
    
    let data = new FormData();
    // let log={};
    for(let i in e.target.elements){
        if(e.target.elements[i].value!==undefined && e.target.elements[i].value!==""){
            data.append(e.target.elements[i].name,e.target.elements[i].value);
        }
    }
    data.append('file', this.image.files[0]);
    let currentComponent=this;

    axios.post('/imgToText', data)
    .then(function (res) {
      console.log(res.data)
      currentComponent.setState({'text':res.data,hideAlert:true});
    })
  }

  render() {
  return (
    <div className="App">
      <div className="container">
      <form onSubmit={this.onSubmit}>
      <div className="container p-5 justify-content-center">
      <div className="custom-file overflow-hidden rounded-pill mb-5">
            <input id="customFile" type="file" className="custom-file-input rounded-pill" onChange={this.onChange} ref={(ref) => { this.image = ref; }}/>
            <label for="customFile" className="custom-file-label rounded-pill">{this.state.file}</label>
      </div>        
                    <label for="customFile" class="custom-file-label rounded-pill">Choose file</label>
      </div>
        <button className="btn btn-it">Click to Convert Image to Text
      </button>
      </form>

      <br/><br/><br/>
  <div className="alert alert-primary" role="alert" hidden={this.state.hideAlert}>{this.state.alert}</div>      
      <div>{this.state.text}</div>
      </div>
      <br/><br/><br/>
      <header className="App-header">

      </header>

    </div>
  );
  }
}

export default App;
