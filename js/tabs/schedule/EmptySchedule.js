'use strict';

import React from 'react';
import {Text} from '../../common/F8Text';
import StyleSheet from '../../common/F8StyleSheet';
import {View, Image} from 'react-native';
import F8Colors from '../../common/F8Colors';

class EmptySchedule extends React.Component {
  props: {
    style?: any,
    title?: string,
    titleStyles?: any,
    image?: number,
    text: string,
    textStyles?: any,
    children?: any,
  };

  render() {
    const image = this.props.image && (
      <Image style={styles.image} source={this.props.image} />
    );
    const title = this.props.title && (
      <Text style={[styles.title, this.props.titleStyles]}>
        {this.props.title}
      </Text>
    );

    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.content}>
          {image}
          {title}
          <Text style={[styles.text, this.props.textStyles]}>
            {this.props.text}
          </Text>
          {this.props.children}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  content: {
    padding: 30,
    alignItems: 'center',
  },
  image: {
    marginBottom: 20,
  },
  title: {
    color: F8Colors.blue,
    textAlign: 'center',
    marginBottom: 10,
  },
  text: {
    textAlign: 'center',
    marginBottom: 35,
  },
});

export default EmptySchedule;
