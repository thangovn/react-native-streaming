import Pressable from './Pressable';
import { defaultStyle } from '../constants/defaultStyle';
import React from 'react';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';
import { widthPixel } from '../utils/scaling';
import { colors } from '../constants/colors';
export var IconButton = function (_a) {
    var icon = _a.icon, onPress = _a.onPress, style = _a.style, iconStyle = _a.iconStyle, tintColor = _a.tintColor, iconVector = _a.iconVector;
    return (React.createElement(Pressable, { onPress: onPress, style: style }, Boolean(iconVector) ? (React.createElement(Icon, { name: iconVector, size: widthPixel(28), color: colors.WHITE, onPress: onPress, style: { marginLeft: widthPixel(8) } })) : (React.createElement(FastImage, { source: icon, style: [defaultStyle.icon_24, iconStyle], tintColor: tintColor }))));
};
