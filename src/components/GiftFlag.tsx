import { GiftType } from '../enums/giftType';
import { colors } from '../constants/colors';
import { defaultStyle } from '../constants/defaultStyle';
import { HEIGHT_SCREEN, WIDTH_SCREEN } from '../constants/spacing';
import { fontPixel, heightPixel, pixelSizeHorizontal, widthPixel } from '../utils/scaling';
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

let timeout;
export const refGiftFlag = React.createRef<{ startAnimation: (icon: any) => void }>();
const GiftFlag = ({}) => {
    const a = useSharedValue(WIDTH_SCREEN);
    const opacity = useSharedValue(1);

    const animationStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: a.value }],
            opacity: opacity.value,
        };
    });

    const [currentIcon, setCurrentIcon] = useState<any>();
    useImperativeHandle(refGiftFlag, () => ({
        startAnimation,
    }));

    const startAnimation = async (lottieIcon: any) => {
        cancelAnimation(a);
        cancelAnimation(opacity);
        clearTimeout(timeout);

        setCurrentIcon(lottieIcon);
        timeout = setTimeout(() => {
            a.value = withSpring(0);
            a.value = withDelay(3000, withSpring(-WIDTH_SCREEN));
            opacity.value = withDelay(
                2000,
                withTiming(0, { duration: 4500 }, () => {
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
                    (currentIcon.type || currentIcon.gift_data.type) === GiftType.GIF ? (
                        <FastImage
                            source={{
                                uri: currentIcon.url ? currentIcon.url : currentIcon.gift_data.url,
                            }}
                            style={styles.lottieIcon}
                        />
                    ) : (
                        <AnimatedLottieView
                            autoPlay
                            source={currentIcon.resource || currentIcon.gift_data.resource}
                            style={styles.lottieIcon}
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
        position: 'absolute',
        top: HEIGHT_SCREEN / 2 - heightPixel(16),
        marginLeft: pixelSizeHorizontal(16),
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
        width: widthPixel(40),
        height: widthPixel(40),
    },
    count: {
        ...defaultStyle.button1,
        color: colors.light.SUPPER_NOVA,
    },
});
