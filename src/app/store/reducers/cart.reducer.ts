import {createReducer, on} from "@ngrx/store";
import * as CartActions from '../actions/cart.actions'

interface State {
  totalItem: number,
  subTotal: number
}

const initialState: State = {
  subTotal: 0,
  totalItem: 0
}

export const cartDetailsReducer = createReducer(
  initialState,
  on(CartActions.setCartDetail, (state, cartDetail) => {
    // console.log("************===========>>>>>>>>>>", cartDetail)
    return {
      totalItem: cartDetail.totalItem,
      subTotal: cartDetail.subTotal
    }
  })
)
