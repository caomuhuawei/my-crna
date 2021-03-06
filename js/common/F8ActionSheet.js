'use strict';

import React from 'react';
import {Modal, Animated, View, Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {Text} from './F8Text';
import StyleSheet from './F8StyleSheet';
import F8Colors from './F8Colors';
import F8Button from './F8Button';
import Hitbox from './Hitbox';

const GRADIENT_HEIGHT = 220,
  BUTTON_PADDING_T = 15,
  BUTTON_PADDING_H = 17,
  BUTTON_PADDING_B = 18,
  BUTTON_ANIM_DIST = 50,
  INTRO_ANIM_DUR = 180,
  OUTRO_ANIM_DUR = 150;

/**
 * ==============================================================================
 * <F8ActionSheet />
 * ------------------------------------------------------------------------------
 * @param {Array<Object>} actions Action buttons to render { text:str, onPress:fn }
 * @param {function} onCancel 'x' button callback (called after outro animation)
 * @param {?string} title Actions header
 * @return {ReactElement}
 * ==============================================================================
 */

class F8ActionSheet extends React.Component {
  constructor() {
    super();

    this.outro = this.outro.bind(this);

    this.state = {
      revealed: false,
      introTransition: new Animated.Value(0),
    };

    this.animatedContainer = {
      opacity: this.state.introTransition,
    };
    this.animatedContent = {
      marginBottom: this.state.introTransition.interpolate({
        inputRange: [0, 1],
        outputRange: [-BUTTON_ANIM_DIST, 0],
      }),
    };

    Animated.timing(this.state.introTransition, {
      toValue: 1,
      duration: INTRO_ANIM_DUR,
      useNativeDriver: false,
    }).start();
  }

  render() {
    let actions = (this.props.actions || []).map((action, index) =>
      this.renderAction(action, index),
    );
    let title = this.props.title ? (
      <Text style={styles.title}>{this.props.title}</Text>
    ) : null;

    return (
      <Modal animationType="none" visible={true} transparent={true}>
        <Animated.View style={[styles.container, this.animatedContainer]}>
          <Hitbox
            onPress={(_) => this.outro(this.props.onCancel)}
            style={{backgroundColor: 'rgba(3, 3, 3, 1)'}}
          />
          <Animated.View style={this.animatedContent} pointerEvents="box-none">
            <View pointerEvents="none">
              <LinearGradient
                start={{x: 0.5, y: 0}}
                end={{x: 0.5, y: 1}}
                style={styles.gradient}
                colors={[
                  F8Colors.colorWithAlpha('tangaroa', 0),
                  F8Colors.colorWithAlpha('tangaroa', 0.8),
                ]}
              />
            </View>
            <View style={styles.buttonGroup}>
              {title}
              {actions}
              {this.renderCancel()}
            </View>
          </Animated.View>
        </Animated.View>
      </Modal>
    );
  }

  renderAction(obj, i) {
    return (
      <F8Button
        key={`F8ASAB-${obj.text}`}
        style={styles.actionBtn}
        caption={obj.text}
        onPress={() => this.outro(obj.onPress)}
      />
    );
  }

  renderCancel() {
    return (
      <F8Button
        key="F8ASCB"
        theme="white"
        type="round"
        style={styles.cancelBtn}
        icon={require('./img/buttons/icon-x.png')}
        onPress={(_) => this.outro(this.props.onCancel)}
      />
    );
  }

  outro(cb) {
    Animated.timing(this.state.introTransition, {
      toValue: 0,
      duration: OUTRO_ANIM_DUR,
      useNativeDriver: false,
    }).start(cb);
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: F8Colors.colorWithAlpha('tangaroa', 0.5),
  },
  gradient: {
    height: GRADIENT_HEIGHT,
  },
  buttonGroup: {
    paddingTop: BUTTON_PADDING_T,
    paddingHorizontal: BUTTON_PADDING_H,
    paddingBottom: BUTTON_PADDING_B,
    backgroundColor: F8Colors.colorWithAlpha('tangaroa', 0.8),
  },
  actionBtn: {
    marginBottom: 10,
  },
  cancelBtn: {
    alignSelf: 'center',
    marginTop: 5,
  },
  title: {
    color: F8Colors.white,
    fontSize: 18,
    textAlign: 'center',
    padding: 20,
  },
});

const actionSheet = F8ActionSheet;
actionSheet.__cards__ = (define) => {
  const exampleActions = [
    {text: 'Action 1', onPress: () => Alert.alert('Do action 1!')},
    {text: 'Action 2', onPress: () => Alert.alert('Do action 2!')},
  ];

  define('Default', () => (
    <F8ActionSheet
      actions={exampleActions}
      title="This is a title!"
      onCancel={() => Alert.alert('Cancel')}
    />
  ));
};

export default actionSheet;
