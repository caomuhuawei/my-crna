'use strict';

import React from 'react';
import {AppState, Platform, PushNotificationIOS} from 'react-native';

// $FlowIssue
// import PushNotification from 'react-native-push-notification';

import {connect} from 'react-redux';
import {
  storeDeviceToken,
  receivePushNotification,
  updateInstallation,
  markAllNotificationsAsSeen,
} from './actions';

import type {Dispatch} from './actions/types';

import {gcmSenderId} from './env';

class AppBadgeController extends React.Component {
  props: {
    tab: string,
    enabled: boolean,
    badge: number,
    dispatch: Dispatch,
  };

  handleAppStateChange = (appState) => {
    if (appState === 'active') {
      this.updateAppBadge();
      if (this.props.tab === 'info') {
        this.eventuallyMarkNotificationsAsSeen();
      }
    }
  };

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);

    const {dispatch} = this.props;
    // PushNotification.configure({
    //   onRegister: ({token}) => dispatch(storeDeviceToken(token)),
    //   onNotification: (notif) => dispatch(receivePushNotification(notif)),
    //   senderID: gcmSenderId,
    //   requestPermissions: this.props.enabled,
    // });

    this.updateAppBadge();
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.enabled && this.props.enabled) {
      // PushNotification.requestPermissions();
    }
    if (this.props.badge !== prevProps.badge) {
      this.updateAppBadge();
    }
    if (this.props.tab === 'info' && prevProps.tab !== 'info') {
      this.eventuallyMarkNotificationsAsSeen();
    }
  }

  updateAppBadge() {
    if (this.props.enabled && Platform.OS === 'ios') {
      PushNotificationIOS.setApplicationIconBadgeNumber(this.props.badge);
      updateInstallation({badge: this.props.badge});
    }
  }

  eventuallyMarkNotificationsAsSeen() {
    const {dispatch} = this.props;
    setTimeout(() => dispatch(markAllNotificationsAsSeen()), 1000);
  }

  render() {
    return null;
  }
}

function select(store) {
  return {
    enabled: true,
    badge: 1,
    tab: 0,
  };
}

module.exports = connect(select)(AppBadgeController);
