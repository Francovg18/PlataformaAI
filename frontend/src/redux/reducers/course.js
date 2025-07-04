import {
  GET_COURSES_SUCCESS,
  GET_COURSES_FAIL,
  CREATE_COURSE_SUCCESS,
  CREATE_COURSE_FAIL,
  UPDATE_COURSE_SUCCESS,
  UPDATE_COURSE_FAIL,
  DELETE_COURSE_SUCCESS,
  DELETE_COURSE_FAIL
} from '../actions/types';

const initialState = {
  courses: [],
  error: null
};

export default function Courses(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_COURSES_SUCCESS:
      return {
        ...state,
        courses: payload
      };
    case CREATE_COURSE_SUCCESS:
      return {
        ...state,
        courses: [...state.courses, payload]
      };
    case UPDATE_COURSE_SUCCESS:
      return {
        ...state,
        courses: state.courses.map(course => course.id === payload.id ? payload : course)
      };
    case DELETE_COURSE_SUCCESS:
      return {
        ...state,
        courses: state.courses.filter(course => course.id !== payload)
      };
    case GET_COURSES_FAIL:
    case CREATE_COURSE_FAIL:
    case UPDATE_COURSE_FAIL:
    case DELETE_COURSE_FAIL:
      return {
        ...state,
        error: true
      };
    default:
      return state;
  }
}
