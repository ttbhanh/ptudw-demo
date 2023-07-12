// object: spread, destructuring operator, clone
let obj1 = {
    x: 1,
    y: 2,
    z: 3
};
obj1.x = 4;
console.log(obj1);

let obj2 = obj1;
obj2.x = 5;
console.log(obj1);

let { x, ...others } = obj1;
console.log(x);
console.log(others);

// Spread Method (swallow copy)
let userDetails = {
    name: "John Doe",
    age: 14,
    verified: false,
    test: {
        x: 10
    }
};
let clone = { ...userDetails }
userDetails.test.x = 15;
console.log(userDetails, clone);

// Object.assign() Method (swallow copy)
userDetails = {
    name: "John Doe",
    age: 14,
    verified: false,
    test: {
        x: 10
    }
};
clone = Object.assign({}, userDetails)
userDetails.test.x = 15;
console.log(userDetails, clone);

// JSON.parse() Method (deep copy)
userDetails = {
    name: "John Doe",
    age: 14,
    verified: false,
    test: {
        x: 10
    }
};
clone = JSON.parse(JSON.stringify(userDetails));
userDetails.test.x = 15;
console.log(userDetails, clone);
