import axios from 'axios';
import {
  GET_LESSONS_SUCCESS,
  GET_LESSONS_FAIL,
  CREATE_LESSON_SUCCESS,
  CREATE_LESSON_FAIL,
  UPDATE_LESSON_SUCCESS,
  UPDATE_LESSON_FAIL,
  DELETE_LESSON_SUCCESS,
  DELETE_LESSON_FAIL
} from './types';

import { setAlert } from './alert';

const API_URL = `${process.env.REACT_APP_API_URL}/api/lessons/`;

export const getLessons = () => async dispatch => {
  try {
    const res = await axios.get(API_URL);
    dispatch({
      type: GET_LESSONS_SUCCESS,
      payload: res.data.results
    });
  } catch (err) {
    dispatch({ type: GET_LESSONS_FAIL });
    dispatch(setAlert('Error cargando lecciones', 'red'));
  }
};

export const createLesson = (formData) => async dispatch => {
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
      type: CREATE_LESSON_SUCCESS,
      payload: res.data
    });
    dispatch(setAlert('Lección creada con éxito', 'green'));
  } catch (err) {
    dispatch({ type: CREATE_LESSON_FAIL });
    dispatch(setAlert('Error al crear la lección', 'red'));
  }
};

export const updateLesson = (id, formData) => async dispatch => {
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
      type: UPDATE_LESSON_SUCCESS,
      payload: res.data
    });
    dispatch(setAlert('Lección actualizada', 'green'));
  } catch (err) {
    dispatch({ type: UPDATE_LESSON_FAIL });
    dispatch(setAlert('Error al actualizar la lección', 'red'));
  }
};

export const deleteLesson = (id) => async dispatch => {
  const token = localStorage.getItem('access');
  const config = {
    headers: {
      'Authorization': `JWT ${token}`
    }
  };

  try {
    await axios.delete(`${API_URL}${id}/`, config);
    dispatch({
      type: DELETE_LESSON_SUCCESS,
      payload: id
    });
    dispatch(setAlert('Lección eliminada', 'green'));
  } catch (err) {
    dispatch({ type: DELETE_LESSON_FAIL });
    dispatch(setAlert('Error al eliminar la lección', 'red'));
  }
};
