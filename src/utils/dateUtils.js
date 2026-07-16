export function getDaysRemaining(
  targetDate
) {
  const now = new Date();

  const difference =
    targetDate - now;

  return Math.ceil(
    difference /
      (1000 * 60 * 60 * 24)
  );
}