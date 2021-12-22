"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWebSockets = void 0;
var react_1 = require("react");
var socket_io_client_1 = __importDefault(require("socket.io-client"));
var SOCKET_URL = 'http://kt.thangovn.com:5000';
var useWebSockets = function (_a) {
    var enabled = _a.enabled, onConnected = _a.onConnected, onReceiveGift = _a.onReceiveGift, _userInfo = _a._userInfo;
    var ref = (0, react_1.useRef)();
    var _b = (0, react_1.useState)([]), messages = _b[0], setMessages = _b[1];
    var _c = (0, react_1.useState)(0), concurrent = _c[0], setConcurrent = _c[1];
    var _d = (0, react_1.useState)(_userInfo), userInfo = _d[0], setUserInfo = _d[1];
    var send = function (_a) {
        var message = _a.message;
        ref.current.emit('send_message', {
            user_name: userInfo.user_name,
            user_id: userInfo.user_id,
            chanel_id: userInfo.channel_id,
            message: message,
        });
    };
    var send_gift = function (giftData) {
        ref.current.emit('send_gift', {
            chanel_id: userInfo.channel_id,
            quantity: 99,
            user_name: userInfo.user_name,
            user_id: userInfo.user_id,
            gift_data: giftData,
        });
    };
    var leave_room = function () {
        ref.current.emit('leave_room', {
            chanel_id: userInfo.channel_id,
            user_name: userInfo.user_name,
            user_id: userInfo.user_id,
        });
    };
    (0, react_1.useEffect)(function () {
        if (!enabled)
            return;
        var socket = (0, socket_io_client_1.default)(SOCKET_URL, { transports: ['websocket'] });
        // console.log(socket, 'd');
        socket.emit('join_room', {
            user_name: userInfo.user_name,
            user_id: userInfo.user_id,
            chanel_id: userInfo.channel_id,
        });
        socket.on('connect', function () {
            // console.warn('connect', socket, e);
            if (onConnected) {
                onConnected();
            }
        });
        socket.on('subscribe.chanel_messages', function (_a) {
            var chanel_id = _a.chanel_id, messages = _a.messages;
            // console.warn('chanel_messages', []);
            var a = messages.reverse();
            setMessages(a);
        });
        socket.on('subscribe.new_message', function (new_message) {
            // console.warn('new_message', new_message);
            setMessages(function (prev) { return __spreadArray([new_message], prev, true); });
        });
        socket.on('subscribe.receive_gift', function (gift) {
            // console.log('receive_gift', JSON.stringify(gift));
            onReceiveGift === null || onReceiveGift === void 0 ? void 0 : onReceiveGift(gift);
        });
        socket.on('subscribe.chanel_concurrent', function (chanel_concurrent) {
            // console.warn('chanel_concurrent', chanel_concurrent);
            setConcurrent(chanel_concurrent.concurrent);
        });
        // send_gift
        // -> send_message -> emit
        // -> join_room -> emit
        // socket.on('reconnect', () => {
        //     socket.emit('joinRoom', userId);
        // });
        ref.current = socket;
        return function () {
            leave_room();
        };
    }, [enabled, userInfo]);
    return {
        send: send,
        messages: messages,
        concurrent: concurrent,
        refSocket: ref.current,
        send_gift: send_gift,
        leave_room: leave_room,
    };
};
exports.useWebSockets = useWebSockets;
