import { Status } from './enums/status';
import { fetchDirector, fetchIceServers, makeViewerClient } from './utils/WSLiveStream';
import { isEmpty } from 'lodash';
import React, { useEffect, useState, FC } from 'react';
import { BackHandler } from 'react-native';
import InCallManager from 'react-native-incall-manager';
import LiveStreaming from './LiveStreaming';
import { IGiftItem } from './components/GiftListModal';

interface Props {
    onCloseStream: () => void;
    data: IGiftItem[];
    iconBox?: string | number;
    configWS: {
        directorURL: string;
        directorType: string;
        streamId: string;
        directorPayload: { streamAccountId: string; streamName: string };
        iceServersURL: string;
    };
}
const ReactNativeStream: FC<Props> = props => {
    const {
        iconBox,
        onCloseStream,
        data,
        configWS: { directorURL, directorType, directorPayload, iceServersURL, streamId },
    } = props;
    const [status, setStatus] = useState(Status.CONNECTING);
    const [connection, setConnection] = useState<any>({});

    const fetchData = async () => {
        try {
            const resDirector = await fetchDirector(
                directorURL,
                directorType,
                directorPayload,
                null,
            );
            const iceServers = await fetchIceServers(iceServersURL);
            const connection = await makeViewerClient(
                console,
                resDirector,
                streamId,
                iceServers,
                (err: any) => {
                    console.log('qqqq', err);
                    setStatus(Status.FAIL);
                },
            ).catch(err => console.log(err, 'log connect catch'));
            setConnection(connection);
            setStatus(Status.CONNECTED);
        } catch (error) {
            // console.log('qqqq');
            setStatus(Status.FAIL);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (status === Status.CONNECTED) {
            try {
                InCallManager.start({ media: 'audio' });
                InCallManager.setForceSpeakerphoneOn(true);
                InCallManager.setSpeakerphoneOn(true);
            } catch (err) {
                console.log('InApp Caller ---------------------->', err);
            }
        }

        return () => {
            InCallManager.setForceSpeakerphoneOn(false);
            InCallManager.setSpeakerphoneOn(false);
        };
    }, [status]);

    useEffect(() => {
        const backAction = () => {
            onClose();
            return true;
        };
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => backHandler.remove();
    }, []);

    const onClose = () => {
        if (!isEmpty(connection)) {
            connection.pc.close();
            connection.ws.close();
        }
        setStatus(Status.DISCONNECTED);
        onCloseStream?.();
    };

    return (
        <LiveStreaming
            iconBox={iconBox}
            status={status}
            connection={connection}
            onClose={onClose}
            data={data}
        />
    );
};

export default ReactNativeStream;
