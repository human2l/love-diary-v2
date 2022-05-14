import base from "./airtable";

const walletBase = base("wallet");

// const getDanMoney = async () => {
//   const response = await walletBase.select({}).all();
//   const danMoney = response[1].fields.number;
//   return danMoney;
// };

const getWalletState = async () => {
  const response = await walletBase.select({}).all();
  const walletState = {};
  for (let record of response) {
    walletState[record.fields.name] = { ...record.fields, id: record.id };
  }
  return walletState;
};

const updateUserWalletState = async (
  walletId,
  number,
  lastCheckInDate,
  callback
) => {
  walletBase.update(
    walletId,
    {
      number,
      lastCheckInDate,
    },
    function (err, record) {
      if (err) {
        console.error(err);
        return;
      }
      callback();
    }
  );
};

export { getWalletState, updateUserWalletState };
