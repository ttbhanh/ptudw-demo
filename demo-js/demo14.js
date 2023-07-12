// OOP - object prototype

function User(email, name) {
    this.email = email;
    this.name = name;

    // ham login duoc khoi  tao  cung voi constructor
    this.login = function () {
        console.log(this.email, 'has logged in');
        return this;
    }
}

// ham trong prototype chi dc khoi tao 1 lan va chia se giua cac instance
User.prototype.logout = function () {
    console.log(this.email, 'has logged out');
    return this;
}

function Admin(...args) {
    // ke thua attributes cua user
    User.apply(this, args);
    this.role = 'super user';
}

// Ke thua prototype cua user
Admin.prototype = Object.create(User.prototype);
Admin.prototype.doSomething = function () {
    console.log(this.email, 'is doing something');
}
var user = new User('ana@mail.com', 'ana');
user.login().logout();
console.log(user);

var admin = new Admin('admin@mail.com', 'admin');
admin.login();
admin.logout();
admin.doSomething();
console.log(admin);


/* 43


Functions on the prototype are only created once and shared between each instance. Functions created in the constructor are created as new objects for each new object created with the constructor.

As a general rule functions should be on the prototype since they will generally not be modified for different objects of the same type, and this has a slight memory/performance benefit. Other properties like objects and arrays should be defined in the constructor, unless you want to create a shared, static property, in which case you should use the prototype.

*/