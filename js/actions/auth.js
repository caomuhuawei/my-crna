'use strict';

import {
  Platform,
  InteractionManager,
  VibrationIOS,
  logError,
  Alert,
  Share,
  ActionSheetIOS,
} from 'react-native';
import auth from '../apis/auth';

const {login} = auth;
export const loginC = 'LOGIN';
export const logoutC = 'LOGOUT';

export function loginAction(params: any, res: any) {
  return {
    type: loginC,
    params,
    res,
  };
}

export function logIn(params: any) {
  return async (dispatch: any) => {
    const res = await login(params);
    await InteractionManager.runAfterInteractions;
    dispatch(loginAction(params, res || []));
  };
}

export function logOut(params: any) {
  return (dispatch: any) => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          title: 'Hi',
          options: ['Log out', 'Cancel'],
          destructiveButtonIndex: 0,
          cancelButtonIndex: 1,
        },
        (buttonIndex) => {
          if (buttonIndex === 0) {
            dispatch(logOut());
          }
        },
      );
    } else {
      Alert.alert('Hi', 'Log out?', [
        {text: 'Cancel'},
        {text: 'Log out', onPress: () => dispatch(logOut())},
      ]);
    }
  };
}

export function share(params: any) {
  return (dispatch: any) => {
    if (Platform.OS === 'ios') {
      // VibrationIOS.vibrate();
      ActionSheetIOS.showShareActionSheetWithOptions(
        {
          subject: subject,
          message: message,
        },
        () => {},
        () => {},
      );
    } else {
      Share.share(
        {
          // content
          title: session.title,
          message: url,
        },
        {
          // options
          dialogTitle: 'Share Link to ' + session.title, // droid-only share option
        },
      )
        .then
        // callback
        ();
    }
  };
}
