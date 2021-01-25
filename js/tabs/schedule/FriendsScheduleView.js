'use strict';

import React from 'react';
import EmptySchedule from './EmptySchedule';
import {bySchedule} from './filterSessions';
import ListContainer from '../../common/ListContainer';
import ScheduleListView from './ScheduleListView';

import {View, StatusBar} from 'react-native';
import MessengerChatHead from '../../common/MessengerChatHead';

import {connect} from 'react-redux';

import type {Session} from '../../reducers/sessions';
import type {FriendsSchedule} from '../../reducers/friendsSchedules';

import F8TimelineBackground from '../../common/F8TimelineBackground';
import F8Colors from '../../common/F8Colors';

import {createSelector} from 'reselect';

type Props = {
  sessions: Array<Session>,
  friend: FriendsSchedule,
};

class FriendsScheduleView extends React.Component {
  props: Props;

  constructor(props) {
    super(props);
    (this: any).renderEmptyList = this.renderEmptyList.bind(this);
  }

  render() {
    const backItem = {
      title: 'Back',
      layout: 'icon',
      icon: require('../../common/img/header/back-blue.png'),
      onPress: () => this.props.navigator.goBack(),
    };
    const firstName = this.props.friend.name.split(' ')[0];
    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle="dark-content" animated={true} />
        <ListContainer
          title={`${firstName}'s Schedule`}
          headerBackgroundColor={F8Colors.bianca}
          headerTitleColor={F8Colors.blue}
          headerItemsColor={F8Colors.blue}
          segmentedBorderColor={F8Colors.blue}
          segmentedTextColor={F8Colors.sapphire2}
          navItem={backItem}>
          <ScheduleListView
            title="Day 1"
            day={1}
            sessions={this.props.sessions}
            renderEmptyList={this.renderEmptyList}
            renderFooter={(_) => <F8TimelineBackground />}
            navigator={this.props.navigator}
          />
          <ScheduleListView
            title="Day 2"
            day={2}
            sessions={this.props.sessions}
            renderEmptyList={this.renderEmptyList}
            renderFooter={(_) => <F8TimelineBackground />}
            navigator={this.props.navigator}
          />
        </ListContainer>
        <MessengerChatHead
          user={this.props.friend}
          style={{
            position: 'absolute',
            right: 12,
            bottom: 18,
          }}
        />
      </View>
    );
  }

  renderEmptyList(day, containerHeight) {
    return (
      <EmptySchedule
        style={{height: containerHeight}}
        title="Nothing to show."
        text={`${this.props.friend.name} has not added any sessions for day ${day}`}
      />
    );
  }
}

const data = createSelector(
  (store) => store.sessions,
  (store, props) => props.friend.schedule,
  (sessions, schedule) => bySchedule(sessions, schedule),
);

function select(store, props) {
  return {
    sessions: data(store, props),
  };
}

module.exports = connect(select)(FriendsScheduleView);
