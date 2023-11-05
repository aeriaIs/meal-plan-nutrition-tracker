import {Path} from 'react-native-svg-charts';
import {ClipPath, Defs, LinearGradient, Rect, Stop} from 'react-native-svg';

const indexToClipFrom = 10;

const Gradient = ({index}: {index?: number}) => (
  <Defs key={index}>
    <LinearGradient id={'gradient'} x1={'0%'} y1={'0%'} x2={'0%'} y2={'100%'}>
      <Stop offset={'0%'} stopColor={'rgb(36, 183, 255)'} stopOpacity={0.5} />
      <Stop
        offset={'100%'}
        stopColor={'rgb(130, 213, 255)'}
        stopOpacity={0.1}
      />
    </LinearGradient>
  </Defs>
);

const Clips = ({x, width}: {x?: any; width?: number}) => (
  <Defs key={'clips'}>
    <ClipPath id={'clip-path-1'} key={'0'}>
      <Rect x={0} y={'0'} width={x(indexToClipFrom)} height={'100%'} />
    </ClipPath>
    <ClipPath id="clip-path-2" key={'1'}>
      <Rect
        x={x(indexToClipFrom)}
        y={'0'}
        width={width ? width - x(indexToClipFrom) : 0}
        height={'100%'}
      />
    </ClipPath>
  </Defs>
);

const Line = ({line}: {line?: number}) => (
  <Path
    key={'line'}
    d={line}
    stroke={'rgb(0, 170, 255)'}
    fill={'none'}
    clipPath={'url(#clip-path)'}
  />
);

const DashedLine = ({line}: {line?: number}) => (
  <Path
    key={'dashed-line'}
    stroke={'green'}
    d={line}
    fill={'none'}
    clipPath={'url(#clip-path-2)'}
    strokeDasharray={[4, 4]}
  />
);

export {Gradient, Clips, Line, DashedLine};
