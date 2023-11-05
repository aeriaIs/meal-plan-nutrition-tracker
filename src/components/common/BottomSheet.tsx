import {
  forwardRef,
  ReactNode,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  Gesture,
  GestureDetector,
  ScrollView,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedProps,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import {theme} from '../../utils/theme';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

type BottomSheetProps = {
  children?: ReactNode;
  freeze?: boolean;
  minHeight?: number;
  maxHeight?: number;
  height?: number;
  resizable?: boolean;
  closeCallback?: () => void;
};

type BottomSheetRefProps = {
  open: () => void;
  close: () => void;
};

const BottomSheet = forwardRef<BottomSheetRefProps, BottomSheetProps>(
  (props: any, ref) => {
    const insets = useSafeAreaInsets();
    const bottomSheetRef = useRef<Animated.View>(null);

    const {children, freeze = false, resizable, closeCallback} = props;
    const minHeight = props.minHeight || 0;
    const maxHeight = props.maxHeight || SCREEN_HEIGHT - insets.top;
    const height = props.height ?? 0;

    const [initialHeight, setInitialHeight] = useState(height);

    const context = useSharedValue(0);
    const sheetHeight = useSharedValue(0);
    const active = useSharedValue(false);

    const scrollTo = useCallback(
      (destination: number) => {
        'worklet';
        sheetHeight.value = withSpring(destination, {damping: 50});
      },
      [sheetHeight],
    );

    const open = useCallback(() => {
      'worklet';
      active.value = true;
      sheetHeight.value = 0;

      if (height) {
        const startHeight = height > maxHeight ? maxHeight : height;
        scrollTo(startHeight);
      } else {
        // get the height of the sheet
        bottomSheetRef.current?.measureInWindow((z, y, w, h) => {
          const startHeight = h > maxHeight ? maxHeight : h;
          setInitialHeight(startHeight);
          scrollTo(startHeight);
        });
      }
    }, [active, sheetHeight, maxHeight, height, scrollTo]);

    const close = useCallback(() => {
      'worklet';
      active.value = false;
      scrollTo(0);

      closeCallback && closeCallback();
    }, [active, scrollTo, closeCallback]);

    useImperativeHandle(ref, () => ({open, close}));

    const gesture = Gesture.Pan()
      .onStart(() => {
        context.value = sheetHeight.value;
      })
      .onUpdate(event => {
        sheetHeight.value = context.value - event.translationY;
        if (sheetHeight.value < minHeight) {
          sheetHeight.value = minHeight;
        } else if (sheetHeight.value > maxHeight) {
          sheetHeight.value = maxHeight;
        }
      })
      .onEnd(() => {
        if (sheetHeight.value < initialHeight - 100) {
          close();
        } else {
          if (!resizable) {
            scrollTo(initialHeight);
          }
        }
      });

    const rBackdropStyle = useAnimatedStyle(() => {
      return {
        opacity: withTiming(active.value ? 1 : 0),
      };
    });

    const rBackdropProps = useAnimatedProps(() => {
      return {
        pointerEvents: active.value ? 'auto' : 'none',
      } as any;
    });

    const rSheetStyle = useAnimatedStyle(() => {
      return {
        height: active.value ? sheetHeight.value : 'auto',
      };
    });

    const bottomSheetHideStyle = useAnimatedStyle(() => {
      return {
        bottom: withSpring(active.value ? 0 : -SCREEN_HEIGHT * 10, {
          damping: 50,
        }),
      };
    });

    return (
      <>
        {freeze && <View style={styles.freeze} />}
        <Animated.View
          style={[styles.backdrop, rBackdropStyle]}
          onTouchStart={close}
          animatedProps={rBackdropProps}
        />
        <Animated.View
          ref={bottomSheetRef}
          style={[styles.bottomSheetContainer, bottomSheetHideStyle]}>
          <GestureDetector gesture={gesture}>
            <Animated.View style={[styles.sheet, rSheetStyle]}>
              <Animated.View style={styles.line} />
              <ScrollView
                contentContainerStyle={{paddingBottom: insets.bottom || 16}}
                bounces={false}>
                {children}
              </ScrollView>
            </Animated.View>
          </GestureDetector>
        </Animated.View>
      </>
    );
  },
);

const styles = StyleSheet.create({
  freeze: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    zIndex: 3,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.8)',
    zIndex: 1,
  },
  bottomSheetContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
  },
  sheet: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: 'white',
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: theme.colors.gray[900],
    opacity: 0.4,
    alignSelf: 'center',
    marginVertical: 16,
    borderRadius: 100,
  },
});

export {BottomSheet, type BottomSheetRefProps};
