import Pressable from '../components/Pressable';
import { colors } from '../constants/colors';
import { defaultStyle } from '../constants/defaultStyle';
import { fontPixel, heightPixel, widthPixel } from '../utils/scaling';
import React, { useImperativeHandle, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ReactNativeModal from 'react-native-modal';

export const refConfirmModal = React.createRef<{ open: () => void; close: () => void }>();
const ConfirmModal = () => {
    const [visible, setVisible] = useState(false);

    useImperativeHandle(refConfirmModal, () => ({
        open: () => setVisible(true),
        close: () => setVisible(false),
    }));
    return (
        <ReactNativeModal isVisible={visible} useNativeDriver hideModalContentWhileAnimating>
            <View style={styles.body}>
                <Text style={styles.content}>
                    {
                        'Your current balance is not enough and need to top up at least 9999 diamonds to complete the purchase'
                    }
                </Text>
                <View style={defaultStyle.flexRow}>
                    <Button name={'Cancel'} isOutLine onPress={() => setVisible(false)} />
                    <View style={{ width: widthPixel(8) }} />
                    <Button name={'Top-up'} onPress={() => setVisible(false)} />
                </View>
            </View>
        </ReactNativeModal>
    );
};

export default React.memo(ConfirmModal);

const styles = StyleSheet.create({
    btn: {
        borderRadius: fontPixel(10),
        borderWidth: 0.5,
        borderColor: colors.light.JAFFA,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: heightPixel(42),
        backgroundColor: colors.light.JAFFA,
    },
    outline: {
        borderWidth: 0.5,
        borderColor: colors.light.INDIGO,
        borderRadius: fontPixel(8),
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: heightPixel(42),
    },
    body: {
        backgroundColor: colors.light.White,
        padding: fontPixel(16),
        borderRadius: fontPixel(16),
    },
    content: {
        ...defaultStyle.subButton,
        color: colors.light.SHARK,
        marginBottom: heightPixel(16),
    },
});

const Button = ({ name, onPress, isOutLine = false }) => {
    return (
        <Pressable onPress={onPress} style={isOutLine ? styles.outline : styles.btn}>
            <Text
                style={[
                    defaultStyle.body,
                    { color: isOutLine ? colors.light.INDIGO : colors.light.White },
                ]}>
                {name}
            </Text>
        </Pressable>
    );
};
