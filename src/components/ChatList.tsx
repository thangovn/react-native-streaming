import { defaultStyle } from '../constants/defaultStyle';
import { HEIGHT_SCREEN, WIDTH_SCREEN } from '../constants/spacing';
import { useKeyboard } from '../hooks/useKeyboard';
import {
    fontPixel,
    heightPixel,
    pixelSizeHorizontal,
    pixelSizeVertical,
    widthPixel,
} from '../utils/scaling';
import AnimatedLottieView from 'lottie-react-native';
import React, { FC, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
} from 'react-native-reanimated';
import RNAndroidKeyboardAdjust from 'rn-android-keyboard-adjust';
import { colors } from '../constants/colors';
import { isIOS } from '../utils/deviceInfo';
import Composer from './Composer';

interface Props {
    data: any[];
    onSend?: ({ text }: { text: string }) => void;
    iconBox: string | number;
}

export const refChatList = React.createRef<any>();
const ChatList: FC<Props> = ({ data, onSend, iconBox }) => {
    const renderMessageItem = ({ item, index }) => {
        return (
            <View style={styles.messageItem}>
                <Text style={[defaultStyle.subButton, { color: colors.light.MainColor }]}>
                    {`${item.username}: `}
                </Text>
                <Text style={styles.messageText}>{item.message}</Text>
            </View>
        );
    };
    const refLottie = useRef<any>();
    const [currentIcon, setCurrentIcon] = useState();

    useImperativeHandle(refChatList, () => ({
        startAnimation: (icon: any) => {
            setCurrentIcon(icon);
            refLottie.current?.play();

            opacity.value = withDelay(
                2000,
                withTiming(0, { duration: 1000 }, () => {
                    scale.value = 0;
                    opacity.value = 1;
                    bottom.value = 0;
                    right.value = 0;
                }),
            );
            scale.value = withTiming(3, { duration: 2000 });
            bottom.value = withTiming(HEIGHT_SCREEN / 1.5 - heightPixel(25), {
                duration: 1000,
            });
            right.value = withTiming(WIDTH_SCREEN / 2 - widthPixel(25), {
                duration: 1000,
            });
        },
    }));

    const scale = useSharedValue(0);
    const bottom = useSharedValue(0);
    const right = useSharedValue(0);
    const opacity = useSharedValue(1);

    const animationStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
            bottom: bottom.value,
            right: right.value,
            opacity: opacity.value,
        };
    });

    useEffect(() => {
        RNAndroidKeyboardAdjust.setAdjustResize();

        return () => RNAndroidKeyboardAdjust.setAdjustPan();
    }, []);

    const { keyboardHeight } = useKeyboard();
    return (
        <KeyboardAvoidingView
            behavior={isIOS ? 'padding' : null}
            style={[
                styles.contain,
                {
                    ...Platform.select({
                        android: {
                            bottom:
                                keyboardHeight +
                                heightPixel(keyboardHeight > 0 ? heightPixel(24) : 0),
                        },
                    }),
                },
            ]}>
            <View style={styles.inner}>
                <FlatList
                    data={data}
                    keyExtractor={(item, index) => `${index}`}
                    renderItem={renderMessageItem}
                    inverted
                    style={styles.containFlatList}
                />
                <Animated.View style={[styles.box, animationStyle]}>
                    {Boolean(currentIcon) && (
                        <AnimatedLottieView
                            ref={refLottie}
                            source={currentIcon}
                            style={StyleSheet.absoluteFill}
                        />
                    )}
                </Animated.View>
                <Composer onSend={onSend} source={iconBox} />
            </View>
        </KeyboardAvoidingView>
    );
};

export default React.memo(ChatList);

const styles = StyleSheet.create({
    inner: {
        padding: fontPixel(16),
        flex: 1,
        justifyContent: 'flex-end',
    },
    containFlatList: {
        maxHeight: heightPixel(300),
    },
    messageItem: {
        ...defaultStyle.flexRow,
        backgroundColor: 'rgba(0, 0, 0, .5)',
        marginVertical: pixelSizeVertical(4),
        borderRadius: fontPixel(20),
        paddingVertical: pixelSizeVertical(4),
        paddingHorizontal: pixelSizeHorizontal(8),
        alignSelf: 'flex-start',
    },
    messageText: {
        ...defaultStyle.subButton,
        color: colors.WHITE,
        alignSelf: 'flex-start',
        maxWidth: WIDTH_SCREEN / 1.5,
    },
    contain: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    box: {
        width: widthPixel(50),
        height: widthPixel(50),
        position: 'absolute',
    },
});
