import Airtable from "airtable";

const base = new Airtable({
  apiKey: process.env.REACT_APP_AIRTABLE_API_KEY,
}).base(process.env.REACT_APP_AIRTABLE_BASE_NAME);

const diaryBase = base("diary");
const walletBase = base("wallet");

const getAllDiarys = async () => {
  const response = await diaryBase.select({}).all();
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

const createNewDiary = async (newDiary) => {
  diaryBase.create(newDiary, function (err, record) {
    if (err) {
      console.error(err);
      return;
    }
  });
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
  const danMoney = response[1].fields.Number;
  return danMoney;
};

export { getAllDiarys, getDiaryCountByUser, getDanMoney, createNewDiary };
