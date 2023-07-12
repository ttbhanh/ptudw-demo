// this
function test1() {
    console.log(this); // this is undefined if use strict, otherwise is global object
}
test1();

let test2 = () => {
    console.log(this); // this is window or global object
}
test2();
