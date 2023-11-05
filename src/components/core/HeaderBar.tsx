import {View, TouchableOpacity, StatusBar, Text} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {theme} from '../../utils/theme';
import {Icons} from '../common/Icon';

const defaultIconLeft = 'arrow-left';
const defaultIconRight = 'menu';

type SideContent = {
  title?: string;
  icon?: string;
  size?: number;
  color?: string;
  onPress?: () => void;
  backgroundColor?: string;
  loading?: boolean;
};

type HeaderBarProps = {
  headerStyle?: any;
  backgroundColor?: string;
  topSpacing?: boolean;
  barStyle?: 'light-content' | 'dark-content';
  title?: string;
  titleTextSize?: number;
  titleTextWeight?: string;
  customTitleStyle?: {};
  leftContent?: SideContent;
  customLeftContent?: JSX.Element | any;
  rightContent?: SideContent;
  customRightContent?: JSX.Element | any;
};

type TopComponentProps = {
  backgroundColor: string;
  barStyle: 'light-content' | 'dark-content';
};

const TopComponent = ({backgroundColor, barStyle}: TopComponentProps) => {
  const insets = useSafeAreaInsets();
  return (
    <>
      <StatusBar
        translucent={true}
        barStyle={barStyle}
        backgroundColor={backgroundColor}
      />
      <View
        style={{
          height: insets.top,
          backgroundColor,
        }}
      />
    </>
  );
};

const HeaderBar = (props: HeaderBarProps) => {
  const {
    headerStyle,
    backgroundColor = 'white',
    topSpacing,
    barStyle = 'dark-content',
    title,
    titleTextSize = 18,
    customTitleStyle,
    leftContent,
    customLeftContent,
    rightContent,
    customRightContent,
  } = props;

  return (
    <>
      {topSpacing && (
        <TopComponent barStyle={barStyle} backgroundColor={backgroundColor} />
      )}
      <View
        style={[
          {
            zIndex: 1,
            height: 44,
            position: 'relative',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: headerStyle?.paddingHorizontal ?? 16,
            backgroundColor: backgroundColor ?? 'white',
          },
          headerStyle,
        ]}>
        {customLeftContent && customLeftContent}
        {leftContent && (
          <TouchableOpacity
            style={{
              position: 'absolute',
              left: 12,
              zIndex: 1,
              paddingVertical: 4,
              paddingRight: 8,
            }}
            activeOpacity={leftContent.onPress ? 0.4 : 1}
            onPress={leftContent.onPress}>
            {leftContent.title ? (
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: leftContent.color ?? 'black',
                }}>
                {leftContent.loading ? '...' : leftContent.title}
              </Text>
            ) : (
              <Icons
                name={leftContent.icon ?? defaultIconLeft}
                size={leftContent.size ?? 24}
                color={leftContent.color ?? theme.colors.gray[900]}
              />
            )}
          </TouchableOpacity>
        )}
        {title && (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              left: customLeftContent ? 32 : 0,
            }}>
            <Text
              style={[
                {
                  flex: 1,
                  fontSize: titleTextSize || 18,
                  fontWeight: 'bold',
                  color: theme.colors.gray[900],
                },
                customTitleStyle,
              ]}>
              {title}
            </Text>
          </View>
        )}
        {customRightContent && customRightContent}
        {rightContent && (
          <TouchableOpacity
            activeOpacity={rightContent.onPress ? 0.7 : 1}
            onPress={rightContent.onPress}
            style={{
              position: 'absolute',
              right: 16,
              zIndex: 1,
            }}>
            {rightContent.title ? (
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: rightContent.color ?? 'black',
                }}>
                {rightContent.title}
              </Text>
            ) : (
              <Icons
                name={rightContent.icon ?? defaultIconRight}
                size={rightContent.size ?? 24}
                color={rightContent.color ?? theme.colors.gray[900]}
              />
            )}
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

export {HeaderBar};
