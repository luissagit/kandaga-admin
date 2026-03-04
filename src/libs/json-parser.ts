export function jsonParse(data: string) {
  try {
    const value = JSON.parse(data);
    return value;
  } catch {
    return null;
  }
}
