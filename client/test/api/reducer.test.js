import {default as reducer, fetchApiStarted} from '../../redux/api';

describe('api/reducers', () => {
    it('should return loading status', () => {
        const action = fetchApiStarted()
        const newState = reducer({}, action)
        expect(newState.status === 'loading').toBe(true)
    })
})

