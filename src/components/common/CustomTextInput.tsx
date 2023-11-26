import {PropsWithChildren, useState} from 'react';
import {
  Platform,
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';

import {Icons} from './Icon';
import {OrdinaryText} from './Text';

import {theme} from '../../utils/theme';

type TextInputProp = PropsWithChildren<
  TextInputProps & {
    style?: {};
    label?: string;
    labelStyle?: {};
    inputContainerStyle?: {};
    inputStyle?: {};
    placeholder?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    right?: React.ReactNode;
    left?: React.ReactNode;
    secureTextEntry?: boolean;
    editable?: boolean;
    onPressIn?: () => void;
  }
>;

const CustomTextInput = (props: TextInputProp) => {
  const [focus, setFocus] = useState(false);

  const {
    style,
    label,
    labelStyle,
    inputContainerStyle,
    inputStyle,
    placeholder,
    value,
    onChangeText,
    keyboardType = 'default',
    right = null,
    left = null,
    editable = true,
  } = props;

  return (
    <View style={[styles.container, style]}>
      {label && (
        <OrdinaryText
          color={theme.colors.gray[100]}
          size={12}
          style={[
            {
              textTransform: 'capitalize',
              marginBottom: 4,
            },
            labelStyle,
          ]}>
          {label}
        </OrdinaryText>
      )}
      <View
        style={[
          styles.inputContainer,
          inputContainerStyle,
          {
            borderColor: focus
              ? theme.colors.main[500]
              : theme.colors.gray[400],
          },
        ]}>
        {left && <View style={{paddingRight: 4}}>{left}</View>}
        <TextInput
          style={[
            styles.input,
            {
              color: editable ? 'white' : theme.colors.gray[400],
            },
            inputStyle,
          ]}
          placeholder={placeholder || label}
          placeholderTextColor={theme.colors.gray[300]}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          secureTextEntry={props.secureTextEntry}
          editable={editable}
          onPressIn={props.onPressIn}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          focusable={true}
        />
        {right && <View style={{paddingLeft: 4}}>{right}</View>}
      </View>
    </View>
  );
};

type PasswordInputProps = TextInputProp & {};

const CustomPasswordInput = (props: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <CustomTextInput
        {...props}
        secureTextEntry={!showPassword}
        right={
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icons
              name={showPassword ? 'eye-outline' : 'eye-off-outline'}
              size={18}
              color={theme.colors.gray[900]}
              customContainerStyle={{
                padding: 4,
              }}
            />
          </TouchableOpacity>
        }
      />
    </>
  );
};

type PhoneTextInputProp = PropsWithChildren<TextInputProp>;

const PhoneTextInput = (props: PhoneTextInputProp) => {
  return <CustomTextInput {...props} />;
};

export {CustomTextInput, CustomPasswordInput, PhoneTextInput};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputContainer: {
    paddingHorizontal: 8,
    backgroundColor: 'transparent',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.gray[400],
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    color: 'black',
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    lineHeight: Platform.OS === 'ios' ? 0 : 20,
    fontSize: 14,
    color: theme.colors.gray[900],
  },
});
