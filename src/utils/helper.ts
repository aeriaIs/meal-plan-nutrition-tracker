import moment from 'moment';
import RNFS from 'react-native-fs';
import ImageResizer from 'react-native-image-resizer';

export const formatTime = (
  time = 0,
  hours = true,
  minutes = true,
  seconds = true,
) => {
  const duration = moment.duration(time, 'seconds');
  let hoursString = '';
  if (hours) {
    const hour = duration.hours();
    const formattedHours = hour < 10 ? `0${hour}` : hour;
    hoursString = `${formattedHours}:`;
  }
  let minutesString = '';
  if (minutes) {
    const minute = duration.minutes();
    const formattedMinutes = minute < 10 ? `0${minute}` : minute;
    minutesString = `${formattedMinutes}:`;
  }
  let secondsString = '';
  if (seconds) {
    const second = duration.seconds();
    const formattedSeconds = second < 10 ? `0${second}` : second;
    secondsString = `${formattedSeconds}`;
  }
  return `${hoursString}${minutesString}${secondsString}`;
};

export const formatDate = (date: string, format = 'DD MMMM YYYY') => {
  return moment(date).format(format);
};

export const formatCurrency = (number = 0, currency = 'Rp') => {
  if (!number || number <= 0 || !isFinite(number) || isNaN(number)) {
    number = 0;
  }
  number = Math.floor(number);
  const balance = number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.');
  return `${currency}${balance}`;
};

export const getUrlParams = (url: any) => {
  var regexp = /[?&]([^=#]+)=([^&#]*)/g,
    params = {} as any,
    check: any;

  while ((check = regexp.exec(url?.toString()))) {
    params[check[1]] = check[2];
  }

  return params;
};

export const truncateString = (input: string, max: number) => {
  max ? max : 20;

  input?.toString();

  return input.length > max ? `${input.substring(0, max)}...` : input;
};

export const compressImageSize = async (uri: any) => {
  const base64image = await RNFS.readFile(uri, 'base64');

  try {
    const compressedImage = await ImageResizer.createResizedImage(
      `data:image/jpeg;base64,${base64image}`,
      1000,
      1000,
      'JPEG',
      100,
      0,
      undefined,
      false,
      {mode: 'contain', onlyScaleDown: false},
    );

    const result = {
      uri: compressedImage.uri,
      size: compressedImage.size,
    };

    return result;
  } catch (error) {
    console.log(error);
  }
};
