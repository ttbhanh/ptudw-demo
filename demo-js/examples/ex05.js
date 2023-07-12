function foo() {
    return 2;
}

let x = foo;
let y = foo();

console.log('x: ' + x);
console.log('y: ' + y);
console.log(x());