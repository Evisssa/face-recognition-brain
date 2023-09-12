
import React,{Component} from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRcognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import ParticlesBg from 'particles-bg';
import 'tachyons'; 
import Clarifai from 'clarifai';

/*
const app = new Clarifai.App({
  apiKey: '6dc7e46bc9124c5c8824be4822abe105'
  });

  const returnClarifaiRequest=()=>{
       // Your PAT (Personal Access Token) can be found in the portal under Authentification
        const PAT = 'c259332a7e5840d69cc75852681017a2';
        // Specify the correct user_id/app_id pairings
        // Since you're making inferences outside your app's scope
        const USER_ID = 'uixnze7eyep4';       
        const APP_ID = 'my-first-application-89vjq6';
        // Change these to whatever model and image URL you want to use
        const MODEL_ID = 'face-detection';  
        const IMAGE_URL = 'https://samples.clarifai.com/metro-north.jpg';

        ///////////////////////////////////////////////////////////////////////////////////
        // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
        ///////////////////////////////////////////////////////////////////////////////////

        const raw = JSON.stringify({
            "user_app_id": {
                "user_id": USER_ID,
                "app_id": APP_ID
            },
            "inputs": [
                {
                    "data": {
                        "image": {
                            "url": IMAGE_URL
                        }
                    }
                }
            ]
        });

        
        const requestOptions={
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Authorization': 'Key ' + PAT
          },
          body: raw
        };

        return requestOptions;


  } 


*/

 // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
 // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
 // this will default to the latest version_id





class App extends Component {

  constructor(props){
    super(props);
    this.state ={
    inputImageForm : "",
    imageUrl:"",
    box :{},
    route: "signin",
    isSignedIn : false
    }
   
  }

 

  onInputChange =(event) => {
    console.log("-------",event.target.value);
      
   this.setState({inputImageForm: event.target.value});
  }

   calculateFaceLocation=(data)=>{

    let boundingBox= data.outputs[0].data.regions[0].region_info.bounding_box;
       
    const image = document.getElementById('inputImage');
    const height = Number(image.height);
    const width = Number(image.width);
    console.log(height,width); 
    

    return{
      leftCol:boundingBox.left_col*width,
      topRow:boundingBox.top_row*height,
      rightCol:width-boundingBox.right_col*width,
      bottomRow:height-boundingBox.bottom_row*height

    }

  }

  displayFaceBox=(box)=>{
    console.log("box:::::",box);
    this.setState({box:box})
  }
  
 

  onButtonSubmit=()=>{
      this.setState({imageUrl:this.state.inputImageForm})
      console.log("button clicked");
      const PAT = 'c259332a7e5840d69cc75852681017a2';
      // Specify the correct user_id/app_id pairings
      // Since you're making inferences outside your app's scope
      const USER_ID = 'clarifai';       
      const APP_ID = 'main';
      // Change these to whatever model and image URL you want to use
      const MODEL_ID = 'face-detection';
      const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';    
      const IMAGE_URL = this.state.inputImageForm;
     
      const raw = JSON.stringify({
          "user_app_id": {
              "user_id": USER_ID,
              "app_id": APP_ID
          },
          "inputs": [
              {
                  "data": {
                      "image": {
                          "url": IMAGE_URL
                      }
                  }
              }
          ]
      });

      const requestOptions = {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Authorization': 'Key ' + PAT
          },
          body: raw
      };
      
      
      fetch("https://api.clarifai.com/v2/models/" + 'face-detection' + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
      .then(response => response.json())
      .then(result =>{
        console.log(result,"----------///-------",result.outputs[0].data.regions[0].region_info.bounding_box)
        this.displayFaceBox(this.calculateFaceLocation(result));
      
      } )
      .catch(error => console.log('error', error));
      
  
      
          
     
  }

  onRouteChange =(route)=>{

     if(route==="home"){ 
      this.setState({isSignedIn:true})
     }
     else{
      this.setState({isSignedIn:false})
    }
     this.setState({route:route})
     // this.setState({route:"signin"})
    
  }

  render(){
    //array destructuring is needed to be inside render
    const {isSignedIn,imageUrl,box,route} = this.state;
    //const { onInputChange}= this.state;
   // const {route, onRouteChange}=this.state;
    return (
    <div className="App">
      <ParticlesBg type="fountain"  bg={true} />
      <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
      { route ==="home"
    
        ? <div>
        <Logo/>
        <Rank/>
        <ImageLinkForm  onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
        <FaceRecognition box={box} imgUrl={imageUrl}/>
        </div>   
      :(route==='signin'
      ?<Signin onRouteChange={this.onRouteChange}/> 
      :<Register onRouteChange={this.onRouteChange}/>) 
   
      }
      
      
    </div>

  )
  
  ;}
}

 // this.state.route === 'signin'
       // ? <Signin onRouteChange={this.onRouteChange}/>
       // : <Register  onRouteChange={this.onRouteChange}/>
      // )
      

export default App;