import {createAction, props} from "@ngrx/store";

export const setCartDetail = createAction('[Cart] Add Cart Details', props<{ totalItem: number, subTotal: number }>())
