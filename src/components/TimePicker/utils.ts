export type TimeType = [number, number];

export const validateTime = (
  [hours, minutes]: TimeType,
  [minHours, minMinutes]: TimeType,
  [maxHours, maxMinutes]: TimeType,
) => {
  let validatedHours = hours;
  let validatedMinutes = minutes;
  if (validatedHours < minHours) {
    validatedHours = minHours;
  }
  if (validatedHours === minHours) {
    if (validatedMinutes < minMinutes) {
      validatedMinutes = minMinutes;
    }
    if (validatedMinutes > maxMinutes) {
      validatedMinutes = maxMinutes;
    }
  }
  if (validatedHours > maxHours) {
    validatedHours = maxHours;
  }
  if (validatedHours === maxHours) {
    if (validatedMinutes > maxMinutes) {
      validatedMinutes = maxMinutes;
    }
  }
  return [validatedHours, validatedMinutes] as const;
};
