
import React,{Component} from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ParticlesBg from 'particles-bg';


class App extends Component {

  constructor(props){
    super(props);
    this.state={
      
    }
  }



  
  render(){
    return (
    <div className="App">
        <ParticlesBg type="fountain" bg={true} />
      <Navigation />
      <Logo/>
      <Rank/>
      <ImageLinkForm/>
      {/*
          <FaceRecognition/>
      */}
    </div>

  );}
}
/*<ParticlesBg type="circle" bg={true} /> */

export default App;
