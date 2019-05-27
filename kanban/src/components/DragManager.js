import React, { Component, Fragment } from 'react';

import Column from './Column/Column';

const itemShadow = document.createElement('div');
itemShadow.id = 'column-task-list__item-shadow';

export default class DragManager extends Component {

	constructor(props) {
		super(props);

		this.dragItem = {};
		this.shift = {};

		this.dragItemClass = 'column-task-list__item';
		this.dragAreaClass = 'column-task-list';

		this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/.test(navigator.userAgent);
	};

	start = () => {
		if (this.isMobile) {
			window.addEventListener('touchstart', this.dragStart);
			window.addEventListener('touchmove', this.drag);
			window.addEventListener('touchend', this.dragEnd);
		} else {
			window.addEventListener('mousedown', this.dragStart);
			window.addEventListener('mousemove', this.drag);
			window.addEventListener('mouseup', this.dragEnd);
		}
	};

	stop = () => {
		if (this.isMobile) {
			window.removeEventListener('touchstart', this.dragStart);
			window.removeEventListener('touchmove', this.drag);
			window.removeEventListener('touchend', this.dragEnd);
		} else {
			window.removeEventListener('mousedown', this.dragStart);
			window.removeEventListener('mousemove', this.drag);
			window.removeEventListener('mouseup', this.dragEnd);
		}
	};

	dragStart = event => {
		if (this.isMobile) {
			if (event.which !== 0 || event.touches.length > 1 || !this.findElement(event, this.dragItemClass)) return;
		} else {
			if (event.which !== 1 || !this.findElement(event, this.dragItemClass)) return;
		}
		
		const dragItem = this.dragItem;

		dragItem.item = this.findElement(event, this.dragItemClass);

		dragItem.item.style.width = dragItem.item.getBoundingClientRect().width + 'px';
		dragItem.item.style.height = dragItem.item.getBoundingClientRect().height + 'px';

		if (this.isMobile) {
			this.shift = {x: dragItem.item.getBoundingClientRect().left - event.targetTouches[0].clientX, 
					      y: dragItem.item.getBoundingClientRect().top - event.targetTouches[0].clientY};
		} else {
			this.shift = {x: dragItem.item.getBoundingClientRect().left - event.clientX, 
				     	  y: dragItem.item.getBoundingClientRect().top - event.clientY};
		}
	};

	drag = event => {
		if (!this.dragItem.item) return;

		this.checkForScroll(event, 'window', 'horizontal');
		this.checkForScroll(event, 'column', 'vertical');

		const item = this.dragItem.item;
		const shift = this.shift;

		const dragAreaClass = this.dragAreaClass;
		const dragItemClass = this.dragItemClass;

		const dragArea = this.findElement(event, dragAreaClass);
		const dragItem = this.findElement(event, dragItemClass);

		const eventCoords = {x: this.isMobile ? event.targetTouches[0].clientX : event.clientX,
							 y: this.isMobile ? event.targetTouches[0].clientY : event.clientY};

		item.style.position = 'fixed';
		item.style.top = eventCoords.y + shift.y + 'px';
		item.style.left = eventCoords.x + shift.x + 'px';
		item.style.transform = 'rotate(5deg)';
		item.style.pointerEvents = 'none';
		item.style.zIndex = 2;

		if (this.dragItem.area) {
			for (let child of this.dragItem.area.children) {
				if (child.id === itemShadow.id && this.collideItems(item, child) === false) {
					child.remove();
				}
			}
		}
	  	
		if (dragArea) {
			const itemArea = dragArea;

			if (itemArea.children.length <= 1) {
				itemArea.appendChild(itemShadow);
				itemShadow.style.height = item.style.height;

				this.dragItem.shadow = itemArea.children.namedItem(itemShadow.id);
				this.dragItem.area = itemArea;
			} 
		}

		if (dragItem) {
			const collisionItem = dragItem;
			const collisionItemList = collisionItem.parentElement;

			const prevElement = collisionItem.previousElementSibling;
			const nextElement = collisionItem.nextElementSibling;

			if (this.getCollideDirection(collisionItem) === 'top' && this.collideItems(item, collisionItem)) {
				if (prevElement && prevElement.id === itemShadow.id) return;
				if (nextElement && nextElement.id === itemShadow.id) nextElement.remove();

				collisionItemList.insertBefore(itemShadow, collisionItem);
			}

			if (this.getCollideDirection(collisionItem) === 'bottom' && this.collideItems(item, collisionItem)) {
				if (nextElement && nextElement.id === itemShadow.id) return;
				if (prevElement && prevElement.id === itemShadow.id) prevElement.remove();

				this.insertAfter(itemShadow, collisionItem);
			}

			itemShadow.style.height = item.style.height;

			this.dragItem.shadow = collisionItemList.children.namedItem(itemShadow.id);
			this.dragItem.area = collisionItemList;
			this.dragItem.collisionItem = collisionItem;
		}
	};

	dragEnd = event => {
		if (!this.dragItem.item) return;

		const item = this.dragItem.item;
	
		if (itemShadow && itemShadow.parentElement) {
			const prevColumnId = item.parentElement.id;
			const prevTaskId = item.id;

			const newColumnId = itemShadow.parentElement.id;
			const tasks = [];

			item.setAttribute('style', 'none');
			itemShadow.replaceWith(item);

			if (item.parentElement.children.length === 0) {
				tasks.push({ text: item.dataset.value }); 
			} else {
				for (let child of item.parentElement.children) {
					if (child !== itemShadow) tasks.push({ text: child.dataset.value });
				}
			}

			this.props.deleteColumnTask(prevColumnId, prevTaskId);
			this.props.updateColumnTasks(tasks, newColumnId);
		} else {
			item.setAttribute('style', 'none');
		}

		this.dragItem = {};
	};

	checkForScroll = (event, target, type) => {
		if (target === 'window') clearTimeout(this.windowScrollId);
		if (target === 'column') clearTimeout(this.columnScrollId);

		if (this.adjustWindowScroll(event, target, type)) {
			if (target === 'window') this.windowScrollId = setTimeout(() => this.checkForScroll(event, target, type), 20);
			if (target === 'column') this.columnScrollId = setTimeout(() => this.checkForScroll(event, target, type), 20);
		}
	};

	adjustWindowScroll = (event, target, type) => {
		if (!this.dragItem.item) return;

		const item = this.dragItem.item;
		const itemCoords = item.getBoundingClientRect();

		if (target === 'window' && type === 'horizontal') {
			const step = this.isMobile ? 10 : 30;
			const documentCoords = {left: document.documentElement.clientWidth - document.documentElement.clientWidth,
									right: document.documentElement.clientWidth};

			if (itemCoords.right + 20 > documentCoords.right) {
				document.documentElement.scrollLeft += step;
				return true
			}

			if (itemCoords.left - 20 < documentCoords.left) {
				document.documentElement.scrollLeft -= step;
				return true
			} 
		}

		if (target === 'column' && type === 'vertical') {
			const step = 5;

			const columnTitle = this.findElement(event, 'column-title');
			const columnAddBtn = this.findElement(event, 'column-add-btn');

			if (columnTitle) {
				const columnTitleCoords = columnTitle.getBoundingClientRect();

				if (event.clientY > columnTitleCoords.top && event.clientY < columnTitleCoords.bottom) {
					columnTitle.parentElement.scrollTop -= step;
					return true
				}
			}

			if (columnAddBtn) {
				const columnAddBtnCoords = columnAddBtn.getBoundingClientRect();

				if (event.clientY > columnAddBtnCoords.top && event.clientY < columnAddBtnCoords.bottom) {
					columnAddBtn.parentElement.scrollTop += step;
					return true
				}
			}
		}

		return false
	};

	findElement = (event, attributeValue) => {
		const eventCoords = {x: this.isMobile ? event.targetTouches[0].clientX : event.clientX,
							 y: this.isMobile ? event.targetTouches[0].clientY : event.clientY};

		let element = document.elementFromPoint(eventCoords.x, eventCoords.y);

		for (; element && element !== document; element = element.parentElement) {
			if (element.classList.contains(attributeValue) || element.id === attributeValue) return element		 
		}
	};

	getCollideDirection = item => {
		const itemCoords = item.getBoundingClientRect();
		const event = window.event;
		const eventCoords = {x: this.isMobile ? event.targetTouches[0].clientX : event.clientX,
							 y: this.isMobile ? event.targetTouches[0].clientY : event.clientY};

		if ((eventCoords.y > itemCoords.top) && 
			(eventCoords.y < itemCoords.top + itemCoords.height / 2)) return 'top';

		if ((eventCoords.y < itemCoords.bottom) && 
			(eventCoords.y > itemCoords.top + itemCoords.height / 2)) return 'bottom';
	};

	collideItems = (item1, item2) => {
		const item1Coords = item1.getBoundingClientRect();
		const item2Coords = item2.getBoundingClientRect();

		return !((item1Coords.top + item1Coords.height < item2Coords.top)	   ||
	     		 (item1Coords.top > item2Coords.top + item2Coords.height)      ||
	     		 (item1Coords.left + item1Coords.width / 2 < item2Coords.left) ||
	     		 (item1Coords.left + item1Coords.width / 2 > item2Coords.right));
	};

	insertAfter = (element, refElement) => {
		return refElement.parentElement.insertBefore(element, refElement.nextElementSibling);
	};

	componentDidMount() {
		this.start();
	}

	render() {
		const { columns } = this.props;

		return (
			<Fragment>
				{ columns ? (columns.map((column, id) => {
								return <Column key = { id }
							   			   	   id = { id }
							               	   title = { column.title }
							               	   tasks = { column.tasks }
							               	   startDrag = { this.start }
							               	   stopDrag = { this.stop }
							               	   { ...this.props } />
							})
				) : <Column key = { 0 } id = { 0 } { ...this.props } /> }
			</Fragment>
		)
	}
}