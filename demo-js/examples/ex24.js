// Object Shallow copy

userDetails = {
    name: "John Doe",
    age: 14,
    verified: false,
    test: {
        x: 10
    }
};
clone = { ...userDetails };
//clone = Object.assign({}, userDetails);

userDetails.test.x = 15;
console.log(userDetails, clone);