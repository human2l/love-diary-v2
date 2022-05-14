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

const getUserWalletStatus = async (user) => {
  const response = await walletBase
    .select({
      filterByFormula: `{name}="${user}"`,
    })
    .all();
  return { ...response[0].fields, id: response[0].id };
};

const updateUserMoney = async (user, money) => {
  const userWalletStatus = await getUserWalletStatus(user);
  walletBase.update(
    userWalletStatus.id,
    {
      number: userWalletStatus.number + money,
    },
    function (err) {
      if (err) {
        console.error(err);
        return;
      }
    }
  );
};

export {
  getWalletState,
  updateUserWalletState,
  getUserWalletStatus,
  updateUserMoney,
};
