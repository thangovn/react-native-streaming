var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { isAndroid } from '../utils/deviceInfo';
import React from 'react';
import { BackHandler } from 'react-native';
import RtcEngine, { ChannelProfile, ClientRole, ConnectionStateType, } from 'react-native-agora';
import { requestCameraAndAudioPermission } from '../utils/permissions';
// Define a State interface.
var withAudienceStreaming = function (WrappedComponent) {
    var ViewerStreaming = /** @class */ (function (_super) {
        __extends(ViewerStreaming, _super);
        function ViewerStreaming() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.state = {
                token: null,
                joinSucceed: false,
                peerIds: [],
                isHost: true,
                switchCamera: true,
                connectionState: ConnectionStateType.Connecting,
                errInit: null,
            };
            _this.onClose = function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._endCall()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); };
            _this.backAction = function () {
                return true;
            };
            _this._startCall = function (channelName) { return __awaiter(_this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, ((_a = this._engine) === null || _a === void 0 ? void 0 : _a.joinChannel(this.state.token, channelName, null, 0))];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            }); };
            _this._endCall = function () { return __awaiter(_this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, ((_a = this._engine) === null || _a === void 0 ? void 0 : _a.leaveChannel())];
                        case 1:
                            _b.sent();
                            this.setState({ peerIds: [], joinSucceed: false });
                            return [2 /*return*/];
                    }
                });
            }); };
            _this._switchCamera = function () {
                var _a;
                var switchCamera = _this.state.switchCamera;
                (_a = _this._engine) === null || _a === void 0 ? void 0 : _a.switchCamera().then(function () {
                    _this.setState({ switchCamera: !switchCamera });
                }).catch(function (err) {
                    console.warn('switchCamera', err);
                });
            };
            // Pass in your App ID through this.state, create and initialize an RtcEngine object.
            _this.init = function (appId) { return __awaiter(_this, void 0, void 0, function () {
                var _a;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = this;
                            return [4 /*yield*/, RtcEngine.create(appId).catch(function (err) {
                                    return _this.setState({ errInit: 'Invalid Key' });
                                })];
                        case 1:
                            _a._engine = _b.sent();
                            return [4 /*yield*/, this._engine.enableVideo()];
                        case 2:
                            _b.sent();
                            // Set the channel profile as live streaming.
                            return [4 /*yield*/, this._engine.setChannelProfile(ChannelProfile.LiveBroadcasting)];
                        case 3:
                            // Set the channel profile as live streaming.
                            _b.sent();
                            // Set the usr role as host.
                            return [4 /*yield*/, this._engine.setClientRole(ClientRole.Audience)];
                        case 4:
                            // Set the usr role as host.
                            _b.sent();
                            // Listen for the UserJoined callback.
                            // This callback occurs when the remote user successfully joins the channel.
                            this._engine.addListener('UserJoined', function (uid, elapsed) {
                                // console.log('UserJoined', uid, elapsed);
                                var peerIds = _this.state.peerIds;
                                if (peerIds.indexOf(uid) === -1) {
                                    _this.setState({
                                        peerIds: __spreadArray(__spreadArray([], peerIds, true), [uid], false),
                                    });
                                }
                            });
                            // Listen for the UserOffline callback.
                            // This callback occurs when the remote user leaves the channel or drops offline.
                            this._engine.addListener('UserOffline', function (uid, reason) {
                                // console.log('UserOffline', uid, reason);
                                var peerIds = _this.state.peerIds;
                                _this.setState({
                                    // Remove peer ID from state array
                                    peerIds: peerIds.filter(function (id) { return id !== uid; }),
                                });
                            });
                            // Listen for the JoinChannelSuccess callback.
                            // This callback occurs when the local user successfully joins the channel.
                            this._engine.addListener('JoinChannelSuccess', function (channel, uid, elapsed) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            // console.log('JoinChannelSuccess', channel, uid, elapsed);
                                            this.setState({
                                                joinSucceed: true,
                                            });
                                            return [4 /*yield*/, this._engine.setEnableSpeakerphone(true)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                            // this._engine.addListener('Warning', warn => console.log('Warn', warn));
                            this._engine.addListener('Error', function (error) { return console.log('Error', error); });
                            this._engine.addListener('ConnectionStateChanged', function (state, reason) {
                                // console.log('ConnectionStateChanged', state, reason);
                                _this.setState({ connectionState: state });
                            });
                            return [2 /*return*/];
                    }
                });
            }); };
            return _this;
        }
        ViewerStreaming.prototype.componentDidMount = function () {
            if (isAndroid) {
                requestCameraAndAudioPermission().then(function () {
                    // console.log('requested!');
                });
            }
            this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.backAction);
        };
        ViewerStreaming.prototype.componentWillUnmount = function () {
            this.backHandler.remove();
        };
        ViewerStreaming.prototype.render = function () {
            return (React.createElement(WrappedComponent, __assign({}, this.props, this.state, { init: this.init, startCall: this._startCall, endCall: this._endCall, switchCamera: this._switchCamera })));
        };
        return ViewerStreaming;
    }(React.PureComponent));
    return ViewerStreaming;
};
export default withAudienceStreaming;
