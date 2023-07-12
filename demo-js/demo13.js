// this
// 'use strict';
// function test1() {
//     console.log(this); // this is undefined if use strict, otherwise is global object
// }
// test1();

// let test2 = () => {
//     console.log(this); // this is window or global object
// }
// test2();

// let myObject = {
//     myMethod1: () => {
//         console.log(this); // this is window or global object
//     },
//     myMethod2: function () {
//         console.log(this); // this is myObject
//     }
// };

// myObject.myMethod1();
// myObject.myMethod2();

// var fullname = 'John Doe';
// var obj = {
//     fullname: 'Colin Ihrig',
//     prop: {
//         fullname: 'Aurelio De Rosa',
//         getFullname: function () {
//             return this.fullname;
//         }
//     }
// };

// console.log(obj.prop.getFullname());

// var test = obj.prop.getFullname;
// console.log(test());
