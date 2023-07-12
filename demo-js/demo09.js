'use strict';

// setTimeout(cb, 0), setImmediate(cb), process.nextTick(cb)

// callback order 
// timers (callback from setInterval, setTimeout) -> I/O (callback from io) -> poll (incoming connections, data io) -> check (callback from setImmediate) -> close (Socket) -> timers -> ...

let racer = function () {
    setTimeout(() => console.log("timeout"), 0);
    setImmediate(() => console.log("immediate"));
    process.nextTick(() => console.log("nextTick"));
    console.log("current event loop");
}

racer();