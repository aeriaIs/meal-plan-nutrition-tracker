import {View} from 'react-native';

import {theme} from '../../utils/theme';

type BasicDividerProps = {
  height?: number;
  width?: number;
  color?: string;
  marginVertical?: number;
  style?: {};
};

const BasicDivider = (props: BasicDividerProps) => {
  const {
    height = 4,
    width = '100%',
    color = theme.colors.gray[100],
    marginVertical = 8,
    style,
  } = props;

  return (
    <View
      style={[
        {
          width: width,
          height: height,
          backgroundColor: color,
          marginVertical: marginVertical,
        },
        style,
      ]}
    />
  );
};

type CustomLineDividerProps = {
  color?: string;
  style?: {};
};

const CustomLineDivider = (props: CustomLineDividerProps) => {
  return (
    <BasicDivider
      height={1}
      color={props.color || '#E5E5E5'}
      style={props.style}
    />
  );
};

export {BasicDivider, CustomLineDivider};
