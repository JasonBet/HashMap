// linkedList.js
import { Node } from "./node.js";
export class LinkedList {
    constructor() {
        this.headNode = null;
        this.tailNode = null;
    }

    append(value) {
        const newNode = new Node();
        newNode.value = value;
        if(this.headNode === null) {
            this.headNode = this.tailNode = new Node;
            this.headNode.value = value;
        }
        else {
            this.tailNode.nextNode = newNode;
            this.tailNode = newNode;
        }
    }

    prepend(value) {
        if(this.headNode == null) {
            this.headNode = new Node;
            this.headNode.value = value;
        }
        else {
            const newNode = new Node();
            newNode.value = value;
            newNode.nextNode = this.headNode;
            this.headNode = newNode;
        }
    }

    size() {
        let count = 0;
        let currentNode = this.headNode;
        while(currentNode != null) {
            count++;
            currentNode = currentNode.nextNode;
        }
        return count;
    }

    head() {
        return this.headNode;
    }

    tail() {
        return this.tailNode;
    }

    at(index) {
        if(index == 0) {
            return this.headNode;
        }
        else{
            let currentNode = this.headNode;
            for(let i = 0; i < index; i++) {
                currentNode = currentNode.nextNode;
            }
            return currentNode;
        }
    }

    pop() {
        if(this.headNode === null) return null;
        
        if(this.headNode === this.tailNode) {
            const out = this.headNode.value;
            this.headNode = this.tailNode = null;
            return out;
        }
        
        let prevNode = this.headNode;
        let currentNode = this.headNode.nextNode;
        while(currentNode.nextNode) {
            prevNode = currentNode;
            currentNode = currentNode.nextNode;
        }
        prevNode.nextNode = null;
        this.tailNode = prevNode;
        return currentNode.value;
    }

    contains(value) {
        if(this.headNode == null) return false;
        else {
            let currentNode = this.headNode;
            while(currentNode != null) {
                if(currentNode.value == value) return true;
                currentNode = currentNode.nextNode;
            }
            return false;
        }
    }

    find(value) {
        if(this.headNode == null) return null;
        else {
            let currentNode = this.headNode;
            let index = 0;
            while(currentNode != null) {
                if(currentNode.value == value) return index;
                currentNode = currentNode.nextNode;
                index ++;
            }
            return null;
        }
    }

    toString() {
        let listString = "";
        if(this.headNode == null) return "null";
        else {
            let currentNode = this.headNode;
            while(currentNode != null) {
                let value = currentNode.value;
                listString += `(${value}) -> `;
                currentNode = currentNode.nextNode;
            }
            listString += "null";
            return listString;
        }
    }
}
