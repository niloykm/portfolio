export function isFilled<T>(value: T | undefined | null): value is T {
  if (value === undefined || value === null) return false;
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (trimmed === '' || trimmed.includes('TODO(niloy)')) return false;
    return true;
  }
  if (Array.isArray(value)) {
    return value.length > 0 && value.every((item) => isFilled(item));
  }
  return true;
}
