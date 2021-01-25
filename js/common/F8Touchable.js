'use strict';

import React from 'react';
import {
  TouchableHighlight,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';

function F8TouchableIOS(props: Object): ReactElement<TouchableHighlight> {
  return (
    <TouchableHighlight
      accessibilityTraits="button"
      underlayColor="rgba(0,0,0,0.05)"
      {...props}
    />
  );
}

const F8Touchable =
  Platform.OS === 'android' ? TouchableNativeFeedback : F8TouchableIOS;

export default F8Touchable;
