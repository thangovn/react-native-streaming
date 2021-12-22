"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultStyle = exports.fonts = void 0;
var scaling_1 = require("../utils/scaling");
var react_native_1 = require("react-native");
var colors_1 = require("./colors");
var spacing_1 = require("./spacing");
exports.fonts = {
    Medium: 'BeVietnam-Medium',
    Regular: 'BeVietnamPro-Regular',
    Bold: 'BeVietnamPro-Bold',
    SemiBold: 'BeVietnam-SemiBold',
    Italic: 'BeVietnam-Italic',
    ExtraBold: 'BeVietnam-ExtraBold',
};
exports.defaultStyle = react_native_1.StyleSheet.create({
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
        width: (0, scaling_1.widthPixel)(spacing_1.spacing.twentyFour),
        height: (0, scaling_1.widthPixel)(spacing_1.spacing.twentyFour),
    },
    icon_36: {
        width: (0, scaling_1.widthPixel)(36),
        height: (0, scaling_1.widthPixel)(36),
        borderRadius: (0, scaling_1.widthPixel)(18),
    },
    icon_12: {
        width: (0, scaling_1.widthPixel)(12),
        height: (0, scaling_1.widthPixel)(12),
    },
    shadow: {
        shadowColor: colors_1.colors.PINK_50,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    topShadow: {
        shadowColor: colors_1.colors.light.Black,
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
        backgroundColor: colors_1.colors.light.White,
    },
    subButton: {
        fontSize: (0, scaling_1.fontPixel)(12),
        lineHeight: (0, scaling_1.heightPixel)(17),
        fontFamily: exports.fonts.Regular,
        color: colors_1.colors.light.Black,
    },
    subButton2: {
        fontSize: (0, scaling_1.fontPixel)(12),
        lineHeight: (0, scaling_1.heightPixel)(15),
        fontFamily: exports.fonts.Bold,
        color: colors_1.colors.light.Black,
    },
    subButton3: {
        fontSize: (0, scaling_1.fontPixel)(12),
        lineHeight: (0, scaling_1.heightPixel)(15),
        fontFamily: exports.fonts.Regular,
        color: colors_1.colors.light.Black,
    },
    button2: {
        fontSize: (0, scaling_1.fontPixel)(16),
        lineHeight: (0, scaling_1.heightPixel)(20),
        fontFamily: exports.fonts.Regular,
        color: colors_1.colors.light.Black,
    },
    button1: {
        fontSize: (0, scaling_1.fontPixel)(16),
        lineHeight: (0, scaling_1.heightPixel)(20),
        fontFamily: exports.fonts.Bold,
        color: colors_1.colors.light.Black,
    },
    sub2: {
        fontSize: (0, scaling_1.fontPixel)(12),
        lineHeight: (0, scaling_1.heightPixel)(13),
        fontFamily: exports.fonts.Regular,
        color: colors_1.colors.light.Black,
    },
    sub1: {
        fontSize: (0, scaling_1.fontPixel)(10),
        lineHeight: (0, scaling_1.heightPixel)(13),
        fontFamily: exports.fonts.Bold,
        color: colors_1.colors.light.Black,
    },
    body: {
        fontSize: (0, scaling_1.fontPixel)(14),
        lineHeight: (0, scaling_1.heightPixel)(24),
        fontFamily: exports.fonts.Regular,
        color: colors_1.colors.light.Black,
    },
    title4: {
        fontSize: (0, scaling_1.fontPixel)(22),
        lineHeight: (0, scaling_1.heightPixel)(spacing_1.spacing.twentyFour),
        fontFamily: exports.fonts.Bold,
        color: colors_1.colors.light.Black,
    },
    title2: {
        fontSize: (0, scaling_1.fontPixel)(spacing_1.spacing.sixteen),
        lineHeight: (0, scaling_1.heightPixel)(spacing_1.spacing.twentyFour),
        fontFamily: exports.fonts.SemiBold,
        color: colors_1.colors.light.Black,
    },
    title1: {
        fontSize: (0, scaling_1.fontPixel)(14),
        lineHeight: (0, scaling_1.heightPixel)(24),
        fontFamily: exports.fonts.Bold,
        color: colors_1.colors.light.Black,
    },
    heading3: {
        fontSize: (0, scaling_1.fontPixel)(spacing_1.spacing.sixteen),
        lineHeight: (0, scaling_1.heightPixel)(spacing_1.spacing.twentyFour),
        fontFamily: exports.fonts.Bold,
        color: colors_1.colors.light.Black,
    },
    heading4: {
        fontSize: (0, scaling_1.fontPixel)(80),
        fontFamily: exports.fonts.Bold,
        color: colors_1.colors.light.Black,
    },
    heading2: {
        fontSize: (0, scaling_1.fontPixel)(spacing_1.spacing.eighteen),
        lineHeight: (0, scaling_1.heightPixel)(spacing_1.spacing.twentyEight),
        fontFamily: exports.fonts.Bold,
        color: colors_1.colors.light.Black,
    },
    heading1: {
        fontSize: (0, scaling_1.fontPixel)(24),
        lineHeight: (0, scaling_1.heightPixel)(30),
        fontFamily: exports.fonts.Bold,
        color: colors_1.colors.light.Black,
    },
    col: {
        flex: 1,
    },
    ph16: {
        paddingHorizontal: (0, scaling_1.pixelSizeHorizontal)(16),
    },
    mh16: {
        marginHorizontal: (0, scaling_1.pixelSizeHorizontal)(16),
    },
    labelInput: {
        fontSize: (0, scaling_1.fontPixel)(12),
        lineHeight: (0, scaling_1.heightPixel)(17),
        fontFamily: exports.fonts.Regular,
        color: colors_1.colors.light.DOVE_GRAY,
    },
    bg: { flex: 1, zIndex: 0, position: 'absolute', height: '100%', width: spacing_1.WIDTH_SCREEN },
});
