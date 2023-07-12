function sum() {
    let total = 0;
    for (let i = 0; i < arguments.length; i++) {
        total += arguments[i];
    }
    return total;
}

console.log(sum());
console.log(sum(1));
console.log(sum(1, 2, 3));