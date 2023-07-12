// event loop
function cong(x, y) {
    setTimeout(() => x + y, 1000);
}

function tru(x, y) {
    setTimeout(() => x - y, 1000);
}

function nhan(x, y) {
    setTimeout(() => x * y, 1000);
}

function chia(x, y) {
    setTimeout(() => {
        if (y != 0) {
            return x / y;
        }
        return new Error('Chia cho 0');
    }, 1000);
}

// ((1 + 2)*3 - 4)/5
let ketqua = chia(tru(nhan(cong(1, 2), 3), 4), 5);
console.log(ketqua);

let tong = cong(1, 2);
let tich = nhan(tong, 3);
let hieu = tru(tich, 4);
ketqua = chia(hieu, 5);
console.log(ketqua);

