export const formatDate = (dateString: string) => {
  return new Date(dateString)
    .toISOString()
    .split('T')[0]
    .split('-')
    .reverse()
    .join('.');
};

export const getUnformattedDate = (dateString: string) =>
  dateString.split('T')[0];
