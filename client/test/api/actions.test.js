import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {stub} from 'sinon';
// import sinonStubPromise from 'sinon-stub-promise';
import {fetchApi, FETCH_STARTED, FETCH_SUCCESS} from '../../redux/api';
// sinonStubPromise(sinon)

const {Response, Request, Headers, fetch} = require('whatwg-fetch');
global.Response = Response;
global.Request = Request;
global.Headers = Headers;
global.fetch = fetch;

const middlewares = [thunk]
const createMockStore = configureStore(middlewares)

// 异步actions测试用例
describe('api/actions', () => {
    describe('fetchApi', () => {
        let stubbedFetch
        const store = createMockStore();

        beforeEach(() => {
            stubbedFetch = stub(global, 'fetch')
        })
        afterEach(() => {
            stubbedFetch.restore()
        })
        
        it('it should dispatch fetchSuccess action type on fetch success', () => {
            const mockResponse = Promise.resolve({
                code: 0
            })
            stubbedFetch.returns(mockResponse)
            store.dispatch(fetchApi()).then(() => {
                const dispatchedActions = store.getActions()
                expect(dispatchedActions.length).toBe(2);
                expect(dispatchedActions[0].type).toBe(FETCH_STARTED);
                expect(dispatchedActions[1].type).toBe(FETCH_SUCCESS);
            })
        })
    })
})
