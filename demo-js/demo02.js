'use strict';

//  khai bao ham
// function
// arrow function
// arguments
// default argument

// function foo(x) {
//     console.log(x);
// }

let foo = x => console.log(x);

// function cong(x, y) {
//     x = 3;
//     return x + y;
// }

let cong = (x, y) => {
    x = 3;
    return x + y;
}

var x = 1, y = 2;
console.log(cong(x, y));
console.log(x);

let cong1 = cong;
let cong2 = cong(1, 2);
console.log(cong1);
console.log(cong2);

function congPhanSo(x, y) {
    x.tuSo = 5;
    return x.tuSo + y;
}

x = {
    tuSo: 1,
    mauSo: 2
};
console.log(congPhanSo(x, y));
console.log(x);

// arguments
function doSomething(x, y, z) {
    console.log(arguments);
}

doSomething(1, 2, 3);

function doOtherThing() {
    console.log(arguments);
}

doOtherThing(1, 2);

let arrowFunction = () => {
    console.log(arguments);
}

arrowFunction(1, 2); // not [1, 2]

arrowFunction = (...args) => {
    console.log(args);
}

arrowFunction(1, 2); // [1, 2]

function myFunc(name = '') {
    console.log("Hello " + name);
}

