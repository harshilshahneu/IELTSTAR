import Questions from "./../models/questions.js";

/**
 * Service for save
 * @param {*} newToDo
 * @returns
 */
export const save = (newToDo) => {
  const todo = new Todo(newToDo);
  return todo.save();
};

/**
 * Service for search
 * @param {*} query
 * @returns
 */
