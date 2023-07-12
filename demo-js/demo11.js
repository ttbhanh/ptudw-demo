// array
// array methods, sort, iteration
// push, shift, pop, unshift, concat, join
// https://www.w3schools.com/js/js_array_methods.asp
// sort
// https://www.w3schools.com/js/js_array_sort.asp
// map, forEach, filter, reduce
// https://www.w3schools.com/js/js_array_iteration.asp
// indexOf, includes
// splice
// clone
// https://www.freecodecamp.org/news/how-to-clone-an-array-in-javascript-1d3183468f6a/

let array = [1, 4, 21, 2, 5];
array.sort();
console.log(array);

array.sort((a, b) => a - b);
console.log(array);

// Shallow copy
let clone = [...array];
array[0] = 0;
console.log(clone);
console.log(array);

nestedNumbers = [[1], [2]];
numbersCopy = [...nestedNumbers];
numbersCopy[0].push(300);
console.log(nestedNumbers, numbersCopy);

nestedNumbers = [[1], [2]];
numbersCopy = nestedNumbers.map((x) => x);
numbersCopy[0].push(300);
console.log(nestedNumbers, numbersCopy);

nestedNumbers = [[1], [2]];
numbersCopy = nestedNumbers.filter(() => true);
numbersCopy[0].push(300);
console.log(nestedNumbers, numbersCopy);

nestedNumbers = [[1], [2]];
numbersCopy = nestedNumbers.slice();
numbersCopy[0].push(300);
console.log(nestedNumbers, numbersCopy);

// deep copy
nestedNumbers = [[1], [2]];
numbersCopy = JSON.parse(JSON.stringify(nestedNumbers));
numbersCopy[0].push(300);
console.log(nestedNumbers, numbersCopy);