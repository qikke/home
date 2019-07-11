import {addTodo, ADD_TODOS} from '../../redux/todos';
describe('todos/actions', () => {
        describe('addTodo', () => {
            it('it should create action to add todo', () => {
                const text = 'first todo'
                const action = addTodo(text)
    
                expect(action.text).toBe(text)
                expect(action.completed).toBe(false)
                expect(action.type).toBe(ADD_TODOS)
            })
            it('it should have different id for different action ', () => {
                const text1 = 'text1'
                const text2 = 'text2'
                const action1 = addTodo(text1)
                const action2 = addTodo(text2)

                expect(action1.id === action2.id).toBe(false)
            })
        })
})

