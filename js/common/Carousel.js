'use strict';

import React from 'react';
import ViewPager from './ViewPager';
import {Dimensions} from 'react-native';

type Props = {
  count: number,
  selectedIndex: number,
  onSelectedIndexChange?: (index: number) => void,
  renderCard: (index: number) => ReactElement<any>,
  style?: any,
};

const WINDOW_WIDTH = Dimensions.get('window').width;

class Carousel extends React.Component {
  props: Props;

  static CardWidth = WINDOW_WIDTH;

  render() {
    let cards = [];
    const {count, selectedIndex, renderCard} = this.props;

    for (let i = 0; i < count; i++) {
      let content = null;
      if (Math.abs(i - selectedIndex) < 2) {
        content = renderCard(i);
      }
      cards.push(content);
    }
    return (
      <ViewPager {...this.props} bounces={true}>
        {cards}
      </ViewPager>
    );
  }
}

export default Carousel;
