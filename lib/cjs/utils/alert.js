"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alertYesNo = exports.alertOk = void 0;
var react_native_1 = require("react-native");
var alertOk = function (_a) {
    var _b = _a.msg, msg = _b === void 0 ? '' : _b, _c = _a.onPress, onPress = _c === void 0 ? function () { } : _c, _d = _a.title, title = _d === void 0 ? 'Notice' : _d;
    return react_native_1.Alert.alert(title, msg, [{ text: 'OK', onPress: onPress }]);
};
exports.alertOk = alertOk;
var alertYesNo = function (_a) {
    var _b = _a.title, title = _b === void 0 ? 'Notice' : _b, _c = _a.msg, msg = _c === void 0 ? '' : _c, _d = _a.onPressAccept, onPressAccept = _d === void 0 ? function () { } : _d, _e = _a.text, text = _e === void 0 ? 'OK' : _e, _f = _a.onPressCancel, onPressCancel = _f === void 0 ? function () { } : _f, _g = _a.textCancel, textCancel = _g === void 0 ? 'Cancel' : _g;
    return react_native_1.Alert.alert(title, msg, [
        {
            text: textCancel,
            onPress: onPressCancel,
            style: 'cancel',
        },
        { text: text, onPress: onPressAccept },
    ]);
};
exports.alertYesNo = alertYesNo;
