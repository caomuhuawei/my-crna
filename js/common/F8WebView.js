'use strict';

import React from 'react';
import F8Colors from './F8Colors';
import F8Header from './F8Header';
import F8Linking from './F8Linking';
import StyleSheet from './F8StyleSheet';
import {
  Platform,
  InteractionManager,
  View,
  Keyboard,
  PixelRatio,
  WebView,
  TouchableOpacity,
  Image,
} from 'react-native';

/* constants ================================================================ */

const NAVBAR_HEIGHT_IOS = 45,
  STATUS_BAR_HEIGHT_ANDROID =
    Platform.OS === 'android' && Platform.Version && Platform.Version < 21
      ? 0
      : 25,
  NAVBAR_HEIGHT_ANDROID = 55 + STATUS_BAR_HEIGHT_ANDROID, // old android status bar issue (fix from F8Header)
  DISABLED_OPACITY = 0.3;

/**
 * ==============================================================================
 * <F8WebView />
 * ------------------------------------------------------------------------------
 * @param {string} url WebView source prop
 * @param {AnyObject} navigator Navigator for back button 'pop'
 * @param {?string} backgroundColor Optional header background color
 * @param {?string} titleColor Optional header title color
 * @param {?string} itemsColor Optional header items color
 * @return {ReactElement}
 * ==============================================================================
 */

class F8WebView extends React.Component {
  static defaultProps = {
    backgroundColor: F8Colors.salmon,
    titleColor: F8Colors.white,
    itemsColor: F8Colors.white,
  };

  constructor(props) {
    super(props);

    const {url} = this.props;
    this.state = {
      url,
      canNavigateBack: false,
      canNavigateForward: false,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderPlatformHeader()}
        <Loading>
          <View style={{flex: 1}}>
            <WebView
              ref={(c) => (this._webview = c)}
              onNavigationStateChange={this.onNavigationStateChange}
              style={styles.webview}
              source={{uri: this.props.url}}
              scalesPageToFit={true}
            />
            {Platform.OS === 'ios' ? this.renderNavigationBarIOS() : null}
          </View>
        </Loading>
      </View>
    );
  }

  renderPlatformHeader() {
    const {backgroundColor, titleColor, itemsColor} = this.props;

    if (Platform.OS === 'ios') {
      return (
        <F8Header
          backgroundColor={backgroundColor}
          titleColor={titleColor}
          itemsColor={itemsColor}
          leftItem={{
            title: 'Done',
            onPress: this.dismiss,
          }}>
          <Image
            style={{tintColor: titleColor}}
            source={require('./img/webview/logo.png')}
          />
        </F8Header>
      );
    } else {
      return (
        <WebViewNavigationAndroid
          backgroundColor={backgroundColor}
          titleColor={titleColor}
          itemsColor={itemsColor}
          canBack={this.state.canNavigateBack}
          canForward={this.state.canNavigateForward}
          onDismiss={this.dismiss}
          onBack={(_) => this.navigate('BACK')}
          onForward={(_) => this.navigate('FORWARD')}
          onBrowser={(_) => this.navigate('BROWSER')}
        />
      );
    }
  }

  renderNavigationBarIOS() {
    return (
      <WebViewNavigationIOS
        canBack={this.state.canNavigateBack}
        canForward={this.state.canNavigateForward}
        onBack={(_) => this.navigate('BACK')}
        onForward={(_) => this.navigate('FORWARD')}
        onBrowser={(_) => this.navigate('BROWSER')}
      />
    );
  }

  navigate(intent) {
    if (intent === 'BACK' && this.state.canNavigateBack) {
      this._webview.goBack && this._webview.goBack();
    } else if (intent === 'FORWARD' && this.state.canNavigateForward) {
      this._webview.goForward && this._webview.goForward();
    } else if (intent === 'BROWSER') {
      F8Linking.openURL(this.state.url);
    }
  }

  onNavigationStateChange = (navState) => {
    this.setState({
      canNavigateBack: navState.canGoBack,
      canNavigateForward: navState.canGoForward,
      url: navState.url,
    });
  };

  dismiss = (_) => {
    this.props.navigator.pop();
    Keyboard.dismiss();
  };
}

/* =============================================================================
<Loading /> (iOS & Android)
--------------------------------------------------------------------------------
Wait until WebView is ready before rendering children.
============================================================================= */
class Loading extends React.Component {
  state = {
    loaded: false,
  };

  componentDidMount() {
    InteractionManager.runAfterInteractions(() =>
      this.setState({loaded: true}),
    );
  }

  render() {
    if (this.state.loaded) {
      return React.Children.only(this.props.children);
    }
    return null;
  }
}

/* =============================================================================
<WebViewNavigationIOS />
--------------------------------------------------------------------------------
Back, forward and open in a browser
============================================================================= */
class WebViewNavigationIOS extends React.Component {
  render() {
    return (
      <View style={styles.navBar}>
        <View style={styles.navBarArrows}>
          <TouchableOpacity
            onPress={(_) => this.props.onBack && this.props.onBack()}
            disabled={!this.props.canBack}
            style={styles.navBarAction}>
            <Image
              style={!this.props.canBack ? {opacity: DISABLED_OPACITY} : null}
              source={require('./img/webview/back.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={(_) => this.props.onForward && this.props.onForward()}
            disabled={!this.props.canForward}
            style={styles.navBarAction}>
            <Image
              style={
                !this.props.canForward ? {opacity: DISABLED_OPACITY} : null
              }
              source={require('./img/webview/forward.png')}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={(_) => this.props.onBrowser && this.props.onBrowser()}
          style={styles.navBarAction}>
          <Image source={require('./img/webview/browser.png')} />
        </TouchableOpacity>
      </View>
    );
  }
}

/* =============================================================================
<WebViewNavigationAndroid />
--------------------------------------------------------------------------------
Back, forward and open in a browser
============================================================================= */
class WebViewNavigationAndroid extends React.Component {
  render() {
    const {backgroundColor, itemsColor} = this.props;

    return (
      <View style={[styles.navBar, {backgroundColor}]}>
        <View style={styles.navBarContent}>
          <TouchableOpacity
            onPress={(_) => this.props.onDismiss && this.props.onDismiss()}
            style={styles.navBarDismiss}>
            <Image
              style={{tintColor: itemsColor}}
              source={require('./img/webview/close.png')}
            />
          </TouchableOpacity>

          <View style={styles.navBarArrows}>
            <TouchableOpacity
              onPress={(_) => this.props.onBack && this.props.onBack()}
              disabled={!this.props.canBack}
              style={styles.navBarAction}>
              <Image
                style={[
                  {tintColor: itemsColor},
                  !this.props.canBack ? {opacity: DISABLED_OPACITY} : null,
                ]}
                source={require('./img/webview/back.png')}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={(_) => this.props.onForward && this.props.onForward()}
              disabled={!this.props.canForward}
              style={styles.navBarAction}>
              <Image
                style={[
                  {tintColor: itemsColor},
                  !this.props.canForward ? {opacity: DISABLED_OPACITY} : null,
                ]}
                source={require('./img/webview/forward.png')}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={(_) => this.props.onBrowser && this.props.onBrowser()}
              style={styles.navBarAction}>
              <Image
                style={{tintColor: itemsColor}}
                source={require('./img/webview/browser.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: F8Colors.bianca,
  },
  webview: {
    flex: 1,
  },

  navBar: {
    ios: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: NAVBAR_HEIGHT_IOS,
      backgroundColor: F8Colors.bianca,
      borderTopWidth: 1 / PixelRatio.get(),
      borderColor: F8Colors.magnesium,
    },
    android: {
      height: NAVBAR_HEIGHT_ANDROID,
      paddingHorizontal: 10,
      paddingBottom: 10,
      justifyContent: 'flex-end',
    },
  },

  navBarContent: {
    android: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  },

  navBarArrows: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    ios: {
      width: 150,
    },
    android: {
      width: 122,
      alignItems: 'center',
    },
  },

  navBarDismiss: {
    android: {
      padding: 5,
    },
  },

  navBarAction: {
    ios: {
      justifyContent: 'center',
      paddingHorizontal: 15,
    },
    android: {
      padding: 5,
    },
  },
});

const webView = F8WebView;
webView.__cards__ = (define) => {
  define('Default', (_) => <F8WebView url="https://fbf8.com" />);
};

export default webView;
