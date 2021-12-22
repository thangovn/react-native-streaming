"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RNBroadCasterStreaming = exports.RNAudienceStreaming = exports.GiftListModal = exports.refGiftFlag = exports.refComposer = exports.refChatList = exports.AudienceView = exports.useWebSockets = exports.GiftFlag = exports.SwipeList = exports.withHostStreaming = exports.withAudienceStreaming = void 0;
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var Composer_1 = require("./components/Composer");
Object.defineProperty(exports, "refComposer", { enumerable: true, get: function () { return Composer_1.refComposer; } });
var GiftListModal_1 = __importDefault(require("./components/GiftListModal"));
exports.GiftListModal = GiftListModal_1.default;
var react_native_agora_1 = require("react-native-agora");
var useWebSockets_1 = require("./hooks/useWebSockets");
Object.defineProperty(exports, "useWebSockets", { enumerable: true, get: function () { return useWebSockets_1.useWebSockets; } });
var GiftFlag_1 = __importStar(require("./components/GiftFlag"));
exports.GiftFlag = GiftFlag_1.default;
Object.defineProperty(exports, "refGiftFlag", { enumerable: true, get: function () { return GiftFlag_1.refGiftFlag; } });
var SwipeList_1 = __importDefault(require("./components/SwipeList"));
exports.SwipeList = SwipeList_1.default;
var withAudienceStreaming_1 = __importDefault(require("./hoc/withAudienceStreaming"));
exports.withAudienceStreaming = withAudienceStreaming_1.default;
var withHostLiveStreaming_1 = __importDefault(require("./hoc/withHostLiveStreaming"));
exports.withHostStreaming = withHostLiveStreaming_1.default;
var AudienceView_1 = __importDefault(require("./components/AudienceView"));
exports.AudienceView = AudienceView_1.default;
var ChatList_1 = require("./components/ChatList");
Object.defineProperty(exports, "refChatList", { enumerable: true, get: function () { return ChatList_1.refChatList; } });
var defaultStyle_1 = require("./constants/defaultStyle");
var BroadCasterView_1 = __importDefault(require("./components/BroadCasterView"));
var ButtonHost_1 = __importDefault(require("./components/ButtonHost"));
var HeaderHost_1 = __importDefault(require("./components/HeaderHost"));
var CardDashboard_1 = __importDefault(require("./components/CardDashboard"));
var LiveHeader_1 = require("./components/LiveHeader");
var colors_1 = require("./constants/colors");
var spacing_1 = require("./constants/spacing");
var alert_1 = require("./utils/alert");
var signInKey_1 = require("./utils/signInKey");
var Header_1 = __importDefault(require("./components/Header"));
var RNAudienceStreaming = (0, withAudienceStreaming_1.default)(function (props) {
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
    (0, react_1.useEffect)(function () {
        (0, signInKey_1.fetchSignInKey)(appId)
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
        (_b = Composer_1.refComposer.current) === null || _b === void 0 ? void 0 : _b.reset();
    };
    var handleDonate = function (gift) {
        send_gift(gift);
    };
    var _b = (0, useWebSockets_1.useWebSockets)({
        enabled: props.connectionState === react_native_agora_1.ConnectionStateType.Connected &&
            Boolean(props.peerIds.length),
        _userInfo: _userInfoSocketChat,
        onReceiveGift: onReceiveGift,
    }), send = _b.send, messages = _b.messages, concurrent = _b.concurrent, send_gift = _b.send_gift;
    return (react_1.default.createElement(react_native_1.View, { style: defaultStyle_1.defaultStyle.container },
        Boolean(props.errInit) ? (react_1.default.createElement(react_native_1.View, { style: styles.video },
            react_1.default.createElement(Header_1.default, { onPress: onClose, concurrent: concurrent, connection: props.connectionState, peerIds: props.peerIds }),
            react_1.default.createElement(react_native_1.Text, { style: styles.failText }, props.errInit))) : (react_1.default.createElement(AudienceView_1.default, { onClose: onClose, connection: props.connectionState, concurrent: concurrent, peerIds: props.peerIds, channelName: channelName })),
        props.connectionState === react_native_agora_1.ConnectionStateType.Connected &&
            Boolean(props.peerIds.length) && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(SwipeList_1.default, { currentUserId: _userInfoSocketChat.user_id, dataMessage: messages, onSend: onSend, rightIconComposer: rightIconComposer }),
            react_1.default.createElement(GiftListModal_1.default, { onDonate: handleDonate, data: giftData })))));
});
exports.RNAudienceStreaming = RNAudienceStreaming;
var timeout;
var RNBroadCasterStreaming = (0, withHostLiveStreaming_1.default)(function (props) {
    var _a = props.configLiveStream, appId = _a.appId, channelName = _a.channelName, _userInfoSocketChat = props._userInfoSocketChat, onReceiveGift = props.onReceiveGift, onSelectGame = props.onSelectGame, onPressAvatar = props.onPressAvatar, cardName = props.cardName, imageUrl = props.imageUrl, renderWaitingView = props.renderWaitingView, rightIconComposer = props.rightIconComposer, uid = props.uid, onBack = props.onBack, channelLive = props.channelLive;
    var _b = (0, react_1.useState)(3), countDown = _b[0], setCountDown = _b[1];
    var initial = function (app_id) {
        setTimeout(function () {
            props.init(app_id);
        }, 100);
    };
    (0, react_1.useEffect)(function () {
        (0, signInKey_1.fetchSignInKey)(appId)
            .then(function (key) {
            initial(key);
        })
            .catch();
    }, [appId]);
    (0, react_1.useEffect)(function () {
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
    var onPressHelp = function () { return (0, alert_1.alertOk)({ msg: 'onPressHelp' }); };
    var onPressShare = function () { return (0, alert_1.alertOk)({ msg: 'onPressShare' }); };
    var onLiveNow = function () {
        props.startCall(channelName, uid);
    };
    var onPressEndLive = function () {
        (0, alert_1.alertYesNo)({
            msg: 'Are you sure to end live?',
            onPressAccept: function () { return props.endCall(); },
        });
    };
    var _c = (0, useWebSockets_1.useWebSockets)({
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
        (_b = Composer_1.refComposer.current) === null || _b === void 0 ? void 0 : _b.reset();
    };
    return (react_1.default.createElement(react_native_1.View, { style: defaultStyle_1.defaultStyle.container },
        Boolean(props.errInit) ? (react_1.default.createElement(react_native_1.View, { style: styles.video },
            react_1.default.createElement(react_native_1.Text, { style: styles.failText }, props.errInit))) : (react_1.default.createElement(BroadCasterView_1.default, { joinSucceed: props.joinSucceed, renderWaitingView: renderWaitingView, channelName: channelName })),
        props.joinSucceed ? (countDown === 0 ? (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(LiveHeader_1.LiveHeader, { onPressEndLive: onPressEndLive, onPressCamera: onPressCamera, concurrent: concurrent, joinSucceed: props.joinSucceed }),
            react_1.default.createElement(SwipeList_1.default, { currentUserId: _userInfoSocketChat.user_id, dataMessage: messages, onSend: onSend, rightIconComposer: rightIconComposer }))) : (react_1.default.createElement(react_native_1.View, { style: styles.wrapCountDown },
            react_1.default.createElement(react_native_1.Text, { style: styles.countDown }, countDown)))) : (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(HeaderHost_1.default, { onBack: onBack, rightComponent: [
                    {
                        icon: 'share-social-outline',
                        onPress: onPressShare,
                    },
                    {
                        icon: 'help-circle-outline',
                        onPress: onPressHelp,
                    },
                ] }),
            react_1.default.createElement(react_native_1.View, { style: styles.body },
                react_1.default.createElement(CardDashboard_1.default, { channelLive: channelLive, onSelectGame: onSelectGame, nameGame: cardName, url: imageUrl ||
                        'https://cdn.pixabay.com/photo/2021/11/10/18/09/casino-6784520_960_720.jpg' }),
                react_1.default.createElement(ButtonHost_1.default, { name: 'Live Now', onPress: onLiveNow, disabled: Boolean(props.errInit) }))))));
});
exports.RNBroadCasterStreaming = RNBroadCasterStreaming;
var styles = react_native_1.StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'space-between',
        zIndex: 999,
    },
    countDown: __assign(__assign({}, defaultStyle_1.defaultStyle.heading4), { color: colors_1.colors.WHITE, textAlign: 'center' }),
    wrapCountDown: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors_1.colors.BLACK_30,
        width: spacing_1.WIDTH_SCREEN,
        height: spacing_1.HEIGHT_SCREEN,
        position: 'absolute',
    },
    failText: __assign(__assign({}, defaultStyle_1.defaultStyle.button2), { color: colors_1.colors.light.White }),
    video: {
        position: 'absolute',
        width: spacing_1.WIDTH_SCREEN,
        height: spacing_1.HEIGHT_SCREEN,
        backgroundColor: colors_1.colors.light.MIRAGE,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
