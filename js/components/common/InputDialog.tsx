import * as React from 'react';
import {
  StyleSheet,
  View,
  Platform,
  TextInput,
  Dimensions,
  Keyboard,
} from 'react-native';
import Modal from 'react-native-modal';
import TcButton from './TcButton';

interface IInputDialogProps {
  rcForm: any;
  isModalVisible: boolean;
  setVisible: (flag: boolean) => any;
  value?: any;
  onChange?: any;
  argsInputProps?: any;
  extra?: any;
  dialogExtra?: any;
}

class FromItem extends React.PureComponent<IInputDialogProps, {}> {
  state = {
    textValue: ``,
  };

  dismissDialog = () => {
    Keyboard.dismiss();
    this.props.onChange(this.state.textValue);
    this.props.setVisible(false);
  };
  textInput;

  componentDidMount() {
    this.setState({
      textValue: this.props.value,
    });
  }

  render() {
    const {
      isModalVisible,
      value,
      dialogExtra,
      argsInputProps,
      onChange,
    } = this.props;
    const deviceWidth = Dimensions.get('window').width;
    const deviceHeight =
      Platform.OS === 'ios'
        ? Dimensions.get('window').height
        : require('react-native-extra-dimensions-android').get(
            'REAL_WINDOW_HEIGHT',
          );
    return (
      <Modal
        onShow={() => {
          if (this.textInput) {
            this.textInput.focus();
          }
        }}
        isVisible={isModalVisible}
        deviceWidth={deviceWidth}
        deviceHeight={deviceHeight}
        propagateSwipe={true}
        useNativeDriver={true}
        style={{
          marginTop: 0,
          marginBottom: 0,
          marginLeft: 0,
          marginRight: 0,
          zIndex: 9999,
          elevation: 9999,
        }}
        hideModalContentWhileAnimating={true}
        supportedOrientations={['portrait', 'landscape']}
        backdropOpacity={0.6}
        // onBackdropPress={() => this.dismissDialog()}

        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={1}
        animationOutTiming={1}
        backdropTransitionInTiming={1}
        backdropTransitionOutTiming={1}>
        <View style={styles.content}>
          <View style={[{flex: 1}, styles.content_heigth]}>
            <TextInput
              autoCompleteType="off" // 禁用自动匹配
              autoCorrect={false} // 禁用自动修成
              {...argsInputProps} // 放在这个代码之前的表示默认值，之后的是覆盖不能修改的值
              value={this.state.textValue || ''}
              onChangeText={(text) => {
                this.setState({textValue: text});
              }}
              ref={(input) => {
                this.textInput = input;
              }}
              // autoFocus={true}
              // onChangeText={onChange}
              disableFullscreenUI={true} // 禁止全屏输入
              style={{...styles.input_text}}
              onSubmitEditing={() => this.dismissDialog()}
              onEndEditing={() => this.dismissDialog()}
            />
          </View>
          {dialogExtra ? {...dialogExtra} : null}
          <View style={[{marginLeft: 10}, styles.content_heigth]}>
            <TcButton
              onPress={() => {
                this.dismissDialog();
              }}
              buttonStyle={{width: 80, marginTop: 2}}
              text="确认"
              argsImage={{
                source: require('../../assets/images/common/button-bg.png'),
                style: [
                  {
                    width: 80,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                  },
                  styles.content_heigth,
                ],
              }}
            />
          </View>
        </View>
      </Modal>
    );
  }
}

export default FromItem;
const styles = StyleSheet.create({
  content: {
    height: '2.4rem',
    marginTop: '1%',
    marginLeft: '6%',
    marginRight: '6%',
    padding: 0,
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 1,
    flexDirection: 'row',
  },
  input_text: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    color: 'black',
    borderRadius: 5,
    padding: 0,
    flex: 1,
    paddingLeft: 10,
  },
  content_heigth: {
    height: '2.4rem',
  },
});
