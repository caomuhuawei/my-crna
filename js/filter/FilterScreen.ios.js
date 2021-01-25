'use strict';

import React from 'react';
import memoize from 'memoize-one';
import F8Header from '../common/F8Header';
import F8Colors from '../common/F8Colors';
import TopicItem from './TopicItem';
import F8Button from '../common/F8Button';
import ItemsWithSeparator from '../common/ItemsWithSeparator';
import {View, ScrollView} from 'react-native';
import StyleSheet from '../common/F8StyleSheet';
import ActionsOverlay from '../common/ActionsOverlay';

import shallowEqual from 'fbjs/lib/shallowEqual';
import {connect} from 'react-redux';

class FilterScreen extends React.Component {
  props: {
    topics: Array<string>,
    selectedTopics: {[id: string]: boolean},
    dispatch: (action: any) => void,
    navigator: any,
    onClose: ?() => void,
  };
  state: {
    selectedTopics: {[id: string]: boolean},
  };

  static defaultProps = {
    topics: [],
    selectedTopics: {},
  };

  state = {
      selectedTopics: {...this.props.selectedTopics},
    };
  }

  setSelectedTopics = memoize((selectedTopics) => {
    this.setState({selectedTopics: {...selectedTopics}});
  });

  componentDidUpdate() {
    const {selectedTopics} = this.props;
    this.setSelectedTopics(selectedTopics);
  
  }

  componentDidMount(){
    const { selectedTopics} = this.props;
    this.setSelectedTopics(selectedTopics);
   
  }

  render() {
    let rightItem;
    if (this.hasSelectedTopics()) {
      rightItem = {
        title: 'Clear',
        icon: require('../common/img/x-white.png'),
        onPress: this.clearFilter,
      };
    }

    return (
      <View style={styles.container}>
        <F8Header
          title="Filter"
          backgroundColor={F8Colors.tangaroa}
          titleColor={F8Colors.pink}
          rightItem={rightItem}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollview}>
          {this.renderTopics()}
        </ScrollView>
        {this.renderActions()}
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

  renderActions() {
    let applyButton;
    if (true) {
      applyButton = (
        <F8Button
          style={{flex: 1}}
          caption="Apply"
          onPress={this.applyFilter}
        />
      );
    } else {
      applyButton = (
        <F8Button theme="disabled" style={{flex: 1}} caption="Apply" />
      );
    }

    return (
      <ActionsOverlay style={styles.actions}>
        {applyButton}
        <F8Button
          theme="white"
          type="round"
          style={{marginLeft: 7}}
          icon={require('../common/img/buttons/icon-x.png')}
          onPress={this.close}
        />
      </ActionsOverlay>
    );
  }

  toggleTopic(topic) {
    const selectedTopics = {...this.state.selectedTopics};
    const value = !selectedTopics[topic];
    if (value) {
      selectedTopics[topic] = true;
    } else {
      delete selectedTopics[topic];
    }
    this.setState({selectedTopics});
  }

  applyFilter=() =>{
    this.props.onApply && this.props.onApply(this.state.selectedTopics);
    this.close();
  }

  close=() =>{
    const {navigator, onClose} = this.props;
    if (navigator) {
      requestAnimationFrame(() => navigator.pop());
    }
    if (onClose) {
      onClose();
    }
  }

  clearFilter=()=> {
    this.setState({selectedTopics: {}});
  }

  hasSelectedTopics() {
    return this.props.topics.some((topic) => this.state.selectedTopics[topic]);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: F8Colors.tangaroa,
  },
  scrollview: {
    ios: {
      paddingTop: 20,
      paddingBottom: ActionsOverlay.height,
    },
  },
  separator: {
    backgroundColor: 'rgba(20, 38, 74, 1)',
  },
  actions: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    // alignItems: 'stretch'
  },
});

module.exports = connect()(FilterScreen);
