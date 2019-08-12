'use strict';

// Быстрая сортировка

function quickSort(arr) {
    if (arr.length < 2) return arr;
    
    const supportCase = arr[Math.floor(arr.length / 2)];
    const lessSupportCase = arr.filter(elem => elem < supportCase);
    const greaterSupportCase = arr.filter(elem => elem > supportCase);
    
    return [].concat(quickSort(lessSupportCase), [supportCase], quickSort(greaterSupportCase));
}


// Сортировка слиянием

function merge(arr1, arr2) {
    const sortedArr = [];
    
    let i = 0;
    let k = 0;
    
    while (i < arr1.length && k < arr2.length) {
        sortedArr.push(arr1[i] < arr2[k] ? arr1[i++] : arr2[k++]);
    }
    
    return [...sortedArr, ...arr1.slice(i), ...arr2.slice(k)];
}


// Сортировка пузырьком

function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let k = 0; k < arr.length; k++) {
            const currentValue = arr[k];
            const nextValue = arr[k + 1];
            
            if (currentValue > nextValue) {
                arr[k] = nextValue;
                arr[k + 1] = currentValue;
            }
        }
    }
    
    return arr
}


// Бинарный поиск

function binarySearch(arr, num) {
    let low = 0;
    let high = arr.length - 1;
    
    while (low <= high) {
        const middle = Math.floor((low + high) / 2);
        
        if (arr[middle] === num) return middle;
        
        if (arr[middle] > num) high = middle - 1;
        else low = middle + 1; 
    }
}


// Поиск в ширину

function searchBF(node, callback = null) {
    const queue = [node];

    while (queue.length > 0) {
        const currentNode = queue.shift();

        if (currentNode && callback) callback(currentNode.data);

        if (currentNode && currentNode.children.length > 0) {
            queue.push(...currentNode.children);
        }
    }
}


// Поиск в глубину

function searchDF(node, callback = null) {
    if (node && callback) callback(node.data);

    if (node && node.children.length > 0) {
        node.children.map(nodeChild => this.searchDF(nodeChild, callback));
    }
}



