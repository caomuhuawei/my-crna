import React from 'react';
import {View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import StyleSheet from './F8StyleSheet';
import F8Colors from './F8Colors';
import F8TimelineSegment from './F8TimelineSegment';

/* =============================================================================
<F8TimelineBackground />
============================================================================= */

class F8TimelineBackground extends React.Component {
  static defaultProps = {
    left: 77,
    height: 118,
    fadeOut: true,
  };

  render() {
    const {style, left, fadeOut, height} = this.props;
    let gradient = fadeOut ? this.renderGradient() : null;
    return (
      <View style={[styles.container, {height}, style]}>
        <F8TimelineSegment left={left} dot={false} />
        {gradient}
      </View>
    );
  }

  renderGradient() {
    return (
      <LinearGradient
        pointerEvents="none"
        start={{x: 0.5, y: 0}}
        end={{x: 0.5, y: 1}}
        style={styles.gradient}
        colors={[
          F8Colors.colorWithAlpha('bianca', 0),
          F8Colors.colorWithAlpha('bianca', 1),
        ]}
      />
    );
  }
}

/* StyleSheet
============================================================================= */
const styles = StyleSheet.create({
  container: {},
  gradient: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
});

/* Export
============================================================================= */
export default F8TimelineBackground;
