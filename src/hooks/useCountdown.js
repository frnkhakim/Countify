import { useEffect, useState } from "react";

export default function useCountdown(targetDate) {
  const calculate = () => {
    const difference = new Date(targetDate) - new Date();

    if (difference <= 0) {
      return {
        expired: true,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return {
      expired: false,
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculate());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculate());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}
