import {StyleSheet, View} from 'react-native';

import type {PropsWithChildren} from 'react';

type SectionProps = PropsWithChildren<{
  customStyle?: {};
}>;

const Section = ({children, customStyle}: SectionProps): JSX.Element => {
  return <View style={[styles.sectionContainer, customStyle]}>{children}</View>;
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
  },
});

export {Section};
