'use strict';

import {Linking} from 'react-native';

const WHITELISTED_URL_SCHEMES = [
  'https:',
  'http:',
  'mailto:',
  'comgooglemaps-x-callback:',
];
const ERR_NOT_LISTED = 'F8Linking: URL does not match whitelisted schemes';

function allowed(source: string) {
  return !!WHITELISTED_URL_SCHEMES.find((p) => source.indexOf(p) === 0);
}

export default class F8Linking {
  static async openURL(source: string) {
    if (!allowed(source)) {
      throw new Error(ERR_NOT_LISTED);
    }
    return Linking.openURL(source);
  }
  static async canOpenURL(source: string) {
    if (!allowed(source)) {
      return false;
    }
    return Linking.canOpenURL(source);
  }
}
