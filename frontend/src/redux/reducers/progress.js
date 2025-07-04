import {
  GET_PROGRESS_SUCCESS,
  GET_PROGRESS_FAIL,
  UPDATE_PROGRESS_SUCCESS,
  UPDATE_PROGRESS_FAIL
} from '../actions/types';

const initialState = {
  progress: [],
};

export default function Progress(state = initialState, action) {
  switch (action.type) {
    case GET_PROGRESS_SUCCESS:
      return {
        ...state,
        progress: action.payload.results
      };

    case UPDATE_PROGRESS_SUCCESS:
      const updated = state.progress.map(p =>
        p.id === action.payload.id ? action.payload : p
      );

      const exists = state.progress.some(p => p.id === action.payload.id);

      return {
        ...state,
        progress: exists
          ? updated
          : [...state.progress, action.payload]
      };

    case GET_PROGRESS_FAIL:
      return {
        ...state,
        progress: []
      };

    case UPDATE_PROGRESS_FAIL:
      return state;

    default:
      return state;
  }
}
