import { useKeyboard } from '../hooks/useKeyboard';
import { widthPixel } from '../utils/scaling';
import AnimatedLottieView from 'lottie-react-native';
import React, { FC } from 'react';
import { Keyboard, Pressable, StyleSheet } from 'react-native';
import { refGiftModal } from './GiftListModal';
import { lottie_gift_box } from '../assets/lotties';

interface Props {
    source?: string | { uri: string };
}
const LottieBox: FC<Props> = ({ source = lottie_gift_box }) => {
    const { isShowKeyboard } = useKeyboard();
    const handlePress = () => {
        Keyboard.dismiss();
        setTimeout(
            () => {
                refGiftModal.current?.open();
            },
            isShowKeyboard ? 500 : 0,
        );
    };
    return (
        <Pressable onPress={handlePress} style={styles.lottie}>
            <AnimatedLottieView source={source} autoPlay loop style={styles.lottie} />
        </Pressable>
    );
};

export default React.memo(LottieBox);

const styles = StyleSheet.create({
    lottie: {
        width: widthPixel(40),
        height: widthPixel(40),
    },
});
