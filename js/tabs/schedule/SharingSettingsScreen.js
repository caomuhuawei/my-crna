'use strict';

import F8Colors from '../../common/F8Colors';
import React from 'react';
import {Dimensions, View, Switch, StyleSheet} from 'react-native';
import {Text} from '../../common/F8Text';
import FriendsUsingApp from './FriendsUsingApp';
import F8Header from '../../common/F8Header';
import SharingSettingsCommon from './SharingSettingsCommon';
import {setSharingEnabled, logOutWithPrompt} from '../../actions';
import {connect} from 'react-redux';

import type {State as User} from '../../reducers/user';

// more compact on shorter devices
const WIN_HEIGHT = Dimensions.get('window').height;
const FRIENDS_AREA_SCALING = WIN_HEIGHT <= 600 ? 0.5 : 1;
const PROFILE_PICTURE_SIZE = WIN_HEIGHT <= 600 ? 120 : 158;

class SharingSettingsScreen extends React.Component {
  props: {
    dispatch: () => void,
    sharedSchedule: boolean,
    user: User,
  };

  render() {
    const navItem = {
      icon: require('../../common/img/header/back.png'),
      title: 'Back',
      layout: 'icon',
      onPress: () => this.props.navigator.goBack(),
    };
    const rightItem = {
      icon: require('../../common/img/header/logout.png'),
      title: 'Log out',
      onPress: () => this.props.dispatch(logOutWithPrompt()),
    };

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: F8Colors.bianca,
        }}>
        <F8Header
          title="Settings"
          backgroundColor={F8Colors.pink}
          titleColor={F8Colors.white}
          navItem={navItem}
          rightItem={rightItem}
        />
        <View style={styles.container}>
          <SharingSettingsCommon pictureSize={PROFILE_PICTURE_SIZE} />
          <View style={styles.switchWrapper}>
            <Text style={styles.option}>NO</Text>
            <Switch
              accessibilityLabel="Let friends view your schedule"
              style={styles.switch}
              value={!!this.props.sharedSchedule}
              onValueChange={(enabled) =>
                this.props.dispatch(setSharingEnabled(enabled))
              }
              onTintColor={F8Colors.green}
            />
            <Text style={styles.option}>YES</Text>
          </View>
        </View>
        <View style={styles.friends}>
          <FriendsUsingApp multiline={true} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switch: {
    margin: 10,
  },
  option: {
    fontSize: 12,
    color: F8Colors.lightText,
  },

  friends: {
    paddingTop: 20 * FRIENDS_AREA_SCALING,
    paddingHorizontal: 50 * FRIENDS_AREA_SCALING,
    paddingBottom: 40 * FRIENDS_AREA_SCALING,
  },
});

function select(store) {
  return {
    user: store.user,
    sharedSchedule: store.user.sharedSchedule,
  };
}

module.exports = connect(select)(SharingSettingsScreen);
