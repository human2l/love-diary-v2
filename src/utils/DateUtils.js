import moment from "moment-timezone";

const getCurrentTimestamp = () => {
  let today = new Date();
  let timestamp = today.getTime();
  return timestamp;
};

const getCountryDateFromTimestamp = (timestamp, country) => {
  const countryMap = {
    Sydney: "Australia/Sydney",
    China: "Asia/Shanghai",
  };
  if (!countryMap[country]) return null;

  const formatString = `[${country}] h:ma D/MMM/YYYY`;
  const date = moment(timestamp).tz(countryMap[country]).format(formatString);
  return date;
};

export { getCurrentTimestamp, getCountryDateFromTimestamp };
