"use client";

import { useEffect, useState } from "react";


export function useTimeCheck(time :number) {


  const [second, setSecond] = useState(new Date(0).setMinutes(time));
  const [timeChange , setTimeChange] = useState(new Date(0));
  // const [timeEnd , setTimeEnd] = useState(new Date(0).setMinutes(time));

  function formatTime(time: number) {
    return Intl.DateTimeFormat("en-US", {
      minute: "2-digit",
      second: "2-digit",
    }).format(time);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setSecond((prev) => {
        const currentDate = new Date(prev);

        // if time up
        if (currentDate.getMinutes() === 0 && currentDate.getSeconds() == 0) {
          clearInterval(interval);
          // onTimerEnd?.();
          return 0;
        }
        setTimeChange(currentDate);


        return currentDate.setSeconds(currentDate.getSeconds() - 1);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return {
    second,
    isTimeUp: second < 1,
    formatTime,
    timeChange,
    // onTimerEnd,
  };
}
