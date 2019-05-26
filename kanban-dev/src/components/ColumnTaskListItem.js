import React from 'react';

const ColumnTaskListItem = props => {
	return (
		<div className = 'column-task-list__item' id = { props.taskId } data-value = { props.text }>
			<div className = 'column-task-list__item-text task'
				 id = { props.taskId } 
				 onClick = { props.openChangeForm }>{ props.text }</div>
			<button className = 'button-delete' title = 'Удалить задачу' onClick = { () => props.deleteTask(props.columnId, props.taskId) }>
				<img src = { props.imgSrc } alt = 'Изображение' />
			</button>
		</div>
	)
};

export default ColumnTaskListItem