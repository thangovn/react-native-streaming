import { activateKeepAwake, deactivateKeepAwake } from '@sayem314/react-native-keep-awake';
import { debounce, get } from 'lodash';
import React, { FC, useEffect, useImperativeHandle, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ConnectionStateType, RtcLocalView } from 'react-native-tvn-host';
import AudienceView from './components/AudienceView';
import BroadCasterView from './components/BroadCasterView';
import ButtonHost from './components/ButtonHost';
import CardDashboard, { refCardDashboard } from './components/CardDashboard';
import { refChatList } from './components/ChatList';
import { refComposer } from './components/Composer';
import GiftFlag, { refGiftFlag } from './components/GiftFlag';
import GiftListModal from './components/GiftListModal';
import Header from './components/Header';
import HeaderHost from './components/HeaderHost';
import { LiveHeader } from './components/LiveHeader';
import SwipeList from './components/SwipeList';
import { colors } from './constants/colors';
import { defaultStyle } from './constants/defaultStyle';
import { HEIGHT_SCREEN, WIDTH_SCREEN } from './constants/spacing';
import { IGiftItem, IUserInfoSocketChat } from './dtos';
import { hocDtos, LiveStreamState } from './hoc/dtos';
import withAudienceStreaming from './hoc/withAudienceStreaming';
import withHostStreaming from './hoc/withHostLiveStreaming';
import { useWebSockets } from './hooks/useWebSockets';
import { alertOk } from './utils/alert';
import { fetchSignInKey } from './utils/signInKey';

export interface RNAudienceStreamingProps {
    onCloseStream: () => void;
    onReceiveGift: (gift: any) => void;
    giftData: IGiftItem[];
    rightIconComposer?: string | number;
    configLiveStream: {
        appId: string;
        channelName: string;
    };
    _userInfoSocketChat: IUserInfoSocketChat;
}
const RNAudienceStreaming: FC<RNAudienceStreamingProps & hocDtos & LiveStreamState> =
    withAudienceStreaming(props => {
        const {
            rightIconComposer,
            onCloseStream,
            onReceiveGift,
            giftData,
            configLiveStream: { appId, channelName },
            _userInfoSocketChat,
        } = props;

        const initial = async (app_id: string) => {
            await props.init(app_id);
            setTimeout(() => {
                props.startCall(channelName);
            }, 2000);
        };

        useEffect(() => {
            activateKeepAwake();
            return () => {
                deactivateKeepAwake();
            };
        }, []);

        useEffect(() => {
            fetchSignInKey(appId)
                .then(key => {
                    initial(key);
                })
                .catch();
        }, [appId]);

        const onClose = async () => {
            await props.endCall();
            setTimeout(() => {
                onCloseStream?.();
            }, 500);
        };

        const onSend = ({ text }) => {
            if (!text) return;
            send({ message: text });
            refComposer.current?.reset();
        };

        const handleDonate = (gift: IGiftItem) => {
            send_gift(gift);
        };

        const { send, messages, concurrent, send_gift } = useWebSockets({
            enabled:
                props.connectionState === ConnectionStateType.Connected &&
                Boolean(props.peerIds.length),
            _userInfo: _userInfoSocketChat,
            onReceiveGift,
        });

        return (
            <View style={defaultStyle.container}>
                {Boolean(props.errInit) ? (
                    <View style={styles.video}>
                        <Header
                            onPress={onClose}
                            concurrent={concurrent}
                            connection={props.connectionState}
                            peerIds={props.peerIds}
                        />
                        <Text style={styles.failText}>{props.errInit}</Text>
                    </View>
                ) : (
                    <AudienceView
                        onClose={onClose}
                        connection={props.connectionState}
                        concurrent={concurrent}
                        peerIds={props.peerIds}
                        channelName={channelName}
                    />
                )}
                {props.connectionState === ConnectionStateType.Connected &&
                    Boolean(props.peerIds.length) && (
                        <>
                            <SwipeList
                                currentUserId={_userInfoSocketChat.user_id}
                                dataMessage={messages}
                                onSend={onSend}
                                rightIconComposer={rightIconComposer}
                            />
                            <GiftListModal onDonate={handleDonate} data={giftData} />
                        </>
                    )}
            </View>
        );
    });

export interface RNBroadCasterStreamingProps {
    onBack: () => void;
    onReceiveGift: (gift: any) => void;
    configLiveStream: {
        appId: string;
        channelName: string;
        appSecondId: string;
    };
    _userInfoSocketChat: IUserInfoSocketChat;
    renderWaitingView?: () => JSX.Element;
    rightIconComposer?: any;
    liveStreamItem?: any;
    _onLiveNow: () => void;
    _onEndLive: () => void;
    disabledBtnHost?: boolean;
    isManualLive?: boolean;
    bgBtnHost?: string;
}

let timeout;

const refBroadCaster =
    React.createRef<{ startLive: ({ channel_id, uid }) => void; endLive: () => void }>();
const RNBroadCasterStreaming: FC<RNBroadCasterStreamingProps & hocDtos & LiveStreamState> =
    withHostStreaming(props => {
        const {
            configLiveStream: { appId, channelName, appSecondId },
            _userInfoSocketChat,
            onReceiveGift,
            renderWaitingView,
            rightIconComposer,
            onBack,
            liveStreamItem,
            _onLiveNow,
            _onEndLive,
            disabledBtnHost,
            isManualLive,
            bgBtnHost,
        } = props;

        const [countDown, setCountDown] = useState(3);

        const initial = async (app_id: string, appSecondId: string) => {
            await props.init(app_id, appSecondId);
            setTimeout(() => {
                props.initBeauty(appSecondId);
            }, 500);
        };

        useEffect(() => {
            activateKeepAwake();
            return () => {
                deactivateKeepAwake();
            };
        }, []);

        useEffect(() => {
            fetchSignInKey(appId)
                .then(key => {
                    initial(key, appSecondId);
                })
                .catch();
        }, [appId]);

        useEffect(() => {
            if (props.joinSucceed) {
                timeout = setTimeout(() => {
                    if (countDown === 0) {
                        clearTimeout(timeout);
                        return;
                    }
                    setCountDown(c => c - 1);
                }, 1000);
            } else {
                setCountDown(3);
            }

            return () => {
                clearTimeout(timeout);
            };
        }, [props.joinSucceed, countDown]);

        const onPressCamera = () => props.switchCamera();
        const onPressHelp = () => alertOk({ msg: 'onPressHelp' });
        const onPressShare = () => alertOk({ msg: 'onPressShare' });
        const onLiveNow = () => {
            if (isManualLive) {
                _onLiveNow(
                    refCardDashboard.current.watch('title'),
                    refCardDashboard.current.watch('description'),
                );
            } else {
                _onLiveNow();
            }
        };

        useImperativeHandle(refBroadCaster, () => ({
            startLive: debounce(({ channel_id, uid }) => props.startCall(channel_id, uid), 750),
            endLive: () => props.endCall(),
        }));

        const { send, messages, concurrent } = useWebSockets({
            enabled: true,
            _userInfo: _userInfoSocketChat,
            onReceiveGift,
        });

        const onSend = ({ text }) => {
            if (!text) return;
            send({ message: text });
            refComposer.current?.reset();
        };

        return (
            <View style={defaultStyle.container}>
                {Boolean(props.errInit) ? (
                    <View style={styles.video}>
                        <Text style={styles.failText}>{props.errInit}</Text>
                    </View>
                ) : (
                    <BroadCasterView
                        joinSucceed={props.initSuccess}
                        renderWaitingView={renderWaitingView}
                        channelName={channelName}
                        thumbnail={get(liveStreamItem, 'thumbnail', '')}
                    />
                )}
                <RtcLocalView.RTCTVNBeautyButtonView
                    style={{
                        position: 'absolute',
                        zIndex: 9999999999,
                        width: WIDTH_SCREEN,
                        height: HEIGHT_SCREEN / 1.8,
                    }}>
                    {props.joinSucceed ? (
                        countDown === 0 ? (
                            <LiveHeader
                                onPressEndLive={_onEndLive}
                                onPressCamera={onPressCamera}
                                concurrent={concurrent}
                                joinSucceed={props.joinSucceed}
                            />
                        ) : (
                            <View style={styles.wrapCountDown}>
                                <Text style={styles.countDown}>{countDown}</Text>
                            </View>
                        )
                    ) : (
                        <>
                            <HeaderHost
                                onBack={onBack}
                                rightComponent={[
                                    {
                                        icon: 'share-social-outline',
                                        onPress: onPressShare,
                                    },
                                    {
                                        icon: 'help-circle-outline',
                                        onPress: onPressHelp,
                                    },
                                ]}
                            />
                            <View style={styles.body}>
                                <CardDashboard
                                    title={get(liveStreamItem, 'title', '')}
                                    description={get(liveStreamItem, 'description', '')}
                                    status={get(liveStreamItem, 'status', '')}
                                    isManualLive={isManualLive}
                                />
                            </View>
                        </>
                    )}
                </RtcLocalView.RTCTVNBeautyButtonView>
                {props.joinSucceed ? (
                    <SwipeList
                        currentUserId={_userInfoSocketChat.user_id}
                        dataMessage={messages}
                        onSend={onSend}
                        rightIconComposer={rightIconComposer}
                    />
                ) : (
                    <ButtonHost
                        backgroundColor={bgBtnHost}
                        name={'Live Now'}
                        onPress={onLiveNow}
                        disabled={disabledBtnHost || Boolean(props.errInit)}
                    />
                )}
            </View>
        );
    });

const styles = StyleSheet.create({
    body: {},
    countDown: {
        ...defaultStyle.heading4,
        color: colors.WHITE,
        textAlign: 'center',
    },
    wrapCountDown: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.BLACK_30,
        width: WIDTH_SCREEN,
        height: HEIGHT_SCREEN,
        position: 'absolute',
    },
    failText: {
        ...defaultStyle.button2,
        color: colors.light.White,
    },
    video: {
        position: 'absolute',
        width: WIDTH_SCREEN,
        height: HEIGHT_SCREEN,
        backgroundColor: colors.light.MIRAGE,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export {
    withAudienceStreaming,
    withHostStreaming,
    SwipeList,
    GiftFlag,
    useWebSockets,
    AudienceView,
    refChatList,
    refComposer,
    refGiftFlag,
    GiftListModal,
    RNAudienceStreaming,
    RNBroadCasterStreaming,
    refBroadCaster,
};
