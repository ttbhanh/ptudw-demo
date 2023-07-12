// callback &  callback hell
function cong(x, y, callback) {
    setTimeout(() => callback(x + y), 1000);
}

function tru(x, y, callback) {
    setTimeout(() => callback(x - y), 1000);
}

function nhan(x, y, callback) {
    setTimeout(() => callback(x * y), 1000);
}

function chia(x, y, callback) {
    setTimeout(() => {
        if (y != 0) {
            return callback(x / y);
        }
        callback(new Error('Divide by zero'));
    }, 1000);
}

// cong(1, 2, function (tong) {
//     console.log(tong);
// });

cong(1, 2, tong => console.log(tong));

// callback hell
// ((1 + 2)*3 - 4)/5
cong(1, 2, tong =>
    nhan(tong, 3, tich =>
        tru(tich, 4, hieu =>
            chia(hieu, 5, ketqua => console.log(ketqua))
        )
    )
);
