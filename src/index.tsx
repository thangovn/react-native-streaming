import { Status } from './enums/status';
import { fetchDirector, fetchIceServers, makeViewerClient } from './utils/WSLiveStream';
import { isEmpty } from 'lodash';
import React, { useEffect, useState, FC } from 'react';
import { BackHandler } from 'react-native';
import InCallManager from 'react-native-incall-manager';
import LiveStreaming from './LiveStreaming';
import { IGiftItem } from './components/GiftListModal';

interface Props {
    navigation: any;
    data: IGiftItem[];
}
const index: FC<Props> = ({ iconBox, navigation, data }) => {
    const [status, setStatus] = useState(Status.CONNECTING);
    const [connection, setConnection] = useState<any>({});

    const fetchData = async () => {
        try {
            const resDirector = await fetchDirector(
                'https://director.millicast.com/api/director',
                'subscribe',
                {
                    streamAccountId: 'H4CMm4',
                    streamName: 'test-live',
                },
                null,
            );
            const iceServers = await fetchIceServers('https://turn.millicast.com/webrtc/_turn');
            const connection = await makeViewerClient(
                console,
                resDirector,
                'H4CMm4',
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
        navigation.back();
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

export default index;
