'use strict';

import React from 'react';
import {View, Image} from 'react-native';

/**
 * ==============================================================================
 * <F8BackgroundRepeat />
 * ------------------------------------------------------------------------------
 * @param {number} source ReactNative asset source
 * @param {number} width repeating container width
 * @param {number} height repeating container height
 * @return {ReactElement}
 * ==============================================================================
 */
class F8BackgroundRepeat extends React.Component {
  static __cards__;

  render() {
    const {source, width, height} = this.props;
    const img = Image.resolveAssetSource(source);
    const content = [];

    const numHorizontal = Math.ceil(width / img.width);
    const numVertical = Math.ceil(height / img.height);

    for (let i = 0; i < numVertical; i++) {
      content.push(this.renderRow(numHorizontal, i));
    }

    return (
      <View
        style={[
          {width, height, zIndex: 0, overflow: 'hidden'},
          this.props.style,
        ]}>
        {content}
      </View>
    );
  }

  renderRow(colsInRow: number, idx: number) {
    const cols = [];
    for (let i = 0; i < colsInRow; i++) {
      cols.push(this.renderImage(i));
    }
    return (
      <View key={`bgRptRow${idx}`} style={{flexDirection: 'row'}}>
        {cols}
      </View>
    );
  }

  renderImage(idx: number) {
    return <Image key={`bgRptImg${idx}`} source={this.props.source} />;
  }
}

const backgroundRepeat = F8BackgroundRepeat;
backgroundRepeat.__cards__ = (define) => {
  define('Back Buttons', (_) => (
    <F8BackgroundRepeat
      style={{backgroundColor: 'black'}}
      width={350}
      height={80}
      source={require('./img/header/back.png')}
    />
  ));
  define('F8 Logos', (_) => (
    <F8BackgroundRepeat
      style={{backgroundColor: 'black'}}
      width={250}
      height={200}
      source={require('./img/webview/logo.png')}
    />
  ));
  define('Dot Pattern', (_) => (
    <F8BackgroundRepeat
      style={{backgroundColor: 'white'}}
      width={300}
      height={300}
      source={require('./img/pattern-dots.png')}
    />
  ));
};

export default backgroundRepeat;
