export var getTime = function (t, isFormat) {
    var digit = function (n) { return (n < 10 ? "0".concat(n) : "".concat(n)); };
    var sec = digit(Math.floor(t % 60));
    var min = digit(Math.floor((t / 60) % 60));
    var hr = digit(Math.floor((t / 3600) % 60));
    if (isFormat)
        return min + ':' + sec;
    if (hr > 0 && min > 0 && sec > 0) {
        return "".concat(hr, ":").concat(min, ":").concat(sec);
    }
    if (min > 0 && sec > 0) {
        return "".concat(min, ":").concat(sec);
    }
    return "".concat(sec);
    // return min + ':' + sec // this will convert sec to timer string
    // 33 -> 00:00:33
};
