// src/utils/storage.ts
export const storage = {
  get<T>(key: string): T | null {
    if (typeof window === 'undefined') return null;
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : null;
    } catch {
      return null;
    }
  },
  set<T>(key: string, value: T) {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error(`Failed to save ${key} in localStorage`, err);
    }
  },
  remove(key: string) {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(key);
    } catch (err) {
      console.error(`Failed to remove ${key} from localStorage`, err);
    }
  },
};
