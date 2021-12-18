import { lottie_confetti } from '../assets/lotties';
import { GiftType } from '../enums/giftType';
import { colors } from '../constants/colors';
import { defaultStyle } from '../constants/defaultStyle';
import { HEIGHT_SCREEN, WIDTH_SCREEN } from '../constants/spacing';
import { useKeyboard } from '../hooks/useKeyboard';
import { isIOS } from '../utils/deviceInfo';
import {
    fontPixel,
    heightPixel,
    pixelSizeHorizontal,
    pixelSizeVertical,
    widthPixel,
} from '../utils/scaling';
import { isEmpty } from 'lodash';
import AnimatedLottieView from 'lottie-react-native';
import React, { FC, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import Animated, {
    cancelAnimation,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import RNAndroidKeyboardAdjust from 'rn-android-keyboard-adjust';
import Composer from './Composer';
import GiftFlag from './GiftFlag';
import { IReceiveGiftItem } from '../dtos';

interface Props {
    data: any[];
    onSend?: ({ text }: { text: string }) => void;
    rightIconComposer?: any;
}

let timeout;
export const refChatList =
    React.createRef<{ startAnimation: (receiveGift: IReceiveGiftItem) => void }>();
const ChatList: FC<Props> = ({ data, onSend, rightIconComposer }) => {
    const renderMessageItem = ({ item, index }) => {
        return (
            <View style={styles.messageItem}>
                <Text style={[defaultStyle.subButton, { color: colors.light.MainColor }]}>
                    {`${item.user_name}: `}
                </Text>
                <Text style={styles.messageText}>{item.message}</Text>
            </View>
        );
    };
    const refLottie = useRef<any>();
    const refConfetti = useRef<any>();

    const [currentIcon, setCurrentIcon] = useState<IReceiveGiftItem>();

    useImperativeHandle(refChatList, () => ({
        startAnimation: (icon: IReceiveGiftItem) => {
            refLottie.current?.reset();
            refConfetti.current?.reset();
            cancelAnimation(scale);
            cancelAnimation(right);
            cancelAnimation(bottom);
            cancelAnimation(opacity);
            cancelAnimation(opacityConfetti);
            clearTimeout(timeout);

            setCurrentIcon(icon);
            timeout = setTimeout(() => {
                refLottie.current?.play();
                refConfetti.current?.play();

                opacity.value = withTiming(0, { duration: 8000 }, () => {
                    scale.value = 0;
                    opacity.value = 1;
                    bottom.value = 0;
                    right.value = 0;
                });
                opacityConfetti.value = withTiming(0, { duration: 8000 }, () => {
                    opacityConfetti.value = 1;
                });
                scale.value = withTiming(3, { duration: 1500 });
                bottom.value = withTiming(HEIGHT_SCREEN / 1.5 - heightPixel(50), { duration: 500 });
                right.value = withTiming(WIDTH_SCREEN / 2 - widthPixel(50), { duration: 500 });
            }, 600);
        },
    }));

    const scale = useSharedValue(0);
    const bottom = useSharedValue(0);
    const right = useSharedValue(0);
    const opacity = useSharedValue(1);
    const opacityConfetti = useSharedValue(1);

    const animationStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
            bottom: bottom.value,
            right: right.value,
            opacity: opacity.value,
        };
    });

    const animationConfettiStyle = useAnimatedStyle(() => {
        return {
            opacity: opacityConfetti.value,
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
                <GiftFlag />
                <FlatList
                    data={data}
                    keyExtractor={(item, index) => `${index}`}
                    renderItem={renderMessageItem}
                    inverted
                    style={styles.containFlatList}
                    showsVerticalScrollIndicator={false}
                />
                <Animated.View style={[styles.box, animationStyle]}>
                    {!isEmpty(currentIcon) ? (
                        <>
                            {(currentIcon.type || currentIcon.gift_data.type) === GiftType.GIF ? (
                                <FastImage
                                    source={{
                                        uri: currentIcon.url
                                            ? currentIcon.url
                                            : currentIcon.gift_data.url,
                                    }}
                                    style={StyleSheet.absoluteFill}
                                />
                            ) : (
                                <AnimatedLottieView
                                    ref={refLottie}
                                    source={currentIcon.resource || currentIcon.gift_data.resource}
                                    style={StyleSheet.absoluteFill}
                                />
                            )}
                        </>
                    ) : null}
                </Animated.View>
                <Animated.View style={[styles.wrapConfetti, animationConfettiStyle]}>
                    <AnimatedLottieView
                        loop={false}
                        resizeMode={'cover'}
                        ref={refConfetti}
                        source={lottie_confetti}
                        style={styles.lottieConfetti}
                    />
                </Animated.View>
                <Composer onSend={onSend} source={rightIconComposer} />
            </View>
        </KeyboardAvoidingView>
    );
};

export default React.memo(ChatList);

const styles = StyleSheet.create({
    wrapConfetti: {
        width: WIDTH_SCREEN,
        height: HEIGHT_SCREEN,
        position: 'absolute',
    },
    inner: {
        padding: fontPixel(16),
        flex: 1,
        justifyContent: 'flex-end',
    },
    containFlatList: {
        maxHeight: heightPixel(300),
        zIndex: 999,
    },
    messageItem: {
        ...defaultStyle.flexRow,
        backgroundColor: colors.BLACK_30,
        marginVertical: pixelSizeVertical(4),
        borderRadius: fontPixel(20),
        paddingVertical: pixelSizeVertical(4),
        paddingHorizontal: pixelSizeHorizontal(8),
        alignSelf: 'flex-start',
    },
    messageText: {
        ...defaultStyle.subButton,
        color: colors.light.White,
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
    lottieConfetti: {
        ...StyleSheet.absoluteFillObject,
    },
});
