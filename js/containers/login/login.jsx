import * as React from 'react';
import {createForm} from 'rc-form';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import TcFromInput from '../../../components/common/TcFromInput';
import TcButton from '../../../components/common/TcButton';
import {I18n} from '../../i18n/i18n';

@createForm()
class LoginScreen extends React.Component<ILoginProps, {}> {
  state = {};

  submitLogin = () => {
    const {form, memberStore} = this.props;
    form.validateFields(async (error) => {
      if (!error) {
        const {username = '', password = ''} = form.getFieldsValue();
        // @ts-ignore
        const {success, DES, RSA, message} = await reRsa(
          {
            username: username.trim(),
            password: password.trim(),
          },
          '',
          '',
        );
        await memberStore.submitLogin({
          DES,
          RSA,
        });
      }
    });
  };

  render() {
    const {form} = this.props;
    return (
      <ScrollView scrollEnabled={true} style={{flex: 1}} horizontal={false}>
        <View style={styles.view}>
          <TcFromInput
            rcForm={form}
            id="username"
            viewStyle={{marginTop: 0, marginBottom: 15}}
            argsDecorator={{
              rules: [
                {
                  required: true,
                  message: `${I18n.t(`common.input`)}`,
                },
              ],
            }}
            argsInputProps={{
              placeholder: `${I18n.t(`common.input`)}`,
            }}
          />
          <TcFromInput
            rcForm={this.props.form}
            id="password"
            viewStyle={{marginTop: 0, marginBottom: 15}}
            argsDecorator={{
              rules: getValidateRules(`password`, `${I18n.t(`login.pwd`)}`),
            }}
            argsInputProps={{
              secureTextEntry: true,
              placeholder: `${I18n.t(`common.input`)}${I18n.t(`login.pwd`)}`,
            }}
          />
          <TcButton
            onPress={() => {
              this.submitLogin();
            }}
            buttonStyle={{marginTop: 7}}
            text={I18n.t(`login.login`)}
            argsImage={{
              style: {
                width: 130,
                height: 45,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
              },
            }}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    paddingTop: 20,
    paddingLeft: 30,
    paddingRight: 30,
    flex: 1,
    marginBottom: 13,
  },
  text: {
    color: 'white',
  },
  view_btn: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  btn: {
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    flex: 1,
    borderRadius: 4,
  },
});

export default LoginScreen;
