// src/features/images/imagesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './rootReducer'
import { DocumentData } from 'firebase/firestore'

// Define an interface for the image object
interface ImageFirestore {
  name: string // the name of the image
  image: DocumentData // the base64 encoded data of the image
}

// Define an interface for the initial state of the images slice
interface ImagesState {
  images: ImageFirestore[] // an array of images
}

// Define the initial state value
const initialState: ImagesState = {
  images: []
}

// Create the images slice using createSlice
const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    // A reducer to update the images array with data from firestore
    setImages(state, action: PayloadAction<ImageFirestore[]>) {
      // Use Immer to mutate the state directly
      state.images = action.payload
    }
  }
})

// Export the action creator generated by createSlice
export const { setImages } = imagesSlice.actions

// Export the selector to get the images array from the state
export const selectImages = (state: RootState) => state.images.images

// Export the reducer as default export
export default imagesSlice.reducer