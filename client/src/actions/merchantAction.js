import axios from 'axios';
import {
  GET_MERCHANT,
  GET_MERCHANTS,
  MERCHANT_LOADING,
  CLEAR_ERRORS,
  GET_ERRORS,
  DELETE_MERCHANT
} from './types';

// Get all merchants
export const getMerchants = () => dispatch => {
  dispatch({ type: MERCHANT_LOADING, payload: null });
  axios.get('/merchant')
    .then(merchants => dispatch({
      type: GET_MERCHANTS,
      payload: merchants.data
    }));
}

// Get merchant by status
export const getMerchantByStatus = (status) => dispatch => {
  axios.post('/merchant/by-status/', { status })
    .then(merchant => {
      return dispatch({
        type: GET_MERCHANTS,
        payload: merchant.data
      })
    });
}

// Get merchant by id
export const getMerchantById = (merchant_id) => dispatch => {
  axios.get(`/merchant/get-by-id/${merchant_id}`)
    .then(merchant => {
      return dispatch({
        type: GET_MERCHANT,
        payload: merchant.data
      })
    });
}

// Get merchant by name
export const getMerchantByName = (name) => dispatch => {
  axios.post('/merchant/by-name/', { name })
    .then(merchant => {
      return dispatch({
        type: GET_MERCHANTS,
        payload: merchant.data
      })
    });
}

// Add merchant
export const addMerchant = merchant_data => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
  axios.post('/merchant', merchant_data)
    .then(() => {
      window.location.href = '/';
    })
    .catch(error => {
      return dispatch({ type: GET_ERRORS, payload: error.response.data })
    });
}

// Delete merchant
export const deleteMerchant = (merchant_id) => dispatch => {
  axios.delete(`/merchant/${merchant_id}`)
    .then(() => dispatch({
      type: DELETE_MERCHANT,
      payload: merchant_id
    }));
}

// Update merchant
export const updateMerchant = (merchant_data, history) => dispatch => {
  console.log(merchant_data);
  axios.post(`/merchant/update`, merchant_data)
    .then(() => history.push('/'));
}
