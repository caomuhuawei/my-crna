'use strict';

import React from 'react';
import F8Colors from './F8Colors';
import {StyleSheet, View, TouchableOpacity, Image, Alert} from 'react-native';

const BUTTON_SIZE = 76,
  BUTTON_SIZE_SM = 16;

/**
 * ==============================================================================
 * <PlayButton />
 * ------------------------------------------------------------------------------
 * @param {?string} type Display style default "large" || "small"
 * @param {?string} buttonColor Background color
 * @param {?string} iconColor Icon tint color
 * @param {?function} onPress event callback
 * @return {ReactElement}
 * ==============================================================================
 */

class PlayButton extends React.Component {
  static defaultProps = {
    type: 'large',
    buttonColor: F8Colors.yellow,
    iconColor: F8Colors.pink,
  };

  render() {
    // color theming (with defaults)
    const buttonColorStyles = {backgroundColor: this.props.buttonColor};
    const iconColorStyles = {tintColor: this.props.iconColor};
    // size variation
    const {buttonSizeStyles, iconSizeStyles, iconImage} = this.getSizeStyles();
    // icon element
    const image = (
      <Image
        style={[styles.icon, iconColorStyles, iconSizeStyles]}
        source={iconImage}
      />
    );

    // return TouchableOpacity container if there's an onPress handler else use a View
    if (this.props.onPress) {
      return (
        <TouchableOpacity
          onPress={this.onPress}
          activeOpacity={0.8}
          style={[styles.button, buttonColorStyles, buttonSizeStyles]}>
          {image}
        </TouchableOpacity>
      );
    } else {
      return (
        <View style={[styles.button, buttonColorStyles, buttonSizeStyles]}>
          {image}
        </View>
      );
    }
  }

  onPress = (_) => {
    this.props.onPress && this.props.onPress();
  };

  getSizeStyles() {
    const {type} = this.props;
    let buttonSizeStyles, iconSizeStyles, iconImage;
    if (type === 'small') {
      buttonSizeStyles = {
        width: BUTTON_SIZE_SM,
        height: BUTTON_SIZE_SM,
        borderRadius: BUTTON_SIZE_SM / 2,
      };
      iconSizeStyles = {transform: [{translateX: 0.5}]};
      iconImage = require('./img/buttons/play-small.png');
    } else {
      buttonSizeStyles = {
        width: BUTTON_SIZE,
        height: BUTTON_SIZE,
        borderRadius: BUTTON_SIZE / 2,
      };
      iconSizeStyles = {transform: [{translateX: 4}]};
      iconImage = require('./img/buttons/play-large.png');
    }
    return {buttonSizeStyles, iconSizeStyles, iconImage};
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    tintColor: 'white',
  },
});

const playButton = PlayButton;
playButton.__cards__ = (define) => {
  define('Large Yellow/Pink (Default)', (_) => <PlayButton />);
  define('Small Yellow/Pink', (_) => <PlayButton type="small" />);

  define('Large Blue/Green', (_) => (
    <PlayButton
      buttonColor={F8Colors.blue}
      iconColor={F8Colors.green}
      onPress={() => Alert.alert('<PlayButton /> pressed!')}
    />
  ));

  define('Small Pink/Yellow', (_) => (
    <PlayButton
      type="small"
      buttonColor={F8Colors.pink}
      iconColor={F8Colors.yellow}
      onPress={() => Alert.alert('<PlayButton /> pressed!')}
    />
  ));
};

export default playButton;
