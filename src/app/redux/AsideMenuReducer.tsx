import { createReducer } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  asideMenu: [],
  asideMenuUrl:[]
}

const initialState: CounterState = {
  asideMenu: [],
  asideMenuUrl:[]
}

export const asideReducer = createReducer(initialState,{
    addAsideMenu: (state, action: PayloadAction<[]>) => {
      console.log(action.payload)
      state.asideMenu=action.payload
    },
    addAsideMenuUrl: (state, action: PayloadAction<[]>) => {
      state.asideMenuUrl=action.payload
    },
})

// Action creators are generated for each case reducer function
// export const { addAsideMenu} = CombineReducer.actions

export default asideReducer