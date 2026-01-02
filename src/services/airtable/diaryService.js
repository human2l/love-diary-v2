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

const getDiarysPaginated = async (coupleIds, offset = null) => {
  const baseId = process.env.REACT_APP_AIRTABLE_BASE_NAME;
  const token = process.env.REACT_APP_AIRTABLE_PERSONAL_ACCESS_TOKEN;
  const tableName = AIRTABLE_TABLES.DIARY;

  const filterFormula = `OR({${AIRTABLE_FIELDS.DIARY.AUTHOR_ID}}="${coupleIds[0]}",{${AIRTABLE_FIELDS.DIARY.AUTHOR_ID}}="${coupleIds[1]}")`;
  
  const params = new URLSearchParams({
    filterByFormula: filterFormula,
    pageSize: "10",
    "sort[0][field]": AIRTABLE_FIELDS.DIARY.TIME,
    "sort[0][direction]": "desc",
  });

  if (offset) {
    params.set("offset", offset);
  }

  const url = `https://api.airtable.com/v0/${baseId}/${tableName}?${params.toString()}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch diary page");
  }

  const json = await response.json();
  const records = json.records || [];
  const nextOffset = json.offset;

  const processedRecords = records.map((record) => {
    const { fields, id } = record;
    let jsonPhotos = [];
    let jsonReply = {};

    try {
      jsonPhotos = fields.photos ? JSON.parse(fields.photos) : [];
    } catch (e) {
      console.warn("Failed to parse photos", e);
    }

    try {
      jsonReply = fields.reply ? JSON.parse(fields.reply) : {};
    } catch (e) {
      console.warn("Failed to parse reply", e);
    }

    return {
      ...fields,
      photos: jsonPhotos,
      reply: jsonReply,
      key: id,
    };
  });

  return {
    data: processedRecords,
    nextOffset: nextOffset,
  };
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
  getDiarysPaginated,
  getDiaryCountByUser,
  addNewDiary,
  updateDiary,
  updateDiaryReply,
};
