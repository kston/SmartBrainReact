import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';

import FaceRecognition from './Components/FaceRecognition/FaceRecognition';

import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';

import Rank from './Components/Rank/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

import './App.css';

//You must add your own API key here from Clarifai.
const app = new Clarifai.App({
	apiKey: '2ab56008ecde4fce9e1e38c8f29542a5',
});

class App extends Component {
	constructor() {
		super();
		this.state = {
			input: '',
			imageURL: '',
			box: {},
			route: 'signin',
			isSignedIn: false,
		};
	}

	CalculateFaceLocation = (data) => {
		const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;

		console.log(clarifaiFace)
		const image = document.getElementById('inputImage');
		const width = Number(image.width)
		const height = Number(image.height)

		return {
		
			leftcol: clarifaiFace.left_col * width, 
			topRow:  clarifaiFace.top_row * height,
			rightCol: width - (clarifaiFace.right_col * width),
			bottomRow: height - (clarifaiFace.bottom_row * height)
			
		}

		

	}
	onRouteChange = (route) => {
		if (route === 'signout') {
			this.setState({isSignedIn: false})
		  } else if (route === 'home') {
			this.setState({isSignedIn: true})
		  }
		  this.setState({route: route});
	}
	displayFaceBox = (box) => {
		this.setState({box : box})


	}

	onInputChange = (event) => {
		this.setState({input: event.target.value});
	};

	onButtonSubmit = () => {
		this.setState({imageURL: this.state.input})
		app.models.predict(Clarifai.FACE_DETECT_MODEL,this.state.input).then(response => {
			this.displayFaceBox(this.CalculateFaceLocation(response));
		}).catch(err => {
			console.error(err)
		})
	};
	render() {
		const { isSignedIn, imageURL, route, box } = this.state;
		return (
			
			<div className='App'>
				<Particles
					className='particles'
					params={{
						particles: {
							number: {
								value: 300,
							},
							size: {
								value: 2,
							},
						},
						interactivity: {
							events: {
								onhover: {
									enable: true,
									mode: 'repulse',
								},
							},
						},
					}}
				/>
				<Navigation isSignedIn={isSignedIn} onRouteChange = {this.onRouteChange} />
				{ route === 'home'
          ? <div>
              <Logo />
              <Rank />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition box={box} imageURL={imageURL} />
            </div>
          : (
             route === 'signin'
             ? <Signin  onRouteChange={this.onRouteChange}/>
             : <Register onRouteChange={this.onRouteChange}/>
            )
        }
				
			
			</div>
		);
	}
}

export default App;
