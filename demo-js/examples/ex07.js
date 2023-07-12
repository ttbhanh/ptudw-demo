let obj = {
    firstName: "John",
    lastName: 'Lin'
}

function foo(x) {
    x.firstName = 'Marry';
}

foo(obj);
console.log(obj);