import {FC, memo, useState} from 'react';

import {theme} from '../../utils/theme';
import {CustomTextProps, OrdinaryText} from './Text';

type ReadMoreTextProps = {
  text: string;
  numberOfLines: number;
  minimumCharToShow?: number;
  style?: {};
} & CustomTextProps;

const ReadMoreText: FC<ReadMoreTextProps> = memo(props => {
  const {
    text,
    numberOfLines,
    minimumCharToShow = 100,
    style,
    weight,
    color,
    size,
  } = props;
  const [showMore, setShowMore] = useState(false);

  return (
    <>
      <OrdinaryText
        weight={weight}
        color={color}
        size={size}
        align="left"
        numberOfLines={showMore ? 0 : numberOfLines}
        style={style}>
        {text}
      </OrdinaryText>
      {text?.length > minimumCharToShow && (
        <OrdinaryText
          onPress={() => setShowMore(!showMore)}
          size={size}
          weight="semibold"
          align="left"
          color={theme.colors.main[500]}
          style={{marginTop: 4}}>
          {showMore ? 'Tampilkan Lebih Sedikit' : 'Tampilkan Lebih Banyak'}
        </OrdinaryText>
      )}
    </>
  );
});

export {ReadMoreText};
