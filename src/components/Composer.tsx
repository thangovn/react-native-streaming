import React, { FC, useImperativeHandle } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Platform, Pressable, StyleSheet, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../constants/colors';
import { defaultStyle } from '../constants/defaultStyle';
import { fontPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel } from '../utils/scaling';
import LottieBox from './LottieBox';

interface Props {
    onSend: ({ text }: { text: string }) => void;
    source: string | number | any;
}

export const refComposer = React.createRef<any>();
const Composer: FC<Props> = ({ onSend, source }) => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<any>();

    useImperativeHandle(refComposer, () => ({
        reset,
    }));
    return (
        <View style={styles.contain}>
            <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                    <View style={styles.wrapInput}>
                        <TextInput
                            autoCorrect={false}
                            placeholder={'Say hello~~'}
                            style={styles.input}
                            onChangeText={onChange}
                            value={value}
                            multiline
                            placeholderTextColor={colors.light.Black}
                        />
                        <Pressable
                            hitSlop={{
                                top: widthPixel(20),
                                bottom: widthPixel(20),
                                right: widthPixel(20),
                                left: widthPixel(20),
                            }}
                            onPress={handleSubmit(onSend)}
                            style={{ zIndex: 999 }}>
                            <Icon
                                name="send-outline"
                                size={widthPixel(20)}
                                color={colors.light.Black}
                            />
                        </Pressable>
                    </View>
                )}
                name="text"
                defaultValue=""
            />

            <LottieBox source={source} />
        </View>
    );
};

export default React.memo(Composer);

const styles = StyleSheet.create({
    wrapInput: {
        ...defaultStyle.spaceBetween,
        backgroundColor: colors.light.Zircon_2,
        borderRadius: fontPixel(16),
        flex: 0.9,
        paddingVertical: pixelSizeVertical(4),
        paddingHorizontal: pixelSizeHorizontal(8),
    },
    input: {
        flex: 1,
        color: colors.light.SHARK,
        ...Platform.select({
            android: {
                padding: 0,
            },
        }),
        maxHeight: 100,
    },
    contain: {
        ...defaultStyle.flexRow,
        justifyContent: 'space-between',
    },
});
