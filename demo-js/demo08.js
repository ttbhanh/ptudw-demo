// promise, async / await & event loop

function cong(x, y) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(x + y), 1000);
    });
}

function tru(x, y) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(x - y), 1000);
    });
}

function nhan(x, y) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(x * y), 1000);
    });
}

function chia(x, y) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (y != 0) {
                return resolve(x / y);
            }
            reject(new Error('Divide by zero'));
        }, 1000);
    });

}

cong(1, 2)
    .then(tong => console.log(tong));

// ((1 + 2)*3 - 4)/5
cong(1, 2)
    .then(tong => nhan(tong, 3))
    .then(tich => tru(tich, 4))
    .then(hieu => chia(hieu, 5))
    .then(ketqua => console.log(ketqua))
    .catch(error => console.log(error));

// anonymous function
(async function () {
    tong = await cong(1, 2);
    console.log(tong);

    let tich = await nhan(tong, 3);
    let hieu = await tru(tich, 4);
    let ketqua = await chia(hieu, 5);
    console.log(ketqua);
})();




