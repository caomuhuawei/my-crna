import * as React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import InputDialog from './InputDialog';

interface IFromItemProps {
  rcForm: any;
  // 需要注意这个 value 是RC-Form高阶组件注入进来的 所以在使用组件的时候 argsInputProps参数里面不要传 value 传了会在代码中删除
  value?: any;
  // onChange rc-form调用
  onChange?: any;
  argsInputProps?: any;
  inputId: String;
  extra?: any;
  inputView?: any;
  dialogExtra?: any;
}
const noPlain = require('../../assets/images/common/no-plain.png');
const plain = require('../../assets/images/common/plain.png');

/**
 * 暂时无法解决React.forwardRef问题使用状态组件
 * rc-form需要单独写一个组件才能拿到rc-form中的 value
 * TcFromInput 单独使用，项目中不使用这个组件
 * @param rcForm
 * @param value
 * @param argsInputProps
 */
class FromItem extends React.PureComponent<IFromItemProps, {}> {
  state = {
    textType: false,
    showInputDialog: false,
  };

  failToast = (message) => {
    console.error(message);
  };
  setTextType = () => {
    this.setState({
      textType: !this.state.textType,
    });
  };
  setVisible = (flag) => {
    this.setState({
      showInputDialog: flag,
    });
  };
  render() {
    const {
      rcForm,
      value,
      argsInputProps,
      onChange,
      inputId,
      extra,
      dialogExtra,
      inputView,
    } = this.props;
    const {getFieldError} = rcForm;
    const {textType} = this.state;
    const textTypeProps =
      argsInputProps && argsInputProps.secureTextEntry === true ? true : false;
    const editable =
      argsInputProps && argsInputProps.editable === false ? false : true;
    const isError = getFieldError(inputId);
    const styleArgs = argsInputProps.style || {};
    delete argsInputProps['style'];
    delete argsInputProps['value'];
    delete argsInputProps['onChangeText'];
    return (
      <View style={{...styles.input_view, ...inputView}}>
        <InputDialog
          isModalVisible={this.state.showInputDialog}
          setVisible={(flag) => {
            this.setVisible(flag);
          }}
          rcForm={rcForm}
          argsInputProps={argsInputProps || {}}
          value={value || ''}
          onChange={onChange}
          dialogExtra={dialogExtra}
        />
        <TouchableOpacity
          style={{flex: 1}}
          activeOpacity={1}
          onPress={() => {
            if (editable === false) {
              return;
            }
            this.setVisible(true);
          }}>
          <View style={{flex: 1}} pointerEvents="none">
            <TextInput
              placeholderTextColor={'#989595'}
              autoCompleteType="off" // 禁用自动匹配
              autoCorrect={false} // 禁用自动修成
              {...argsInputProps} // 放在这个代码之前的表示默认值，之后的是覆盖不能修改的值
              value={value || ''}
              onChangeText={onChange}
              disableFullscreenUI={true} // 禁止全屏输入
              secureTextEntry={textType ? false : textTypeProps}
              style={[
                styles.input_text,
                styleArgs,
                editable === false ? styles.input_disable : {},
              ]}
              editable={false}
            />
          </View>
        </TouchableOpacity>

        {extra && {...extra}}
        {argsInputProps && argsInputProps.secureTextEntry === true && (
          <TouchableOpacity
            onPress={() => {
              this.setTextType();
            }}
            style={styles.passs_button}>
            <Image
              resizeMode="contain"
              style={styles.passs_image}
              source={textType ? plain : noPlain}
            />
          </TouchableOpacity>
        )}
        {isError && (
          <TouchableOpacity
            onPress={() => {
              this.failToast(isError ? isError.join(',') : null);
            }}
            style={styles.error_button}>
            <Image
              style={styles.error_image}
              source={require('../../assets/images/common/error.png')}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

export default FromItem;
const styles = StyleSheet.create({
  input_view: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
  },
  input_disable: {
    backgroundColor: 'rgba(58, 54, 57, 0.9)',
  },
  input_text: {
    backgroundColor: 'rgba(47, 43, 46, 0.9)',
    paddingLeft: 10,
    color: 'white',
    borderRadius: 5,
    padding: 0,
    flex: 1,
  },
  error_button: {
    width: 30,
    height: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginLeft: 7,
  },
  error_image: {
    width: 27,
    height: 27,
  },
  passs_button: {
    width: 33,
    height: 33,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginLeft: 7,
  },
  passs_image: {
    width: 32,
    height: 32,
  },
});
