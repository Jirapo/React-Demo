import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import sagaMonitor from './utils/sagaMonitor'
import reducer from './reducers'
import rootSaga from './sagas'


const sagaMiddleware = createSagaMiddleware({sagaMonitor})
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(rootSaga)

export default store
