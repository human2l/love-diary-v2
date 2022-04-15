export const getCurrentDate = () => {
  let today = new Date();
  let minute = String(today.getMinutes()).padStart(2, "0");
  let hour = String(today.getHours()).padStart(2, "0");
  let day = String(today.getDate()).padStart(2, "0");
  let month = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let year = today.getFullYear();
  let time = today.getTime();

  return { minute, hour, day, month, year, time };
};

export const getTimeString = (author, minute, hour, day, month, year) => {
  let timeZone = "";
  author === "Dan" ? (timeZone = "中") : (timeZone = "澳");
  return `${timeZone}  ${hour}:${minute}  ${day}/${month}/${year}`;
};
