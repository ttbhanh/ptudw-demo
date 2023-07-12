function foo(x, y, callback) {
    setTimeout(() => callback(x + y), 1000);
}

foo(5, 6, (result) => console.log(result));
