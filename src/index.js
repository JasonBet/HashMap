import { HashMap } from "./hashMap.js";

const newMap = new HashMap;

newMap.set('apple', 'red');
newMap.set('banana', 'yellow');
newMap.set('carrot', 'orange');
newMap.set('dog', 'brown');
newMap.set('frog', 'green');

newMap.clear();

console.log(newMap.entries());