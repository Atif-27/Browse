export const calculateTimeDifference = (createdAt: Date) => {
  const currentTime = new Date();
  const difference = currentTime.getTime() - new Date(createdAt).getTime();

  // Convert difference to minutes
  const minutes = Math.floor(difference / 60000);

  // Convert minutes to hours, days, weeks, and years
  if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  } else if (minutes < 1440) {
    const hours = Math.floor(minutes / 60);
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  } else if (minutes < 10080) {
    const days = Math.floor(minutes / 1440);
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  } else if (minutes < 43800) {
    const weeks = Math.floor(minutes / 10080);
    return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;
  } else {
    const years = Math.floor(minutes / 525600);
    return `${years} year${years !== 1 ? "s" : ""} ago`;
  }
};
