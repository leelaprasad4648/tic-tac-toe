import React from 'react';
import { Avatar } from 'antd';
import Avatar1 from '../../assets/avatar01.png';
import Avatar2 from '../../assets/avatar02.png';

const RenderIcon = (image, altText) => {
	return (
		<img src={image} alt={altText} className="button-image"/>
	)
}

const P1Avatar = () => (
	<Avatar size={60} icon={RenderIcon(Avatar1, "Player 1 avatar")} style={{border: '10px solid #37AC5D'}} />
)

const P2Avatar = () => (
	<Avatar size={60} icon={RenderIcon(Avatar2, "Player 2 avatar")} style={{border: '10px solid #F8D146'}}/>
)

function Square(props){
		return (
			<button className="square" onClick={() => props.onClick()}>
				{props.value === 'X' && P1Avatar()}
				{props.value === 'O' && P2Avatar()}
			</button>
		)
}
export default Square;
