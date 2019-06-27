import React from 'react'
import { connect } from 'react-redux'

const TodoList = ({ todos }) => {
  return (
    <ul>
      {
        todos.map(item => (
          <li key={item.id}>
            {item.text}
          </li>
        ))
      }
    </ul>
  )
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos
  }
}

export default connect(mapStateToProps)(TodoList)
