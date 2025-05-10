// hashMap.js
import { LinkedList } from "./linkedList.js";
export class HashMap {
    constructor(loadFactor = 0.75, capacity = 16) {
        this.loadFactor = loadFactor;
        this.capacity = capacity;
        this.buckets = new Array(capacity).fill(null);
        this.keyCount = 0;
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;

        for(let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
        return hashCode;
    }

    _shouldGrow(extra = 0) {
        return (this.keyCount + extra) / this.capacity > this.loadFactor;
    }

    _rehash() {
        const oldBuckets = this.buckets;
        this.capacity *= 2;
        this.buckets = new Array(this.capacity).fill(null);
        this.keyCount = 0;

        for(const list of oldBuckets) {
            let node = list?.headNode;
            while(node) {
                this.set(node.value.k, node.value.v);
                node = node.nextNode;
            }
        }
    }

    set(key, value) {
        if(this._shouldGrow(1)) this._rehash();
        const hashCode = this.hash(key);
        if(this.buckets[hashCode] === null) {
            this.buckets[hashCode] = new LinkedList;
        }
        let node = this.buckets[hashCode].headNode;
        
        while(node) {
            if(node.value.k === key) {
                node.value.v = value;
                return;
            }
            node = node.nextNode;
        }

        this.buckets[hashCode].append({k: key, v: value});
        this.keyCount++;
    }

    get(key) {
        const list = this.buckets[this.hash(key)];
        if(!list) return null;

        let node = list.headNode;
        while(node) {
            if(node.value.k === key) return node.value.v;
            node = node.nextNode;
        }
        return null;
    }

    has(key) {
        return this.get(key) !== null;
    }

    remove(key) {
        const list = this.buckets[this.hash(key)];
        if(!list) return false;

        if(list.headNode && list.headNode.value.k === key) {
            list.headNode = list.headNode.nextNode;
            if(!list.headNode) list.tailNode = null;
            this.keyCount--;
            return true;
        }

        let prevNode = list.headNode;
        let currentNode = prevNode ? prevNode.nextNode : null;
        while(currentNode) {
            if(currentNode.value.k === key) {
                prevNode.nextNode = currentNode.nextNode;
                if(!prevNode.nextNode) list.tailNode = prevNode;
                this.keyCount--;
                return true;
            }
            prevNode = currentNode;
            currentNode = currentNode.nextNode;
        }
        return false;
    }

    length() {
        return this.keyCount;
    }

    clear() {
        this.buckets = new Array(this.capacity).fill(null);
        this.keyCount = 0;
    }

    keys() {
        const keys = []
        for(const list of this.buckets) {
            let node = list?.headNode;
            while(node) {
                keys.push(node.value.k);
                node = node.nextNode;
            }
        }
        return keys;
    }

    values() {
        const values = []
        for(const list of this.buckets) {
            let node = list?.headNode;
            while(node) {
                values.push(node.value.v);
                node = node.nextNode;
            }
        }
        return values;
    }

    entries() {
        const entries = []
        for(const list of this.buckets) {
            let node = list?.headNode;
            while(node) {
                entries.push([node.value.k, node.value.v]);
                node = node.nextNode;
            }
        }
        return entries;
    }
}
