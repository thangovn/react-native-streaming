import { colors } from '../constants/colors';
import { defaultStyle } from '../constants/defaultStyle';
import { HEIGHT_SCREEN, WIDTH_SCREEN } from '../constants/spacing';
import { fontPixel, heightPixel, pixelSizeHorizontal, widthPixel } from '../utils/scaling';
import AnimatedLottieView from 'lottie-react-native';
import React, { useImperativeHandle, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
    cancelAnimation,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSpring,
    withTiming,
} from 'react-native-reanimated';

const GiftFlag = React.forwardRef(({}, ref?: any) => {
    const a = useSharedValue(WIDTH_SCREEN);
    const opacity = useSharedValue(1);

    const animationStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: a.value }],
            opacity: opacity.value,
        };
    });

    const [currentIcon, setCurrentIcon] = useState();

    useImperativeHandle(ref, () => ({
        startAnimation,
    }));

    const startAnimation = async (lottieIcon: any) => {
        cancelAnimation(a);
        cancelAnimation(opacity);

        setCurrentIcon(lottieIcon);
        setTimeout(() => {
            a.value = withSpring(0);
            a.value = withDelay(5000, withSpring(-WIDTH_SCREEN));
            opacity.value = withDelay(
                2000,
                withTiming(0, { duration: 5500 }, () => {
                    opacity.value = 1;
                    a.value = WIDTH_SCREEN;
                }),
            );
        }, 1000);
    };

    return (
        <Animated.View style={[styles.sendItem, animationStyle]}>
            <View style={styles.wrapGiftFlag}>
                <LinearGradient
                    style={styles.linear}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1.3, y: 0 }}
                    colors={[
                        colors.light.INDIGO,
                        colors.light.ASTRAL,
                        colors.light.AZURE_RADIANCE_2,
                        colors.light.TRANSPARENT,
                    ]}
                />
                <Text style={[defaultStyle.subButton, { color: colors.light.White }]}>
                    {'Hoang Thuan send '}
                </Text>

                {Boolean(currentIcon) && (
                    <AnimatedLottieView autoPlay source={currentIcon} style={styles.lottieIcon} />
                )}
                <Text style={styles.count}>{'x 999'}</Text>
            </View>
        </Animated.View>
    );
});

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
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
    },
    lottieIcon: {
        maxWidth: widthPixel(60),
        height: widthPixel(60),
    },
    count: {
        ...defaultStyle.button1,
        color: colors.light.SUPPER_NOVA,
    },
});
