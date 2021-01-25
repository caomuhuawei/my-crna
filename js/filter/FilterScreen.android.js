'use strict';

import React from 'react';
import memoize from 'memoize-one';
import F8Colors from '../common/F8Colors';
import TopicItem from './TopicItem';
import ItemsWithSeparator from '../common/ItemsWithSeparator';
import {
  Animated,
  View,
  ScrollView,
  Modal,
  TouchableOpacity,
} from 'react-native';
import StyleSheet from '../common/F8StyleSheet';
import Hitbox from '../common/Hitbox';
import {Text} from '../common/F8Text';
import {connect} from 'react-redux';

const DRAWER_WIDTH = 300;

class FilterScreen extends React.Component {
  props: {
    isLoggedIn: boolean,
    topics: Array<string>,
    selectedTopics: {[id: string]: boolean},
    dispatch: (action: any) => void,
    navigator: any,
    onClose: ?() => void,
  };
  state: {
    selectedTopics: {[id: string]: boolean},
    anim: Animated.Value,
  };

  static defaultProps = {
    topics: [],
    selectedTopics: {},
  };

  state = {
    selectedTopics: {...this.props.selectedTopics},
    anim: new Animated.Value(0),
  };

  setSelectedTopics = memoize((selectedTopics) => {
    this.setState({selectedTopics: {...selectedTopics}});
  });

  setDrawer = memoize((visible) => {
    setTimeout((_) => {
      this.showDrawer(true);
    }, 250);
  });

  componentDidUpdate() {
    const {visble, selectedTopics} = this.props;
    this.setSelectedTopics(selectedTopics);
    if (visble) {
      this.setDrawer(visble);
    }
  }

  componentDidMount(){
    const {visble, selectedTopics} = this.props;
    this.setSelectedTopics(selectedTopics);
    if (visble) {
      this.setDrawer(visble);
    }
  }

  render() {
    return (
      <Modal visible={this.props.visible} transparent={true}>
        <Hitbox
          onPress={this.close}
          style={{backgroundColor: F8Colors.colorWithAlpha('tangaroa', 0.5)}}
        />
        <View style={styles.contentWrapper}>
          <Animated.View
            style={[
              styles.contentDrawer,
              {
                transform: [
                  {
                    translateX: this.state.anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, DRAWER_WIDTH],
                    }),
                  },
                ],
              },
            ]}>
            {this.renderHeader()}
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollview}>
              {this.renderTopics()}
            </ScrollView>
          </Animated.View>
        </View>
      </Modal>
    );
  }

  renderHeader() {
    let clearButton;
    if (this.hasSelectedTopics()) {
      clearButton = (
        <TouchableOpacity style={{flex: 0}} onPress={this.clearFilter}>
          <Text style={{color: 'rgba(106,148,230,1)'}}>CLEAR</Text>
        </TouchableOpacity>
      );
    }

    return (
      <View style={styles.header}>
        <Text style={{color: F8Colors.pink, flex: 1}}>Filter</Text>
        {clearButton}
      </View>
    );
  }

  renderTopics() {
    const topics = this.props.topics.map((topic, idx) => {
      return (
        <TopicItem
          key={topic}
          topic={topic}
          icon={idx}
          isChecked={this.state.selectedTopics[topic]}
          onToggle={this.toggleTopic.bind(this, topic)}
        />
      );
    });
    return (
      <ItemsWithSeparator separatorStyle={styles.separator}>
        {topics}
      </ItemsWithSeparator>
    );
  }

  toggleTopic(topic) {
    const selectedTopics = {...this.state.selectedTopics};
    let value = !selectedTopics[topic];
    if (value) {
      selectedTopics[topic] = true;
    } else {
      delete selectedTopics[topic];
    }
    this.applyFilter(selectedTopics);
  }

  applyFilter(selectedTopics) {
    this.setState({selectedTopics});
    this.props.onApply && this.props.onApply(selectedTopics);
  }

  close = () => {
    this.showDrawer(false);
    setTimeout((_) => {
      this.props.onClose && this.props.onClose();
    }, 250);
  };

  clearFilter = () => {
    this.applyFilter({});
  };

  hasSelectedTopics() {
    return this.props.topics.some((topic) => this.state.selectedTopics[topic]);
  }

  showDrawer(visible) {
    const toValue = visible ? 0 : 1;
    const duration = visible ? 250 : 250;
    Animated.timing(this.state.anim, {toValue, duration}).start();
  }
}

const styles = StyleSheet.create({
  contentWrapper: {
    flex: 1,
    alignItems: 'flex-end',
  },
  header: {
    height: 65,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 23,
  },
  contentDrawer: {
    flex: 1,
    width: DRAWER_WIDTH,
    backgroundColor: F8Colors.tangaroa,
  },
  scrollview: {},
  separator: {
    backgroundColor: 'rgba(20, 38, 74, 1)',
  },
});

module.exports = connect()(FilterScreen);
