import {PropsWithChildren} from 'react';
import {View, SafeAreaView, StatusBar} from 'react-native';

type ScreenContainerProps = PropsWithChildren<{
  style?: {};
  safe?: boolean;
  statusBar?: boolean;
}>;

const ScreenContainer = (props: ScreenContainerProps) => {
  const {children, style, safe = true, statusBar = false} = props;

  return (
    <>
      {statusBar && (
        <StatusBar
          translucent={false}
          barStyle={'dark-content'}
          backgroundColor="white"
        />
      )}
      {safe ? (
        <SafeAreaView {...props} style={[styles.container, style]}>
          {children}
        </SafeAreaView>
      ) : (
        <View {...props} style={[styles.container, style]}>
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
