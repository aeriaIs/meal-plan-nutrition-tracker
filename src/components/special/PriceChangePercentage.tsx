import {useMemo} from 'react';
import {View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {OrdinaryText} from '../common';
import {theme} from '../../utils/theme';

const PriceChangePercentageComponent = ({
  percentage,
  style,
  descriptionTextStyle,
}: {
  percentage: number;
  style?: {};
  descriptionTextStyle?: {};
}) => {
  const priceChangePump = useMemo(() => {
    return percentage > 0;
  }, [percentage]);

  return (
    <View style={{flexDirection: 'row', alignItems: 'center', ...style}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: priceChangePump
            ? theme.colors.green[200]
            : theme.colors.red[200],
          borderRadius: 4,
          paddingHorizontal: 4,
          paddingVertical: 2,
          marginRight: 4,
        }}>
        {priceChangePump ? (
          <MaterialCommunityIcons
            name="arrow-top-right"
            size={12}
            color={theme.colors.green[400]}
          />
        ) : (
          <MaterialCommunityIcons
            name="arrow-bottom-right"
            size={12}
            color={theme.colors.red[400]}
          />
        )}
        <OrdinaryText
          size={10}
          weight={'medium'}
          color={
            priceChangePump ? theme.colors.green[700] : theme.colors.red[700]
          }>
          {percentage} %
        </OrdinaryText>
      </View>
      <OrdinaryText size={12} numberOfLines={1} style={descriptionTextStyle}>
        Dalam 30 hari terakhir
      </OrdinaryText>
    </View>
  );
};

export {PriceChangePercentageComponent};
