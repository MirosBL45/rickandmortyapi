import { useEffect, useState } from "react";
import { formatDate } from "@/utils/formatDate";

export default function Clock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <span>{formatDate(now, "time")}</span>;
};
