let nextTodoId = 0

// action-type
const ADD_TODOS = 'TODOS/ADD'
const REMOVE_TODOS = 'TODOS/REMOVE'

// reducer
const reducer = function (state = [], action) {
  const { text, id, completed } = action
  switch (action.type) {
    case ADD_TODOS:
      return [{ text, id, completed }, ...state]
    case REMOVE_TODOS:
      return state.filter(todoItem => {
        return todoItem.id !== id
      })
    default:
      return state
  }
}

// actions
export const addTodo = (text) => ({
  type: ADD_TODOS,
  id: nextTodoId++,
  completed: false,
  text
})

export const removeTodo = (id) => ({
  type: ADD_TODOS,
  id
})

export default reducer
