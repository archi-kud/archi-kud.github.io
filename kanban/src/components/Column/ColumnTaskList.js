import React, { Component } from 'react';

import ColumnTaskListItem from './ColumnTaskListItem';

export default class ColumnTaskList extends Component {

	render() {
		const { tasks, openChangeForm, deleteTask, columnId, imgSrc, id } = this.props;
		let revisedTasks = [];

		if (tasks) {
			revisedTasks = tasks.map((task, id) => {
						       return <ColumnTaskListItem text = { task.text } 
										                  key = { id } 
										                  taskId = { id } 
										                  columnId = { columnId }
										                  openChangeForm = { openChangeForm } 
										                  deleteTask = { deleteTask }
										                  imgSrc = { imgSrc } />
			});
		}

		return <div className = 'column-task-list' id = { id }>{ revisedTasks }</div>
	}
}