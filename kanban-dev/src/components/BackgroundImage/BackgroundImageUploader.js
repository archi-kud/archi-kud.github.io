import React from 'react';

const BackgroundImageUploader = props => {
	return (
		<div id = 'main-wrap-upload__background'>
			<div className = 'label-delete'>
				<label title = 'Удалить фон' 
					   className = 'main-wrap-upload__background-label'
					   onClick = { props.deleteBackgroundImage }>+</label>
			</div>
			<div className = 'label-add'>
				<label title = 'Загрузить фон' 
					   htmlFor = 'main-wrap-upload__background-input' 
					   className = 'main-wrap-upload__background-label'>+</label>
			</div>
			<input type = 'file' id = 'main-wrap-upload__background-input' onChange = { props.addBackgroundImage }/>
		</div>
	)
};

export default BackgroundImageUploader