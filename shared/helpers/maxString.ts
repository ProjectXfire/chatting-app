export function maxString(string: string, max: number): string {
  const capFirstLetter = string[0].toUpperCase() + string.slice(1);
  const limitString =
    capFirstLetter.length > max ? `${capFirstLetter.slice(0, max)}...` : capFirstLetter;
  return limitString;
}
