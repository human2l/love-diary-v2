import base from "./airtable";

const todosBase = base("todos");

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
