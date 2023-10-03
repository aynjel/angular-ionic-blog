import { createReducer, on } from "@ngrx/store";
import { hide, show } from "./loading.actions";
import { LoadingState } from "./LoadingState";

const initialState: LoadingState = { 
    isLoading: false 
};

const reducer = createReducer(initialState,
    on(show, (state) => {
        return { isLoading: true };
    }),
    on(hide, (state) => {
        return { isLoading: false };
    })
);

export function loadingReducer(state: LoadingState, action: any) {
    return reducer(state, action);
}