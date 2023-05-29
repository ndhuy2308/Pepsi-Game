import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserData {
  MienPhi: number
  QuyDoi: number
  An: number
  Loc: number
  Phuc: number
  Coins: number
  BucketHat: number
  Jacket: number
  ToteBag: number
  Tumbler: number
  AirpodCase: number
  ElectronicLunchBo: number
  PortableSpeaker: number
  UserID: string
}

interface State {
  data: UserData
}

const initialState: State = {
  data: {
    MienPhi: 5,
    QuyDoi: 3,
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
    PortableSpeaker: 0,
    UserID: ''
  }
}

const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    updateData(state, action: PayloadAction<UserData>) {
      state.data = action.payload
    },
    updateMienPhi(state, action: PayloadAction<number>) {
      state.data.MienPhi = action.payload
    },
    updateQuyDoi(state, action: PayloadAction<number>) {
      state.data.QuyDoi = action.payload
    },
    updateAn(state, action: PayloadAction<number>) {
      state.data.An = action.payload
    },
    updateLoc(state, action: PayloadAction<number>) {
      state.data.Loc = action.payload
    },
    updatePhuc(state, action: PayloadAction<number>) {
      state.data.Phuc = action.payload
    },
    updateCoins(state, action: PayloadAction<number>) {
      state.data.Coins = action.payload
    },
    updateBucketHat(state, action: PayloadAction<number>) {
      state.data.BucketHat = action.payload
    },
    updateJacket(state, action: PayloadAction<number>) {
      state.data.Jacket = action.payload
    },
    updateToteBag(state, action: PayloadAction<number>) {
      state.data.ToteBag = action.payload
    },
    updateTumbler(state, action: PayloadAction<number>) {
      state.data.Tumbler = action.payload
    },
    updateAirpodCase(state, action: PayloadAction<number>) {
      state.data.AirpodCase = action.payload
    },
    updateElectronicLunchBox(state, action: PayloadAction<number>) {
      state.data.ElectronicLunchBo = action.payload
    },
    updatePortableSpeaker(state, action: PayloadAction<number>) {
      state.data.PortableSpeaker = action.payload
    }
  }
})

export const {
  updateData,
  updateMienPhi,
  updateQuyDoi,
  updateAn,
  updateLoc,
  updatePhuc,
  updateCoins,
  updateBucketHat,
  updateJacket,
  updateToteBag,
  updateTumbler,
  updateAirpodCase,
  updateElectronicLunchBox,
  updatePortableSpeaker
} = userDataSlice.actions

export default userDataSlice.reducer
