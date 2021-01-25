'use strict';

import React from 'react';
import {Animated, View} from 'react-native';
import F8Header from './F8Header';
import F8SegmentedControl from './F8SegmentedControl';
import StyleSheet from './F8StyleSheet';
import ViewPager from './ViewPager';

import F8Colors from './F8Colors';
import ActionsOverlay from './ActionsOverlay';

import type {Item as HeaderItem} from './F8Header';

interface Props {
  title: string;
  leftItem?: HeaderItem;
  rightItem?: HeaderItem;
  extraItems?: Array<HeaderItem>;
  selectedSegment?: number;
  selectedSectionColor: string;
  backgroundImage: number;
  backgroundColor: string;
  parallaxContent?: ?ReactElement;
  stickyHeader?: ?ReactElement;
  onSegmentChange?: (segment: number) => void;
  children?: any;
}

interface State {
  idx: number;
  anim: Animated.Value;
  stickyHeaderHeight: number;
}

class ListContainer extends React.Component<Props, State> {
  _refs: Array<any>;
  _pinned: any;

  static defaultProps = {
    selectedSectionColor: 'white',
  };

  static contextTypes = {
    // openDrawer: React.PropTypes.func,
    // hasUnreadNotifications: React.PropTypes.number,
  };

  state = {
    idx: this.props.selectedSegment || 0,
    stickyHeaderHeight: 0,
  };
  _refs = [];

  render() {
    const segments = [];
    const content = React.Children.map(this.props.children, (child, idx) => {
      segments.push({
        title: child.props.title,
        hasUpdates: child.props.hasUpdates,
      });
      return React.cloneElement(child, {
        ref: (ref) => {
          this._refs[idx] = ref;
        },
        // onScroll: (e) => this.handleScroll(idx, e),
        style: styles.listView,
        showsVerticalScrollIndicator: false,
        scrollEventThrottle: 16,
        // contentInset: {bottom: 141, top: 0},
        automaticallyAdjustContentInsets: false,
        // renderHeader: this.renderFakeHeader,
        scrollsToTop: idx === this.state.idx,
      });
    });

    let {stickyHeader} = this.props;
    if (segments.length > 1) {
      stickyHeader = (
        <View>
          <F8SegmentedControl
            values={segments}
            selectedIndex={this.state.idx}
            onChange={this.handleSelectSegment}
            backgroundColor={this.props.headerBackgroundColor}
            textColor={this.props.segmentedTextColor}
            borderColor={this.props.segmentedBorderColor}
          />
          {stickyHeader}
        </View>
      );
    }

    let modalClose;
    if (this.props.modalClose) {
      modalClose = <ActionsOverlay onPress={this.props.modalClose} />;
    }

    return (
      <View style={styles.container}>
        <View style={styles.headerWrapper}>
          <F8Header
            title={this.props.title}
            type={this.props.headerType}
            navItem={this.props.navItem}
            leftItem={this.props.leftItem}
            rightItem={this.props.rightItem}
            extraItems={this.props.extraItems}
            backgroundColor={this.props.headerBackgroundColor}
            titleColor={this.props.headerTitleColor}
            itemsColor={this.props.headerItemsColor}>
            {this.props.headerContent}
          </F8Header>
          {stickyHeader}
        </View>
        <ViewPager
          count={segments.length}
          selectedIndex={this.state.idx}
          onSelectedIndexChange={this.handleSelectSegment}>
          {content}
        </ViewPager>
        {modalClose}
      </View>
    );
  }

  componentWillReceiveProps(nextProps: Props) {
    if (
      typeof nextProps.selectedSegment === 'number' &&
      nextProps.selectedSegment !== this.state.idx
    ) {
      this.setState({idx: nextProps.selectedSegment});
    }
  }

  handleSelectSegment = (idx: number) => {
    if (this.state.idx !== idx) {
      const {onSegmentChange} = this.props;
      this.setState({idx}, () => onSegmentChange && onSegmentChange(idx));
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: F8Colors.bianca,
  },
  headerWrapper: {
    android: {
      // elevation: 2,
      backgroundColor: 'transparent',
      // FIXME: elevation doesn't seem to work without setting border
      borderRightWidth: 1,
      marginRight: -1,
      borderRightColor: 'transparent',
    },
  },
  listView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

module.exports = ListContainer;
