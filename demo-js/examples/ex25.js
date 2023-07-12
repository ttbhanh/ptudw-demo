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