import {View, TouchableOpacity} from 'react-native';

import {OrdinaryText} from '../common';

import {theme} from '../../utils/theme';

import {OUTSIDE_WEBVIEW} from '../../navigations/navigations';

const PrivacyPolicy = ({navigation}: {navigation: any}) => {
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
      }}>
      <OrdinaryText size={12} color={theme.colors.gray[800]}>
        Dengan melanjutkan, Anda menyetujui{' '}
      </OrdinaryText>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(OUTSIDE_WEBVIEW, {
            screenTitle: 'Syarat dan Ketentuan',
            webviewUrl: 'https://www.hobbiku.com/terms-and-conditions',
          })
        }
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <OrdinaryText
          size={12}
          weight="semibold"
          style={{
            textDecorationLine: 'underline',
          }}>
          Syarat dan Ketentuan
        </OrdinaryText>
      </TouchableOpacity>
      <OrdinaryText size={12} color={theme.colors.gray[800]}>
        {' '}
        serta{' '}
      </OrdinaryText>
      <OrdinaryText
        size={12}
        weight="semibold"
        style={{
          textDecorationLine: 'underline',
        }}>
        Kebijakan Privasi
      </OrdinaryText>
      <OrdinaryText
        weight="bold"
        size={12}
        color={theme.colors.gray[900]}
        align="center">
        {' '}
        Hobbiku.
      </OrdinaryText>
    </View>
  );
};

export {PrivacyPolicy};
