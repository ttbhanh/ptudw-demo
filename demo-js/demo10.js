// string "" '', template string ``
// string methods => see https://www.w3schools.com/js/js_string_methods.asp
// length, trim, split, concat, replace, toUpperCase, toLowerCase
// slice(start, end), negative parameter means position is counted from the end 
// substr(start, length), negative parameter means position is counted from the end 
// substring(start, length), start is positive 

let str1 = 'Hanh';
let str2 = "Tran";
let str3 = "Hello " + str1 + " " + str2;

// string template
str3 = `Hello ${str1} ${str2}`;
console.log(str3);
console.log(str3.length);





