'use strict';
import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ActionsOverlay from '../common/ActionsOverlay';
import Carousel from '../common/Carousel';
import F8ActionSheet from '../common/F8ActionSheet';
import F8BackgroundRepeat from '../common/F8BackgroundRepeat';
import F8Button from '../common/F8Button';
import F8Header from '../common/F8Header';
import F8Linking from '../common/F8Linking';
import F8Modal from '../common/F8Modal';
import F8PageControl from '../common/F8PageControl';
import F8ScrollingHeader from '../common/F8ScrollingHeader';
import F8SegmentedControl from '../common/F8SegmentedControl';
import F8TimelineBackground from '../common/F8TimelineBackground';
import F8TimelineSegment from '../common/F8TimelineSegment';
import F8Toast from '../common/F8Toast';
import F8Tooltip from '../common/F8Tooltip';
import F8WebView from '../common/F8WebView';
import LaunchScreen from '../common/LaunchScreen';
import MessengerModal from '../common/MessengerModal';
import PlayButton from '../common/PlayButton';
import Playground from '../Playground';
const Drawer = createDrawerNavigator();

export default function CustomerComponents() {
  return (
    <Drawer.Navigator initialRouteName="ActionsOverlay">
      <Drawer.Screen
        name="ActionsOverlay"
        component={Playground}
        initialParams={{target: ActionsOverlay}}
      />
      {/* <Drawer.Screen
        name="Carousel"
        component={Playground}
        initialParams={{target: Carousel}}
      /> */}
      <Drawer.Screen
        name="F8ActionSheet"
        component={Playground}
        initialParams={{target: F8ActionSheet}}
      />
      <Drawer.Screen
        name="F8BackgroundRepeat"
        component={Playground}
        initialParams={{target: F8BackgroundRepeat}}
      />
      <Drawer.Screen
        name="F8Button"
        component={Playground}
        initialParams={{target: F8Button}}
      />
      <Drawer.Screen
        name="F8Header"
        component={Playground}
        initialParams={{target: F8Header}}
      />
      <Drawer.Screen
        name="F8Linking"
        component={Playground}
        initialParams={{target: F8Linking}}
      />
      <Drawer.Screen
        name="F8Modal"
        component={Playground}
        initialParams={{target: F8Modal}}
      />
      <Drawer.Screen
        name="F8PageControl"
        component={Playground}
        initialParams={{target: F8PageControl}}
      />
      <Drawer.Screen
        name="F8ScrollingHeader"
        component={Playground}
        initialParams={{target: F8ScrollingHeader}}
      />
      <Drawer.Screen
        name="F8SegmentedControl"
        component={Playground}
        initialParams={{target: F8SegmentedControl}}
      />
      <Drawer.Screen
        name="F8TimelineBackground"
        component={Playground}
        initialParams={{target: F8TimelineBackground}}
      />
      <Drawer.Screen
        name="F8TimelineSegment"
        component={Playground}
        initialParams={{target: F8TimelineSegment}}
      />
      <Drawer.Screen
        name="F8Toast"
        component={Playground}
        initialParams={{target: F8Toast}}
      />
      <Drawer.Screen
        name="F8Tooltip"
        component={Playground}
        initialParams={{target: F8Tooltip}}
      />
      <Drawer.Screen
        name="F8WebView"
        component={Playground}
        initialParams={{target: F8WebView}}
      />
      <Drawer.Screen
        name="LaunchScreen"
        component={Playground}
        initialParams={{target: LaunchScreen}}
      />
      <Drawer.Screen
        name="MessengerModal"
        component={Playground}
        initialParams={{target: MessengerModal}}
      />
      <Drawer.Screen
        name="PlayButton"
        component={Playground}
        initialParams={{target: PlayButton}}
      />
    </Drawer.Navigator>
  );
}
