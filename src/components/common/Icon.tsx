import {View, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {theme} from '../../utils/theme';

type IconsProps = {
  name: string;
  color?: any;
  size?: number;
  customContainerStyle?: {};
};

const Icons = (props: IconsProps) => {
  const {
    name,
    color = theme.colors.gray[900],
    size = 24,
    customContainerStyle,
  } = props;

  return (
    <View style={[styles.iconContainer, customContainerStyle]}>
      <MaterialCommunityIcons name={name} color={color} size={size} />
    </View>
  );
};

export {Icons};

const styles = StyleSheet.create({
  iconContainer: {
    borderRadius: 50,
  },
});
