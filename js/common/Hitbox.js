'use strict';

import React from 'react';
import {TouchableWithoutFeedback, View} from 'react-native';

export default class Hitbox extends React.Component {
  render() {
    return (
      <TouchableWithoutFeedback onPress={this.props.onPress}>
        <View
          style={[
            {position: 'absolute', top: 0, left: 0, right: 0, bottom: 0},
            this.props.style,
          ]}
        />
      </TouchableWithoutFeedback>
    );
  }
}
