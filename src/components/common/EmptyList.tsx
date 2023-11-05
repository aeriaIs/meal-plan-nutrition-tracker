import {PropsWithChildren} from 'react';
import {View, StyleSheet, Text} from 'react-native';

import {theme} from '../../utils/theme';

type ListEmptyComponentProps = PropsWithChildren<{
  text?: string;
  frame?: boolean;
  image?: any;
}>;

const ListEmptyComponent = (props: ListEmptyComponentProps) => {
  const {text = 'Tidak ada data tersedia', frame = true} = props;
  const frameStyle = frame ? {padding: 16} : {};

  return (
    <View style={[styles.container, frameStyle]}>
      <Text
        style={{
          color: theme.colors.gray[900],
          fontSize: 16,
          fontWeight: 'bold',
          textAlign: 'center',
        }}>
        {text}
      </Text>
    </View>
  );
};

export {ListEmptyComponent};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 240,
    height: 240,
  },
});
