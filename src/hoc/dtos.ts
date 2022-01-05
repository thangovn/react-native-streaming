import { ConnectionStateType } from 'react-native-tvn-host';

export interface hocDtos {
    init?: (appId: string) => void;
    startCall?: (channelName: string, uid?: string | number) => void;
    endCall?: () => void;
    switchCamera?: () => void;
}

export interface LiveStreamState {
    token?: string;
    joinSucceed?: boolean;
    peerIds?: number[];
    isHost?: Boolean;
    switchCamera?: Boolean;
    connectionState?: ConnectionStateType;
    errInit?: string | null;
    initSuccess?: boolean;
}
