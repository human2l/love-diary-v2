import base from "./airtable";

const todosHistoryBase = base("todosHistory");

const addTodosHistory = async (todosHistory, callback) => {
  todosHistoryBase.create(todosHistory, function (err, record) {
    if (err) {
      console.error(err);
      return;
    }
    callback();
  });
};

const getAllTodosHistory = async () => {
  const response = await todosHistoryBase.select({}).all();
  const allTodosHistory = response.map((todosHistory) => {
    return {
      id: todosHistory.id,
      user: todosHistory.fields.user,
      todos: JSON.parse(todosHistory.fields.todos),
      time: todosHistory.fields.time,
      money: todosHistory.fields.money,
    };
  });

  const orderedAllTodosHistory = allTodosHistory.sort((a, b) =>
    a.time < b.time ? 1 : -1
  );
  return orderedAllTodosHistory;
};

export { addTodosHistory, getAllTodosHistory };
