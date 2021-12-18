import { colors } from '../constants/colors';
import { defaultStyle } from '../constants/defaultStyle';
import { WIDTH_SCREEN } from '../constants/spacing';
import {
    fontPixel,
    heightPixel,
    pixelSizeHorizontal,
    pixelSizeVertical,
    widthPixel,
} from '../utils/scaling';
import AnimatedLottieView from 'lottie-react-native';
import React, { useEffect, useRef, useState } from 'react';
import { InteractionManager, Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FastImage from 'react-native-fast-image';

const GiftItem = ({ icon, name, currency, onPress, hasPicked, giftQuantity, isGIF }) => {
    const ref = useRef<any>();
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const interactionPromise = InteractionManager.runAfterInteractions(() =>
            setTimeout(() => {
                ref.current?.play();
            }, 1000),
        );
        return () => interactionPromise.cancel();
    }, []);

    const onPressMinus = () => {
        if (quantity === 1) return;
        if (quantity === 99) {
            setQuantity(9);
        }
        if (quantity === 9) {
            setQuantity(1);
        }
    };

    const onPressPlus = () => {
        if (quantity === 1) {
            setQuantity(9);
        }
        if (quantity === 9) {
            setQuantity(99);
        }
    };

    const borderColor = hasPicked ? colors.light.INDIGO : colors.light.TRANSPARENT;
    return (
        <Pressable style={[styles.item, { borderColor }]} onPress={onPress}>
            {isGIF ? (
                <FastImage
                    source={{ uri: icon }}
                    style={hasPicked ? styles.icPicked : styles.icon}
                    resizeMode={'contain'}
                />
            ) : (
                <AnimatedLottieView
                    ref={ref}
                    source={icon}
                    autoSize
                    style={hasPicked ? styles.icPicked : styles.icon}
                />
            )}

            {Boolean(giftQuantity) && <GiftBadge count={giftQuantity} />}
            {hasPicked ? (
                <View style={styles.wrapPicked}>
                    <Text style={defaultStyle.sub1}>{currency}</Text>
                    <View style={styles.wrapActionBtn}>
                        <Icon
                            name={'minus-circle'}
                            color={quantity === 1 ? colors.light.DOVE_GRAY : colors.light.INDIGO}
                            onPress={onPressMinus}
                        />
                        <Text style={defaultStyle.sub1}>{quantity}</Text>
                        <Icon
                            name={'plus-circle'}
                            color={quantity === 99 ? colors.light.DOVE_GRAY : colors.light.INDIGO}
                            onPress={onPressPlus}
                        />
                    </View>
                </View>
            ) : (
                <View style={styles.wrapInfoItem}>
                    <Text style={defaultStyle.subButton}>{name}</Text>
                    <Text style={defaultStyle.sub1}>{currency}</Text>
                </View>
            )}
        </Pressable>
    );
};

export default React.memo(GiftItem);

const styles = StyleSheet.create({
    item: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderRadius: fontPixel(10),
        position: 'relative',
        width: WIDTH_SCREEN / 4 - widthPixel(8),
        height: WIDTH_SCREEN / 4 - widthPixel(8),
        marginVertical: pixelSizeVertical(8),
    },
    icon: {
        width: widthPixel(48),
        height: heightPixel(48),
    },
    icPicked: {
        width: widthPixel(60),
        height: heightPixel(60),
        position: 'absolute',
        top: heightPixel(-4),
    },
    wrapInfoItem: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: heightPixel(8),
    },
    wrapPicked: {
        justifyContent: 'flex-end',
        flex: 1,
        width: '100%',
        alignItems: 'center',
        padding: fontPixel(8),
    },
    wrapActionBtn: {
        ...defaultStyle.spaceBetween,
        width: '100%',
    },
    giftBadge: {
        backgroundColor: 'red',
        position: 'absolute',
        top: heightPixel(4),
        right: widthPixel(10),
        paddingHorizontal: pixelSizeHorizontal(4),
        borderRadius: fontPixel(4),
    },
    countText: {
        ...defaultStyle.sub1,
        color: colors.light.White,
    },
});

const GiftBadge = ({ count }) => {
    return (
        <View style={styles.giftBadge}>
            <Text style={styles.countText}>{count}</Text>
        </View>
    );
};
