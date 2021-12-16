import { fontPixel, widthPixel, heightPixel, pixelSizeHorizontal } from '../utils/scaling';
import { StyleSheet } from 'react-native';
import { colors } from './colors';
import { HEIGHT_SCREEN, spacing, WIDTH_SCREEN } from './spacing';

export const fonts = {
    Medium: 'BeVietnam-Medium',
    Regular: 'BeVietnamPro-Regular',
    Bold: 'BeVietnamPro-Bold',
    SemiBold: 'BeVietnam-SemiBold',
    Italic: 'BeVietnam-Italic',
    ExtraBold: 'BeVietnam-ExtraBold',
};

export const defaultStyle = StyleSheet.create({
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    spaceBetween: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    icon_24: {
        width: widthPixel(spacing.twentyFour),
        height: widthPixel(spacing.twentyFour),
    },
    icon_12: {
        width: widthPixel(12),
        height: widthPixel(12),
    },
    shadow: {
        shadowColor: colors.PINK_50,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    topShadow: {
        shadowColor: colors.light.Black,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        borderWidth: 0,
    },
    container: {
        flex: 1,
        backgroundColor: colors.light.White,
    },
    subButton: {
        fontSize: fontPixel(12),
        lineHeight: heightPixel(17),
        fontFamily: fonts.Regular,
        color: colors.light.Black,
    },
    subButton2: {
        fontSize: fontPixel(12),
        lineHeight: heightPixel(15),
        fontFamily: fonts.Bold,
        color: colors.light.Black,
    },
    subButton3: {
        fontSize: fontPixel(12),
        lineHeight: heightPixel(15),
        fontFamily: fonts.Regular,
        color: colors.light.Black,
    },
    button2: {
        fontSize: fontPixel(16),
        lineHeight: heightPixel(20),
        fontFamily: fonts.Regular,
        color: colors.light.Black,
    },
    button1: {
        fontSize: fontPixel(16),
        lineHeight: heightPixel(20),
        fontFamily: fonts.Bold,
        color: colors.light.Black,
    },
    sub2: {
        fontSize: fontPixel(12),
        lineHeight: heightPixel(13),
        fontFamily: fonts.Regular,
        color: colors.light.Black,
    },
    sub1: {
        fontSize: fontPixel(10),
        lineHeight: heightPixel(13),
        fontFamily: fonts.Bold,
        color: colors.light.Black,
    },
    body: {
        fontSize: fontPixel(14),
        lineHeight: heightPixel(24),
        fontFamily: fonts.Regular,
        color: colors.light.Black,
    },
    title4: {
        fontSize: fontPixel(22),
        lineHeight: heightPixel(spacing.twentyFour),
        fontFamily: fonts.Bold,
        color: colors.light.Black,
    },
    title2: {
        fontSize: fontPixel(spacing.sixteen),
        lineHeight: heightPixel(spacing.twentyFour),
        fontFamily: fonts.SemiBold,
        color: colors.light.Black,
    },
    title1: {
        fontSize: fontPixel(14),
        lineHeight: heightPixel(24),
        fontFamily: fonts.Bold,
        color: colors.light.Black,
    },
    heading3: {
        fontSize: fontPixel(spacing.sixteen),
        lineHeight: heightPixel(spacing.twentyFour),
        fontFamily: fonts.Bold,
        color: colors.light.Black,
    },
    heading4: {
        fontSize: fontPixel(80),
        fontFamily: fonts.Bold,
        color: colors.light.Black,
    },
    heading2: {
        fontSize: fontPixel(spacing.eighteen),
        lineHeight: heightPixel(spacing.twentyEight),
        fontFamily: fonts.Bold,
        color: colors.light.Black,
    },
    heading1: {
        fontSize: fontPixel(24),
        lineHeight: heightPixel(30),
        fontFamily: fonts.Bold,
        color: colors.light.Black,
    },
    col: {
        flex: 1,
    },
    ph16: {
        paddingHorizontal: pixelSizeHorizontal(16),
    },
    mh16: {
        marginHorizontal: pixelSizeHorizontal(16),
    },
    labelInput: {
        fontSize: fontPixel(12),
        lineHeight: heightPixel(17),
        fontFamily: fonts.Regular,
        color: colors.light.DOVE_GRAY,
    },
    bg: { flex: 1, zIndex: 0, position: 'absolute', height: '100%', width: WIDTH_SCREEN },
});
