import { HEIGHT_SCREEN, WIDTH_SCREEN } from '../constants/spacing';
import { useKeyboard } from '../hooks/useKeyboard';
import React, { useEffect, useRef } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ChatList from './ChatList';
var SwipeList = function (_a) {
    var dataMessage = _a.dataMessage, onSend = _a.onSend, rightIconComposer = _a.rightIconComposer, currentUserId = _a.currentUserId;
    var refFlatList = useRef();
    var isShowKeyboard = useKeyboard().isShowKeyboard;
    useEffect(function () {
        setTimeout(function () {
            var _a;
            (_a = refFlatList.current) === null || _a === void 0 ? void 0 : _a.scrollToIndex({ index: 1 });
        }, 750);
    }, []);
    var renderItem = function (_a) {
        var item = _a.item, index = _a.index;
        return (React.createElement(View, { style: styles.item }, item.key === 'first' ? null : (React.createElement(ChatList, { currentUserId: currentUserId, data: dataMessage, onSend: onSend, rightIconComposer: rightIconComposer }))));
    };
    return (React.createElement(FlatList, { ref: refFlatList, renderItem: renderItem, keyExtractor: function (item, index) { return "".concat(index); }, data: [{ key: 'first' }, { key: 'second' }], style: { position: 'absolute', width: '100%', height: '100%' }, pagingEnabled: true, horizontal: true, showsHorizontalScrollIndicator: false, onScrollToIndexFailed: function (e) { }, keyboardShouldPersistTaps: 'handled', scrollEnabled: !isShowKeyboard }));
};
export default React.memo(SwipeList);
var styles = StyleSheet.create({
    item: {
        width: WIDTH_SCREEN,
        height: HEIGHT_SCREEN,
    },
});
