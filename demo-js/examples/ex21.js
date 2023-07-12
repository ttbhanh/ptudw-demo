let array = [1, 4, 21, 2, 5];
array.sort();
console.log(array);

array.sort((a, b) => a - b);
console.log(array);

array.sort((a, b) => b - a);
console.log(array);
