import React from 'react';

const ColumnAddForm = props => {
	return (
		<div className = { props.class }>
			{ props.tag === 'textarea' ?
				<textarea 
					className = 'textfield task' 
					placeholder = { props.textfieldPlaceholder }
					ref = { props.textfieldRef }>
				</textarea> :
				<input 
					className = 'textfield title' 
					placeholder = { props.columnTextfieldPlaceholder }
					ref = { props.textfieldRef }>
				</input>
			}
			<div className = 'column-add-form__buttons'>
				<button className = 'column-add-form__buttons-add' onClick = { props.addValue }>{ props.text }</button>
				<button className = 'button-close' title = 'Закрыть поле ввода' onClick = { props.openForm }>
					<img src = { props.imgSrc } alt = 'Изображение' />
				</button>
			</div>
		</div>
	)
};

export default ColumnAddForm