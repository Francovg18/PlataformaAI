import axios from 'axios';
import {
  GET_COURSES_SUCCESS,
  GET_COURSES_FAIL,
  CREATE_COURSE_SUCCESS,
  CREATE_COURSE_FAIL,
  UPDATE_COURSE_SUCCESS,
  UPDATE_COURSE_FAIL,
  DELETE_COURSE_SUCCESS,
  DELETE_COURSE_FAIL
} from './types';

import { setAlert } from './alert';

const API_URL = `${process.env.REACT_APP_API_URL}/api/courses/`;

// cursos
export const getCourses = () => async dispatch => {
  try {
    const res = await axios.get(API_URL);
    dispatch({
        type: GET_COURSES_SUCCESS,
        payload: res.data.results
    });

  } catch (err) {
    dispatch({
      type: GET_COURSES_FAIL
    });
    dispatch(setAlert('Error cargando cursos', 'red'));
  }
};

// Crear curso 
export const createCourse = (formData) => async dispatch => {
  const token = localStorage.getItem('access');
  const config = {
    headers: {
      'Authorization': `JWT ${token}`,
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(API_URL, formData, config);
    dispatch({
      type: CREATE_COURSE_SUCCESS,
      payload: res.data
    });
    dispatch(setAlert('Curso creado con éxito', 'green'));
  } catch (err) {
    dispatch({
      type: CREATE_COURSE_FAIL
    });
    dispatch(setAlert('Error al crear el curso', 'red'));
  }
};

// Editar curso
export const updateCourse = (id, formData) => async dispatch => {
  const token = localStorage.getItem('access');
  const config = {
    headers: {
      'Authorization': `JWT ${token}`,
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.put(`${API_URL}${id}/`, formData, config);
    dispatch({
      type: UPDATE_COURSE_SUCCESS,
      payload: res.data
    });
    dispatch(setAlert('Curso actualizado', 'green'));
  } catch (err) {
    dispatch({
      type: UPDATE_COURSE_FAIL
    });
    dispatch(setAlert('Error al actualizar el curso', 'red'));
  }
};

// Eliminar curso
export const deleteCourse = (id) => async dispatch => {
  const token = localStorage.getItem('access');
  const config = {
    headers: {
      'Authorization': `JWT ${token}`
    }
  };

  try {
    await axios.delete(`${API_URL}${id}/`, config);
    dispatch({
      type: DELETE_COURSE_SUCCESS,
      payload: id
    });
    dispatch(setAlert('Curso eliminado', 'green'));
  } catch (err) {
    dispatch({
      type: DELETE_COURSE_FAIL
    });
    dispatch(setAlert('Error al eliminar el curso', 'red'));
  }
};
