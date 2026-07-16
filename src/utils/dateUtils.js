export function getDaysRemaining(targetDate) {
  const now = new Date();
  const difference = targetDate - now;

  return Math.ceil(difference / (1000 * 60 * 60 * 24));
}

export function calculateProgress(eventDate, createdDate) {
  if (!createdDate) return 0;

  const total = new Date(eventDate) - new Date(createdDate);
  const remaining = new Date(eventDate) - new Date();

  return Math.max(0, Math.min(100, ((total - remaining) / total) * 100));
}
