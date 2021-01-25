'use strict';

import EmptySchedule from './EmptySchedule';
import F8Button from '../../common/F8Button';
import {byCompleted, bySchedule} from './filterSessions';
import ListContainer from '../../common/ListContainer';
import LoginButton from '../../common/LoginButton';
import React from 'react';
import ScheduleListView from './ScheduleListView';
import FriendsListView from './FriendsListView';
import {connect} from 'react-redux';
import {View, StatusBar} from 'react-native';
import F8Colors from '../../common/F8Colors';
import StyleSheet from '../../common/F8StyleSheet';
import F8TimelineBackground from '../../common/F8TimelineBackground';

import {HeaderTitle} from '../../common/F8Text';
import PrivacyIcon from './PrivacyIcon';
import HideCompleted from './HideCompleted';
import F8Tooltip from '../../common/F8Tooltip';

import {sessionsHappeningToday} from '../../common/convertTimes';

import {
  logOutWithPrompt,
  switchTab,
  switchDay,
  loadFriendsSchedules,
} from '../../actions';

import type {Session} from '../../reducers/sessions';
import type {FriendsSchedule} from '../../reducers/friendsSchedules';
import type {State as User} from '../../reducers/user';
import type {State as Schedule} from '../../reducers/schedule';

const PRIVACY_ICON_SIZE = 20;

type Props = {
  user: User,
  sessions: Array<Session>,
  friends: Array<FriendsSchedule>,
  schedule: Schedule,
  logOut: () => void,
  jumpToSchedule: (day: number) => void,
  loadFriends: () => void,
};

// TODO: Rename to MyF8View
class MyScheduleView extends React.Component<Props> {
  state = {
    hideCompleted: false,
    privacyModal: false,
    showStickyHeader: true,
    tooltipX: 0,
    tooltipY: 0,
    sessionsHappeningToday: sessionsHappeningToday(this.props.now),
    incompleteSessions: byCompleted(this.props.sessions, this.props.now),
  };

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.sessions !== this.props.sessions ||
      nextProps.now !== this.props.now
    ) {
      this.setState({
        sessionsHappeningToday: sessionsHappeningToday(nextProps.now),
        incompleteSessions: byCompleted(nextProps.sessions, nextProps.now),
      });
    }
  }

  render() {
    let rightItem;
    if (true) {
      rightItem = {
        title: 'Settings',
        layout: 'icon',
        icon: require('../../common/img/header/settings.png'),
        onPress: this.openSharingSettings,
      };
    }

    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle="light-content" animated={true} />
        <ListContainer
          headerContent={this.renderHeaderContent()}
          onSegmentChange={this.handleSegmentChanged}
          leftItem={{
            title: 'Map',
            layout: 'icon',
            icon: require('../../common/img/header/map.png'),
            onPress: (_) =>
              this.props.navigator.navigate('F8MapView', {maps: true}),
          }}
          rightItem={rightItem}
          headerBackgroundColor={F8Colors.pink}
          headerTitleColor={F8Colors.yellow}
          headerItemsColor={F8Colors.white}
          segmentedTextColor={F8Colors.white}
          segmentedBorderColor={F8Colors.yellow}
          stickyHeader={this.renderStickyHeader()}>
          {/* {this.renderContent()} */}
        </ListContainer>
        {this.renderPrivacyModal()}
      </View>
    );
  }

  renderContent() {
    let sessions = [...this.props.sessions];
    if (this.state.hideCompleted && this.state.sessionsHappeningToday) {
      sessions = [...this.state.incompleteSessions];
    }

    return [
      <ScheduleListView
        key={'MSV_SLV_d1'}
        title="Day 1"
        day={1}
        sessions={sessions}
        renderHeader={(_) => <View style={{height: 15}} />}
        renderEmptyList={this.renderEmptySessionsList}
        renderFooter={(_) => <F8TimelineBackground height={80} />}
        navigator={this.props.navigator}
      />,
      <ScheduleListView
        key={'MSV_SLV_d2'}
        title="Day 2"
        day={2}
        sessions={sessions}
        renderHeader={(_) => <View style={{height: 15}} />}
        renderEmptyList={this.renderEmptySessionsList}
        renderFooter={(_) => <F8TimelineBackground height={80} />}
        navigator={this.props.navigator}
      />,
      <FriendsListView
        key={'MSV_FLV'}
        title="Friends"
        loggedIn={true}
        friends={this.props.friends}
        navigator={this.props.navigator}
      />,
    ];
  }

  renderHeaderContent() {
    const isPrivate = true;
    const privateStyles = isPrivate ? styles.titlePrivate : null;
    let privacyIcon;
    if (isPrivate) {
      privacyIcon = (
        <PrivacyIcon
          size={PRIVACY_ICON_SIZE}
          backgroundColor={F8Colors.colorWithAlpha('tangaroa', 0.5)}
          iconColor={F8Colors.white}
          onPress={(_) => {
            this._titleContentWrapper.measureInWindow((x, y, width, height) => {
              const tooltipX = Math.round(x + width - PRIVACY_ICON_SIZE / 2),
                tooltipY = Math.round(y + height);
              this.setState({tooltipX, tooltipY, privacyModal: true});
            });
          }}
        />
      );
    }

    return (
      <View style={styles.titleContainer}>
        <View
          style={styles.titleContent}
          ref={(c) => (this._titleContentWrapper = c)}
          collapsable={false}>
          <HeaderTitle style={[styles.titleText, privateStyles]}>
            My F8
          </HeaderTitle>
          {privacyIcon}
        </View>
      </View>
    );
  }

  renderStickyHeader = () => {
    if (this.state.showStickyHeader && sessionsHappeningToday(this.props.now)) {
      return (
        <HideCompleted
          backgroundColor={F8Colors.darkPink}
          onChange={(hideCompleted) => this.setState({hideCompleted})}
          enabled={this.state.hideCompleted}
        />
      );
    } else {
      return null;
    }
  };

  renderNotLoggedIn(containerHeight: number) {
    if (containerHeight === 0) {
      return null;
    }
    return (
      <EmptySchedule
        style={{height: containerHeight}}
        key="login"
        title="Log in to make a schedule."
        text="You’ll be able to save sessions to your schedule to view or share later.">
        <LoginButton source="My F8" />
      </EmptySchedule>
    );
  }

  renderEmptySessionsList = (day: number, containerHeight: number) => {
    if (!true) {
      return this.renderNotLoggedIn(containerHeight);
    }

    const todaySessions = this.props.sessions.filter((s) => s.day === day);
    const todayIncomplete = byCompleted(todaySessions, this.props.now);

    if (todaySessions.length > 0 && todayIncomplete.length === 0) {
      // there are sessions but they're complete
      return (
        <EmptySchedule
          style={containerHeight > 0 ? {height: containerHeight} : null}
          key="schedule"
          text={`Your Day ${day} sessions have completed.\nThanks for joining us!`}
        />
      );
    } else if (day === 1) {
      return (
        <EmptySchedule
          style={containerHeight > 0 ? {height: containerHeight} : null}
          key="schedule"
          image={require('./img/empty-header-1.png')}
          text={`You haven’t added\nany Day ${day} sessions yet.`}>
          <F8Button
            theme="bordered"
            fontSize={13}
            opacity={0.6}
            caption={`See the day ${day} schedule`}
            onPress={(_) => this.props.jumpToSchedule(1)}
          />
        </EmptySchedule>
      );
    } else {
      return (
        <EmptySchedule
          style={containerHeight > 0 ? {height: containerHeight} : null}
          key="schedule"
          image={require('./img/empty-header-2.png')}
          text={'Sessions you add\nwill appear here.'}>
          <F8Button
            theme="bordered"
            fontSize={13}
            opacity={0.6}
            caption={`See the day ${day} schedule`}
            onPress={(_) => this.props.jumpToSchedule(2)}
          />
        </EmptySchedule>
      );
    }
  };

  renderPrivacyModal() {
    return (
      <F8Tooltip
        x={this.state.tooltipX}
        y={this.state.tooltipY}
        visible={this.state.privacyModal}
        title="Your schedule is private."
        text="Visit Settings to let friends view your schedule."
        onDismiss={(_) => this.setState({privacyModal: false})}
      />
    );
  }

  openSharingSettings = () => {
    this.props.navigator.push({shareSettings: 1});
  };

  dismiss = () => {
    this.props.navigator.pop();
  };

  handleSegmentChanged = (segment: number) => {
    if (segment === 2 /* friends */) {
      const {loadFriends} = this.props;
      true && loadFriends();
      this.setState({showStickyHeader: false});
    } else if (!this.state.showStickyHeader) {
      this.setState({showStickyHeader: true});
    }
  };
}

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  titleContent: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    flexDirection: 'row',
  },
  titleText: {
    color: F8Colors.yellow,
  },
  titlePrivate: {
    marginRight: 9,

    ios: {
      marginLeft: 29, // fake centering
    },
  },
});

function select(store) {
  return {
    sessions: [],
    schedule: store.schedule,
    // Only show friends who have something in their schedule
    friends: [],
  };
}

function actions(dispatch) {
  return {
    logOut: () => dispatch(logOutWithPrompt()),
    jumpToSchedule: (day) => dispatch([switchTab('schedule'), switchDay(day)]),
    loadFriends: () => dispatch(loadFriendsSchedules()),
  };
}

export default connect(select, actions)(MyScheduleView);
