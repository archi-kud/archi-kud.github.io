'use strict';

// Деревья

class Node {
	constructor(data, parent = null) {
		this.data = data;
		this.parent = parent;
		this.children = [];
	}
}

class Tree {
	constructor(data) {
		this.node = new Node(data);
		this.root = this.node;
	} 

	searchBF(node, callback = null) {
		const queue = [node];

		while (queue.length > 0) {
			const currentNode = queue.shift();

			if (callback && currentNode) callback(currentNode.data);

			if (currentNode && currentNode.children.length > 0) {
				queue.push(...currentNode.children);
			}
		}
	}

	searchDF(node, callback = null) {
		if (node && callback) callback(node.data);

		if (node && node.children.length > 0) {
		    node.children.map(nodeChild => this.searchDF(nodeChild, callback));
		}
	}

	add(parentNode, data) {
		const childNode = new Node(data, parentNode);
		parentNode.children.push(childNode);
	}

	remove(node) {
		if (node.parent.children.includes(node)) {
			node.parent.children.splice(node.parent.children.indexOf(node), 1);
		}
	}

	getHeight() {
		let height = 1;

		const queue = [tree.root];

		while (queue.length > 0) {
			const currentNode = queue.shift();

			if (currentNode && currentNode.children.length > 0) {
				height++;
				queue.push(...currentNode.children);
			}
		}

		return height
	}
}


// Очереди

class Queue {
	constructor() {
		this.queue = [];
	}

	enqueue(data) {
		this.queue.unshift(data);
	}

	dequeue() {
		return this.queue.pop()
	}

	isEmpty() {
		return this.queue.length === 0
	}

	peek() {
		return this.queue[this.queue.length - 1] 
	}
}

class PriorityQueue extends Queue {
	constructor() {
		super();
	}

	enqueue(data, prior) {
		this.queue.unshift({data: data, prior: prior});
	}

	dequeue(index = null) {
		if (index !== null) {
			const item = this.queue[index];
			this.queue.splice(index, 1);

			return item
		}

		return this.queue.pop()
	}

	changePriority(index, newPrior) {
		this.queue[index].prior = newPrior;
	}

	extractMax() {
		const priorityArr = this.queue.map(obj => obj.prior);
		const maxItems = this.queue.filter(obj => obj.prior === Math.max(...priorityArr));

		return maxItems.length === 1 ? maxItems[0] : maxItems 
	}
	
	getMax() {
		return Math.max(...this.queue.map(obj => obj.prior))
	}
}


