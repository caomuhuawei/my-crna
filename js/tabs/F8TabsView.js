'use strict';

import React from 'react';
import {PixelRatio, Platform, StatusBar, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import F8Fonts from '../common/F8Fonts';
import F8Colors from '../common/F8Colors';
import StyleSheet from '../common/F8StyleSheet';

import F8InfoView from './info/F8InfoView';
import MyScheduleView from './schedule/MyScheduleView';
import GeneralScheduleView from './schedule/GeneralScheduleView';
import F8VideosView from './videos/F8VideosView';
import F8DemosView from './demos/F8DemosView';

const BADGE_SIZE = 14,
  BADGE_PADDING_H = 3;

const Tab = createBottomTabNavigator();

class F8TabsView extends React.Component {
  componentDidMount() {
    if (Platform.OS === 'ios') {
      StatusBar && StatusBar.setBarStyle('light-content');
    }
  }

  render() {
    console.log('F8TabsView2');
    return (
      <Tab.Navigator
        style={styles.tabBar}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            return (
              <Ionicons
                name={focused ? 'add-circle' : 'add-circle-outline'}
                size={size}
                color={color}
              />
            );
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}>
        {/* <Tab.Screen name="Schedule" component={GeneralScheduleView} /> */}
        <Tab.Screen name="MyF8" component={MyScheduleView} />
        {/*<Tab.Screen name="Demos" component={F8DemosView} />
        <Tab.Screen name="Videos" component={F8VideosView} />
        <Tab.Screen
          name="Info"
          component={F8InfoView}
          options={{tabBarBadge: 3}}
        /> */}
      </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  tabBar: {
    borderTopWidth: 1 / PixelRatio.get(),
    borderTopColor: F8Colors.magnesium,
    backgroundColor: F8Colors.lightBackground,
  },
  tabTitle: {
    backgroundColor: 'transparent',
    fontSize: 10,
    color: F8Colors.colorWithAlpha('sapphire', 0.65),
  },
  tabTitleActive: {
    color: F8Colors.sapphire,
  },
  badge: {
    position: 'absolute',
    right: -5,
    top: 2,
    backgroundColor: F8Colors.pink,
    borderRadius: BADGE_SIZE / 2,
    height: BADGE_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeFixed: {
    width: BADGE_SIZE,
  },
  badgeFlexible: {
    paddingHorizontal: BADGE_PADDING_H,
  },
  badgeText: {
    backgroundColor: 'transparent',
    fontSize: 9,
    fontFamily: F8Fonts.fontWithWeight(F8Fonts.basis, 'helveticaBold'),
    color: F8Colors.white,

    ios: {
      lineHeight: 10,
    },
  },
  iconWrapper: {
    width: 28,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: -3,
  },
});

export default F8TabsView;
