import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface DataState {
  MienPhi: number;
  QuyDoi: number;
  An: number;
  Loc: number;
  Phuc: number;
  Coins: number;
  BucketHat: number;
  Jacket: number; 
  ToteBag: number;
  Tumbler: number; 
  AirpodCase: number; 
  ElectronicLunchBo: number;
  PortableSpeaker: number;
}

const initialState: DataState = {
  MienPhi: 10,
	QuyDoi: 0,
	An: 0,
	Loc: 0,
	Phuc: 0,
	Coins: 0,
	BucketHat: 0,
	Jacket: 0,
	ToteBag: 0,
	Tumbler: 0,
	AirpodCase: 0,
	ElectronicLunchBo: 0,
	PortableSpeaker: 0
}

const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    updateDataField(state, action: PayloadAction<{ fieldName: keyof DataState; payload: any }>) {
      const { fieldName, payload } = action.payload
      return {
        ...state,
        [fieldName]: payload
      }
    },
  }
})

export const { updateDataField } = userDataSlice.actions

export default userDataSlice.reducer