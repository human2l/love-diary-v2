import Airtable from "airtable";

const base = new Airtable({
  apiKey: process.env.REACT_APP_AIRTABLE_API_KEY,
}).base(process.env.REACT_APP_AIRTABLE_BASE_NAME);

const diaryBase = base("diary");
const walletBase = base("wallet");

const getAllDiarys = async () => {
  const response = await diaryBase
    .select({
      sort: [{ field: "time", direction: "desc" }],
    })
    .all();
  const allDiarys = response.map(
    ({ fields, fields: { photos, reply }, id }) => {
      const jsonPhotos = JSON.parse(photos);
      const jsonReply = JSON.parse(reply);
      return {
        ...fields,
        photos: jsonPhotos,
        reply: jsonReply,
        key: id,
      };
    }
  );
  return allDiarys;
};

const addNewDiary = async (newDiary) => {
  diaryBase.create(
    {
      ...newDiary,
      photos: JSON.stringify(newDiary.photos),
      reply: JSON.stringify(newDiary.reply),
    },
    function (err, record) {
      if (err) {
        console.error(err);
        return;
      }
    }
  );
};

const updateDiary = async (diaryId, diary) => {
  diaryBase.update(
    diaryId,
    {
      ...diary,
      photos: JSON.stringify(diary.photos),
      reply: JSON.stringify(diary.reply),
    },
    function (err, record) {
      if (err) {
        console.error(err);
        return;
      }
    }
  );
};

const updateDiaryReply = async (diaryId, reply) => {
  diaryBase.update(
    diaryId,
    {
      reply: JSON.stringify(reply),
    },
    function (err, record) {
      if (err) {
        console.error(err);
        return;
      }
    }
  );
};

const getDiaryCountByUser = async (username) => {
  const response = await diaryBase
    .select({
      filterByFormula: `{author}="${username}"`,
    })
    .all();
  return response.length;
};

const getDanMoney = async () => {
  const response = await walletBase.select({}).all();
  const danMoney = response[1].fields.number;
  return danMoney;
};

const getWalletState = async () => {
  const response = await walletBase.select({}).all();
  return response;
};

const updateDanWalletState = async (
  walletId,
  number,
  lastSignInDate,
  callback
) => {
  walletBase.update(
    walletId,
    {
      number,
      lastSignInDate,
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

export {
  getAllDiarys,
  getDiaryCountByUser,
  getDanMoney,
  addNewDiary,
  updateDiary,
  updateDiaryReply,
  getWalletState,
  updateDanWalletState,
};
