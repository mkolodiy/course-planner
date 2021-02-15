export const isEmpty = (value: unknown) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value as object).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  );
};

export const valueChanged = (oldValue: string, newValue: string) =>
  newValue && newValue !== '' && newValue !== oldValue;
