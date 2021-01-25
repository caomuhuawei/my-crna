import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  StyleProp,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import FromItem from './FromItem';

// 所有Input支持的Props 直接从TextInputProps继承
interface IInputProps extends TextInputProps {}

interface ITcFromInputProps {
  rcForm: any;
  id: string;
  label?: React.ReactNode;
  labelStyle?: StyleProp<ViewStyle>;
  argsInputProps?: IInputProps;
  viewStyle?: StyleProp<ViewStyle>;
  extra?: any;
  dialogExtra?: any;
  argsDecorator?: {
    valuePropName?: string /** 子节点的值的属性，如 Checkbox 的是 'checked' */;
    initialValue?: any /** 子节点的初始值，类型、可选值均由子节点决定 */;
    trigger?: string /** 收集子节点的值的时机 */;
    getValueFromEvent?: (
      ...args: any[]
    ) => any /** 可以把 onChange 的参数转化为控件的值，例如 DatePicker 可设为：(date, dateString) => dateString */;
    getValueProps?: (
      value: any,
    ) => any /** Get the component props according to field value. */;
    validateTrigger?: string | string[] /** 校验子节点值的时机 */;
    rules?: any /** 校验规则，参见 [async-validator](https://github.com/yiminghe/async-validator) */;
    exclusive?: boolean /** 是否和其他控件互斥，特别用于 Radio 单选控件 */;
    normalize?: (
      value: any,
      prevValue: any,
      allValues: any,
    ) => any /** Normalize value to form component */;
    validateFirst?: true /** Whether stop validate on first rule of error for this field.  */;
    preserve?: boolean /** 是否一直保留子节点的信息 */;
  };
}

/**
 * 公共TextInput组件
 * @param rcForm
 * @param id
 * @param label
 * @param argsInputProps
 * @param argsDecorator
 */
class TcFromInput extends React.Component<ITcFromInputProps, {}> {
  render() {
    const {
      id,
      label,
      labelStyle,
      extra,
      dialogExtra,
      rcForm,
      viewStyle,
      argsDecorator,
      argsInputProps,
    } = this.props;
    const {getFieldError, getFieldDecorator} = rcForm;
    return (
      <View style={[styles.row_container, viewStyle]}>
        {label && (
          <View style={[styles.row_label, labelStyle]}>
            <Text style={{color: '#dfb97c'}}>{label}</Text>
          </View>
        )}
        {getFieldDecorator(id, {...argsDecorator})(
          <FromItem
            rcForm={rcForm}
            inputId={id}
            extra={extra}
            argsInputProps={argsInputProps || {}}
            dialogExtra={dialogExtra}
          />,
        )}
      </View>
    );
  }
}

export default TcFromInput;

// StyleSheet EStyleSheet
const styles = EStyleSheet.create({
  row_container: {
    height: '2.45rem',
    display: 'flex',
    flexDirection: 'row',
    // borderWidth: 1,
    // borderColor: "red",
  },
  row_label: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: '20%',
    minWidth: 90,
  },
  row_label_text: {
    color: 'white',
  },
  row_input: {
    backgroundColor: 'rgba(47, 43, 46, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    flex: 1,
    fontSize: '0.85rem',
    color: 'white',
    borderRadius: 4,
  },
});
