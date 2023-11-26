import {PropsWithChildren, memo, useMemo} from 'react';
import {View, Text, TextProps, Image} from 'react-native';

import {theme} from '../../utils/theme';
import {Icons} from './Icon';

export type CustomTextProps = TextProps & {
  color?: string;
  size?: number;
  weight?: string | any;
  align?: string;
} & PropsWithChildren<{}>;

const OrdinaryText = (props: CustomTextProps) => {
  const {
    color = 'white',
    size = 14,
    weight = 'regular',
    align = 'left',
    style,
    children,
  } = props;

  const lineHeight = useMemo(() => {
    const roundToNearestMultipleOfFour = (num: number) => {
      const remainder = num % 2.75;

      if (remainder <= 2) {
        return num - remainder;
      } else {
        return num + (4 - remainder);
      }
    };

    return {
      lineHeight: roundToNearestMultipleOfFour(size * 1.3),
    };
  }, [size]);

  const fontWeight = useMemo(() => {
    const font = (family: string) => ({fontFamily: family});
    switch (weight) {
      case 'black':
        return font(theme.fontFamily.black);
      case 'blackItalic':
        return font(theme.fontFamily.blackItalic);

      case 'extrabold':
        return font(theme.fontFamily.extraBold);
      case 'extraboldItalic':
        return font(theme.fontFamily.extraBoldItalic);

      case 'bold':
        return font(theme.fontFamily.bold);
      case 'boldItalic':
        return font(theme.fontFamily.boldItalic);

      case 'semibold':
        return font(theme.fontFamily.semibold);
      case 'semiboldItalic':
        return font(theme.fontFamily.semiboldItalic);

      case 'medium':
        return font(theme.fontFamily.medium);
      case 'mediumItalic':
        return font(theme.fontFamily.mediumItalic);

      case 'light':
        return font(theme.fontFamily.light);
      case 'lightItalic':
        return font(theme.fontFamily.lightItalic);

      case 'extralight':
        return font(theme.fontFamily.extraLight);
      case 'extralightItalic':
        return font(theme.fontFamily.extraLightItalic);

      case 'thin':
        return font(theme.fontFamily.thin);
      case 'thinItalic':
        return font(theme.fontFamily.thinItalic);

      case 'italic':
        return font(theme.fontFamily.italic);

      default:
        return font(theme.fontFamily.regular);
    }
  }, [weight]);

  return (
    <Text
      {...props}
      style={[
        {
          color: color,
          fontSize: size,
          textAlign: align as any,
          flexShrink: 1,
        },
        fontWeight,
        lineHeight,
        style,
      ]}>
      {children}
    </Text>
  );
};

type TextWithCustomIconProps = {
  icon: any;
  iconSize?: number;
  iconColor?: string;
  iconPosition?: string;
  text?: string;
  textWeight?: string;
  textStyle?: {};
  customContainerStyle?: {};
};

const TextWithCustomIcon = (props: TextWithCustomIconProps) => {
  const {
    icon,
    iconSize = 16,
    iconColor = theme.colors.gray[500],
    iconPosition = 'left',
    text,
    textWeight = 'regular',
    textStyle,
    customContainerStyle,
  } = props;

  return (
    <View
      style={[
        {flexDirection: 'row', alignItems: 'center'},
        customContainerStyle,
      ]}>
      {iconPosition === 'left' && (
        <Icons name={icon} size={iconSize} color={iconColor} />
      )}
      <OrdinaryText
        weight={textWeight}
        style={{
          marginLeft: 4,
          flexShrink: 1,
          color: theme.colors.gray[900],
          fontSize: 16,
          ...textStyle,
        }}>
        {text}
      </OrdinaryText>
      {iconPosition === 'right' && (
        <Icons name={icon} size={iconSize} color={iconColor} />
      )}
    </View>
  );
};

type TextWithExportedIconProps = {
  icon: any;
  iconStyle: any;
  iconPosition?: string;
  text?: string;
  textWeight?: string;
  textStyle?: {};
  customContainerStyle?: {};
};

const TextWithExportedIconComponent = (props: TextWithExportedIconProps) => {
  const {
    icon,
    iconStyle,
    iconPosition = 'left',
    text,
    textWeight = 'regular',
    textStyle,
    customContainerStyle,
  } = props;

  return (
    <View
      style={[
        {flexDirection: 'row', alignItems: 'center'},
        customContainerStyle,
      ]}>
      {iconPosition === 'left' && (
        <Image
          source={icon}
          style={{
            ...iconStyle,
            width: iconStyle?.width || 16,
            height: iconStyle?.height || 16,
          }}
          resizeMode="contain"
        />
      )}
      <OrdinaryText
        weight={textWeight}
        style={{
          marginLeft: 4,
          flexShrink: 1,
          color: theme.colors.gray[900],
          fontSize: 16,
          ...textStyle,
        }}>
        {text}
      </OrdinaryText>
      {iconPosition === 'right' && (
        <Image
          source={icon}
          style={{
            ...iconStyle,
            width: iconStyle.width || 16,
            height: iconStyle.height || 16,
          }}
          resizeMode="contain"
        />
      )}
    </View>
  );
};

const TextWithExportedIcon = memo(TextWithExportedIconComponent);

export {OrdinaryText, TextWithCustomIcon, TextWithExportedIcon};
