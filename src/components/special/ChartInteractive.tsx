import {useCallback, useRef, useState} from 'react';
import {PanResponder, Dimensions, View} from 'react-native';
import {AreaChart, XAxis} from 'react-native-svg-charts';
import {
  Circle,
  Defs,
  G,
  Line,
  LinearGradient,
  Path,
  Rect,
  Stop,
  Text as SvgText,
} from 'react-native-svg';

import {theme} from '../../utils/theme';
import {formatCurrency} from '../../utils/helper';

const width = Dimensions.get('window').width;

const InteractiveChart = ({
  chartLabels,
  chartXLabels,
  chartValues,
  xAxisLabelValues,
}: {
  chartLabels: string[];
  chartXLabels: string[];
  xAxisLabelValues: number[];
  chartValues: number[];
}) => {
  const apx = (size = 0) => {
    return (width / 750) * size;
  };

  const size = useRef(chartLabels?.length);

  const [positionX, setPositionX] = useState(-1); // The currently selected X coordinate position

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderTerminationRequest: () => true,

      onPanResponderGrant: evt => {
        updatePosition(evt.nativeEvent.locationX);
        return true;
      },
      onPanResponderMove: evt => {
        updatePosition(evt.nativeEvent.locationX);
        return true;
      },
      onPanResponderRelease: () => {
        setPositionX(-1);
      },
    }),
  );

  const updatePosition = (x: number) => {
    const YAxisWidth = apx(130);
    const x0 = apx(0); // x0 position
    const chartWidth = apx(750) - YAxisWidth - x0;
    const xN = x0 + chartWidth; //xN position
    const xDistance = chartWidth / size.current; // The width of each coordinate point

    if (x <= x0) {
      x = x0;
    }
    if (x >= xN) {
      x = xN;
    }

    // The selected coordinate x :
    // (x - x0)/ xDistance = value
    let value = ((x - x0) / xDistance).toFixed(0);
    let valueNumber = parseInt(value, 10); // convert value to a number

    if (valueNumber >= size.current - 1) {
      valueNumber = size.current - 1; // Out of chart range, automatic correction
    }

    setPositionX(Number(value));
  };

  const Tooltip = useCallback(
    ({x, y, ticks}: {x?: any; y?: any; ticks?: any}) => {
      if (positionX < 0 || positionX === chartLabels?.length) {
        return null;
      }

      const date = chartLabels?.[positionX];

      return (
        <G x={x(positionX)} key="tooltip">
          <G
            x={positionX > size.current / 4 ? -apx(300 + 10) : apx(10)}
            y={y(chartValues[positionX]) - apx(10)}>
            <Rect
              y={-apx(24 + 24 + 20) / 2}
              rx={apx(12)} // borderRadius
              ry={apx(12)} // borderRadius
              width={apx(300)}
              height={apx(96)}
              stroke="rgba(0, 175, 255, 0.27)"
              fill="rgba(255, 255, 255, 0.8)"
            />

            <SvgText
              x={apx(20)}
              fill="#617485"
              opacity={0.65}
              fontSize={apx(26)}>
              {date}
            </SvgText>
            <SvgText
              x={apx(20)}
              y={apx(24 + 20)}
              fontSize={apx(32)}
              fontWeight="bold"
              fill={theme.colors.main[500]}>
              {formatCurrency(chartValues[positionX])}
            </SvgText>
          </G>

          <G x={x}>
            <Line
              y1={ticks[0]}
              y2={ticks[Number(ticks.length)]}
              stroke={theme.colors.main[500]}
              strokeWidth={apx(4)}
              strokeDasharray={[6, 3]}
            />

            <Circle
              cy={y(chartValues[positionX])}
              r={apx(20 / 2)}
              stroke="#fff"
              strokeWidth={apx(2)}
              fill={theme.colors.main[500]}
            />
          </G>
        </G>
      );
    },
    [chartLabels, chartValues, positionX],
  );

  const CustomGradient = useCallback(
    () => (
      <Defs key="gradient">
        <LinearGradient id="gradient" x1="0%" y1="80%" x2="0%" y2="0%">
          <Stop
            offset={'0%'}
            stopColor={'rgb(255, 255, 255)'}
            stopOpacity={1}
          />
          <Stop
            offset={'100%'}
            stopColor={'rgb(36, 183, 255)'}
            stopOpacity={0.4}
          />
        </LinearGradient>
      </Defs>
    ),
    [],
  );

  const CustomLine = useCallback(
    ({line}: {line?: any}) => (
      <Path
        key="line"
        d={line}
        stroke="rgb(0, 170, 255)"
        strokeWidth={apx(3)}
        fill="none"
      />
    ),
    [],
  );

  const verticalContentInset = {top: apx(40), bottom: apx(40)};

  return (
    <View
      style={{
        marginTop: 64,
        backgroundColor: 'transparent',
        alignItems: 'stretch',
      }}>
      <View
        style={{
          flexDirection: 'row',
          width: width,
          height: apx(500),
          alignSelf: 'stretch',
        }}>
        <View style={{flex: 1}} {...panResponder.current?.panHandlers}>
          <AreaChart
            style={{flex: 1, paddingHorizontal: apx(10)}}
            data={chartValues}
            // curve={shape.curveNatural}
            // curve={shape.curveMonotoneX}
            contentInset={{...verticalContentInset}}
            svg={{fill: 'url(#gradient)'}}>
            <CustomLine />
            <CustomGradient />
            <Tooltip />
          </AreaChart>
        </View>
      </View>
      <XAxis
        style={{
          alignSelf: 'center',
          marginTop: apx(0),
          width: width,
          paddingHorizontal: apx(5),
          height: apx(60),
          backgroundColor: 'rgba(36,193,255, 0.02)',
          borderTopWidth: 1,
          borderTopColor: theme.colors.main[50],
        }}
        numberOfTicks={chartXLabels?.length}
        data={xAxisLabelValues}
        formatLabel={value => {
          return chartXLabels?.length === 4
            ? chartXLabels?.[value]
            : chartXLabels?.[value];
        }}
        contentInset={{
          left: apx(50),
          right: apx(50),
        }}
        svg={{
          fontSize: apx(18),
          fill: '#617485',
          fontWeight: 'bold',
          rotation: chartXLabels?.length < 6 ? 0 : -25,
          originY: 30,
          y: 10,
        }}
      />
    </View>
  );
};

export {InteractiveChart};
