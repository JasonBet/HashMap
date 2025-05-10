import { LinkedList } from "./linkedList.js";

const list = new LinkedList;
list.append("dog");
list.append("cat");
list.append("bird");
list.append("lizard");

console.log(list.toString());

list.pop()
console.log(list.toString());

list.prepend("jason");
console.log(list.toString());

console.log(list.find("jason"));