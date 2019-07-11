import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {Provider} from 'react-redux';
import {combineReducers, createStore} from 'redux';
import TodoList from '../../../containers/todos/todoList';
import todosReducer, {addTodo} from '../../../redux/todos';

configure({adapter: new Adapter()});

describe('todoList', () => {
    it('should add todo-item on addTodo action', () => {
        const store = createStore(
            combineReducers({
                todos: todosReducer
            }), {
                todos: []
            }
        )
        const subject = (
            <Provider store={store}>
                <TodoList />
            </Provider>
        )
        store.dispatch(addTodo('white a todo text'))
        const wrapper = mount(subject)

        console.log('xxxxxxxxxxxxxxxxxxxxxxxx', store.getState())
        expect(wrapper.find('.text').text()).toEqual('white a todo text')
    })
})
