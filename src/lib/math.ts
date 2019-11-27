export function generateRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateRandomIntInRange(range: number[]): number {
  if (range.length === 0) return 0;
  if (range.length === 1) return range[0];

  const min = Math.min(...range);
  const max = Math.max(...range);
  const randomNumber = generateRandomInt(min, max);
  return range.includes(randomNumber)
    ? randomNumber
    : generateRandomIntInRange(range);
}
