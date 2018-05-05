import Immutable from 'seamless-immutable';
import axios from 'axios';
import { cryptoUrl } from '../utils/REST_URL';
import { showNotif } from './warungAction';

// name spacing with prefix `crypto/`
const LOAD_CRYPTO = 'crypto/LOAD_CRYPTO';
const LOAD_CRYPTO_SUCCESS = 'crypto/LOAD_CRYPTO_SUCCESS';
const HANDLE_CREDIT = 'crypto/HANDLE_CREDIT';
const ADD_WALLET = 'crypto/ADD_WALLET';
const TRANSACTION_WALLET = 'crypto/TRANSACTION_WALLET';

// Create Immutable object
const actionTypes = Immutable({
  LOAD_CRYPTO,
  LOAD_CRYPTO_SUCCESS,
  HANDLE_CREDIT,
  ADD_WALLET,
  TRANSACTION_WALLET,
});

// export it
export default actionTypes;

/* Action Creator */

export function loadCrypto() {
  const url = `${cryptoUrl}/?convert=IDR`;

  return (dispatch) => {
    axios.get(url)
      .then((res) => {
        dispatch(loadCryptoSuccess(res));
      })
      .catch((err) => {
        dispatch(showNotif('red', err));
        return Promise.reject(err);
      });
  };
}

export function loadCryptoSuccess(data) {
  return {
    type: actionTypes.LOAD_CRYPTO_SUCCESS,
    data,
  };
}

export function handleCredit(data) {
  return {
    type: actionTypes.HANDLE_CREDIT,
    data,
  };
}

export function addWallet(data) {
  return {
    type: actionTypes.ADD_WALLET,
    data,
  };
}

export function transactionWallet(data) {
  return {
    type: actionTypes.TRANSACTION_WALLET,
    data,
  };
}
