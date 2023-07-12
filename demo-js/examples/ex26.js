// spread & destructuring operator
userDetails = {
    fullname: "John Doe",
    age: 14,
    verified: false,
    test: {
        x: 10
    }
};

// var fullname = userDetails.fullname;
// var age = userDetails.age;
// let others = {
//     verified: userDetails.verified,
//     test: userDetails.test
// };

let { fullname, age, ...others } = userDetails;
console.log(fullname, age, others);