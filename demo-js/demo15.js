'use strict';

//OOP
//Encapsulation: private properties or functions
//Inheritance
//Polymorphism: doSomething is different in each class
//Abstraction

class User {
    #private_attribute;

    constructor(email, name) {
        this.email = email;
        this.name = name;
        this.online = false;
        this.#private_attribute = 'secret';
    }

    login() {
        console.log(this.email, 'is logged in');
        return this;
    }

    logout() {
        //this.#private_attribute = '';
        console.log(this.email, 'is logged out');
        return this;
    }

    #private_function() {
        console.log('this is private function');
    }

    doSomething() {
        this.#private_function();
        console.log(this.email, 'is doing something');
        return this;
    }
}

class Admin extends User {
    role;
    constructor(email, name) {
        super(email, name);
        this.role = 'super user';
    }
    doSomething() {
        console.log(this.email, 'is doing something');
        return this;
    }

}
var user1 = new User('marry@mail.com', 'marry');
var user2 = new User('joe@mail.com', 'joe');
var admin = new Admin('admin@mail.com', 'admin');

//console.log(user1.#private_attribute);
console.log(user1.online);
console.log(user1);
user1.logout();
user1.doSomething();

admin.login().logout();
admin.doSomething();
console.log(admin);

// abstraction
// https://linuxhint.com/javascript-abstraction/
class Person {
    constructor() {
        if (this.constructor == Person) {
            throw new Error("Your Error Message...");
        }
    }
    info() {
        throw new Error(" Added abstract Method has no implementation");
    }
}

class Teacher extends Person {
    info() {
        console.log("I am a Teacher");
    }
}
var teacher1 = new Teacher();
teacher1.info();
