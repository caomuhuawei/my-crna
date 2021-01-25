import React from 'react';
import {AppState} from 'react-native';

import Navigator from './Navigator';
// import PushNotificationsController from './PushNotificationsController';

import {I18n} from './i18n/i18n';

class App extends React.Component {
  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
    // TODO: Make this list smaller, we basically download the whole internet
    if (this.props.isLoggedIn) {
    }
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = (appState) => {
    if (appState === 'active') {
      if (this.props.isLoggedIn) {
      }
    }
  };
  render() {
    return (
      <Navigator />
      // <PushNotificationsController />
    );
  }
}
export default App;
