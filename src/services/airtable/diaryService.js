import base from "./airtable";

const diaryBase = base("diary");

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
  const orderedDiarys = allDiarys.sort((diaryA, diaryB) =>
    diaryA.time < diaryB.time ? 1 : -1
  );
  return orderedDiarys;
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

const getDiaryCountByUser = async (username) => {
  const response = await diaryBase
    .select({
      filterByFormula: `{author}="${username}"`,
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
