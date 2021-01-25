'use strict';

import F8Colors from '../../common/F8Colors';
import React from 'react';
import {Heading3, Text} from '../../common/F8Text';
import {StyleSheet, View} from 'react-native';

class F8SpeakerProfile extends React.Component {
  render() {
    const speaker = this.props.speaker;
    return (
      <View style={[styles.row, this.props.style]}>
        <Heading3 style={styles.name}>{speaker.name}</Heading3>
        {speaker.title ? (
          <Text style={styles.title}>{speaker.title}</Text>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    paddingBottom: 14,
  },
  name: {
    color: F8Colors.blue,
  },
  title: {
    fontSize: 13,
    lineHeight: 16,
    color: F8Colors.tangaroa,
  },
});

module.exports = F8SpeakerProfile;
