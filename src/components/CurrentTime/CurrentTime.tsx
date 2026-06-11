import { useEffect, useState } from "react";

const formatDateTime = (date: Date) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${month}/${day}/${year} - ${hours}:${minutes}:${seconds}`;
};

export const CurrentTime = () => {
  const [time, setTime] = useState(() => formatDateTime(new Date()));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(formatDateTime(new Date()));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="text-xs font-bold cursor-pointer dark:text-white">
      {time}
    </span>
  );
};
