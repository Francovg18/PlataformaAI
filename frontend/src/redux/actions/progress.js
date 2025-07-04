import axios from 'axios';
import {
  GET_PROGRESS_SUCCESS,
  GET_PROGRESS_FAIL,
  UPDATE_PROGRESS_SUCCESS,
  UPDATE_PROGRESS_FAIL
} from './types';

import { setAlert } from './alert';

const API_URL = `${process.env.REACT_APP_API_URL}/api/progress/`;

export const getProgress = () => async dispatch => {
  const token = localStorage.getItem('access');
  const config = {
    headers: {
      'Authorization': `JWT ${token}`
    }
  };

  try {
    const res = await axios.get(API_URL, config);
    dispatch({
      type: GET_PROGRESS_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({ type: GET_PROGRESS_FAIL });
    dispatch(setAlert('Error al cargar progreso', 'red'));
  }
};

export const createOrUpdateProgress = (lessonId, data) => async (dispatch, getState) => {
  const token = localStorage.getItem('access');
  const config = {
    headers: {
      'Authorization': `JWT ${token}`,
      'Content-Type': 'application/json'
    }
  };

  const state = getState();
  const rawProgress = state.Progress?.progress;
  const progressList = Array.isArray(rawProgress)
    ? rawProgress
    : rawProgress?.results || [];

  let existing = progressList.find(p => p.lesson === lessonId);

  try {
    if (!existing) {
      const res = await axios.get(`${API_URL}`, config);
      const updatedList = Array.isArray(res.data) ? res.data : [];  
      existing = updatedList.find(p => p.lesson === lessonId);

    }

    if (existing) {
      const res = await axios.put(`${API_URL}${existing.id}/`, data, config);
      dispatch({
        type: UPDATE_PROGRESS_SUCCESS,
        payload: res.data
      });
    } else {
      const res = await axios.post(API_URL, { lesson: lessonId, ...data }, config);
      dispatch({
        type: UPDATE_PROGRESS_SUCCESS,
        payload: res.data
      });
    }
  } catch (err) {
    dispatch({ type: UPDATE_PROGRESS_FAIL });
    dispatch(setAlert('Error al guardar progreso', 'red'));
  }
};


