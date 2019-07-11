import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import Todo from '../../../containers/todos';
import AddTodo from '../../../containers/todos/addTodo';
import TodoList from '../../../containers/todos/TodoList';

configure({adapter: new Adapter()});
describe('todos', () => {
    it('should contains addTodos and todoList', () => {
        const wrapper = shallow(<Todo />)
        expect(wrapper.contains(<AddTodo />)).toBe(true)
        expect(wrapper.contains(<TodoList />)).toBe(true)
    })
})
