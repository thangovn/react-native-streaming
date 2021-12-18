import { debounce } from 'lodash';
import React, { FC, useImperativeHandle, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Pressable from '../components/Pressable';
import { colors } from '../constants/colors';
import { defaultStyle } from '../constants/defaultStyle';
import { IGiftItem } from '../dtos';
import { GiftType } from '../enums/giftType';
import {
    fontPixel,
    heightPixel,
    pixelSizeHorizontal,
    pixelSizeVertical,
    widthPixel,
} from '../utils/scaling';
import ConfirmModal, { refConfirmModal } from './ConfirmModal';
import GiftItem from './GiftItem';

export interface IGiftListModal {
    data: IGiftItem[];
    onDonate: (giftItem: IGiftItem) => void;
}

export const refGiftModal = React.createRef<{ open: () => void; close: () => void }>();
const GiftListModal: FC<IGiftListModal> = ({ data = [], onDonate }) => {
    const [visible, setVisible] = useState(false);

    useImperativeHandle(refGiftModal, () => ({
        open: () => setVisible(true),
        close: () => setVisible(false),
    }));

    const [currentGift, setCurrentGift] = useState<IGiftItem>(null);

    const renderGiftItem = ({ item, index }: { item: IGiftItem; index: number }) => {
        return (
            <GiftItem
                isGIF={item.gift_type === GiftType.GIF}
                giftQuantity={item.quantity_remain}
                icon={item.resource}
                name={item.name}
                currency={item.coin}
                onPress={() => onPressGiftItem(item)}
                hasPicked={item?.id === currentGift?.id}
            />
        );
    };

    const onPressGiftItem = (item: IGiftItem) => {
        setCurrentGift(item);
        a.value = withTiming(0, { duration: 500 });
    };

    const onBackdrop = () => {
        setVisible(false);
        setCurrentGift(null);
    };

    const pressDonate = debounce(() => {
        if (!currentGift) {
            a.value = withTiming(1, { duration: 500 });
            return;
        }
        if (!currentGift.quantity_remain) {
            onDonate?.(currentGift);
            setVisible(false);
            setCurrentGift(null);
        } else {
            refConfirmModal.current?.open();
        }
    }, 500);

    const a = useSharedValue(0);

    const aniStyle = useAnimatedStyle(() => {
        return {
            opacity: a.value,
        };
    });

    return (
        <ReactNativeModal
            isVisible={visible}
            style={styles.modal}
            onBackdropPress={onBackdrop}
            backdropOpacity={0}
            useNativeDriver
            hideModalContentWhileAnimating
            animationOutTiming={500}>
            <View style={styles.body}>
                <FlatList
                    numColumns={4}
                    renderItem={renderGiftItem}
                    keyExtractor={(item, index) => `${index}`}
                    data={data}
                />
                <View style={styles.wrapWallet}>
                    <View style={defaultStyle.flexRow}>
                        <Icon name={'gem'} />
                        <Text style={defaultStyle.subButton2}>{' 1500 $'}</Text>
                    </View>
                    <Animated.Text style={[styles.alertGift, aniStyle]}>
                        {'Please choose a gift!'}
                    </Animated.Text>
                    <Pressable style={styles.wrapDonate} onPress={pressDonate}>
                        <Text style={styles.donateText}>{'Donate'}</Text>
                    </Pressable>
                </View>
                <ConfirmModal />
            </View>
        </ReactNativeModal>
    );
};

export default React.memo(GiftListModal);

const styles = StyleSheet.create({
    donateText: {
        ...defaultStyle.subButton,
        color: colors.light.White,
    },
    body: {
        backgroundColor: colors.light.White,
        padding: fontPixel(16),
        borderTopLeftRadius: fontPixel(16),
        borderTopRightRadius: fontPixel(16),
    },
    modal: {
        margin: 0,
        justifyContent: 'flex-end',
    },
    wrapWallet: {
        ...defaultStyle.spaceBetween,
        marginVertical: heightPixel(16),
    },
    wrapDonate: {
        backgroundColor: colors.light.INDIGO,
        borderRadius: fontPixel(16),
        paddingHorizontal: pixelSizeHorizontal(8),
        paddingVertical: pixelSizeVertical(4),
    },
    box: {
        zIndex: 99999,
        width: widthPixel(50),
        height: widthPixel(50),
        // backgroundColor: 'red',
        position: 'absolute',
    },
    alertGift: {
        ...defaultStyle.subButton2,
        color: colors.light.Badge,
    },
});
