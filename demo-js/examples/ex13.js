function foo1(x, y) {
    return x + y;
}

function foo2(x, y) {
    setTimeout(() => x + y, 1000);
}

let x = foo1(1, 2);
console.log(x);

let y = foo2(3, 4);
setTimeout(() => console.log(y), 2000);
//console.log(y);

