import {PropsWithChildren} from 'react';
import {View, SafeAreaView, StatusBar} from 'react-native';

type ScreenContainerProps = PropsWithChildren<{
  style?: {};
  safe?: boolean;
  statusBar?: any;
}>;

const marginTop = StatusBar.currentHeight || 0;

const ScreenContainer = (props: ScreenContainerProps) => {
  const {children, style, safe = true, statusBar} = props;
  const {
    show = true,
    animated = true,
    translucent = true,
    barStyle = 'dark-content',
    backgroundColor = 'white',
    showHideTransition = 'fade',
  } = statusBar;

  return (
    <>
      {show && (
        <StatusBar
          animated={animated}
          translucent={translucent}
          barStyle={barStyle}
          backgroundColor={backgroundColor}
          showHideTransition={showHideTransition}
        />
      )}
      {safe ? (
        <SafeAreaView
          {...props}
          style={[
            styles.container,
            {
              marginTop: !show ? 0 : marginTop,
            },
            style,
          ]}>
          {children}
        </SafeAreaView>
      ) : (
        <View
          {...props}
          style={[
            styles.container,
            {
              marginTop: !show ? 0 : marginTop,
            },
            style,
          ]}>
          {children}
        </View>
      )}
    </>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
};

export {ScreenContainer};
