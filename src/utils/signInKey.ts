import { Platform } from 'react-native';

const URL = 'https://host-api-staging.thangovn.com/api/v1/tvn-sdk-api-keys/signIn';

export const fetchSignInKey = async (appId: string) => {
    const response = await fetch(`${URL}?app_id=${appId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            AppPlatform: Platform.OS,
        },
    });
    const result = await response.json();

    return result.secret;
};
