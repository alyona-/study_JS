let today = {
    bN: function (num) {
        if (num < 10) {
            return '0' + num;
        } else
            return num;
    },
    print: function () {
        let t = new Date();
        console.log(`${today.bN(t.getDate())}.${today.bN((t.getMonth() + 1))}.${today.bN(t.getFullYear())} ${today.bN(t.getHours())}:${today.bN(t.getMinutes())}:${today.bN(t.getSeconds())}`);
    }
};

today.print();