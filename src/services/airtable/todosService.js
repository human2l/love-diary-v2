import base from "./airtable";

const todosBase = base("todos");

const getAllTodos = async (coupleIds) => {
  const response = await todosBase
    .select({
      filterByFormula: `OR({createrId}="${coupleIds[0]}",{createrId}="${coupleIds[1]}")`,
    })
    .all();
  const allTodos = response.map((todo) => {
    return {
      id: todo.id,
      createrId: todo.fields.createrId,
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
      callback();
    }
  );
};

const addTodo = async (todo, callback) => {
  todosBase.create(todo, function (err, record) {
    if (err) {
      console.error(err);
      return;
    }
    callback();
  });
};

const deleteTodos = async (todosIdArray, callback) => {
  todosBase.destroy(todosIdArray, function (err, deletedRecords) {
    if (err) {
      console.error(err);
      return;
    }
    callback();
    console.log("Deleted", deletedRecords.length, "records");
  });
};

export { getAllTodos, updateTodo, addTodo, deleteTodos };
