import React, { useImperativeHandle } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { colors } from '../constants/colors';
import { defaultStyle } from '../constants/defaultStyle';
import {
    fontPixel,
    heightPixel,
    pixelSizeHorizontal,
    pixelSizeVertical,
    widthPixel,
} from '../utils/scaling';

export const refCardDashboard = React.createRef<{ watch: (key: any) => void }>();
const CardDashboard = ({ title = 'N/A', description = '', status, isManualLive }) => {
    const {
        control,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm<any>();

    useImperativeHandle(refCardDashboard, () => ({
        watch,
    }));
    return (
        <View style={styles.container}>
            {isManualLive ? (
                <>
                    <Controller
                        name="title"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                placeholder={'Title...'}
                                style={styles.input}
                                placeholderTextColor={colors.light.DUSTY_GRAY}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />
                    <Controller
                        name="description"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                placeholder={'Description...'}
                                placeholderTextColor={colors.light.DUSTY_GRAY}
                                style={styles.input}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />
                </>
            ) : (
                <>
                    <Text style={styles.input}>{`Title: ${title}`}</Text>
                    <Text style={styles.input}>{`Description: ${description}`}</Text>
                    <Text style={styles.input}>{`Status: ${status}`}</Text>
                </>
            )}
        </View>
    );
};

export default React.memo(CardDashboard);

const styles = StyleSheet.create({
    img: {
        width: widthPixel(56),
        height: widthPixel(56),
        borderRadius: fontPixel(10),
    },
    container: {
        backgroundColor: colors.light.INDIGO_80,
        padding: fontPixel(8),
        marginHorizontal: pixelSizeHorizontal(16),
        marginTop: pixelSizeVertical(6),
        borderRadius: fontPixel(4),
    },
    wrapRight: {
        marginHorizontal: fontPixel(8),
    },
    input: {
        ...defaultStyle.button2,
        color: colors.WHITE,
        marginVertical: heightPixel(8),
    },
});
