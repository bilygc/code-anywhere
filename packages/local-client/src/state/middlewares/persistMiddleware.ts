import { Dispatch } from "redux";
import { Action } from "../actions";
import { ActionType } from "../action-types";
import { saveCells } from "../action-creators";
import { RootState } from "../reducers";


export const persistMiddleware = ({ dispatch, getState } : { dispatch: Dispatch<Action>; getState: () => RootState }) =>{
    let timer: any;
    return (next: (action: Action) => void ) =>{
        return (action: Action) =>{
            next(action);

            //we only going to save when any of thuis actions is performed
            if( [ ActionType.ISERT_CELL_AFTER, ActionType.MOVE_CELL, ActionType.UPDATE_CELL, ActionType.DELETE_CELL ].includes(action.type ) ){
                
                //this timer is for debouncing logic, to not to save on every key press
                if(timer){
                    clearTimeout(timer);
                }

                timer = setTimeout(() =>{
                    saveCells()(dispatch, getState)
                }, 500);
            }
        };
    };
};