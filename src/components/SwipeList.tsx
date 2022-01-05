import { HEIGHT_SCREEN, WIDTH_SCREEN } from '../constants/spacing';
import { useKeyboard } from '../hooks/useKeyboard';
import React, { useEffect, useRef } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ChatList from './ChatList';

const SwipeList = ({ dataMessage, onSend, rightIconComposer, currentUserId }) => {
    const refFlatList = useRef<any>();
    const { isShowKeyboard } = useKeyboard();

    useEffect(() => {
        setTimeout(() => {
            refFlatList.current?.scrollToIndex({ index: 1 });
        }, 750);
    }, []);

    const renderItem = ({ item, index }) => {
        return (
            <View style={styles.item}>
                {item.key === 'first' ? null : (
                    <ChatList
                        currentUserId={currentUserId}
                        data={dataMessage}
                        onSend={onSend}
                        rightIconComposer={rightIconComposer}
                    />
                )}
            </View>
        );
    };
    return (
        <FlatList
            ref={refFlatList}
            renderItem={renderItem}
            keyExtractor={(item, index) => `${index}`}
            data={[{ key: 'first' }, { key: 'second' }]}
            pagingEnabled
            horizontal
            showsHorizontalScrollIndicator={false}
            onScrollToIndexFailed={e => {}}
            keyboardShouldPersistTaps={'handled'}
            scrollEnabled={!isShowKeyboard}
        />
    );
};

export default React.memo(SwipeList);

const styles = StyleSheet.create({
    item: {
        width: WIDTH_SCREEN,
        height: HEIGHT_SCREEN,
    },
});
