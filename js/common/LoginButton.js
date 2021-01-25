'use strict';

import React from 'react';
import {StyleSheet, Alert} from 'react-native';
import F8Button from './F8Button';
import {logInWithFacebook} from '../actions';
import {connect} from 'react-redux';

class LoginButton extends React.Component {
  props: {
    style: any,
    source?: string, // For Analytics
    dispatch: (action: any) => Promise<any>,
    onLoggedIn: ?() => void,
  };
  state: {
    isLoading: boolean,
  };
  _isMounted: boolean;

  constructor() {
    super();
    this.state = {isLoading: false};
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    if (this.state.isLoading) {
      return (
        <F8Button
          theme="fb"
          style={[styles.button, this.props.style]}
          caption="Please wait..."
          onPress={() => {}}
        />
      );
    }

    return (
      <F8Button
        theme="fb"
        style={[styles.button, this.props.style]}
        icon={require('./img/buttons/logo-fb.png')}
        caption="Continue with Facebook"
        fontSize={13}
        onPress={() => this.logIn()}
      />
    );
  }

  async logIn() {
    const {dispatch, onLoggedIn} = this.props;

    this.setState({isLoading: true});
    try {
      await Promise.all([dispatch(logInWithFacebook(this.props.source))]);
    } catch (e) {
      const message = e.message || e;
      if (message !== 'Timed out' && message !== 'Canceled by user') {
        Alert.alert(message);
      }
      return;
    } finally {
      this._isMounted && this.setState({isLoading: false});
    }

    onLoggedIn && onLoggedIn();
  }
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    width: 284,
  },
});

module.exports = connect()(LoginButton);
