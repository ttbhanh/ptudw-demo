function foo1() {
    console.log(arguments);
}

let foo2 = () => {
    console.log(arguments);
}

foo1(1, 2);
foo2(1, 2);