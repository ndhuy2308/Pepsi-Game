import { combineReducers } from 'redux'
import userDataReducer from './userDataSlice'

const rootReducer = combineReducers({
  userData: userDataReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
