import React, { Component } from 'react';

import ColumnTitle from './ColumnTitle';
import ColumnTaskList from './ColumnTaskList';
import ColumnAdd from './ColumnAdd';
import ColumnAddForm from './ColumnAddForm';

const plusImg = require('../../img/plus.svg');
const crossImg = require('../../img/cross.svg');

export default class Column extends Component {

	textfieldRef = React.createRef();

	state = {
		addFormOpen: false,
	};

	openAddForm = () => {
		const textfield = this.textfieldRef.current;

		textfield.value = '';
		textfield.focus();

		this.setState(({ addFormOpen }) => ({ addFormOpen: !addFormOpen }));
	};

	openChangeForm = event => {
		if (event.target.dataset.clicked === 'true') return;
		this.props.stopDrag();

		const target = event.target;
		target.dataset.clicked = true;
		target.dataset.value = target.innerText.trim();

		let textfield = null;

		if (target.classList.contains('title')) {
			textfield = this.replaceElement(target, 'input', 'textfield title');
		} else if (target.classList.contains('task')) {
			textfield = this.replaceElement(target, 'textarea', 'textfield task');
		}

		textfield.focus();

		this.changeValueFunc = () => this.changeValue(textfield, target);
		window.addEventListener('click', this.changeValueFunc);
	};


	addValue = () => {
		const textfield = this.textfieldRef.current;
		const columnId = this.props.id;
		const value = textfield.value.trim();

		if (!value) return;

		this.openAddForm();

		if (textfield.classList.contains('task')) {
			this.props.addColumnTask(value, columnId);
		} 

		if (textfield.classList.contains('title')) {
			this.props.addNewColumn(value, columnId);
		}

		textfield.value = '';
	};

	changeValue = (textfield, target) => {
		if (document.activeElement !== textfield) {
			const columnId = this.props.id;
			const taskId = textfield.id;
			const value = textfield.value.trim();
			
			if (value === '') {
				textfield.value = target.dataset.value;
			} else {
				if (textfield.classList.contains('title')) {
					this.props.updateColumnTitle(value, columnId);
				}

				if (textfield.classList.contains('task')) {
					this.props.updateColumnTask(value, columnId, taskId);
				}
			}

			textfield.dataset.clicked = false;
			textfield.dataset.value = value;

			this.replaceElement(textfield, 'div', target.className);
			this.props.startDrag();
			window.removeEventListener('click', this.changeValueFunc);
		}
	};

	replaceElement = (source, newType, newClassName = null) => {
		const newElement = document.createElement(newType);
		newElement.dataset.clicked = source.dataset.clicked;
		newElement.dataset.value = source.dataset.value;

		if (newClassName) newElement.className = newClassName;
		if (newElement.classList.contains('title') === false) newElement.id = source.id;

		newElement.addEventListener('click', this.openChangeForm);

		if (source.tagName === 'INPUT' || source.tagName === 'TEXTAREA') {
			newElement.innerText = source.value;
		} else {
			newElement.value = source.innerText;
		}

		source.replaceWith(newElement);

		return newElement
	};

	render() {
		const { addFormOpen } = this.state;
		const { tasks, title, deleteColumnTask, deleteColumn, id } = this.props;

		const addFormTag = !title ? 'input' : 'textarea';
		const addBtnText = !title ? 'Добавить еще одну колонку' : 'Добавить еще одну карточку';
		const addFormBtnText = !title ? 'Добавить колонку' : 'Добавить карточку';
		const textfieldPlaceholder = !title ? 'Введите название колонки' : 'Введите название карточки';

		const addBtnClass = addFormOpen ? 'column-add-btn hidden' : 'column-add-btn';
		const addFormClass = addFormOpen ? 'column-add-form' : 'column-add-form hidden';

		return (
			<div className = 'column'>
				<ColumnTitle openChangeForm = { this.openChangeForm }
							 deleteColumn = { deleteColumn }
							 imgSrc = { crossImg }
							 title = { title } 
							 columnId = { id } />

				{ title ? <ColumnTaskList key = { Math.random() }
										  id = { id }
										  tasks = { tasks } 
										  columnId = { id }
									      openChangeForm = { this.openChangeForm } 
									      deleteTask = { deleteColumnTask }
								 	      imgSrc = { crossImg } /> : null
				}

				<ColumnAdd class = { addBtnClass }
					       text = { addBtnText }
					       openForm = { this.openAddForm } 
					       imgSrc = { plusImg } />

				<ColumnAddForm tag = { addFormTag }
					           class = { addFormClass }
					           textfieldPlaceholder = { textfieldPlaceholder }
							   text = { addFormBtnText }
							   textfieldRef = { this.textfieldRef }
							   addValue = { this.addValue }
							   openForm = { this.openAddForm }
							   imgSrc = { crossImg } />
			</div>
		)
	}
}