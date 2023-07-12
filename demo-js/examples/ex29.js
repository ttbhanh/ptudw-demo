'use strict';
function test1() {
    console.log(this);
}
test1();

let test2 = () => {
    console.log(this);
}
test2();