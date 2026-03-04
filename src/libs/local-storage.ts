import { jsonParse } from './json-parser';

interface SaveLocalStorageData {
  key: string;
  value: string;
}

interface GetLocalStorageData {
  key: string;
}

export function saveLocalStorageData(params: SaveLocalStorageData) {
  const key = params?.key;
  const value = params?.value;
  localStorage.setItem(key, value);
}

export function getLocalStorageData(params: GetLocalStorageData) {
  const key = params?.key;
  const value = localStorage.getItem(key);
  if (value) {
    const parsedItem = jsonParse(value);
    return parsedItem;
  }
  return null;
}
