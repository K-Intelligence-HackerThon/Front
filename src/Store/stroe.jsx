import { configureStore, createSlice } from '@reduxjs/toolkit'

let First = createSlice({
    name :'user',
    initialState: 'kim'
})
export default configureStore({
  reducer: { 
    F:First.reducer
  }
}) 