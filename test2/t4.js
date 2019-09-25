function foo() {
    if (false) {
        var x = 1;
    }
    return;
    var y = 1;
}
function foo() {
    var x, y;
    if (false) {
        x = 1;
    }
    return;
    y = 1;
}
foo();