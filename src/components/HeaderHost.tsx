import { IconButton } from './IconButton';
import { colors } from '../constants/colors';
import { defaultStyle } from '../constants/defaultStyle';
import { spacing } from '../constants/spacing';
import { pixelSizeHorizontal, pixelSizeVertical, widthPixel } from '../utils/scaling';
import React, { FC } from 'react';
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
    centerName?: string;
    leftComponent?: () => JSX.Element;
    rightComponent?: { icon: string; onPress: () => void; tintColor?: string }[] | Function;
    onPressSearch?: () => void;
    edges?: Edge;
    centerTextStyle?: TextStyle;
    itemStyle?: ViewStyle;
    containerStyle?: ViewStyle;
    centerStyle?: ViewStyle;
    leftViewStyle?: ViewStyle;
    tintColorLeftIcon?: string;
    onBack?: () => void;
}
const HeaderHost: FC<Props> = ({
    centerName,
    leftComponent,
    rightComponent,
    onPressSearch,
    edges = 'top',
    centerTextStyle,
    itemStyle,
    containerStyle,
    centerStyle,
    leftViewStyle,
    tintColorLeftIcon,
    onBack,
}) => {
    return (
        <SafeAreaView edges={[edges]} style={[styles.contain, containerStyle]}>
            <View style={[styles.leftView, leftViewStyle]}>
                {Boolean(leftComponent) ? (
                    leftComponent()
                ) : (
                    <IconButton
                        iconVector={'chevron-back-outline'}
                        onPress={onBack}
                        tintColor={tintColorLeftIcon}
                    />
                )}
            </View>
            {centerName && (
                <View style={[styles.center, centerStyle]}>
                    <Text style={[styles.centerName, centerTextStyle]}>{centerName}</Text>
                </View>
            )}
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                {typeof rightComponent === 'function' ? (
                    rightComponent()
                ) : Array.isArray(rightComponent) ? (
                    <View style={defaultStyle.flexRow}>
                        {rightComponent.map((item, i) => (
                            <Item
                                key={i}
                                onPress={item.onPress}
                                icon={item.icon}
                                tintColor={item.tintColor}
                                containerStyle={[styles.containerStyle, itemStyle]}
                            />
                        ))}
                    </View>
                ) : (
                    <Item onPress={onPressSearch} icon={'search-outline'} />
                )}
            </View>
        </SafeAreaView>
    );
};

export default React.memo(HeaderHost);

const styles = StyleSheet.create({
    leftView: {
        flex: 1,
        alignItems: 'flex-start',
    },
    centerName: {
        ...defaultStyle.heading2,
        textAlign: 'center',
    },
    contain: {
        ...defaultStyle.flexRow,
        justifyContent: 'space-between',
        paddingHorizontal: pixelSizeHorizontal(spacing.sixteen),
        paddingVertical: pixelSizeVertical(spacing.ten),
    },
    center: {
        flex: 1,
        marginHorizontal: pixelSizeHorizontal(8),
        alignItems: 'center',
    },
    containerStyle: {
        marginLeft: widthPixel(spacing.twenty),
    },
});

interface IItem {
    onPress: () => void;
    icon: string;
    tintColor?: string;
    containerStyle?: ViewStyle | any;
}

export const Item: FC<IItem> = ({ onPress, icon, tintColor = colors.WHITE, containerStyle }) => {
    return (
        <Icon
            name={icon}
            size={widthPixel(28)}
            color={tintColor}
            onPress={onPress}
            style={{ marginLeft: widthPixel(8) }}
        />
    );
};
