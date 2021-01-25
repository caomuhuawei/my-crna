'use strict';

import React from 'react';
import F8Colors from './F8Colors';
import {PixelRatio, StyleSheet, Animated} from 'react-native';

/* constants ================================================================ */

const TRANSLATE_Y_DISTANCE = 10;

/**
 * ==============================================================================
 * <F8ScrollingHeader />
 * ------------------------------------------------------------------------------
 * @param {string} text the title text
 * @param {?number} trigger the scroll position to trigger intro/outro animation
 * @param {?number} duration intro/outro animation duration
 * @return {ReactElement}
 * ==============================================================================
 */

export default class F8ScrollingHeader extends React.Component {
  static defaultProps = {
    trigger: 200,
    duration: 180,
    contentInset: 30,
  };

  constructor(props) {
    super(props);

    this.state = {
      revealed: false,
      anim: new Animated.Value(0),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.scrollTop !== this.props.scrollTop) {
      let toValue = null;
      const {revealed} = this.state;
      const {trigger, scrollTop, duration} = nextProps;
      if (!revealed && scrollTop >= trigger) {
        toValue = 1;
      } else if (revealed && scrollTop < trigger) {
        toValue = 0;
      }
      if (toValue !== null) {
        this.setState({revealed: toValue === 1 ? true : false});
        Animated.timing(this.state.anim, {toValue, duration}).start();
      }
    }
  }

  render() {
    const {text} = this.props;

    return (
      <Animated.View
        style={[
          styles.container,
          {
            left: Math.max(this.props.contentInset - 6, 0),
            right: Math.max(this.props.contentInset - 6, 0),
          },
          {opacity: this.state.anim, overflow: 'hidden'},
        ]}>
        <Animated.Text
          numberOfLines={1}
          style={[
            styles.text,
            {
              transform: [
                {
                  translateY: this.state.anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-TRANSLATE_Y_DISTANCE, 0],
                  }),
                },
              ],
            },
          ]}>
          {text}
        </Animated.Text>
      </Animated.View>
    );
  }
}

/* StyleSheet =============================================================== */

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    paddingVertical: 9,
    paddingHorizontal: 6,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: 'rgba(153, 162, 178, 1)',
  },
  text: {
    fontSize: 13,
    color: F8Colors.tangaroa,
  },
});
