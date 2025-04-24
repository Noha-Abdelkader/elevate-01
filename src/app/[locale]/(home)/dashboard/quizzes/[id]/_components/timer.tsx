"use client";
import { useTimeCheck } from "@/lib/utils/timer-check";
import React, { useEffect, useState } from "react";
import { LuTimer } from "react-icons/lu";

type TimerProps = {
  time: number; // in seconds
  stopTimer: boolean;
  onTimeChange?: (date: Date) => void;
  onTimerEnd?: () => void;
};

const Timer = ({ time, stopTimer, onTimeChange, onTimerEnd }: TimerProps) => {
  // variables
  const [remainingTime, setRemainingTime] = useState(
    new Date(0).setMinutes(time)
  );

  // Effects
  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        const currentDate = new Date(prev);

        // if time up
        if (currentDate.getMinutes() === 0 && currentDate.getSeconds() == 0) {
          clearInterval(interval);
          onTimerEnd?.();
          return 0;
        }

        if (stopTimer) {
          clearInterval(interval);
          return prev;
        }
        onTimeChange?.(currentDate);

        return currentDate.setSeconds(currentDate.getSeconds() - 1);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [stopTimer, onTimerEnd]);

  // Format time
  function formatTime(time: number) {
    return Intl.DateTimeFormat("en-US", {
      minute: "2-digit",
      second: "2-digit",
    }).format(time);
  }

  return (
    <div className={`flex items-end gap-1`}>
      <LuTimer
        className={`text-lg text-gray-500  ${
          remainingTime <= 120 && "shaking text-red-500"
        }`}
      />
      <span
        className={`text-xs font-semibold ${
          remainingTime <= 120 ? "text-red-500" : "text-green-500"
        }`}
      >
        {formatTime(remainingTime)}
      </span>
    </div>
  );
};

export default Timer;
