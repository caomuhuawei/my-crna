'use strict';

import F8SessionCell from './F8SessionCell';
import {byDay} from './filterSessions';
import React from 'react';
import SessionsSectionHeader from './SessionsSectionHeader';
import PureListView from '../../common/PureListView';
import groupSessions from './groupSessions';

import type {Session} from '../../reducers/sessions';
import type {SessionsListData} from './groupSessions';

type Props = {
  day: number,
  sessions: Array<Session>,
  renderEmptyList?: (day: number) => ReactElement,
};

type State = {
  todaySessions: SessionsListData,
};

class ScheduleListView extends React.Component {
  props: Props;
  state: State;
  _innerRef: ?PureListView;

  state = {
    todaySessions: groupSessions(byDay(this.props.sessions, this.props.day)),
  };

  _innerRef = null;

  componentWillReceiveProps(nextProps: Props) {
    if (
      nextProps.sessions !== this.props.sessions ||
      nextProps.day !== this.props.day
    ) {
      this.setState({
        todaySessions: groupSessions(byDay(nextProps.sessions, nextProps.day)),
      });
    }
  }

  render() {
    return (
      <PureListView
        ref={this.storeInnerRef}
        data={this.state.todaySessions}
        renderItem={this.renderRow}
        ListEmptyComponent={this.renderEmptyList}
        {
          ...(this.props: any) /* flow can't guarantee the shape of props */
        }
      />
    );
  }

  renderSectionHeader = (sectionData: any, sectionID: string) => {
    let formatted =
      sectionID.toLowerCase().replace('am', '').replace('pm', '') || sectionID;
    return <SessionsSectionHeader title={formatted} />;
  };

  renderRow = (session: Session, day: number) => {
    return (
      <F8SessionCell
        onPress={(_) => this.openSession(session, day)}
        session={session}
        firstRow={this.isFirstSessionCell(session.id)}
      />
    );
  };

  renderEmptyList = (containerHeight: number): ?ReactElement => {
    // if listview onLayout hasn't updated container height, don't bother
    if (containerHeight === 0) {
      return null;
    } // TODO: different fix
    // otherwise render fallback cta with a valid and centerable height
    const {renderEmptyList} = this.props;
    return renderEmptyList && renderEmptyList(this.props.day, containerHeight);
  };

  openSession(session: Session, day: number) {
    let allSessions = {...this.state.todaySessions};
    this.props.navigator.navigate('SessionsCarousel', {
      day,
      session,
      allSessions,
    });
  }

  storeInnerRef = (ref: ?PureListView) => {
    this._innerRef = ref;
  };

  scrollTo(...args: Array<any>) {
    this._innerRef && this._innerRef.scrollTo(...args);
  }

  getScrollResponder(): any {
    return this._innerRef && this._innerRef.getScrollResponder();
  }

  isFirstSessionCell(id) {
    const keys = Object.keys(this.state.todaySessions);
    const innerKeys = Object.keys(this.state.todaySessions[keys[0]]);
    return id === innerKeys[0];
  }
}

module.exports = ScheduleListView;
