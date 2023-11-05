import {Alert} from 'react-native';

import useAuthStore from '../stores/authStore';

import errorMessagesID from '../utils/json/api-messages-id.json';

export const apiErrorHandler = (
  error: any,
  forceLogout?: boolean,
  callback?: (errorMessage: string) => void,
) => {
  const {logoutAction} = useAuthStore.getState();
  const defaultMessage = 'Terjadi kesalahan.';
  const outdatedVersionMessage = 'The app version is outdated.';
  const sessionErrorMessages = [
    'Access token expired.',
    'Invalid access token.',
    'Your session has expired.',
  ];
  const accountStatusMessages = ['Account is suspended.', 'Account is banned.'];

  const parsedErrorMessagesID = errorMessagesID as any;
  const parsedError = error?.response?.data?.message?.toString();
  const errorStatus = error?.response?.status || '';
  let errorMessage =
    parsedErrorMessagesID[parsedError] || parsedError || defaultMessage;

  if (!forceLogout) {
    console.log({
      parsedError,
      errorStatus,
      errorResponse: error?.response?.data,
    });
  }

  if (forceLogout) {
    if (parsedError === outdatedVersionMessage) {
      // do something
    } else if (accountStatusMessages.includes(errorMessage)) {
      errorMessage = 'Account Anda sedang dalam proses review.';
    } else if (
      sessionErrorMessages.includes(parsedError) ||
      errorStatus === 401
    ) {
      Alert.alert(
        '',
        errorMessage,
        [
          {
            text: 'OK',
            onPress: () => {
              logoutAction();
            },
          },
        ],
        {
          cancelable: false,
          onDismiss() {},
        },
      );

      return {errorStatus, errorMessage};
    }
  }

  callback && callback(errorMessage);

  return {errorStatus, errorMessage};
};
