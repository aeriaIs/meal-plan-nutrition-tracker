import {ActivityIndicator, StyleSheet, TouchableOpacity} from 'react-native';

import {OrdinaryText} from './Text';

import {theme} from '../../utils/theme';

type CustomButtonPropsWithChildren = {
  customStyle?: {};
  type?: string;
  action?: () => void;
  text?: string;
  backgroundColor?: string;
  textColor?: string;
  textWeight?: string;
  textSize?: number;
  customTextStyle?: {};
  loading?: boolean;
  disabled?: boolean;
} & React.PropsWithChildren<{}>;

const CustomButton = (props: CustomButtonPropsWithChildren) => {
  const {
    action = () => {},
    backgroundColor = theme.colors.main[500],
    customStyle,
    type = 'default',
    text = 'Button',
    children,
    loading = false,
    disabled = false,
    textWeight = 'bold',
    textSize = 16,
    customTextStyle,
    textColor = type === 'outline' ? backgroundColor : theme.colors.gray[100],
  } = props;

  const outlineTypeStyle = {
    borderWidth: 1,
    borderColor: backgroundColor,
    backgroundColor: 'transparent',
  };

  return (
    <TouchableOpacity
      activeOpacity={disabled ? 1 : type === 'outline' ? 0.5 : 0.5}
      onPress={() => {
        if (disabled || loading) {
          return;
        }
        action();
      }}
      style={[
        styles.button,
        {
          backgroundColor: disabled ? theme.colors.gray[400] : backgroundColor,
        },
        type === 'outline' ? outlineTypeStyle : {},
        customStyle,
      ]}>
      {loading ? (
        <ActivityIndicator color={textColor} size="small" />
      ) : (
        <>
          {children ? (
            children
          ) : (
            <OrdinaryText
              color={textColor}
              weight={textWeight}
              size={textSize}
              style={[styles.text, customTextStyle]}>
              {loading ? 'Loading...' : text}
            </OrdinaryText>
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

export {CustomButton};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 20,
  },
});
