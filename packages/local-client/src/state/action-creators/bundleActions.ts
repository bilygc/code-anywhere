import { ActionType } from "../action-types";
import { Action } from "../actions";
import { Dispatch } from "redux";
import bundle from "../../bundler";



export const createBundle = (id: string, input: string) => {
    return async (dispatch: Dispatch<Action>) =>{
        dispatch({
            type:ActionType.BUNDLE_START,
            payload: {
                id
            }
        });

        const { code, error } = await bundle(input);

        dispatch({
            type:ActionType.BUNDLE_COMPLETE,
            payload: {
                cellId: id,
                bundle: {
                    code,
                    err: error
                }
            }
        });

    }
}