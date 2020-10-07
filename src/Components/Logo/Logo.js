import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import cerebro from './cerebro.png';

const Logo = () => {
	return (
		<div>
			<Tilt
				className='Tilt'
				options={{ max: 55 }}
				style={{ height: 200, width: 200 }}
			>
				<div className='Tilt-inner'>
					<img
						alt='logo'
						style={{
							height: 120,
							width: 120,
							margin: '20%',
						}}
						src={cerebro}
					></img>
				</div>
			</Tilt>
		</div>
	);
};

export default Logo;
