import React from 'react';
import './FaceRecognition.css';


const FaceRecognition = ({imageURL, box}) => {
	return (

		<div className = 'center ma'>
            <div className = 'absolute mt2'>
            <img id = 'inputImage' alt ='' src = {imageURL} width ='300px' height = 'auto'  />
            <div className = 'bording-box'  style = {{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftcol}} ></div>

            </div>
           
			
		</div>
	);
};

export default FaceRecognition;