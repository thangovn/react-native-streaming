# react-native-streaming


This library exposes a cross-platform interface for showing live streaming for host and viewer, providing a unified user and developer experience.

## Setup


Please follow docs list lib below to setup your React Native project
 - [`react-native-reanimated`](https://github.com/kmagiera/react-native-reanimated). (v2.2.4)
 - [`react-native-vector-icons`](https://github.com/oblador/react-native-vector-icons).
 - [`lottie-react-native`](https://github.com/lottie-react-native/lottie-react-native).
 - [`react-native-safe-area-context`](https://github.com/th3rdwave/react-native-safe-area-context#readme).

Install using yarn:

```bash
yarn add https://github.com/thuanneotime/react-native-streaming.git lottie-ios lottie-react-native react-native-fast-image react-native-agora react-native-linear-gradient react-native-modal react-native-reanimated@2.2.4 react-native-safe-area-context react-native-vector-icons @sayem314/react-native-keep-awake rn-android-keyboard-adjust
```

I recommend you use lib React Navigation above v5.x.x
 - [`react-navigation`](https://reactnavigation.org/docs/5.x/getting-started).


#### RN >= 0.60

If you are using RN >= 0.60, only run `npx pod-install`. Then rebuild your project.

## General Usage

For Host 

```js
import { RNBroadCasterStreaming } from 'react-native-streaming';
```

### Basic usage for Host

```js
import React from 'react';
import { RNBroadCasterStreaming } from 'react-native-streaming';

const appId = YOUR_APP_ID;
const channelName = YOUR_CHANNEL_NAME_ID

export const App = () => {
  ...
  
    const onReceiveGift = gift => {};
    const _onLiveNow = (title?: string, description?: string) => {
        if (isManualLive) {
            if (!Boolean(title)) return showNotification('TVN Host', 'Title is required', 'error');
            refLoading.current?.show();
            mutationCreateManualLive.mutate({ title });
        } else {
            refBroadCaster.current.startLive({
                channel_id: get(item, 'live_streaming_key', ''),
                uid: login_informations.id,
            });
        }
    };
    const _onEndLive = () => {
      refBroadCaster.current.endLive();
    }

   return (
      <RNBroadCasterStreaming
          configLiveStream={{ appId: appId, channelName: 'YOUR_CHANNEL_NAME_ID' }}
          _userInfoSocketChat={{
              user_name: login_informations.full_name,
              user_id: login_informations.id,
              channel_id: 'YOUR_CHANNEL_NAME_ID',
          }}
          onReceiveGift={onReceiveGift}
          onBack={() => Navigation.back()}
          _onLiveNow={_onLiveNow}
          _onEndLive={_onEndLive}
          isManualLive={isManualLive}
      />
  );
};
```

For Viewer 

```js
import { RNBroadCasterStreaming } from 'react-native-streaming';
```

### Basic usage for Viewer

```js
import React from 'react';
import { RNAudienceStreaming } from 'react-native-streaming';

const appId = YOUR_APP_ID;
const channelName = YOUR_CHANNEL_NAME_ID

export const App = () => {
  ...
  
    const onReceiveGift = gift => {};

    return (
        <RNAudienceStreaming
            onCloseStream={() => Navigation.back()}
            giftData={get(queryGetGiftAll, 'data', [])}
            configLiveStream={{ appId: 'YOUR_APP_ID', channelName: 'YOUR_CHANNEL_NAME_ID' }}
            _userInfoSocketChat={{
                user_name: login_informations.full_name,
                user_id: login_informations.id,
                chanel_id: 'YOUR_CHANNEL_NAME_ID',
            }}
            onReceiveGift={onReceiveGift}
            rightIconComposer={lottie_gift_box}
        />
    );
  );
};
```

Props

#### `configLiveStream` (`required`) (for Host & Viewer)

Config live streaming.

List of possible values:

- `"appId"` (string)
- `"channelName"` (string)

```js
<RNBroadCasterStreaming configLiveStream={{ appId: 'YOUR_APP_ID', channelName: 'YOUR_CHANNEL_NAME_ID' }}  />
```

#### `_userInfoSocketChat` (`required`) (for Host & Viewer)

Config chat live streaming

List of possible values:

- `"user_name"` (string)
- `"user_id"` (number)
- `"channel_id"` (string)

```js
<RNBroadCasterStreaming _userInfoSocketChat={{
                user_name: login_informations.full_name,
                user_id: login_informations.id,
                channel_id: 'YOUR_CHANNEL_NAME_ID',
            }}  />
```

#### `onReceiveGift` (`func`) (for Host & Viewer)

Function called when receive gift

```js
<RNBroadCasterStreaming onReceiveGift={(gift)=> {...}} />
```

#### `onCloseStream` (`func`) (for Viewer)

Function called when close stream using to handle Navigation Header go back

```js
<RNBroadCasterStreaming onCloseStream={() => Navigation.back()} />
```

#### `onBack` (`func`) (for Host)

Function called when close stream using to handle Navigation Header go back

```js
<RNBroadCasterStreaming onBack={() => Navigation.back()} />
```


#### `rightIconComposer` (`optional`) (for Host & Viewer)

Add your lottie icon to right composer

```js
<RNAudienceStreaming rightIconComposer={lottie_gift_box} />
```


#### `giftData` (required) (for Viewer)

Array of list gift items

```js
<RNAudienceStreaming giftData={data: IGiftItem[]} />
```

## Methods (Imperative API):

#### `refGiftFlag` (for Host & Viewer)

To start animation.

List of possible values:

- `"startAnimation"` ((gift: IReceiveGiftItem) => void)

```js
const onReceiveGift = gift => {
  refGiftFlag.current?.startAnimation(action.payload.gift);
  refChatList.current?.startAnimation(action.payload.gift);
};
```

#### `refChatList` (for Host & Viewer)

To start animation.

List of possible values:

- `"startAnimation"` ((gift: IReceiveGiftItem) => void)

```js
const onReceiveGift = gift => {
  refGiftFlag.current?.startAnimation(action.payload.gift);
  refChatList.current?.startAnimation(action.payload.gift);
};
```

#### `refBroadCaster` (for Host)

List of possible values:

- `"startLive"` (({ channel_id, uid }) => void)

```js
const _onLiveNow = (title?: string, description?: string) => {
    if (isManualLive) {
        if (!Boolean(title)) return showNotification('TVN Host', 'Title is required', 'error');
        refLoading.current?.show();
        mutationCreateManualLive.mutate({ title });
    } else {
        refBroadCaster.current.startLive({
            channel_id: get(item, 'live_streaming_key', ''),
            uid: login_informations.id,
        });
    }
};
```
- `"endLive"` (() => void)

```js
const _onEndLive = () => {
      refBroadCaster.current.endLive();
   };
```
         

