import { useKeyboard } from '../hooks/useKeyboard';
import { widthPixel } from '../utils/scaling';
import AnimatedLottieView from 'lottie-react-native';
import React from 'react';
import { Keyboard, Pressable, StyleSheet } from 'react-native';
import { refGiftModal } from './GiftListModal';
import { lottie_gift_box } from '../assets/lotties';
var LottieBox = function (_a) {
    var _b = _a.source, source = _b === void 0 ? lottie_gift_box : _b;
    var isShowKeyboard = useKeyboard().isShowKeyboard;
    var handlePress = function () {
        Keyboard.dismiss();
        setTimeout(function () {
            var _a;
            (_a = refGiftModal.current) === null || _a === void 0 ? void 0 : _a.open();
        }, isShowKeyboard ? 500 : 0);
    };
    return (React.createElement(Pressable, { onPress: handlePress, style: styles.lottie },
        React.createElement(AnimatedLottieView, { source: source, autoPlay: true, loop: true, style: styles.lottie })));
};
export default React.memo(LottieBox);
var styles = StyleSheet.create({
    lottie: {
        width: widthPixel(40),
        height: widthPixel(40),
    },
});
