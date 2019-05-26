import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';

import DragManager from './components/DragManager';
import BackgroundImageBlock from './components/BackgroundImage/BackgroundImageBlock';
import BackgroundImageUploader from './components/BackgroundImage/BackgroundImageUploader';

import './styles/main.css';

class Board extends Component {

	backgroundImageBlockRef = React.createRef();

	state = {
		columns: JSON.parse(localStorage.getItem('columns')),
		backgroundImageURL: localStorage.getItem('backgroundImageURL')
	};

	addNewColumn = (title, columnId) => {
		const columns = Object.assign([], JSON.parse(localStorage.getItem('columns')));
		const newColumn = { title: title, tasks: [] };
		
		columns.splice(columnId, 1, newColumn);
		columns.push({});

		localStorage.setItem('columns', JSON.stringify(columns));
		this.setState({ columns: columns });
	};

	addColumnTask = (newTask, columnId) => {
		const columns = Object.assign([], JSON.parse(localStorage.getItem('columns')));
		columns[columnId].tasks.push({ text: newTask });

		localStorage.setItem('columns', JSON.stringify(columns));
		this.setState({ columns: columns });
	};

	updateColumnTitle = (newTitle, columnId) => {
		const columns = Object.assign([], JSON.parse(localStorage.getItem('columns')));

		if (columns[columnId] && columns[columnId].title) {
			columns[columnId].title = newTitle;

			localStorage.setItem('columns', JSON.stringify(columns));
			this.setState({ columns: columns });
		}
	};

	updateColumnTasks = (tasks, columnId) => {
		const columns = Object.assign([], JSON.parse(localStorage.getItem('columns')));

		if (columns[columnId]) {
			columns[columnId].tasks = tasks;

			localStorage.setItem('columns', JSON.stringify(columns));
			this.setState({ columns: columns });
		}
	};

	updateColumnTask = (newTask, columnId, taskId) => {
		const columns = Object.assign([], JSON.parse(localStorage.getItem('columns')));
		
		if (columns[columnId] && columns.length > 1 && columns[columnId].tasks[taskId]) {
			columns[columnId].tasks[taskId].text = newTask;

			localStorage.setItem('columns', JSON.stringify(columns));
			this.setState({ columns: columns });
		}
	};

	deleteColumnTask = (columnId, taskId) => {
		const columns = Object.assign([], JSON.parse(localStorage.getItem('columns')));
		columns[columnId].tasks.splice(taskId, 1);

		localStorage.setItem('columns', JSON.stringify(columns));
		this.setState({ columns: columns });
	};

	deleteColumn = columnId => {
		const columns = Object.assign([], JSON.parse(localStorage.getItem('columns')));
		columns.splice(columnId, 1);

		localStorage.setItem('columns', JSON.stringify(columns));
		this.setState({ columns: columns });
	};

	addBackgroundImage = event => {
		const image = event.target.files[0];
		const reader = new FileReader();
		const imageBlock = this.backgroundImageBlockRef.current;

		if (image.type.startsWith('image/')) {
			reader.onload = () => {
				imageBlock.style.background = `url(${reader.result})`;
				imageBlock.style.backgroundSize = 'cover';

				localStorage.setItem('backgroundImageURL', JSON.stringify(reader.result));
				this.setState({ backgroundImageURL: reader.result });
			};

			reader.readAsDataURL(image);
		}
	};

	deleteBackgroundImage = () => {
		const imageBlock = this.backgroundImageBlockRef.current;
		imageBlock.style.background = 'none';
		
		localStorage.setItem('backgroundImageURL', '');	
		this.setState({ backgroundImageURL: '' });
	};

	componentDidMount() {
		const imageBlock = this.backgroundImageBlockRef.current;
		const imageURL = localStorage.getItem('backgroundImageURL');

		if (imageURL) {
			imageBlock.style.background = `url(${imageURL})`;
			imageBlock.style.backgroundSize = 'cover';
		}
	}

	render() {
		const { columns } = this.state;
		
		return (
			<Fragment>
				<DragManager columns = { columns }
							 addNewColumn = { this.addNewColumn } 
							 addColumnTask = { this.addColumnTask }
							 updateColumnTasks = { this.updateColumnTasks }
							 updateColumnTitle = { this.updateColumnTitle }
							 updateColumnTask = { this.updateColumnTask } 
							 deleteColumnTask = { this.deleteColumnTask } 
							 deleteColumn = { this.deleteColumn } />
				<BackgroundImageBlock backgroundImageBlockRef = { this.backgroundImageBlockRef } />
				<BackgroundImageUploader addBackgroundImage = { this.addBackgroundImage } 
									     deleteBackgroundImage = { this.deleteBackgroundImage }
									     backgroundImageBlockRef = { this.backgroundImageBlockRef } />
			</Fragment>
		)
	}
}

ReactDOM.render(<Board />, document.getElementById('main-wrap'));
