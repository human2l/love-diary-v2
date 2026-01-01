import { AIRTABLE_TABLES, AIRTABLE_FIELDS } from "../../config/airtableConfig";
import base from "./airtable";

const diaryBase = base(AIRTABLE_TABLES.DIARY);

const getAllDiarys = async (coupleIds) => {
  const response = await diaryBase
    .select({
      filterByFormula: `OR({${AIRTABLE_FIELDS.DIARY.AUTHOR_ID}}="${coupleIds[0]}",{${AIRTABLE_FIELDS.DIARY.AUTHOR_ID}}="${coupleIds[1]}")`,
      sort: [{ field: AIRTABLE_FIELDS.DIARY.TIME, direction: "desc" }],
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
  const orderedDiarys = allDiarys.sort((diaryA, diaryB) =>
    diaryA.time < diaryB.time ? 1 : -1
  );
  return orderedDiarys;
};

const addNewDiary = async (newDiary) => {
  diaryBase.create(
    {
      ...newDiary,
      photos: JSON.stringify(newDiary[AIRTABLE_FIELDS.DIARY.PHOTOS]),
      reply: JSON.stringify(newDiary[AIRTABLE_FIELDS.DIARY.REPLY]),
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
      photos: JSON.stringify(diary[AIRTABLE_FIELDS.DIARY.PHOTOS]),
      reply: JSON.stringify(diary[AIRTABLE_FIELDS.DIARY.REPLY]),
    },
    function (err, record) {
      if (err) {
        console.error(err);
        return;
      }
    }
  );
};

const updateDiaryReply = async (diaryId, reply, successCallback) => {
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
      successCallback();
    }
  );
};

const getDiaryCountByUser = async (userId) => {
  const response = await diaryBase
    .select({
      filterByFormula: `{${AIRTABLE_FIELDS.DIARY.AUTHOR_ID}}="${userId}"`,
    })
    .all();
  return response.length;
};

export {
  getAllDiarys,
  getDiaryCountByUser,
  addNewDiary,
  updateDiary,
  updateDiaryReply,
};
