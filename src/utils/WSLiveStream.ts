import { get } from 'lodash';
import { RTCPeerConnection, RTCSessionDescription } from 'react-native-webrtc';

export const fetchIceServers = async turnApiUrl => {
    const response = await fetch(turnApiUrl, {
        method: 'PUT',
    });

    if (response.status >= 300) {
        throw new Error('TURN API return unexpected status ' + response.status);
    }

    const result = await response.json();
    const { iceServers = [] } = result.v;

    return iceServers;
};

export const fetchDirector = async (baseURL, type, payload, token) => {
    let options = {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    };
    let url = `${baseURL}/${type}`;

    if (token) {
        options.headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, options);

    if (response.status >= 300) {
        throw new Error(
            'Director API return status ' +
                JSON.stringify(payload) +
                response.status +
                JSON.stringify(response),
        );
    }

    const result = await response.json();
    return `${result.data.wsUrl}?token=${result.data.jwt}`;
};

export const makeViewerClient = async (logger, websocketUrl, streamId, iceServers, err) => {
    logger.warn('connecting to:', websocketUrl);

    const pc: any = new RTCPeerConnection({
        iceServers,
        rtcpMuxPolicy: 'require',
    });

    const ws = new WebSocket(websocketUrl);

    return new Promise((resolve, reject) => {
        const forwardReject = rejectionForwarder(reject);

        ws.addEventListener('error', reject);
        ws.addEventListener('close', () => {
            reject(new Error('WebSocket connection closed unexpectedly'));
        });

        pc.addEventListener('addstream', ev => {
            logger.warn('addstream event:', ev);
            const { stream } = ev;
            resolve({
                pc,
                ws,
                stream,
            });
        });

        ws.addEventListener(
            'open',
            forwardReject(async () => {
                logger.warn('ws::onopen');

                const offer = await pc.createOffer({
                    offerToReceiveAudio: true,
                    offerToReceiveVideo: true,
                });

                logger.warn('offer:', offer);
                await pc.setLocalDescription(offer);

                const data = {
                    streamId,
                    sdp: offer.sdp,
                };

                const payload = {
                    type: 'cmd',
                    transId: 0,
                    name: 'view',
                    data,
                };

                logger.warn('sending payload:', payload);
                ws.send(JSON.stringify(payload));
            }),
        );

        ws.addEventListener(
            'message',
            forwardReject(async ev => {
                const message = JSON.parse(ev.data);
                const { type } = message;
                console.warn(type, 'message', message.name);
                if (type === 'response') {
                    const { sdp } = message.data;
                    logger.log('sdp answer:', sdp);
                    logger.log('setting remote description');

                    await pc.setRemoteDescription(
                        new RTCSessionDescription({
                            type: 'answer',
                            sdp: sdp,
                        }),
                    );

                    logger.log('done setting remote description');
                }
                if (get(message, 'name') === 'inactive') {
                    logger.log('live stream inactive');
                    err('live stream inactive');
                    throw new Error('WebSocket connection inactive');
                }
            }),
        );
    });
};

export const rejectionForwarder =
    reject =>
    fn =>
    async (...args) => {
        try {
            fn(...args);
        } catch (err) {
            reject(err);
        }
    };
