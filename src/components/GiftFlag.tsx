import { get, isEmpty } from 'lodash';
import AnimatedLottieView from 'lottie-react-native';
import React, { useImperativeHandle, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
    cancelAnimation,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import { colors } from '../constants/colors';
import { defaultStyle } from '../constants/defaultStyle';
import { WIDTH_SCREEN } from '../constants/spacing';
import { IReceiveGiftItem } from '../dtos';
import { GiftType } from '../enums/giftType';
import {
    fontPixel,
    heightPixel,
    pixelSizeHorizontal,
    pixelSizeVertical,
    widthPixel,
} from '../utils/scaling';

let timeout;
export const refGiftFlag = React.createRef<{ startAnimation: (icon: IReceiveGiftItem) => void }>();
const GiftFlag = ({}) => {
    const a = useSharedValue(WIDTH_SCREEN);
    const opacity = useSharedValue(1);

    const animationStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: a.value }],
            opacity: opacity.value,
        };
    });

    const [currentIcon, setCurrentIcon] = useState<IReceiveGiftItem>();
    useImperativeHandle(refGiftFlag, () => ({
        startAnimation,
    }));

    const startAnimation = async (lottieIcon: IReceiveGiftItem) => {
        cancelAnimation(a);
        cancelAnimation(opacity);
        clearTimeout(timeout);

        setCurrentIcon(lottieIcon);
        timeout = setTimeout(() => {
            a.value = withSpring(0);
            a.value = withDelay(5000, withSpring(-WIDTH_SCREEN));
            opacity.value = withDelay(
                2000,
                withTiming(0, { duration: 5500 }, () => {
                    opacity.value = 1;
                    a.value = WIDTH_SCREEN;
                }),
            );
        }, 500);
    };

    return (
        <Animated.View style={[styles.sendItem, animationStyle]}>
            <View style={styles.wrapGiftFlag}>
                <LinearGradient
                    style={styles.linear}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1.4, y: 0 }}
                    colors={[
                        colors.light.INDIGO,
                        colors.light.ASTRAL,
                        colors.light.AZURE_RADIANCE_2,
                        colors.light.TRANSPARENT,
                    ]}
                />
                <Text style={[defaultStyle.subButton, { color: colors.light.White }]}>
                    {`${get(currentIcon, 'user_name', 'Thuan')} send `}
                </Text>
                {!isEmpty(currentIcon) ? (
                    currentIcon.gift_data.gift_type === GiftType.GIF ? (
                        <FastImage
                            source={{ uri: get(currentIcon, 'gift_data.resource') }}
                            style={styles.lottieIcon}
                            resizeMode={'contain'}
                        />
                    ) : (
                        <AnimatedLottieView
                            autoPlay
                            source={{ uri: get(currentIcon, 'gift_data.resource') }}
                            style={styles.lottieIcon}
                            resizeMode={'contain'}
                        />
                    )
                ) : null}
                <Text style={styles.count}>{`x ${get(currentIcon, 'quantity', 999)}`}</Text>
            </View>
        </Animated.View>
    );
};

export default React.memo(GiftFlag);

const styles = StyleSheet.create({
    sendItem: {
        marginBottom: pixelSizeVertical(16),
    },
    wrapGiftFlag: {
        width: WIDTH_SCREEN / 1.7,
        height: heightPixel(36),
        paddingHorizontal: pixelSizeHorizontal(16),
        overflow: 'visible',
        ...defaultStyle.flexRow,
    },
    linear: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: fontPixel(20),
    },
    lottieIcon: {
        width: widthPixel(48),
        height: widthPixel(48),
    },
    count: {
        ...defaultStyle.button1,
        color: colors.light.SUPPER_NOVA,
    },
});
