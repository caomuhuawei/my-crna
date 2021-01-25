'use strict';

import React from 'react';
import StyleSheet from './F8StyleSheet';
import {Text} from './F8Text';
import F8Colors from './F8Colors';
import F8Fonts from './F8Fonts';
import {View, TouchableOpacity} from 'react-native';

const BUTTON_HEIGHT = 32,
  CONTAINER_PADDING_B = 12,
  NOTIFICATION_ICON_SIZE = 5;

class F8SegmentedControl extends React.Component {
  props: {
    values: Array<string>,
    selectedIndex: number,
    onChange: (newIndex: number) => void,
    style?: any,
  };

  static defaultProps = {
    backgroundColor: F8Colors.blue,
    textColor: F8Colors.white,
    borderColor: F8Colors.white,
  };

  render() {
    const {backgroundColor, borderColor, textColor} = this.props;

    const segments = this.props.values.map((value, index) => (
      <Segment
        key={value.title}
        value={value.title}
        textColor={textColor}
        borderColor={borderColor}
        hasUpdates={value.hasUpdates}
        isSelected={index === this.props.selectedIndex}
        onPress={() => this.props.onChange(index)}
      />
    ));
    return (
      <View style={[styles.container, {backgroundColor}, this.props.style]}>
        {segments}
      </View>
    );
  }
}

class Segment extends React.Component {
  props: {
    value: string,
    borderColor: ?string,
    textColor: ?string,
    isSelected: boolean,
    onPress: () => void,
  };

  render() {
    const {value, isSelected, borderColor, textColor} = this.props;

    const title = value && value.toUpperCase();

    let selectedButtonStyle;
    if (isSelected) {
      selectedButtonStyle = {borderColor};
    }

    let accessibilityTraits = ['button'];
    if (isSelected) {
      accessibilityTraits.push('selected');
    }

    return (
      <TouchableOpacity
        accessibilityTraits={accessibilityTraits}
        activeOpacity={0.8}
        onPress={this.props.onPress}
        style={[styles.button, selectedButtonStyle]}>
        <Text style={[styles.label, {color: textColor}]}>{title}</Text>
        {this.renderNotificationIcon()}
      </TouchableOpacity>
    );
  }

  renderNotificationIcon() {
    if (this.props.hasUpdates) {
      return <View style={styles.notificationIcon} />;
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingBottom: CONTAINER_PADDING_B,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height: BUTTON_HEIGHT,
    paddingHorizontal: 20,
    borderRadius: BUTTON_HEIGHT / 2,
    borderWidth: 1,
  },
  label: {
    fontSize: 13,
    color: 'white',
    fontFamily: F8Fonts.helvetica,
  },
  notificationIcon: {
    position: 'absolute',
    right: 11,
    top: 7,
    width: NOTIFICATION_ICON_SIZE,
    height: NOTIFICATION_ICON_SIZE,
    backgroundColor: F8Colors.yellow,
    borderRadius: NOTIFICATION_ICON_SIZE / 2,
  },
});

export default F8SegmentedControl;
