import AnimatedLottieView from 'lottie-react-native';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
    cancelAnimation,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import { refComposer } from './components/Composer';
import GiftListModal, { IGiftItem } from './components/GiftListModal';
import LiveStreamPlayer from './components/LiveStreamPlayer';
import SwipeList from './components/SwipeList';
import { colors } from './constants/colors';
import { defaultStyle } from './constants/defaultStyle';
import { HEIGHT_SCREEN, WIDTH_SCREEN } from './constants/spacing';
import { Status } from './enums/status';
import { heightPixel, pixelSizeHorizontal } from './utils/scaling';

const arr = new Array(50)
    .fill('')
    .map((item, index) => ({ id: index, username: 'David', message: 'Have a nice day!' }));

interface Props {
    status: Status;
    connection: any | {};
    onClose: () => void;
    iconBox?: string | number;
    data: IGiftItem[];
}

export default ({ status, connection, onClose, iconBox, data }: Props) => {
    const [dataMessage, setDataMessage] = useState([...arr]);
    const [lottieIcon, setLottieIcon] = useState(null);

    const onSend = ({ text }) => {
        if (!text) return;
        setDataMessage([{ id: Math.random(), username: 'David', message: text }, ...dataMessage]);
        refComposer.current?.reset();
    };

    const a = useSharedValue(WIDTH_SCREEN);
    const opacity = useSharedValue(1);

    const animationStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: a.value }],
        };
    });

    const handleDonate = (gift: any) => {
        cancelAnimation(a);
        cancelAnimation(opacity);
        setLottieIcon(gift.icon);
        a.value = withSpring(0);
        a.value = withDelay(5000, withSpring(-WIDTH_SCREEN));
        opacity.value = withDelay(
            1000,
            withTiming(0, { duration: 5000 }, () => {
                opacity.value = 1;
                a.value = WIDTH_SCREEN;
            }),
        );
    };

    return (
        <View style={styles.container}>
            <LiveStreamPlayer status={status} onClose={onClose} connection={connection} />
            {status === Status.CONNECTED && (
                <>
                    <Animated.View style={[styles.sendItem, animationStyle]}>
                        <View style={styles.wrapGiftInfo}>
                            <Text style={[defaultStyle.subButton, { color: colors.light.White }]}>
                                {'Hoang Thuan send'}
                            </Text>
                            {Boolean(lottieIcon) && (
                                <View style={styles.wrapLottieAni}>
                                    <AnimatedLottieView
                                        autoPlay
                                        source={lottieIcon}
                                        style={styles.lottie}
                                    />
                                    <Text style={styles.countGift}>{'x 999'}</Text>
                                </View>
                            )}
                        </View>
                    </Animated.View>
                    <SwipeList dataMessage={dataMessage} onSend={onSend} iconBox={iconBox} />
                    <GiftListModal onDonate={handleDonate} data={data} />
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...defaultStyle.container,
    },
    sendItem: {
        position: 'absolute',
        top: HEIGHT_SCREEN / 2 - heightPixel(16),
        marginLeft: pixelSizeHorizontal(16),
    },
});
