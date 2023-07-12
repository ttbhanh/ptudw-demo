// Array Shallow copy

array = [1, 4, 21, 2, 5];
clone = [...array];
// clone = array.map(x => x);
// clone = array.filter(() => true);
// clone = array.slice();
array[0] = 0;
console.log(clone, array);

nestedNumbers = [[1], [2]];
numbersCopy = [...nestedNumbers];
// numbersCopy = nestedNumbers.map((x) => x);
// numbersCopy = nestedNumbers.filter(() => true);
// numbersCopy = nestedNumbers.slice();
numbersCopy[0].push(300);
console.log(nestedNumbers, numbersCopy);
