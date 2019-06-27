import React, { Component } from 'react'
import { connect } from 'react-redux'

import { addTodo } from '../../redux/todos'

class AddTodo extends Component {
  constructor(props) {
    super(props)

    this.state = { value: '' }
    this.onSubmit = this.onSubmit.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
  }

  onSubmit (ev) {
    ev.preventDefault()
    const inputValue = this.state.value
    if (!inputValue.trim()) return
    this.props.onAdd(inputValue)
    this.setState({value: ''})
  }

  onInputChange (event) {
    this.setState({
      value: event.target.value
    })
  }

  render () {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input type="text" value={this.state.value} onChange={this.onInputChange} />
          <button type="submit">add</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAdd: (text) => {
      dispatch(addTodo(text))
    }
  }
}

export default connect(null, mapDispatchToProps)(AddTodo)
