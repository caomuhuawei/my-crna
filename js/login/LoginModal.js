'use strict';

import React from 'react';
import F8Colors from '../common/F8Colors';
import {Dimensions, View, Image, StyleSheet} from 'react-native';
import {Heading2} from '../common/F8Text';
import F8BackgroundRepeat from '../common/F8BackgroundRepeat';
import F8Button from '../common/F8Button';
import LoginButton from '../common/LoginButton';

import F8Modal from '../common/F8Modal';

/* constants ================================================================ */

const WINDOW_WIDTH = Dimensions.get('window').width,
  WINDOW_HEIGHT = Dimensions.get('window').height,
  RENDER_ARROW_SECTION = WINDOW_HEIGHT <= 600 ? false : true,
  CONTENT_PADDING_V = WINDOW_HEIGHT <= 600 ? 20 : 32,
  MODAL_PADDING_H = 10,
  MODAL_WIDTH = WINDOW_WIDTH - MODAL_PADDING_H * 2;

/* <LoginModal />
============================================================================= */

class LoginModal extends React.Component {
  props: {
    onLogin: () => void,
  };

  render() {
    return (
      <F8Modal
        renderContent={this.renderContent}
        renderFooter={this.renderFooter}
        bottomGradient={[
          F8Colors.colorWithAlpha('tangaroa', 0),
          F8Colors.colorWithAlpha('tangaroa', 1),
        ]}
        {...this.props}
      />
    );
  }

  renderContent = (_) => {
    return (
      <View>
        <View style={styles.header}>
          <F8BackgroundRepeat
            width={MODAL_WIDTH}
            height={210}
            source={require('../common/img/pattern-dots.png')}
            style={styles.headerBackground}
          />
          <Image source={require('./img/login-modal.png')} />
        </View>
        <View style={styles.content}>
          <Heading2 style={styles.h2}>
            {'Log in to add sessions\nto My F8.'}
          </Heading2>
          {this.renderArrow()}
          <LoginButton onLoggedIn={this.loggedIn} />
        </View>
      </View>
    );
  };

  renderArrow() {
    if (RENDER_ARROW_SECTION) {
      return <Image style={styles.arrow} source={require('./img/arrow.png')} />;
    } else {
      return null;
    }
  }

  renderFooter = (_) => {
    return (
      <F8Button
        style={{marginBottom: 27}}
        theme="white"
        type="round"
        icon={require('../common/img/buttons/icon-x.png')}
        onPress={this.dismiss}
      />
    );
  };

  dismiss = (_) => {
    this.props.onClose && this.props.onClose();
  };

  loggedIn = (_) => {
    this.props.onLogin();
    this.dismiss();
  };
}

/* StyleSheet =============================================================== */

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    overflow: 'hidden',
  },
  headerBackground: {
    position: 'absolute',
    left: 0,
    top: 0,
  },

  content: {
    paddingHorizontal: 23,
    paddingVertical: CONTENT_PADDING_V,
    alignItems: 'center',
  },
  h2: {
    color: F8Colors.blue,
    textAlign: 'center',
    marginBottom: 20,
  },

  arrow: {
    marginBottom: 20,
  },
});

/* exports ================================================================== */
module.exports = LoginModal;
