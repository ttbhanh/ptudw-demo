// call function
function cong(x, y) {
    return x + y;
}

let sum = cong(1, 2);
console.log(sum);
sum = cong;
console.log(sum);
console.log(sum(1, 2));

function tru(x, y) {
    return x - y;
}

function nhan(x, y) {
    return x * y;
}

function chia(x, y) {
    if (y != 0) {
        return x / y;
    }
    throw new Error('Chia cho 0');
}

// ((1 + 2)*3 - 4)/5
let tong = cong(1, 2);
let tich = nhan(tong, 3);
let hieu = tru(tich, 4);
let ketqua = chia(hieu, 5);
console.log(ketqua);

ketqua = chia(tru(nhan(cong(1, 2), 3), 4), 5);
console.log(ketqua);


