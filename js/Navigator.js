'use strict';

import React from 'react';
import {StyleSheet, BackHandler, View, Text} from 'react-native';
import {connect} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import F8TabsView from './tabs/F8TabsView';
import FriendsScheduleView from './tabs/schedule/FriendsScheduleView';
import FilterScreen from './filter/FilterScreen';
import LoginModal from './login/LoginModal';
import SessionsCarousel from './tabs/schedule/SessionsCarousel';

import SharingSettingsScreen from './tabs/schedule/SharingSettingsScreen';

import F8WebView from './common/F8WebView';
import RatingScreen from './rating/RatingScreen';

import F8Colors from './common/F8Colors';
import F8VideoView from './tabs/videos/F8VideoView';
import {switchTab} from './actions';
import F8MapView from './tabs/maps/F8MapView';
import DemosCarousel from './tabs/demos/DemosCarousel';
import CustomerComponents from './tabs/CustomerComponents';
import RNComponents from './tabs/RNComponents';
const Stack = createStackNavigator();

class Navigator extends React.Component {
  _handlers = ([]: Array<() => boolean>);

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    for (let i = this._handlers.length - 1; i >= 0; i--) {
      // 用于drawer等功能
      if (this._handlers[i]()) {
        return true;
      }
    }

    const navigator = this._navigator;
    if (navigator) {
      navigator.goBack();
      return true;
    }

    if (this.props.tab !== 'schedule') {
      this.props.dispatch(switchTab('schedule'));
      return true;
    }
    return false;
  };

  render() {
    return (
      <NavigationContainer ref={(c) => (this._navigator = c)}>
        <Stack.Navigator
          initialRouteName="RNComponents"
          options={{gestureEnabled: false, cardStyle: styles.container}}>
          <Stack.Screen name="SessionsCarousel" component={SessionsCarousel} />
          <Stack.Screen name="FilterScreen" component={FilterScreen} />
          <Stack.Screen
            name="FriendsScheduleView"
            component={FriendsScheduleView}
          />
          <Stack.Screen name="LoginModal" component={LoginModal} />
          <Stack.Screen
            name="SharingSettingsScreen"
            component={SharingSettingsScreen}
          />
          <Stack.Screen name="RatingScreen" component={RatingScreen} />
          <Stack.Screen name="F8WebView" component={F8WebView} />
          <Stack.Screen name="F8VideoView" component={F8VideoView} />
          <Stack.Screen name="F8MapView" component={F8MapView} />
          <Stack.Screen name="DemosCarousel" component={DemosCarousel} />
          <Stack.Screen name="F8TabsView" component={F8TabsView} />
          <Stack.Screen name="CustomerComponents" component={CustomerComponents} />
          <Stack.Screen name="RNComponents" component={RNComponents} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: F8Colors.bianca,
  },
});

function select(store) {
  return {
    tab: 0,
    isLoggedIn: true,
  };
}

module.exports = connect(select)(Navigator);
