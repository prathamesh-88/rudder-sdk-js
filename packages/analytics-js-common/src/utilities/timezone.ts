/**
 * To get the timezone of the user
 * @returns string
 */
const getTimezone = (): string => {
  const timezone = new Date().toString().match(/([A-Z]+[+-]\d+)/);
  return timezone && timezone.length > 0 ? timezone[1] : 'NA';
};

export { getTimezone };
