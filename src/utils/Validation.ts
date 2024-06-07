export function isValidNumber(limit: number, value: string) {
  const numberRegex = new RegExp(`^(?:[0-9]{1,${limit}})$`);

  return numberRegex.test(value);
}

export function isValidLength(limit: number, value: string) {
  return value.length <= limit;
}

export function isValidMonth(value: string) {
  if (value.length === 1) {
    return true;
  }

  return Number(value) >= 1 && Number(value) <= 12;
}

export function isValidDate(month: number, year: number) {
  const today = new Date();
  const [todayMonth, todayYear] = [
    today.getMonth(),
    Number(String(today.getFullYear()).slice(2, 4)),
  ];

  console.log(month, todayMonth, year, todayYear);
  return month >= todayMonth && year >= todayYear;
}
