function beautyNum(num) {
    let numStr;
    if (num < 10) {
        numStr = '0' + num;
    } else numStr = num;
    return numStr;
}