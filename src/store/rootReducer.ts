import { combineReducers } from 'redux'
import userDataReducer from './userDataSlice'
import imagesReducer from './imagesSlice' // import imagesReducer

const rootReducer = combineReducers({
  userData: userDataReducer,
  images: imagesReducer // add imagesReducer to the object
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
