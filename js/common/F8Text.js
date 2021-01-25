'use strict';

import React from 'react';
import ReactNative from 'react-native';
import F8Colors from './F8Colors';
import F8Fonts from './F8Fonts';
import StyleSheet from './F8StyleSheet';

export function Text({
  style,
  ...props
}: Object): ReactElement<ReactNative.Text> {
  return <ReactNative.Text style={[styles.text, style]} {...props} />;
}

const styles = StyleSheet.create({
  text: {
    fontFamily: F8Fonts.default,
  },
  h1: {
    fontFamily: F8Fonts.h1,
    fontSize: F8Fonts.normalize(30),
    lineHeight: F8Fonts.lineHeight(37),
    color: F8Colors.blue,
  },
  hr: {
    height: 1,
    backgroundColor: F8Colors.colorWithAlpha('black', 0.1),
  },
  headerTitle: {
    fontFamily: F8Fonts.fontWithWeight('helvetica', 'semibold'),
    ios: {fontSize: 17},
    android: {fontSize: 20},
  },
});
