import React from 'react';

const ColumnTitle = props => {
	const titleDiv = <div className = 'column-title'>
					     <div className = 'column-title__text title' 
					     	  onClick = { props.openChangeForm }
					     	  data-value = { props.title }>{ props.title }</div>
						 <button className = 'button-delete' 
						 		 title = 'Удалить список' 
						 		 onClick = { () => props.deleteColumn(props.columnId) }>
						     <img src = { props.imgSrc } alt = 'Изображение' />
						 </button>
					 </div>;

	return props.title ? titleDiv : null
};

export default ColumnTitle