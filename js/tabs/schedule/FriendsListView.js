'use strict';

import EmptySchedule from './EmptySchedule';

import React from 'react';

import InviteFriendsButton from './InviteFriendsButton';
import PureListView from '../../common/PureListView';
import FriendCell from './FriendCell';

import {View} from 'react-native';
import LoginButton from '../../common/LoginButton';

type Friend = any;

type Props = {
  friends: Array<Friend>,
};

class FriendsListView extends React.Component {
  props: Props;
  _innerRef: ?PureListView;

  constructor(props: Props) {
    super(props);

    this._innerRef = null;

    (this: any).renderRow = this.renderRow.bind(this);
    (this: any).renderFooter = this.renderFooter.bind(this);
    (this: any).renderEmptyList = this.renderEmptyList.bind(this);
    (this: any).storeInnerRef = this.storeInnerRef.bind(this);
  }

  render() {
    return (
      <PureListView
        ref={this.storeInnerRef}
        data={this.props.friends}
        renderItem={this.renderRow}
        ListEmptyComponent={this.renderEmptyList}
        renderFooter={this.renderFooter}
        {
          ...(this.props: any) /* flow can't guarantee the shape of props */
        }
      />
    );
  }

  renderRow(friend: Friend) {
    return (
      <FriendCell
        friend={friend}
        onPress={() => this.openFriendsSchedule(friend)}
      />
    );
  }

  renderEmptyList(containerHeight: number): ?ReactElement {
    if (containerHeight === 0) {
      return null;
    }
    if (!this.props.loggedIn) {
      return (
        <EmptySchedule
          style={{height: containerHeight}}
          key="login"
          title="Log in to see your friends at F8."
          text="You’ll be able to view each other’s custom schedules.">
          <LoginButton source="My F8" />
        </EmptySchedule>
      );
    }
    return (
      <EmptySchedule
        style={{height: containerHeight}}
        image={require('./img/no-friends-found.png')}
        text={'Friends using the F8 app\nwill appear here.'}>
        <InviteFriendsButton />
      </EmptySchedule>
    );
  }

  renderFooter() {
    return (
      <View style={{paddingHorizontal: 20, paddingVertical: 15}}>
        <InviteFriendsButton />
      </View>
    );
  }

  openFriendsSchedule(friend: Friend) {
    this.props.navigator.navigate('Friend', {friend});
  }

  storeInnerRef(ref: ?PureListView) {
    this._innerRef = ref;
  }

  scrollTo(...args: Array<any>) {
    this._innerRef && this._innerRef.scrollTo(...args);
  }

  getScrollResponder(): any {
    return this._innerRef && this._innerRef.getScrollResponder();
  }
}

module.exports = FriendsListView;
