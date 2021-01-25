'use strict';

import React from 'react';
import {StyleSheet, View} from 'react-native';

interface PropTypes {
  style: View.propTypes.style;
  // count: PropTypes.number.isRequired,
  // selectedIndex: PropTypes.number.isRequired,
}

class F8PageControl extends React.Component<PropTypes, {}> {
  render() {
    const images = [];
    for (let i = 0; i < this.props.count; i++) {
      const isSelected = this.props.selectedIndex === i;
      images.push(<Circle key={i} isSelected={isSelected} />);
    }
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.innerContainer}>{images}</View>
      </View>
    );
  }
}

class Circle extends React.Component {
  render() {
    const extraStyle = this.props.isSelected ? styles.full : styles.empty;
    return <View style={[styles.circle, extraStyle]} />;
  }
}

const CIRCLE_SIZE = 4;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    flexDirection: 'row',
  },
  circle: {
    margin: 2,
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
  },
  full: {
    backgroundColor: '#fff',
  },
  empty: {
    backgroundColor: '#fff5',
  },
});

F8PageControl.__cards__ = (define) => {
  define('Simple 2', () => <F8PageControl count={2} selectedIndex={0} />);
  define('Simple 5', () => <F8PageControl count={5} selectedIndex={2} />);
};

export default F8PageControl;
