var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { refComposer } from './components/Composer';
import GiftListModal from './components/GiftListModal';
import { ConnectionStateType } from 'react-native-agora';
import { useWebSockets } from './hooks/useWebSockets';
import GiftFlag, { refGiftFlag } from './components/GiftFlag';
import SwipeList from './components/SwipeList';
import withAudienceStreaming from './hoc/withAudienceStreaming';
import withHostStreaming from './hoc/withHostLiveStreaming';
import AudienceView from './components/AudienceView';
import { refChatList } from './components/ChatList';
import { defaultStyle } from './constants/defaultStyle';
import BroadCasterView from './components/BroadCasterView';
import ButtonHost from './components/ButtonHost';
import HeaderHost from './components/HeaderHost';
import CardDashboard from './components/CardDashboard';
import { LiveHeader } from './components/LiveHeader';
import { colors } from './constants/colors';
import { HEIGHT_SCREEN, WIDTH_SCREEN } from './constants/spacing';
import { alertOk, alertYesNo } from './utils/alert';
import { fetchSignInKey } from './utils/signInKey';
import Header from './components/Header';
var RNAudienceStreaming = withAudienceStreaming(function (props) {
    var rightIconComposer = props.rightIconComposer, onCloseStream = props.onCloseStream, onReceiveGift = props.onReceiveGift, giftData = props.giftData, _a = props.configLiveStream, appId = _a.appId, channelName = _a.channelName, _userInfoSocketChat = props._userInfoSocketChat;
    var initial = function (app_id) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, props.init(app_id)];
                case 1:
                    _a.sent();
                    setTimeout(function () {
                        props.startCall(channelName);
                    }, 2000);
                    return [2 /*return*/];
            }
        });
    }); };
    useEffect(function () {
        fetchSignInKey(appId)
            .then(function (key) {
            initial(key);
        })
            .catch();
    }, [appId]);
    var onClose = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, props.endCall()];
                case 1:
                    _a.sent();
                    setTimeout(function () {
                        onCloseStream === null || onCloseStream === void 0 ? void 0 : onCloseStream();
                    }, 500);
                    return [2 /*return*/];
            }
        });
    }); };
    var onSend = function (_a) {
        var _b;
        var text = _a.text;
        if (!text)
            return;
        send({ message: text });
        (_b = refComposer.current) === null || _b === void 0 ? void 0 : _b.reset();
    };
    var handleDonate = function (gift) {
        send_gift(gift);
    };
    var _b = useWebSockets({
        enabled: props.connectionState === ConnectionStateType.Connected &&
            Boolean(props.peerIds.length),
        _userInfo: _userInfoSocketChat,
        onReceiveGift: onReceiveGift,
    }), send = _b.send, messages = _b.messages, concurrent = _b.concurrent, send_gift = _b.send_gift;
    return (React.createElement(View, { style: defaultStyle.container },
        Boolean(props.errInit) ? (React.createElement(View, { style: styles.video },
            React.createElement(Header, { onPress: onClose, concurrent: concurrent, connection: props.connectionState, peerIds: props.peerIds }),
            React.createElement(Text, { style: styles.failText }, props.errInit))) : (React.createElement(AudienceView, { onClose: onClose, connection: props.connectionState, concurrent: concurrent, peerIds: props.peerIds, channelName: channelName })),
        props.connectionState === ConnectionStateType.Connected &&
            Boolean(props.peerIds.length) && (React.createElement(React.Fragment, null,
            React.createElement(SwipeList, { currentUserId: _userInfoSocketChat.user_id, dataMessage: messages, onSend: onSend, rightIconComposer: rightIconComposer }),
            React.createElement(GiftListModal, { onDonate: handleDonate, data: giftData })))));
});
var timeout;
var RNBroadCasterStreaming = withHostStreaming(function (props) {
    var _a = props.configLiveStream, appId = _a.appId, channelName = _a.channelName, _userInfoSocketChat = props._userInfoSocketChat, onReceiveGift = props.onReceiveGift, onSelectGame = props.onSelectGame, onPressAvatar = props.onPressAvatar, cardName = props.cardName, imageUrl = props.imageUrl, renderWaitingView = props.renderWaitingView, rightIconComposer = props.rightIconComposer, uid = props.uid, onBack = props.onBack, channelLive = props.channelLive;
    var _b = useState(3), countDown = _b[0], setCountDown = _b[1];
    var initial = function (app_id) {
        setTimeout(function () {
            props.init(app_id);
        }, 100);
    };
    useEffect(function () {
        fetchSignInKey(appId)
            .then(function (key) {
            initial(key);
        })
            .catch();
    }, [appId]);
    useEffect(function () {
        if (props.joinSucceed) {
            timeout = setTimeout(function () {
                if (countDown === 0) {
                    clearTimeout(timeout);
                    return;
                }
                setCountDown(function (c) { return c - 1; });
            }, 1000);
        }
        else {
            setCountDown(3);
        }
        return function () {
            clearTimeout(timeout);
        };
    }, [props.joinSucceed, countDown]);
    var onPressCamera = function () { return props.switchCamera(); };
    var onPressHelp = function () { return alertOk({ msg: 'onPressHelp' }); };
    var onPressShare = function () { return alertOk({ msg: 'onPressShare' }); };
    var onLiveNow = function () {
        props.startCall(channelName, uid);
    };
    var onPressEndLive = function () {
        alertYesNo({
            msg: 'Are you sure to end live?',
            onPressAccept: function () { return props.endCall(); },
        });
    };
    var _c = useWebSockets({
        enabled: true,
        _userInfo: _userInfoSocketChat,
        onReceiveGift: onReceiveGift,
    }), send = _c.send, messages = _c.messages, concurrent = _c.concurrent;
    var onSend = function (_a) {
        var _b;
        var text = _a.text;
        if (!text)
            return;
        send({ message: text });
        (_b = refComposer.current) === null || _b === void 0 ? void 0 : _b.reset();
    };
    return (React.createElement(View, { style: defaultStyle.container },
        Boolean(props.errInit) ? (React.createElement(View, { style: styles.video },
            React.createElement(Text, { style: styles.failText }, props.errInit))) : (React.createElement(BroadCasterView, { joinSucceed: props.joinSucceed, renderWaitingView: renderWaitingView, channelName: channelName })),
        props.joinSucceed ? (countDown === 0 ? (React.createElement(React.Fragment, null,
            React.createElement(LiveHeader, { onPressEndLive: onPressEndLive, onPressCamera: onPressCamera, concurrent: concurrent, joinSucceed: props.joinSucceed }),
            React.createElement(SwipeList, { currentUserId: _userInfoSocketChat.user_id, dataMessage: messages, onSend: onSend, rightIconComposer: rightIconComposer }))) : (React.createElement(View, { style: styles.wrapCountDown },
            React.createElement(Text, { style: styles.countDown }, countDown)))) : (React.createElement(React.Fragment, null,
            React.createElement(HeaderHost, { onBack: onBack, rightComponent: [
                    {
                        icon: 'share-social-outline',
                        onPress: onPressShare,
                    },
                    {
                        icon: 'help-circle-outline',
                        onPress: onPressHelp,
                    },
                ] }),
            React.createElement(View, { style: styles.body },
                React.createElement(CardDashboard, { channelLive: channelLive, onSelectGame: onSelectGame, nameGame: cardName, url: imageUrl ||
                        'https://cdn.pixabay.com/photo/2021/11/10/18/09/casino-6784520_960_720.jpg' }),
                React.createElement(ButtonHost, { name: 'Live Now', onPress: onLiveNow, disabled: Boolean(props.errInit) }))))));
});
var styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'space-between',
        zIndex: 999,
    },
    countDown: __assign(__assign({}, defaultStyle.heading4), { color: colors.WHITE, textAlign: 'center' }),
    wrapCountDown: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.BLACK_30,
        width: WIDTH_SCREEN,
        height: HEIGHT_SCREEN,
        position: 'absolute',
    },
    failText: __assign(__assign({}, defaultStyle.button2), { color: colors.light.White }),
    video: {
        position: 'absolute',
        width: WIDTH_SCREEN,
        height: HEIGHT_SCREEN,
        backgroundColor: colors.light.MIRAGE,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
export { withAudienceStreaming, withHostStreaming, SwipeList, GiftFlag, useWebSockets, AudienceView, refChatList, refComposer, refGiftFlag, GiftListModal, RNAudienceStreaming, RNBroadCasterStreaming, };
