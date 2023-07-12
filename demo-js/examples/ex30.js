let myObject = {
    myMethod1: () => {
        console.log(this);
    },
    myMethod2: function () {
        console.log(this);
    }
};

myObject.myMethod1();
myObject.myMethod2();