'use strict';

import React from 'react';
import {Image, PixelRatio} from 'react-native';

/**
 * ==============================================================================
 * <ProfilePicture />
 * ------------------------------------------------------------------------------
 * @param {String} userID Facebook user ID
 * @param {Number} size The desired profile photo size
 * @return {ReactElement}
 * ==============================================================================
 */
class ProfilePicture extends React.Component {
  props: {
    userID: string,
    size: number,
  };

  render() {
    const {userID, size} = this.props;
    const scaledSize = size * PixelRatio.get();
    const graphURL = `https://graph.facebook.com/${userID}/picture?width=${scaledSize}&height=${scaledSize}`;
    return (
      <Image
        source={{uri: graphURL}}
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
        }}
      />
    );
  }
}

module.exports = ProfilePicture;
