import {
  GET_LESSONS_SUCCESS,
  GET_LESSONS_FAIL,
  CREATE_LESSON_SUCCESS,
  CREATE_LESSON_FAIL,
  UPDATE_LESSON_SUCCESS,
  UPDATE_LESSON_FAIL,
  DELETE_LESSON_SUCCESS,
  DELETE_LESSON_FAIL
} from '../actions/types';

const initialState = {
  lessons: [],
  error: null
};

export default function Lessons(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_LESSONS_SUCCESS:
      return { ...state, lessons: payload, error: null };
    case CREATE_LESSON_SUCCESS:
      return { ...state, lessons: [...state.lessons, payload], error: null };
    case UPDATE_LESSON_SUCCESS:
      return {
        ...state,
        lessons: state.lessons.map(lesson =>
          lesson.id === payload.id ? payload : lesson
        ),
        error: null
      };
    case DELETE_LESSON_SUCCESS:
      return {
        ...state,
        lessons: state.lessons.filter(lesson => lesson.id !== payload),
        error: null
      };
    case GET_LESSONS_FAIL:
    case CREATE_LESSON_FAIL:
    case UPDATE_LESSON_FAIL:
    case DELETE_LESSON_FAIL:
      return { ...state, error: true };
    default:
      return state;
  }
}
