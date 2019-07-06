import  thunk from 'redux-thunk'
import { applyMiddleware, createStore, compose} from 'redux'
import rootReducer from './reducers/rootReducer'

const store = createStore(
    rootReducer,
    compose(applyMiddleware(thunk))
)

export default store