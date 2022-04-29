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

  const formatString = `[${country}] HH:mma D/MMM/YYYY`;
  const date = moment(timestamp).tz(countryMap[country]).format(formatString);
  return date;
};

const timeDiff = (time1, time2) => {
  time1 = time1.getTime();
  time2 = time2.getTime();
  let cha = time1 > time2 ? time1 - time2 : time2 - time1;
  let day = Math.floor(cha / (24 * 3600 * 1000));
  let hours = Math.floor((cha % (24 * 3600 * 1000)) / (3600 * 1000));
  let minutes = Math.floor(
    ((cha % (24 * 3600 * 1000)) % (3600 * 1000)) / (60 * 1000)
  );
  let seconds = Math.floor(
    (((cha % (24 * 3600 * 1000)) % (3600 * 1000)) % (60 * 1000)) / 1000
  );
  return {
    day: day,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };
};

export { getCurrentTimestamp, getCountryDateFromTimestamp, timeDiff };
