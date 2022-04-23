import axios from 'axios';

import * as actions from '../api';
import environment from '../../env.json';


const api = ({ dispatch }) => (next) => async (action) => {
  console.log('in api middleware...', action);

  if (action.type !== actions.apiCallBegan.type) return next(action);
  const { url, method, headers, data, onStart, onSuccess, onError } = action.payload;
  if (onStart) dispatch({ type: onStart });
  next(action);
  try {
    const response = await axios.request({
      baseURL: environment.baseURL,
      url,
      method,
      data,
      headers: {
        'X-Api-Key': environment.apiKey,
        'Content-Type': 'application/json',
      }
    });
    dispatch(actions.apiCallSuccess(response.data));
    if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
  } catch (error) {
    //dispatch(actions.apiCallFailed(error.message));
    // if (onError) dispatch({ type: onError, payload: error.message });
    console.log("API Error:")
    console.log(error.message)
    console.log(JSON.stringify(error))
    dispatch(actions.apiCallFailed(error.message));
    if (onError) dispatch({ type: onError, payload: error });
  }
};

export default api;
