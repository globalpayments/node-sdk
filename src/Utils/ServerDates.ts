export const processServerDate = (s: string) => {
  if (!s || s.length !== 8) {
    throw new Error("Invalid date format. Expected 'MMDDYYYY'");
  }

  const month = parseInt(s.substring(0, 2), 10) - 1;
  const day = parseInt(s.substring(2, 4), 10);
  const year = parseInt(s.substring(4, 8), 10);

  return new Date(year, month, day);
};
