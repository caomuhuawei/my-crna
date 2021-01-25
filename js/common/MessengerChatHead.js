'use strict';

import React from 'react';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import F8Linking from './F8Linking';
import ProfilePicture from './ProfilePicture';
import MessengerModal from './MessengerModal';

/* constants ================================================================ */

const LOGO_OFFSET_RIGHT = 5,
  LOGO_OFFSET_BOTTOM = 7,
  PROFILE_PICTURE_SIZE = 54,
  CONTAINER_WIDTH = PROFILE_PICTURE_SIZE + LOGO_OFFSET_RIGHT,
  CONTAINER_HEIGHT = PROFILE_PICTURE_SIZE + LOGO_OFFSET_BOTTOM;

/* =============================================================================
<MessengerChatHead />
============================================================================= */

class MessengerChatHead extends React.Component {
  constructor() {
    super();

    this.state = {
      messengerModal: false,
    };
  }

  render() {
    const {user} = this.props;
    if (!user && user.id) {
      return false;
    } else {
      return (
        <View style={[styles.container, this.props.style]}>
          <TouchableOpacity onPress={this.onPress}>
            <ProfilePicture userID={user.id} size={PROFILE_PICTURE_SIZE} />
            <Image
              style={styles.logo}
              source={require('./img/chathead-logo.png')}
            />
          </TouchableOpacity>
          <MessengerModal
            visible={this.state.messengerModal}
            dismiss={(_) => this.setState({messengerModal: false})}
          />
        </View>
      );
    }
  }

  onPress = (_) => {
    const {user} = this.props;
    // If possible, try and link to friend's fb profile URL. If friend object
    // has no profile link, go to m.me to contact them via Messenger instead
    const userUrl = user.link || 'https://m.me';
    F8Linking.openURL(userUrl).catch(() =>
      this.setState({messengerModal: true}),
    );
  };
}

/* StyleSheet
============================================================================= */

const styles = StyleSheet.create({
  container: {
    width: CONTAINER_WIDTH,
    height: CONTAINER_HEIGHT,
  },
  logo: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
});

/* export
============================================================================= */
export default MessengerChatHead;
