"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var spacing_1 = require("../constants/spacing");
var useKeyboard_1 = require("../hooks/useKeyboard");
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var ChatList_1 = __importDefault(require("./ChatList"));
var SwipeList = function (_a) {
    var dataMessage = _a.dataMessage, onSend = _a.onSend, rightIconComposer = _a.rightIconComposer, currentUserId = _a.currentUserId;
    var refFlatList = (0, react_1.useRef)();
    var isShowKeyboard = (0, useKeyboard_1.useKeyboard)().isShowKeyboard;
    (0, react_1.useEffect)(function () {
        setTimeout(function () {
            var _a;
            (_a = refFlatList.current) === null || _a === void 0 ? void 0 : _a.scrollToIndex({ index: 1 });
        }, 750);
    }, []);
    var renderItem = function (_a) {
        var item = _a.item, index = _a.index;
        return (react_1.default.createElement(react_native_1.View, { style: styles.item }, item.key === 'first' ? null : (react_1.default.createElement(ChatList_1.default, { currentUserId: currentUserId, data: dataMessage, onSend: onSend, rightIconComposer: rightIconComposer }))));
    };
    return (react_1.default.createElement(react_native_1.FlatList, { ref: refFlatList, renderItem: renderItem, keyExtractor: function (item, index) { return "".concat(index); }, data: [{ key: 'first' }, { key: 'second' }], style: { position: 'absolute', width: '100%', height: '100%' }, pagingEnabled: true, horizontal: true, showsHorizontalScrollIndicator: false, onScrollToIndexFailed: function (e) { }, keyboardShouldPersistTaps: 'handled', scrollEnabled: !isShowKeyboard }));
};
exports.default = react_1.default.memo(SwipeList);
var styles = react_native_1.StyleSheet.create({
    item: {
        width: spacing_1.WIDTH_SCREEN,
        height: spacing_1.HEIGHT_SCREEN,
    },
});
