import {ActivityIndicator, View} from 'react-native';

import {theme} from '../../utils/theme';

const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator size="large" color={theme.colors.main[500]} />
    </View>
  );
};

type ListLoadingProps = {
  loading: boolean;
  color?: any;
  size?: any;
  style?: {};
};

const ListLoading = (props: ListLoadingProps) => {
  const {
    loading = false,
    color = theme.colors.gray[500],
    size = 'small',
    style,
  } = props;

  return (
    <>
      {loading ? (
        <ActivityIndicator
          style={[
            {
              marginTop: 4,
              marginBottom: 16,
            },
            style,
          ]}
          size={size}
          color={color}
          animating={true}
        />
      ) : null}
    </>
  );
};

export {Loading, ListLoading};
