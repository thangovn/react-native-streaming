import { Alert } from 'react-native';
export var alertOk = function (_a) {
    var _b = _a.msg, msg = _b === void 0 ? '' : _b, _c = _a.onPress, onPress = _c === void 0 ? function () { } : _c, _d = _a.title, title = _d === void 0 ? 'Notice' : _d;
    return Alert.alert(title, msg, [{ text: 'OK', onPress: onPress }]);
};
export var alertYesNo = function (_a) {
    var _b = _a.title, title = _b === void 0 ? 'Notice' : _b, _c = _a.msg, msg = _c === void 0 ? '' : _c, _d = _a.onPressAccept, onPressAccept = _d === void 0 ? function () { } : _d, _e = _a.text, text = _e === void 0 ? 'OK' : _e, _f = _a.onPressCancel, onPressCancel = _f === void 0 ? function () { } : _f, _g = _a.textCancel, textCancel = _g === void 0 ? 'Cancel' : _g;
    return Alert.alert(title, msg, [
        {
            text: textCancel,
            onPress: onPressCancel,
            style: 'cancel',
        },
        { text: text, onPress: onPressAccept },
    ]);
};
