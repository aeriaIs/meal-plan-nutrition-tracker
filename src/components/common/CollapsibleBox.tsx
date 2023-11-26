import React, {PropsWithChildren, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import {theme} from '../../utils/theme';
import {Icons} from './Icon';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

type CollapsibleBoxProps = PropsWithChildren<{
  header: React.ReactNode;
  content: React.ReactNode;
  customContainerStyle?: any;
  customHeaderStyle?: any;
  customContentStyle?: any;
}>;

const CollapsibleBox = (props: CollapsibleBoxProps) => {
  const {
    header,
    content,
    customContainerStyle,
    customHeaderStyle,
    customContentStyle,
  } = props;

  const [open, setopen] = useState(false);

  const onPress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setopen(!open);
  };

  return (
    <View style={[styles.container, customContainerStyle]}>
      <TouchableOpacity
        style={[styles.header, customHeaderStyle, !open && {height: '100%'}]}
        onPress={onPress}
        activeOpacity={1}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          {header}
          <View>
            <Icons
              name={open ? 'chevron-up' : 'chevron-down'}
              size={24}
              color={theme.colors.gray[100]}
            />
          </View>
        </View>
      </TouchableOpacity>
      {open && (
        <View style={[styles.content, customContentStyle]}>{content}</View>
      )}
    </View>
  );
};

export {CollapsibleBox};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  header: {
    width: '100%',
    overflow: 'hidden',
    paddingVertical: 10,
  },
  content: {
    flex: 1,
    width: '100%',
    paddingBottom: 5,
  },
});
