import { ActionType } from "../action-types";
import { Action, MoveCellAction, DeleteCellAction, UpdateCellAction, InsertCellAfterAction } from "../actions";
import { Cell, CellTypes } from "../cell";
import { Direction } from "../actions";
import axios from "axios";
import { Dispatch } from "redux";
import { RootState } from "../reducers";

export const updateCell = (id: string, content: string): UpdateCellAction =>{
    return {
        type: ActionType.UPDATE_CELL,
        payload: {
            id,
            content
        }
    }
};

export const deleteCell = (id: string): DeleteCellAction =>{
    return {
        type: ActionType.DELETE_CELL,
        payload: id
    }
};

export const moveCell = (id: string, direction: Direction): MoveCellAction =>{
    return {
        type: ActionType.MOVE_CELL,
        payload: {
            id,
            direction
        }
    }
};

export const insertCellAfter = (id: string | null, type: CellTypes): InsertCellAfterAction =>{
    return {
        type: ActionType.ISERT_CELL_AFTER,
        payload: {
            id,
            type
        }
    }
};

export const fetchCells = () =>{
    return async (dispatch: Dispatch<Action>) =>{

        dispatch({type: ActionType.FETCH_CELLS});

        try{
            const { data } = await axios.get("/cells");
            dispatch({
                type:ActionType.FETCH_CELLS_COMPLETE,
                payload: data
            });

        }catch(err: any){
            dispatch({
                type: ActionType.FETCH_CELLS_ERROR,
                payload: err.message
            });
        }
    };
};

export const saveCells = () => {
    return async (dispatch: Dispatch<Action>, getState: () => RootState ) => {
        
        const {//@ts-ignore
            cells: { data, order },
        } = getState();

        //@ts-ignore
        const cells= order.map((id) => data[id]);

        try {
            await axios.post("/cells",{ cells })            
        } catch(err: any){
            
            dispatch({type: ActionType.SAVE_CELLS_ERROR,
                payload:err.message,
            })
        }
    }
};