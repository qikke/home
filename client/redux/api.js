const FETCH_STARTED = 'API/STARTED'
const FETCH_SUCCESS = 'API/SUCCESS'
const FETCH_FAILURE = 'API/FAILURE'

const reducer = function (state={}, action)  {
    switch(action.type) {
        case FETCH_STARTED:
            return {status: 'loading'}
        case FETCH_SUCCESS:
            return {...state, status: 'success', ...action.result}
        case FETCH_FAILURE:
            return{status: 'failure'}
        default:
            return state
    }
}

const fetchApiStarted = () => ({
    type: FETCH_STARTED
})
  
const fetchApiSuccess = (result) => ({
    type: FETCH_SUCCESS,
    result
})
  
const fetchApiFailure = (error) => ({
    type: FETCH_FAILURE,
    error
})

export const fetchApi = () => {
    return (dispatch) => {
        const api = '/api/Notes/addFolder'
       
        dispatch(fetchApiStarted())
        fetch(api, {
            body: 'name=yxx',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
          },
        }).then(res=>{
            console.log(res)
            dispatch(fetchApiSuccess(res))
        }).catch(err=>{
            console.log(err)
            dispatch(fetchApiFailure(err))
        })
    }
}

export default reducer
