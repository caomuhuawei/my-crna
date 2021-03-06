import I18n, {getLanguages} from 'react-native-i18n';
import DeviceInfo from 'react-native-device-info';
import en from './en';
import cn from './cn';

I18n.defaultLocale = 'en';

I18n.fallbacks = true;

I18n.translations = {
  en,
  cn,
};

I18n.localeLanguage = () => {
  I18n.locale = DeviceInfo.getDeviceLocale();
  return I18n.locale;
};

export {I18n, getLanguages};
