'use strict';

import React from 'react';
import {View} from 'react-native';
import F8DemoDetails from './F8DemoDetails';
import F8Header from '../../common/F8Header';
import F8Colors from '../../common/F8Colors';
import F8Fonts from '../../common/F8Fonts';
import StyleSheet from '../../common/F8StyleSheet';
import Carousel from '../../common/Carousel';
import {HeaderTitle} from '../../common/F8Text';
import F8PageControl from '../../common/F8PageControl';

import {connect} from 'react-redux';

type Props = {
  allDemos: Array<mixed>,
};

class DemosCarousel extends React.Component {
  props: Props;
  state: {
    selectedIndex: number,
  };

  static defaultProps = {
    title: 'Demos',
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: props.selectedIndex,
    };

    (this: any).handleIndexChange = this.handleIndexChange.bind(this);
    (this: any).renderCard = this.renderCard.bind(this);
  }

  render() {
    const backItem = {
      title: 'Back',
      layout: 'icon',
      icon: require('../../common/img/header/back.png'),
      onPress: () => this.props.navigator.goBack(),
    };

    return (
      <View style={styles.container}>
        <F8Header
          backgroundColor={F8Colors.turquoise}
          titleColor={F8Colors.sapphire}
          navItem={backItem}>
          <View style={styles.headerContent}>
            <HeaderTitle>{this.props.title}</HeaderTitle>
            <F8PageControl
              count={this.props.allDemos.length}
              selectedIndex={this.state.selectedIndex}
            />
          </View>
        </F8Header>
        <Carousel
          count={this.props.allDemos.length}
          selectedIndex={this.state.selectedIndex}
          onSelectedIndexChange={this.handleIndexChange}
          renderCard={this.renderCard}
        />
      </View>
    );
  }

  renderCard(index: number): ReactElement {
    return (
      <F8DemoDetails
        navigator={this.props.navigator}
        demo={this.props.allDemos[index]}
      />
    );
  }

  handleIndexChange(selectedIndex: number) {
    this.setState({selectedIndex});
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: F8Colors.white,
  },
  headerContent: {
    android: {
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    ios: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  day: {
    color: F8Colors.yellow,
    fontFamily: F8Fonts.fontWithWeight(F8Fonts.basis, 'helveticaBold'),
    fontSize: 13,
  },
  time: {
    color: F8Colors.white,
    fontFamily: F8Fonts.helvetica,
    fontSize: 15,
  },
});

export default DemosCarousel;
