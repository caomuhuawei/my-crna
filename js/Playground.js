'use strict';

import React from 'react';
import {View} from 'react-native';

interface PropTypes {
  target: ReactElement;
}

interface stateTypes {
  content: Array<ReactElement>;
}

class Playground extends React.Component<PropTypes, stateTypes> {
  state = {content: []};

  componentDidMount() {
    const content = [];
    const {target} = this.props.route.params;
    const define = (name: string, render: Function) => {
      content.push(<Example key={name} render={render} />);
    };
    target.__cards__(define);
    this.setState({
      content,
    });
  }

  render() {
    return (
      <View style={{backgroundColor: '#336699', flex: 1}}>
        {this.state.content}
      </View>
    );
  }
}

class Example extends React.Component {
  state = {
    inner: null,
  };

  render() {
    const content = this.props.render(this.state.inner, (inner) =>
      this.setState({inner}),
    );
    return <View>{content}</View>;
  }
}

export default Playground;
