// 'use strict';
// khai bao bien
// var, let, const
// => scope
// var => global scope
// let, const => block scope

{
    str = 'hello'; // error: str is not defined

    var x = 1;
    let y = 2;
    const z = 3;

    // z = 4; // error: Assignment to constant variable

    const phanSo = {
        tuSo: 1,
        mauSo: 2
    }

    phanSo.tuSo = 3;

    console.log(phanSo);

    var x = 2;
    // var y = 3; // error: Identifier 'y' has already been declared
    // let z = 1; // errpr: Identifier 'z' has already been declared
}


console.log(str);
console.log(x);
// console.log(y); // error: y is not defined
// console.log(z); // error: z is not defined
