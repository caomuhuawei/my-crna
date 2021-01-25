'use strict';

import React from 'react';
import F8Colors from '../common/F8Colors';
import {
  StatusBar,
  Platform,
  Dimensions,
  StyleSheet,
  View,
  Image,
} from 'react-native';
// import VideoPlayer from 'react-native-native-video-player';
import PlayButton from '../common/PlayButton';

/* constants ================================================================ */

const WINDOW_WIDTH = Dimensions.get('window').width,
  VIDEO_ASPECT_RATIO = 16 / 9;

/**
 * ==============================================================================
 * <F8VideoPlayer />
 * ------------------------------------------------------------------------------
 * @param {string}   source   Video URL
 * @param {?boolean} autoplay Inline video player only
 * @param {?number}  width    View width
 * @param {?number}  height   View height
 * @return {ReactElement}
 * ==============================================================================
 */

class F8VideoPlayer extends React.Component {
  static defaultProps = {
    autoplay: false,
    backgroundImage: {},
    width: WINDOW_WIDTH,
    height: WINDOW_WIDTH / VIDEO_ASPECT_RATIO,
  };

  render() {
    const {width, height} = this.props;

    return (
      <View style={[styles.container, {width, height}, this.props.style]}>
        {this.renderBackgroundImage()}
        {this.renderPlayButton()}
      </View>
    );
  }

  componentWillUnmount() {
    // TODO: better fix for ios status disappearance bug
    Platform.OS === 'ios' && StatusBar && StatusBar.setHidden(false, true);
  }

  renderBackgroundImage() {
    const {backgroundImage} = this.props;
    if (!backgroundImage.uri) {
      return null;
    } else {
      return <Image source={backgroundImage} style={styles.backgroundImage} />;
    }
  }

  renderPlayButton() {
    return (
      <View style={styles.stretchToFill}>
        <PlayButton
          buttonColor={F8Colors.pink}
          iconColor={F8Colors.yellow}
          onPress={this.playVideo}
        />
      </View>
    );
  }

  playVideo = (_) => {
    // F8Analytics.logEvent('Video Started', 1, {id: this.props.id});
    // VideoPlayer.showVideoPlayer(this.props.source);
  };
}

/* styles =================================================================== */

const styles = StyleSheet.create({
  container: {
    backgroundColor: F8Colors.black,
  },
  backgroundImage: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    resizeMode: 'cover',
  },
  stretchToFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

/* Playground =============================================================== */

const videoPlayer = F8VideoPlayer;
videoPlayer.__cards__ = (define) => {
  define('Default', (_) => (
    <F8VideoPlayer
      videoSource={{
        uri: 'https://s3-us-west-2.amazonaws.com/f8-dev/test_video_2.mp4',
      }}
      backgroundImage={{
        uri:
          'https://scontent-atl3-1.xx.fbcdn.net/v/t15.0-10/p526x395/12402416_10153638704483553_1401883252_n.jpg?oh=fee763691545a10645d5cd868a221135&oe=58DC9BC9',
      }}
    />
  ));

  define('Autoplay', (_) => (
    <F8VideoPlayer
      autoplay={true}
      videoSource={{
        uri: 'https://s3-us-west-2.amazonaws.com/f8-dev/test_video_2.mp4',
      }}
      backgroundImage={{
        uri:
          'https://scontent-atl3-1.xx.fbcdn.net/v/t15.0-10/p526x395/12402416_10153638704483553_1401883252_n.jpg?oh=fee763691545a10645d5cd868a221135&oe=58DC9BC9',
      }}
    />
  ));
};

/* exports ================================================================== */

module.exports = videoPlayer;
