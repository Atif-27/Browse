export const getDataFromLocalStorage = (key: string) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

export const setDataInLocalStorage = (key: string, data: unknown) => {
  localStorage.setItem(key, JSON.stringify(data));
};
