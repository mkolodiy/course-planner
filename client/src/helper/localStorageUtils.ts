export enum LocalStorageKey {
  TOKEN = 'TOKEN',
  USER = 'USER'
}

export function getItemFromLocalStorage<T>(key: string): T {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
}

export function setItemInLocalStorage<T extends any>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function removeItemFromLocalStorage(key: string) {
  localStorage.removeItem(key);
}
