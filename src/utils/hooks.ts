import {useState, useMemo, useEffect} from 'react';

import {formatTime} from './helper';

export const useCountdownTimer = (
  duration: number,
  running = true,
  callback?: () => void,
) => {
  const [time, setTime] = useState(0);
  const formattedTime = useMemo(() => formatTime(time), [time]);

  useEffect(() => {
    setTime(duration);
  }, [duration, running]);

  useEffect(() => {
    if (!running) {
      return;
    }
    const timeout = setTimeout(() => {
      if (time <= 0) {
        callback && callback();
        return;
      }
      setTime(time - 1);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [time, running, callback]);

  return {time, formattedTime};
};
