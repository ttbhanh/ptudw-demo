// async / await
function cong(x, y) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(x + y), 1000);
    });
}

// cong(1, 2).then(tong => console.log(tong));

// anonymous function
(async function () {
    tong = await cong(1, 2);
    console.log(tong);
})();



