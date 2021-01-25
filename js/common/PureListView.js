'use strict';

import React from 'react';
import {FlatList} from 'react-native';

type Rows = Array<Object>;
type RowsAndSections = {
  [sectionID: string]: Object,
};

export type Data = Rows | RowsAndSections;
type RenderElement = () => ?ReactElement;

type Props = {
  data: array,
  renderEmptyList?: ?RenderElement,
  minContentHeight: number,
  contentInset: {top: number, bottom: number},
};

type State = {
  contentHeight: number,
  data: array,
};

class PureListView extends React.Component {
  props: Props;
  state: State;

  static defaultProps = {
    data: [],
    contentInset: {top: 0, bottom: 0},
    minContentHeight: 0,
  };

  state = {
    contentHeight: 0,
    containerHeight: 0,
    data: this.props.data,
  };

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.data !== nextProps.data) {
      this.setState({
        data: nextProps.data,
      });
    }
  }

  render() {
    const {contentInset} = this.props;
    const bottom =
      contentInset.bottom +
      Math.max(0, this.props.minContentHeight - this.state.contentHeight);
    return (
      <FlatList
        {...this.props}
        ref={(c) => (this._ListView = c)}
        data={this.state.data}
        ListHeaderComponent={this.renderHeader}
        ListFooterComponent={this.renderFooter}
        // contentContainerStyle={{bottom, top: contentInset.top}}
        onContentSizeChange={this.onContentSizeChange}
        onLayout={(event) => {
          const {height} = event.nativeEvent.layout;
          if (this.state.containerHeight !== height) {
            this.setState({containerHeight: height});
          }
        }}
      />
    );
  }

  onContentSizeChange = (contentWidth: number, contentHeight: number) => {
    if (contentHeight !== this.state.contentHeight) {
      this.setState({contentHeight});
    }
  };

  scrollTo(...args: Array<any>) {
    this._ListView.scrollTo(...args);
  }

  getScrollResponder(): any {
    return this._ListView.getScrollResponder();
  }

  renderHeader = (): ?ReactElement => {
    if (this.state.data.length !== 0) {
      return this.props.renderHeader && this.props.renderHeader();
    }
  };

  renderFooter = (): ?ReactElement => {
    if (this.state.data.length === 0) {
      return (
        this.props.renderEmptyList &&
        this.props.renderEmptyList(this.state.containerHeight)
      );
    }

    return this.props.renderFooter && this.props.renderFooter();
  };
}

module.exports = PureListView;
