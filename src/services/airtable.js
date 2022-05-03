import Airtable from "airtable";

const base = new Airtable({
  apiKey: process.env.REACT_APP_AIRTABLE_API_KEY,
}).base(process.env.REACT_APP_AIRTABLE_BASE_NAME);

const diaryBase = base("diary");
const walletBase = base("wallet");
const settingsBase = base("settings");
const todosBase = base("todos");

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
      // const { author, content, photos, reply, time } = record.fields;
      // const updatedDiary = {
      //   author,
      //   content,
      //   photos: JSON.parse(photos),
      //   reply: JSON.parse(reply),
      //   time,
      //   key: record.id,
      // };
      // return callback(updatedDiary);
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

const getUserSettings = async () => {
  const response = await settingsBase.select({}).all();
  return {
    Dan: { ...response[0].fields, id: response[0].id },
    Kai: { ...response[1].fields, id: response[1].id },
  };
};

const updateSettingsDB = async (settings) => {
  const settingsArray = [settings.Dan, settings.Kai];
  const updateData = settingsArray.map((setting) => {
    const { id, ...fields } = setting;
    return {
      id,
      fields,
    };
  });

  settingsBase.update(updateData, function (err) {
    if (err) {
      console.error(err);
      return;
    }
  });
};

const getAllTodos = async () => {
  const response = await todosBase.select({}).all();
  const allTodos = response.map((todo) => {
    return {
      id: todo.id,
      user: todo.fields.user,
      name: todo.fields.name,
      done: !!todo.fields.done,
    };
  });
  return allTodos;
};

const updateTodo = async (todo, callback) => {
  todosBase.update(
    todo.id,
    {
      done: todo.done,
    },
    function (err, record) {
      if (err) {
        console.error(err);
        return;
      }
      console.log(record);
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
  getUserSettings,
  updateSettingsDB,
  getAllTodos,
  updateTodo,
};
