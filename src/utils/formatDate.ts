export type DateFormat = "time" | "date" | "dateTime";

export const formatDate = (
  date: Date = new Date(),
  format: DateFormat = "dateTime"
): string => {
  const optionsMap: Record<DateFormat, Intl.DateTimeFormatOptions> = {
    time: {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    },
    date: {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    },
    dateTime: {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
  };

  return new Intl.DateTimeFormat("sr-RS", optionsMap[format]).format(date);
};
