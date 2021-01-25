'use strict';

// Depdencies
import React from 'react';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

// Components
import {Text} from 'react-native';
import App from './App';
import LaunchScreen from './common/LaunchScreen';

function setup(): ReactClass<{}> {
  // TODO: Don't prevent fontScaling on iOS (currently breaks UI)
  // Text.defaultProps.allowFontScaling = false;

  class Root extends React.Component {
    state = {
      store: null,
      persistor: null,
    };

    async componentDidMount() {
      const {store, persistor} = await configureStore();
      this.setState({
        store,
        persistor,
      });
    }

    render() {
      const {store, persistor} = this.state;
      if (!store) {
        return <LaunchScreen />;
      }
      return (
        <Provider store={store}>
          <PersistGate loading={<LaunchScreen />} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      );
    }
  }

  return Root;
}

module.exports = setup;
