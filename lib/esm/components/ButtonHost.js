import { defaultStyle } from '../constants/defaultStyle';
import { fontPixel, heightPixel, pixelSizeVertical, widthPixel } from '../utils/scaling';
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../constants/colors';
var ButtonHost = function (_a) {
    var name = _a.name, onPress = _a.onPress, _b = _a.disabled, disabled = _b === void 0 ? false : _b;
    return (React.createElement(Pressable, { onPress: onPress, style: styles.btn, disabled: disabled },
        React.createElement(Text, { style: [defaultStyle.body, { color: colors.WHITE }] }, name)));
};
export default React.memo(ButtonHost);
var styles = StyleSheet.create({
    btn: {
        backgroundColor: colors.light.INDIGO,
        alignSelf: 'center',
        paddingVertical: pixelSizeVertical(8),
        width: widthPixel(150),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: fontPixel(8),
        marginBottom: heightPixel(32),
    },
});
