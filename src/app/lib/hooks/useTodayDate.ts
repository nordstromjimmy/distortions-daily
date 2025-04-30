"use client";

import { useEffect, useState } from "react";

export default function useTodayDate(): string | null {
  const [today, setToday] = useState<string | null>(null);

  useEffect(() => {
    const now = new Date();
    const offsetMs = now.getTimezoneOffset() * 60000;
    const localTime = new Date(now.getTime() - offsetMs);
    const dateStr = localTime.toISOString().split("T")[0];
    setToday(dateStr);
  }, []);

  return today;
}
