import React from 'react';

const ColumnAdd = props => {
	return (
		<div className = { props.class } onClick = { props.openForm }>
			<img src = { props.imgSrc } alt = 'Изображение' />
			<span>{ props.text }</span>
		</div>
	)
};

export default ColumnAdd