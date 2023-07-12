// async / await

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

// ((1 + 2)*3 - 4)/5

// anonymous function
(async function () {
    let tong = cong(1, 2);
    console.log(tong);

    tong = await cong(1, 2);
    console.log(tong);

    let tich = await nhan(tong, 3);
    let hieu = await tru(tich, 4);
    try {
        let ketqua = await chia(hieu, 5);
        console.log(ketqua);
    } catch (error) {
        console.error(error);
    }
})();



